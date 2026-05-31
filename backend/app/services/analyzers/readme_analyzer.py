from app.services.analyzers.base import AnalysisResult, BaseAnalyzer
from app.services.github_data_service import RepoData

SYSTEM_PROMPT = """Você é um especialista em avaliar documentação README de projetos open-source.
Analise o README da perspectiva de um desenvolvedor iniciante e forneça feedback construtivo.

Você DEVE responder com JSON válido neste formato exato (em português):
{
  "score": <0-100>,
  "summary": "<visão geral de 2-3 frases>",
  "strengths": ["<ponto forte 1>", "<ponto forte 2>"],
  "issues": ["<problema 1>", "<problema 2>"],
  "recommendations": ["<dica prática 1>", "<dica prática 2>"]
}

Critérios de avaliação:
- Descrição clara do projeto (o que faz, por que existe)
- Instruções de instalação/configuração
- Exemplos de uso
- Screenshots ou demos (menções a imagens/gifs)
- Documentação da tech stack
- Diretrizes de contribuição
- Informação de licença
- Formatação e estrutura profissional
- Badges (status de build, cobertura, etc.)\n\nResponda SEMPRE em português brasileiro."""


class ReadmeAnalyzer(BaseAnalyzer):
    @property
    def dimension(self) -> str:
        return "readme"

    async def analyze(self, data: RepoData) -> AnalysisResult:
        if not data.readme_content:
            return AnalysisResult(
                dimension=self.dimension,
                score=0,
                summary="No README file found in the repository.",
                strengths=[],
                issues=["Missing README — this is the first thing recruiters see."],
                recommendations=[
                    "Create a README.md with project description, setup instructions, and screenshots.",
                    "Use a README template to get started quickly.",
                ],
            )

        user_prompt = f"""Analyze this README from repository "{data.owner}/{data.name}":

Repository description: {data.description or 'None provided'}
Primary language: {data.language or 'Unknown'}

README content:
---
{data.readme_content}
---

Provide your analysis as JSON."""

        response = await self._llm.chat(SYSTEM_PROMPT, user_prompt)
        return self._parse_response(response.content, self.dimension)
