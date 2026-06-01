from httpx import AsyncClient, HTTPStatusError
from pydantic import BaseModel

GITHUB_API_BASE = "https://api.github.com"
GITHUB_API_HEADERS = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
}
MAX_PAGES = 10  # Max 1000 repos to prevent memory exhaustion

class RepoOut(BaseModel):
    name: str
    full_name: str
    description: str | None
    url: str
    language: str | None
    stars: int
    forks: int
    pushed_at: str | None
    created_at: str
    has_readme: bool | None = None
    topics: list[str]
    size: int

class GitHubAPIError(Exception):
    """Raised when GitHub API returns an error."""
    def __init__(self, message: str, status_code: int | None = None):
        super().__init__(message)
        self.status_code = status_code

async def get_user_repos(access_token: str, client: AsyncClient) -> list[RepoOut]:
    headers = {**GITHUB_API_HEADERS, "Authorization": f"Bearer {access_token}"}
    repos: list[RepoOut] = []
    page = 1

    while page <= MAX_PAGES:
        response = await client.get(
            f"{GITHUB_API_BASE}/user/repos",
            headers=headers,
            params={
                "visibility": "public",
                "affiliation": "owner",
                "sort": "pushed",
                "per_page": 100,
                "page": page,
            },
        )

        try:
            response.raise_for_status()
        except HTTPStatusError as e:
            status_code = e.response.status_code
            if status_code == 401:
                raise GitHubAPIError("GitHub token expired or invalid", 401)
            elif status_code == 403:
                raise GitHubAPIError("GitHub API rate limit exceeded", 403)
            elif status_code == 502:
                raise GitHubAPIError("GitHub API unavailable", 502)
            else:
                raise GitHubAPIError(f"GitHub API error: {status_code}", status_code)

        data = response.json()

        if not data:
            break

        for repo in data:
            if repo.get("fork") or repo.get("archived"):
                continue
            repos.append(
                RepoOut(
                    name=repo["name"],
                    full_name=repo["full_name"],
                    description=repo.get("description"),
                    url=repo["html_url"],
                    language=repo.get("language"),
                    stars=repo["stargazers_count"],
                    forks=repo["forks_count"],
                    pushed_at=repo.get("pushed_at"),
                    created_at=repo["created_at"],
                    has_readme=None,
                    topics=repo.get("topics") or [],
                    size=repo["size"],
                )
            )

        if len(data) < 100:
            break

        page += 1

    return sorted(repos, key=lambda r: r.pushed_at or "", reverse=True)
