import logging
from dataclasses import asdict

from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.analysis_report import AnalysisReport
from app.services.analysis_pipeline import AnalysisPipeline

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/analysis", tags=["analysis"])


class AnalysisRequest(BaseModel):
    owner: str
    repo: str
    language: str = "en"


@router.post("")
async def analyze_repository(
    body: AnalysisRequest,
    request: Request,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Run a full analysis on a GitHub repository and persist it."""
    http_client = request.app.state.http_client

    pipeline = AnalysisPipeline(
        http_client=http_client,
        access_token=current_user.access_token,
        language=body.language,
    )

    try:
        report = await pipeline.run(body.owner, body.repo)
    except Exception:
        logger.exception(f"Analysis failed for {body.owner}/{body.repo}")
        raise HTTPException(status_code=500, detail="Analysis failed. Please try again.")

    report_dict = asdict(report)

    # Persist to database
    db_report = AnalysisReport(
        user_id=current_user.id,
        owner=body.owner,
        repo=body.repo,
        overall_score=report.overall_score,
        summary=report.summary,
        top_strengths=report.top_strengths,
        critical_issues=report.critical_issues,
        next_steps=report.next_steps,
        dimensions=report.dimensions,
        repo_metadata=report.repo_metadata,
    )
    db.add(db_report)
    await db.commit()
    await db.refresh(db_report)

    report_dict["id"] = db_report.id
    report_dict["created_at"] = db_report.created_at.isoformat()

    return report_dict


@router.get("/history")
async def list_analysis_history(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """List past analysis reports for the current user."""
    result = await db.execute(
        select(AnalysisReport)
        .where(AnalysisReport.user_id == current_user.id)
        .order_by(AnalysisReport.created_at.desc())
        .limit(50)
    )
    reports = result.scalars().all()

    return [
        {
            "id": r.id,
            "owner": r.owner,
            "repo": r.repo,
            "overall_score": r.overall_score,
            "summary": r.summary,
            "created_at": r.created_at.isoformat(),
        }
        for r in reports
    ]


@router.get("/history/{report_id}")
async def get_analysis_report(
    report_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get a specific past analysis report."""
    result = await db.execute(
        select(AnalysisReport)
        .where(AnalysisReport.id == report_id, AnalysisReport.user_id == current_user.id)
    )
    report = result.scalar_one_or_none()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    return {
        "id": report.id,
        "owner": report.owner,
        "repo": report.repo,
        "overall_score": report.overall_score,
        "summary": report.summary,
        "top_strengths": report.top_strengths,
        "critical_issues": report.critical_issues,
        "next_steps": report.next_steps,
        "dimensions": report.dimensions,
        "repo_metadata": report.repo_metadata,
        "created_at": report.created_at.isoformat(),
    }


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
