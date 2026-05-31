from app.services.analyzers.base import AnalysisResult, BaseAnalyzer
from app.services.github_data_service import RepoData

SYSTEM_PROMPT = """Você é um especialista em avaliar estrutura e organização de projetos para desenvolvedores iniciantes.
Analise a estrutura de arquivos/pastas e forneça feedback construtivo.

Você DEVE responder com JSON válido neste formato exato (em português):
{
  "score": <0-100>,
  "summary": "<visão geral de 2-3 frases>",
  "strengths": ["<ponto forte 1>", "<ponto forte 2>"],
  "issues": ["<problema 1>", "<problema 2>"],
  "recommendations": ["<dica prática 1>", "<dica prática 2>"]
}

Critérios de avaliação:
- Organização lógica de pastas
- Separação de responsabilidades (src, tests, docs, config)
- Presença de arquivos essenciais (.gitignore, LICENSE, package.json/requirements.txt)
- Configuração de CI/CD (.github/workflows)
- Tratamento de variáveis de ambiente (.env.example, sem secrets commitados)
- Presença de diretório de testes
- Gerenciamento de configurações
- Setup Docker/containerização
- Arquivos de gerenciamento de dependências\n\nResponda SEMPRE em português brasileiro."""


class ProjectStructureAnalyzer(BaseAnalyzer):
    @property
    def dimension(self) -> str:
        return "project_structure"

    async def analyze(self, data: RepoData) -> AnalysisResult:
        if not data.tree_structure:
            return AnalysisResult(
                dimension=self.dimension,
                score=0,
                summary="Could not fetch the repository file tree.",
                strengths=[],
                issues=["Unable to analyze project structure."],
                recommendations=["Ensure the repository is public and accessible."],
            )

        tree_text = "\n".join(f"  {path}" for path in data.tree_structure[:150])

        user_prompt = f"""Analyze the project structure of repository "{data.owner}/{data.name}":

Primary language: {data.language or 'Unknown'}
Languages: {', '.join(data.languages.keys()) if data.languages else 'Unknown'}

File tree:
{tree_text}

Total files/folders: {len(data.tree_structure)}

Provide your analysis as JSON."""

        response = await self._llm.chat(SYSTEM_PROMPT, user_prompt)
        return self._parse_response(response.content, self.dimension)
