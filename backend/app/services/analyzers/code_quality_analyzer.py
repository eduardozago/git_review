from app.services.analyzers.base import AnalysisResult, BaseAnalyzer
from app.services.github_data_service import RepoData

SYSTEM_PROMPT = """Você é um especialista em revisão de código ajudando desenvolvedores iniciantes a melhorar a qualidade do código.
Analise os exemplos de código e a estrutura do projeto para dar feedback construtivo.

Você DEVE responder com JSON válido neste formato exato (em português):
{
  "score": <0-100>,
  "summary": "<visão geral de 2-3 frases>",
  "strengths": ["<ponto forte 1>", "<ponto forte 2>"],
  "issues": ["<problema 1>", "<problema 2>"],
  "recommendations": ["<dica prática 1>", "<dica prática 2>"]
}

Critérios de avaliação:
- Organização e modularidade do código
- Convenções de nomenclatura (variáveis, funções, arquivos)
- Práticas de tratamento de erros
- Aderência ao princípio DRY
- Separação de responsabilidades
- Uso de design patterns apropriados
- Legibilidade e clareza do código
- Uso correto de idiomas da linguagem e boas práticas\n\nResponda SEMPRE em português brasileiro."""


class CodeQualityAnalyzer(BaseAnalyzer):
    @property
    def dimension(self) -> str:
        return "code_quality"

    async def analyze(self, data: RepoData) -> AnalysisResult:
        if not data.sample_files:
            return AnalysisResult(
                dimension=self.dimension,
                score=0,
                summary="No code files could be fetched for analysis.",
                strengths=[],
                issues=["Unable to access code files."],
                recommendations=["Ensure the repository has public code files."],
            )

        files_text = ""
        for path, content in data.sample_files.items():
            files_text += f"\n--- FILE: {path} ---\n{content}\n"

        user_prompt = f"""Analyze the code quality of repository "{data.owner}/{data.name}".
Primary language: {data.language or 'Unknown'}
Languages used: {', '.join(data.languages.keys()) if data.languages else 'Unknown'}

Code samples:
{files_text}

Provide your analysis as JSON."""

        response = await self._llm.chat(SYSTEM_PROMPT, user_prompt)
        return self._parse_response(response.content, self.dimension)
