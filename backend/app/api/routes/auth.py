import logging
import secrets

from fastapi import APIRouter, Depends, Request, Response
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.core.security import COOKIE_NAME, create_access_token, get_current_user
from app.models.user import User
from app.services.auth_service import exchange_code_for_token, fetch_github_user, upsert_user

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/auth", tags=["auth"])

GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize"
OAUTH_STATE_COOKIE = "oauth_state"
COOKIE_MAX_AGE = settings.jwt_expire_minutes * 60  # seconds


class UserOut(BaseModel):
    github_id: int
    login: str
    name: str | None
    avatar_url: str | None

    model_config = {"from_attributes": True}

@router.get("/github")
async def github_login() -> RedirectResponse:
    state = secrets.token_urlsafe(32)
    params = (
        f"client_id={settings.github_client_id}"
        f"&redirect_uri={settings.github_redirect_uri}"
        f"&scope=read:user"
        f"&state={state}"
    )
    response = RedirectResponse(f"{GITHUB_AUTHORIZE_URL}?{params}")
    response.set_cookie(
        key=OAUTH_STATE_COOKIE,
        value=state,
        httponly=True,
        samesite="lax",
        secure=settings.cookie_secure,
        max_age=600,  # 10 min window to complete OAuth
        path="/",
    )
    return response

@router.get("/callback")
async def github_callback(
    request: Request,
    db: AsyncSession = Depends(get_db),
    code: str | None = None,
    error: str | None = None,
    state: str | None = None,
) -> RedirectResponse:
    stored_state = request.cookies.get(OAUTH_STATE_COOKIE)

    if error or not code or not state or not stored_state or not secrets.compare_digest(state, stored_state):
        return _clear_state_and_redirect(f"{settings.frontend_url}?error=auth_denied")

    http_client = request.app.state.http_client
    try:
        access_token = await exchange_code_for_token(code, http_client)
        github_data = await fetch_github_user(access_token, http_client)
        user = await upsert_user(github_data, access_token, db)
    except Exception:
        logger.exception("OAuth callback failed")
        return _clear_state_and_redirect(f"{settings.frontend_url}?error=auth_failed")

    jwt_token = create_access_token(user.github_id)
    response = _clear_state_and_redirect(f"{settings.frontend_url}/dashboard")
    response.set_cookie(
        key=COOKIE_NAME,
        value=jwt_token,
        httponly=True,
        samesite="none" if settings.cookie_secure else "lax",
        secure=settings.cookie_secure,
        max_age=COOKIE_MAX_AGE,
        path="/",
    )
    return response

@router.get("/me", response_model=UserOut)
async def get_me(current_user: User = Depends(get_current_user)) -> User:
    return current_user

@router.post("/logout")
async def logout() -> Response:
    response = Response(status_code=204)
    response.delete_cookie(
        key=COOKIE_NAME,
        path="/",
        samesite="none" if settings.cookie_secure else "lax",
        secure=settings.cookie_secure,
        httponly=True,
    )
    return response

def _clear_state_and_redirect(url: str) -> RedirectResponse:
    """Return a redirect that also expires the OAuth state cookie."""
    response = RedirectResponse(url)
    response.delete_cookie(
        key=OAUTH_STATE_COOKIE,
        path="/",
        samesite="lax",
        secure=settings.cookie_secure,
        httponly=True,
    )
    return response
