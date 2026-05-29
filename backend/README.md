# GitReview — Backend

FastAPI backend for the GitReview application. Handles GitHub OAuth authentication, user persistence, and (upcoming) AI-powered repository analysis.

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

| Variable               | Description                                            |
| ---------------------- | ------------------------------------------------------ |
| `GITHUB_CLIENT_ID`     | From your GitHub OAuth App                             |
| `GITHUB_CLIENT_SECRET` | From your GitHub OAuth App                             |
| `GITHUB_REDIRECT_URI`  | Must match the callback URL registered on GitHub       |
| `DATABASE_URL`         | PostgreSQL connection string                           |
| `JWT_SECRET_KEY`       | Random secret for signing session tokens               |
| `FRONTEND_URL`         | URL of the Next.js frontend                            |
| `COOKIE_SECURE`        | `False` locally, `True` in production (requires HTTPS) |

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
The `users` table is created automatically on first startup.

## Project Structure

```
app/
├── main.py              ← app entry point, CORS, lifespan
├── core/
│   ├── config.py        ← environment variable config (pydantic-settings)
│   ├── database.py      ← async SQLAlchemy engine and session
│   └── security.py      ← JWT encoding/decoding, auth dependency
├── models/
│   └── user.py          ← User database model
├── services/
│   └── auth_service.py  ← GitHub OAuth logic
└── api/routes/
    └── auth.py          ← auth endpoints
```

## API

| Method | Path             | Description                    |
| ------ | ---------------- | ------------------------------ |
| `GET`  | `/health`        | Health check                   |
| `GET`  | `/auth/github`   | Starts GitHub OAuth flow       |
| `GET`  | `/auth/callback` | GitHub OAuth callback          |
| `GET`  | `/auth/me`       | Returns the authenticated user |
| `POST` | `/auth/logout`   | Clears the session cookie      |

Interactive docs available at **http://localhost:8000/docs** when the server is running.
