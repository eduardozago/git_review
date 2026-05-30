from sqlalchemy.ext.asyncio import AsyncSession

from app.models.repo_selection import RepoSelection

async def create_selection(
    user_id: int,
    repo_name: str,
    repo_full_name: str,
    repo_url: str,
    language: str | None,
    db: AsyncSession,
) -> RepoSelection:
    selection = RepoSelection(
        user_id=user_id,
        repo_name=repo_name,
        repo_full_name=repo_full_name,
        repo_url=repo_url,
        language=language,
    )
    db.add(selection)
    await db.commit()
    await db.refresh(selection)
    return selection
