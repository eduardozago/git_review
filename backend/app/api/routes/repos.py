import logging
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.services.github_service import GitHubAPIError, RepoOut, get_user_repos
from app.services.repo_selection_service import create_selection

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/repos", tags=["repos"])

# ── List repos ────────────────────────────────────────────────────────────────

class ReposResponse(BaseModel):
    repos: list[RepoOut]
    total: int

@router.get("", response_model=ReposResponse)
async def list_repos(
    request: Request,
    current_user: User = Depends(get_current_user),
) -> ReposResponse:
    client = request.app.state.http_client
    try:
        repos = await get_user_repos(current_user.access_token, client)
    except GitHubAPIError as e:
        logger.warning("GitHub API error for user %s: %s (status=%s)",
                      current_user.login, e, e.status_code)
        raise HTTPException(
            status_code=e.status_code or status.HTTP_502_BAD_GATEWAY,
            detail=str(e),
        )
    except Exception:
        logger.exception("Unexpected error fetching GitHub repos for user %s", current_user.login)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Failed to fetch repositories from GitHub.",
        )
    return ReposResponse(repos=repos, total=len(repos))

# ── Select repo ───────────────────────────────────────────────────────────────

class RepoSelectIn(BaseModel):
    repo_name: str
    repo_full_name: str
    repo_url: str
    language: str | None

class RepoSelectionOut(BaseModel):
    id: int
    repo_name: str
    repo_full_name: str
    repo_url: str
    language: str | None
    created_at: datetime

    model_config = {"from_attributes": True}

@router.post("/select", response_model=RepoSelectionOut, status_code=status.HTTP_201_CREATED)
async def select_repo(
    payload: RepoSelectIn,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> RepoSelectionOut:
    return await create_selection(
        user_id=current_user.id,
        repo_name=payload.repo_name,
        repo_full_name=payload.repo_full_name,
        repo_url=payload.repo_url,
        language=payload.language,
        db=db,
    )
