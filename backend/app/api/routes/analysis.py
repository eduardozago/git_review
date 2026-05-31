import logging
from dataclasses import asdict

from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel

from app.core.security import get_current_user
from app.models.user import User
from app.services.analysis_pipeline import AnalysisPipeline

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/analysis", tags=["analysis"])


class AnalysisRequest(BaseModel):
    owner: str
    repo: str


@router.post("")
async def analyze_repository(
    body: AnalysisRequest,
    request: Request,
    current_user: User = Depends(get_current_user),
):
    """Run a full analysis on a GitHub repository.

    Collects repo data and runs parallel LLM-powered analyzers across
    5 dimensions: commits, code quality, README, PRs, and project structure.
    """
    http_client = request.app.state.http_client

    pipeline = AnalysisPipeline(
        http_client=http_client,
        access_token=current_user.access_token,
    )

    try:
        report = await pipeline.run(body.owner, body.repo)
    except Exception:
        logger.exception(f"Analysis failed for {body.owner}/{body.repo}")
        raise HTTPException(status_code=500, detail="Analysis failed. Please try again.")

    return asdict(report)


@router.get("/repos")
async def list_user_repos(
    request: Request,
    current_user: User = Depends(get_current_user),
    page: int = 1,
    per_page: int = 30,
):
    """List the authenticated user's GitHub repositories for selection."""
    http_client = request.app.state.http_client

    response = await http_client.get(
        "https://api.github.com/user/repos",
        headers={
            "Authorization": f"Bearer {current_user.access_token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        },
        params={
            "sort": "updated",
            "direction": "desc",
            "per_page": per_page,
            "page": page,
            "type": "owner",
        },
    )
    response.raise_for_status()
    repos = response.json()

    return [
        {
            "owner": repo["owner"]["login"],
            "name": repo["name"],
            "full_name": repo["full_name"],
            "description": repo.get("description"),
            "language": repo.get("language"),
            "stars": repo.get("stargazers_count", 0),
            "forks": repo.get("forks_count", 0),
            "updated_at": repo.get("updated_at"),
            "private": repo.get("private", False),
        }
        for repo in repos
    ]
