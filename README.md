# GitReview

AI-powered GitHub portfolio auditor. Authenticate with GitHub, select your public repositories, and get a structured audit from a recruiter's perspective — with scores, strengths, critical issues, and actionable per-repo recommendations.

Built for developers in career transition who want honest feedback before sending their GitHub to a recruiter.

**Live app:** _coming soon_

---

## Features

- **GitHub OAuth login** — secure sign-in, no password required
- **Repository browser** — filter by language, sort by recency/stars/name, full-text search
- **AI-powered analysis** — powered by Claude API; evaluates your portfolio across five pillars:
  - `readme_quality` — do your repos have READMEs? are they well-written?
  - `project_diversity` — variety of languages, domains, and project types
  - `commit_recency` — recent activity and consistency over time
  - `profile_presentation` — bio, avatar, pinned repos, and topics
  - `career_narrative` — does the portfolio tell a coherent story?
- **Scored report** — overall score (0–100) plus per-pillar breakdown, top strengths, critical issues, and priority tags (`high_impact`, `quick_win`, `good_shape`) on each repo

---

## Stack

| Layer    | Tech                                                    |
| -------- | ------------------------------------------------------- |
| Backend  | FastAPI · Python 3.12 · SQLAlchemy (async) · PostgreSQL |
| Frontend | Next.js 16 · TypeScript · Tailwind CSS · shadcn/ui      |
| Auth     | GitHub OAuth 2.0 · JWT (httpOnly cookie)                |
| AI       | Ollama Cloud API (`gpt-oss:120b`)                       |
| HTTP     | httpx (async, shared client)                            |

---

## Project Structure

```
/
├── backend/    FastAPI application
├── frontend/   Next.js application
└── SUMMARY.md  Full domain specification
```

---

## Getting Started

### Prerequisites

- Python 3.12+
- Node.js 18+
- Docker (for PostgreSQL)
- A GitHub OAuth App ([create one here](https://github.com/settings/developers))
- An Ollama Cloud API key

### Backend

```bash
cd backend

# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start PostgreSQL
docker compose up -d

# Configure environment
cp .env.example .env
# Fill in: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, JWT_SECRET_KEY, ANTHROPIC_API_KEY
```

#### Backend environment variables (`.env`)

| Variable               | Description                                                     |
| ---------------------- | --------------------------------------------------------------- |
| `GITHUB_CLIENT_ID`     | GitHub OAuth App client ID                                      |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth App client secret                                  |
| `GITHUB_REDIRECT_URI`  | OAuth callback URL (e.g. `http://localhost:8000/auth/callback`) |
| `DATABASE_URL`         | PostgreSQL connection string (`postgresql+asyncpg://...`)       |
| `JWT_SECRET_KEY`       | Secret key for signing session JWTs (`secrets.token_hex(32)`)   |
| `JWT_ALGORITHM`        | JWT algorithm — `HS256`                                         |
| `JWT_EXPIRE_MINUTES`   | Session TTL in minutes — `10080` (7 days)                       |
| `FRONTEND_URL`         | Frontend origin for CORS + OAuth redirects                      |
| `COOKIE_SECURE`        | `False` locally, `True` in production (requires HTTPS)          |
| `OLLAMA_API_KEY`       | Ollama Cloud API key                                            |
| `LLM_BASE_URL`         | LLM provider base URL                                           |
| `LLM_MODEL`            | Model name (e.g. `gpt-oss:120b`)                                |
| `LLM_MAX_TOKENS`       | Max tokens per LLM response — `4096`                            |
| `LLM_TEMPERATURE`      | Sampling temperature — `0.3`                                    |

```bash
# Run the development server
uvicorn app.main:app --reload
# API: http://localhost:8000
# Swagger UI: http://localhost:8000/docs
```

### Frontend

```bash
cd frontend

npm install

# Configure environment
cp .env.example .env
# Set NEXT_PUBLIC_API_URL=http://localhost:8000

npm run dev
# → http://localhost:3000
```

#### Frontend environment variables (`.env`)

| Variable              | Description      |
| --------------------- | ---------------- |
| `NEXT_PUBLIC_API_URL` | Backend base URL |

---

## API Overview

```
GET  /auth/github        → Redirect to GitHub OAuth
GET  /auth/callback      → Handle OAuth callback, set session cookie
GET  /auth/me            → Return current authenticated user
POST /auth/logout        → Clear session cookie

GET  /repos              → List authenticated user's public repos
POST /repos/select       → Persist repo selection, initiate analysis

POST /analysis           → Create and kick off analysis pipeline
GET  /analysis/{id}      → Poll analysis status and retrieve result
```

---

## Authors

**Eduardo Zago** · **Gabriel Lopes** · **João Vitor Araújo**
