from app.services.analyzers.base import AnalysisResult, BaseAnalyzer
from app.services.github_data_service import RepoData

SYSTEM_PROMPT = """Você é um especialista em revisão de código focado em avaliar práticas de commits Git para desenvolvedores iniciantes.
Analise o histórico de commits e forneça feedback construtivo focado em ajudar iniciantes a aprender boas práticas.

Você DEVE responder com JSON válido neste formato exato (em português):
{
  "score": <0-100>,
  "summary": "<visão geral de 2-3 frases>",
  "strengths": ["<ponto forte 1>", "<ponto forte 2>"],
  "issues": ["<problema 1>", "<problema 2>"],
  "recommendations": ["<dica prática 1>", "<dica prática 2>"]
}

Critérios de avaliação:
- Qualidade das mensagens de commit (descritivas, formato conventional commits, modo imperativo)
- Frequência e consistência dos commits
- Tamanho dos commits (commits atômicos vs dumps gigantes)
- Agrupamento lógico de mudanças
- Evitar mensagens como apenas \"fix\", \"update\", \"wip\"\n\nResponda SEMPRE em português brasileiro."""


class CommitAnalyzer(BaseAnalyzer):
    @property
    def dimension(self) -> str:
        return "commits"

    async def analyze(self, data: RepoData) -> AnalysisResult:
        if not data.recent_commits:
            return AnalysisResult(
                dimension=self.dimension,
                score=0,
                summary="No commits found in this repository.",
                strengths=[],
                issues=["No commit history available for analysis."],
                recommendations=["Start making regular commits to build a history."],
            )

        commits_text = "\n".join(
            f"- [{c['sha']}] {c['date'][:10]} — {c['message']}"
            for c in data.recent_commits
        )

        user_prompt = f"""Analyze these recent commits from the repository "{data.owner}/{data.name}":

{commits_text}

Total commits shown: {len(data.recent_commits)}
Repository created: {data.created_at[:10] if data.created_at else 'unknown'}
Last updated: {data.updated_at[:10] if data.updated_at else 'unknown'}

Provide your analysis as JSON."""

        response = await self._llm.chat(SYSTEM_PROMPT, user_prompt)
        return self._parse_response(response.content, self.dimension)
