import logging
from dataclasses import dataclass

from httpx import AsyncClient

from app.core.config import settings

logger = logging.getLogger(__name__)


@dataclass
class LLMResponse:
    content: str
    model: str
    usage: dict


class LLMClient:
    """Abstraction over Ollama chat API (remote or local)."""

    def __init__(self, http_client: AsyncClient):
        self._client = http_client
        self._base_url = settings.llm_base_url.rstrip("/")
        self._headers = {
            "Authorization": f"Bearer {settings.ollama_api_key}",
            "Content-Type": "application/json",
        }

    async def chat(
        self,
        system_prompt: str,
        user_prompt: str,
        temperature: float | None = None,
        max_tokens: int | None = None,
    ) -> LLMResponse:
        payload = {
            "model": settings.llm_model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            "stream": False,
            "options": {
                "temperature": temperature or settings.llm_temperature,
                "num_predict": max_tokens or settings.llm_max_tokens,
            },
        }

        response = await self._client.post(
            f"{self._base_url}/api/chat",
            json=payload,
            headers=self._headers,
            timeout=120.0,
        )
        response.raise_for_status()
        data = response.json()

        # Ollama native format: {"message": {"content": "..."}, "model": "..."}
        return LLMResponse(
            content=data["message"]["content"],
            model=data.get("model", settings.llm_model),
            usage={
                "prompt_tokens": data.get("prompt_eval_count", 0),
                "completion_tokens": data.get("eval_count", 0),
            },
        )
