from app.services.analyzers.base import AnalysisResult, BaseAnalyzer
from app.services.github_data_service import RepoData

SYSTEM_PROMPT = """Você é um especialista em avaliar práticas de Pull Request para desenvolvedores iniciantes.
Analise o histórico de PRs e forneça feedback construtivo sobre práticas de colaboração.

Você DEVE responder com JSON válido neste formato exato (em português):
{
  "score": <0-100>,
  "summary": "<visão geral de 2-3 frases>",
  "strengths": ["<ponto forte 1>", "<ponto forte 2>"],
  "issues": ["<problema 1>", "<problema 2>"],
  "recommendations": ["<dica prática 1>", "<dica prática 2>"]
}

Critérios de avaliação:
- Qualidade do título do PR (descritivo, segue convenções)
- Qualidade da descrição do PR (contexto, o quê/por quê/como)
- Tamanho do PR (PRs pequenos e focados vs grandes)
- Uso de labels e organização
- Convenções de nomes de branches
- Práticas de review (se visível)
- Consistência na estratégia de merge vs squash\n\nResponda SEMPRE em português brasileiro."""


class PRAnalyzer(BaseAnalyzer):
    @property
    def dimension(self) -> str:
        return "pull_requests"

    async def analyze(self, data: RepoData) -> AnalysisResult:
        if not data.pull_requests:
            return AnalysisResult(
                dimension=self.dimension,
                score=30,
                summary="No pull requests found. Using PRs is a best practice even in solo projects.",
                strengths=[],
                issues=["No PR history — committing directly to main branch."],
                recommendations=[
                    "Create feature branches and open PRs even for solo projects.",
                    "Practice writing PR descriptions explaining what changed and why.",
                    "This demonstrates professional workflow to recruiters.",
                ],
            )

        prs_text = "\n".join(
            f"- PR #{pr['number']}: \"{pr['title']}\" [{pr['state']}{'/ merged' if pr['merged'] else ''}]\n"
            f"  Labels: {', '.join(pr['labels']) or 'none'} | Created: {pr['created_at'][:10]}\n"
            f"  Description: {pr['body'][:150] or '(empty)'}"
            for pr in data.pull_requests
        )

        user_prompt = f"""Analyze the PR practices for repository "{data.owner}/{data.name}":

{prs_text}

Total PRs shown: {len(data.pull_requests)}

Provide your analysis as JSON."""

        response = await self._llm.chat(SYSTEM_PROMPT, user_prompt)
        return self._parse_response(response.content, self.dimension)
