# GitReview — Backend

FastAPI backend for the GitReview application. Handles GitHub OAuth authentication, user persistence, public repository listing, selection tracking, and AI-powered repository analysis.

## Requirements

- Python 3.12+
- Docker (for the database)

## Setup

### 1. Create the virtual environment

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Start the database

```bash
docker compose up -d
```

This starts a PostgreSQL 16 container on port **5432**.

### 4. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in the required values:

| Variable               | Description                                                     |
| ---------------------- | --------------------------------------------------------------- |
| `GITHUB_CLIENT_ID`     | From your GitHub OAuth App                                      |
| `GITHUB_CLIENT_SECRET` | From your GitHub OAuth App                                      |
| `GITHUB_REDIRECT_URI`  | Must match the callback URL registered on GitHub                |
| `DATABASE_URL`         | PostgreSQL connection string (`postgresql+asyncpg://...`)       |
| `JWT_SECRET_KEY`       | Random secret for signing session tokens                        |
| `JWT_ALGORITHM`        | JWT algorithm — `HS256`                                         |
| `JWT_EXPIRE_MINUTES`   | Session TTL in minutes — `10080` (7 days)                       |
| `FRONTEND_URL`         | URL of the Next.js frontend                                     |
| `COOKIE_SECURE`        | `False` locally, `True` in production (requires HTTPS)          |
| `OLLAMA_API_KEY`       | Ollama Cloud API key                                            |
| `LLM_BASE_URL`         | LLM provider base URL                                           |
| `LLM_MODEL`            | Model name (e.g. `gpt-oss:120b`)                                |
| `LLM_MAX_TOKENS`       | Max tokens per LLM response — `4096`                            |
| `LLM_TEMPERATURE`      | Sampling temperature — `0.3`                                    |

Generate a secure `JWT_SECRET_KEY`:

```bash
python3 -c "import secrets; print(secrets.token_hex(32))"
```

> All variables are required. The server will refuse to start if any are missing.

### 5. Create a GitHub OAuth App

You need a GitHub OAuth App to get the `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`.

1. Sign in to [github.com](https://github.com)
2. Go to **profile picture → Settings → Developer settings → OAuth Apps**
3. Click **New OAuth App** and fill in the form:

   | Field | Value |
   |---|---|
   | Application name | `GitReview` (or any name) |
   | Homepage URL | `http://localhost:3000` |
   | Authorization callback URL | `http://localhost:8000/auth/callback` |

4. Click **Register application**
5. Copy the **Client ID** — paste it into `GITHUB_CLIENT_ID` in `.env`
6. Click **Generate a new client secret** — copy it immediately (shown only once) and paste into `GITHUB_CLIENT_SECRET`

> If you lose the client secret, generate a new one from the same page. The old one is invalidated immediately.

**For production:** create a separate OAuth App with your production URLs. Never reuse the local dev app in production.

### 6. Run the server

```bash
uvicorn app.main:app --reload
```

Server runs at **http://localhost:8000**.  
All database tables are created automatically on first startup.

## Project Structure

```
app/
├── main.py                              ← app entry point, CORS, lifespan
├── core/
│   ├── config.py                        ← environment variable config (pydantic-settings)
│   ├── database.py                      ← async SQLAlchemy engine and session
│   ├── security.py                      ← JWT encoding/decoding, auth dependency
│   └── llm_client.py                    ← shared LLM client (Ollama Cloud)
├── models/
│   ├── user.py                          ← User database model
│   ├── repo_selection.py                ← RepoSelection database model
│   └── analysis_report.py              ← AnalysisReport database model (UUID PK, status, JSON fields)
├── services/
│   ├── auth_service.py                  ← GitHub OAuth logic
│   ├── github_service.py                ← paginated public repo fetch from GitHub API
│   ├── github_data_service.py           ← fetch READMEs, languages, commit stats per repo
│   ├── repo_selection_service.py        ← repo selection persistence
│   ├── analysis_pipeline.py             ← orchestrates the full analysis flow
│   └── analyzers/
│       ├── base.py                      ← base analyzer interface
│       ├── readme_analyzer.py           ← README quality scoring
│       ├── commit_analyzer.py           ← commit recency scoring
│       ├── code_quality_analyzer.py     ← code quality scoring
│       ├── pr_analyzer.py               ← PR/contribution scoring
│       └── project_structure_analyzer.py ← project structure scoring
└── api/routes/
    ├── auth.py                          ← auth endpoints
    ├── repos.py                         ← repo listing and selection endpoints
    └── analysis.py                      ← analysis creation and polling endpoints
```

## API

| Method | Path              | Auth | Description                                          |
| ------ | ----------------- | ---- | ---------------------------------------------------- |
| `GET`  | `/health`         |      | Health check                                         |
| `GET`  | `/auth/github`    |      | Starts GitHub OAuth flow                             |
| `GET`  | `/auth/callback`  |      | GitHub OAuth callback — sets session cookie          |
| `GET`  | `/auth/me`        | ✓    | Returns the authenticated user                       |
| `POST` | `/auth/logout`    | ✓    | Clears the session cookie (204)                      |
| `GET`  | `/repos`          | ✓    | Lists user's public repos from GitHub                |
| `POST` | `/repos/select`   | ✓    | Persists selected repo, returns record with id (201) |
| `POST` | `/analysis`       | ✓    | Creates analysis and kicks off the pipeline (201)    |
| `GET`  | `/analysis/{id}`  | ✓    | Polls analysis status and returns result when ready  |

Interactive docs available at **http://localhost:8000/docs** when the server is running.
