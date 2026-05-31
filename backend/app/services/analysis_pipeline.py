import asyncio
import logging
from dataclasses import dataclass, field

from httpx import AsyncClient

from app.core.llm_client import LLMClient
from app.services.analyzers import (
    CodeQualityAnalyzer,
    CommitAnalyzer,
    PRAnalyzer,
    ProjectStructureAnalyzer,
    ReadmeAnalyzer,
)
from app.services.analyzers.base import AnalysisResult
from app.services.github_data_service import GitHubDataCollector, RepoData

logger = logging.getLogger(__name__)

OVERALL_SYSTEM_PROMPT = """Você é um mentor sênior de desenvolvimento ajudando desenvolvedores iniciantes a melhorar sua presença no GitHub.
Com base nas análises individuais por dimensão fornecidas, escreva um resumo geral coeso.

Você DEVE responder com JSON válido neste formato exato (em português):
{
  "overall_score": <0-100 média ponderada>,
  "summary": "<resumo executivo de 3-4 frases para o desenvolvedor>",
  "top_strengths": ["<ponto forte principal 1>", "<ponto forte principal 2>", "<ponto forte principal 3>"],
  "critical_issues": ["<problema mais importante 1>", "<problema mais importante 2>"],
  "next_steps": ["<ação prioritária 1>", "<ação prioritária 2>", "<ação prioritária 3>"]
}

Seja encorajador mas honesto. Foque em feedback acionável. Lembre-se que o público é um desenvolvedor
iniciante que quer tornar seu perfil GitHub atrativo para recrutadores.

Responda SEMPRE em português brasileiro."""


@dataclass
class FullAnalysisReport:
    """Complete analysis report for a repository."""

    owner: str
    repo: str
    overall_score: int = 0
    summary: str = ""
    top_strengths: list[str] = field(default_factory=list)
    critical_issues: list[str] = field(default_factory=list)
    next_steps: list[str] = field(default_factory=list)
    dimensions: list[dict] = field(default_factory=list)
    repo_metadata: dict = field(default_factory=dict)


class AnalysisPipeline:
    """Orchestrates the full repository analysis flow.

    Uses parallel execution of independent analyzers (Strategy + Facade patterns).
    """

    def __init__(self, http_client: AsyncClient, access_token: str):
        self._http_client = http_client
        self._access_token = access_token
        self._llm = LLMClient(http_client)

    async def run(self, owner: str, repo: str) -> FullAnalysisReport:
        # Step 1: Collect all repository data
        logger.info(f"Collecting data for {owner}/{repo}")
        collector = GitHubDataCollector(self._http_client, self._access_token)
        repo_data = await collector.collect(owner, repo)

        # Step 2: Run all analyzers in parallel
        logger.info(f"Running analyzers for {owner}/{repo}")
        analyzers = [
            CommitAnalyzer(self._llm),
            CodeQualityAnalyzer(self._llm),
            ReadmeAnalyzer(self._llm),
            PRAnalyzer(self._llm),
            ProjectStructureAnalyzer(self._llm),
        ]

        results: list[AnalysisResult] = await asyncio.gather(
            *[analyzer.analyze(repo_data) for analyzer in analyzers]
        )

        # Step 3: Generate overall summary
        logger.info(f"Generating overall report for {owner}/{repo}")
        report = await self._generate_overall_report(owner, repo, results, repo_data)

        return report

    async def _generate_overall_report(
        self,
        owner: str,
        repo: str,
        results: list[AnalysisResult],
        repo_data: RepoData,
    ) -> FullAnalysisReport:
        # Build context from dimension results
        dimensions_summary = "\n\n".join(
            f"## {r.dimension.upper()} (Score: {r.score}/100)\n"
            f"Summary: {r.summary}\n"
            f"Strengths: {', '.join(r.strengths)}\n"
            f"Issues: {', '.join(r.issues)}"
            for r in results
        )

        user_prompt = f"""Repository: {owner}/{repo}
Language: {repo_data.language or 'Unknown'}
Stars: {repo_data.stars} | Forks: {repo_data.forks}

Individual dimension analyses:
{dimensions_summary}

Generate the overall report as JSON."""

        response = await self._llm.chat(OVERALL_SYSTEM_PROMPT, user_prompt)

        # Parse overall response
        import json

        report = FullAnalysisReport(owner=owner, repo=repo)
        report.dimensions = [
            {
                "dimension": r.dimension,
                "score": r.score,
                "summary": r.summary,
                "strengths": r.strengths,
                "issues": r.issues,
                "recommendations": r.recommendations,
            }
            for r in results
        ]
        report.repo_metadata = {
            "language": repo_data.language,
            "languages": repo_data.languages,
            "stars": repo_data.stars,
            "forks": repo_data.forks,
            "description": repo_data.description,
            "created_at": repo_data.created_at,
            "updated_at": repo_data.updated_at,
        }

        try:
            content = response.content
            start = content.find("{")
            end = content.rfind("}") + 1
            if start != -1 and end > start:
                parsed = json.loads(content[start:end])
                report.overall_score = min(100, max(0, int(parsed.get("overall_score", 50))))
                report.summary = parsed.get("summary", "")
                report.top_strengths = parsed.get("top_strengths", [])
                report.critical_issues = parsed.get("critical_issues", [])
                report.next_steps = parsed.get("next_steps", [])
        except (json.JSONDecodeError, ValueError, TypeError):
            # Fallback: calculate average score
            report.overall_score = sum(r.score for r in results) // len(results) if results else 0
            report.summary = "Analysis completed but overall summary generation failed."

        return report
