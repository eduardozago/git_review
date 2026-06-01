from abc import ABC, abstractmethod
from dataclasses import dataclass

from app.core.llm_client import LLMClient
from app.services.github_data_service import RepoData


@dataclass
class AnalysisResult:
    """Result from a single analyzer dimension."""

    dimension: str
    score: int  # 0-100
    summary: str
    strengths: list[str]
    issues: list[str]
    recommendations: list[str]


class BaseAnalyzer(ABC):
    """Base class for all analyzers (Strategy Pattern)."""

    def __init__(self, llm_client: LLMClient):
        self._llm = llm_client

    @property
    @abstractmethod
    def dimension(self) -> str:
        """Name of the analysis dimension."""
        ...

    @abstractmethod
    async def analyze(self, data: RepoData) -> AnalysisResult:
        """Run analysis and return structured result."""
        ...

    def _parse_response(self, content: str, dimension: str) -> AnalysisResult:
        """Parse LLM response into structured result."""
        import json

        try:
            # Try to extract JSON from the response
            start = content.find("{")
            end = content.rfind("}") + 1
            if start != -1 and end > start:
                parsed = json.loads(content[start:end])
                return AnalysisResult(
                    dimension=dimension,
                    score=min(100, max(0, int(parsed.get("score", 50)))),
                    summary=parsed.get("summary", ""),
                    strengths=parsed.get("strengths", []),
                    issues=parsed.get("issues", []),
                    recommendations=parsed.get("recommendations", []),
                )
        except (json.JSONDecodeError, ValueError, TypeError):
            pass

        # Fallback: return raw content as summary
        return AnalysisResult(
            dimension=dimension,
            score=50,
            summary=content[:500],
            strengths=[],
            issues=[],
            recommendations=[],
        )
