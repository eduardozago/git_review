from httpx import AsyncClient
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.models.user import User

GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token"
GITHUB_API_BASE = "https://api.github.com"
GITHUB_API_HEADERS = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
}


async def exchange_code_for_token(code: str, client: AsyncClient) -> str:
    response = await client.post(
        GITHUB_TOKEN_URL,
        json={
            "client_id": settings.github_client_id,
            "client_secret": settings.github_client_secret,
            "code": code,
            "redirect_uri": settings.github_redirect_uri,
        },
        headers={"Accept": "application/json"},
    )
    response.raise_for_status()
    data = response.json()
    if "access_token" not in data:
        raise ValueError(f"GitHub token exchange failed: {data.get('error_description', data)}")
    return data["access_token"]


async def fetch_github_user(access_token: str, client: AsyncClient) -> dict:
    response = await client.get(
        f"{GITHUB_API_BASE}/user",
        headers={**GITHUB_API_HEADERS, "Authorization": f"Bearer {access_token}"},
    )
    response.raise_for_status()
    return response.json()


async def upsert_user(github_data: dict, access_token: str, db: AsyncSession) -> User:
    result = await db.execute(select(User).where(User.github_id == github_data["id"]))
    user = result.scalar_one_or_none()

    if user:
        user.login = github_data["login"]
        user.name = github_data.get("name")
        user.avatar_url = github_data.get("avatar_url")
        user.access_token = access_token
    else:
        user = User(
            github_id=github_data["id"],
            login=github_data["login"],
            name=github_data.get("name"),
            avatar_url=github_data.get("avatar_url"),
            access_token=access_token,
        )
        db.add(user)

    await db.commit()
    await db.refresh(user)
    return user
