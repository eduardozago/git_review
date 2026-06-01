from urllib.parse import parse_qs, urlencode, urlparse, urlunparse

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", env_file_override=True
    )

    github_client_id: str
    github_client_secret: str
    github_redirect_uri: str

    database_url: str

    @field_validator("database_url", mode="before")
    @classmethod
    def force_asyncpg_scheme(cls, v: str) -> str:
        if v.startswith("postgresql://"):
            v = v.replace("postgresql://", "postgresql+asyncpg://", 1)
        parsed = urlparse(v)
        params = {k: vals[0] for k, vals in parse_qs(parsed.query).items()}
        if "sslmode" in params:
            params["ssl"] = params.pop("sslmode")
        params.pop("channel_binding", None)
        return urlunparse(parsed._replace(query=urlencode(params)))

    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 60 * 24 * 7  # 7 days

    frontend_url: str
    cookie_secure: bool

    # LLM (Ollama Cloud API)
    ollama_api_key: str
    llm_base_url: str = "https://ollama.com"
    llm_model: str = "gpt-oss:120b"
    llm_max_tokens: int = 4096
    llm_temperature: float = 0.3

settings = Settings()
