from contextlib import asynccontextmanager

import httpx
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.auth import router as auth_router
from app.api.routes.repos import router as repos_router
from app.api.routes.analysis import router as analysis_router
from app.core.config import settings
from app.core.database import create_tables

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_tables()
    async with httpx.AsyncClient() as client:
        app.state.http_client = client
        yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(repos_router)
app.include_router(analysis_router)

@app.get("/health")
async def health_check():
    return {"status": "ok"}
