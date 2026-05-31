import logging
from dataclasses import dataclass, field

from httpx import AsyncClient

logger = logging.getLogger(__name__)

GITHUB_API_BASE = "https://api.github.com"
GITHUB_API_HEADERS = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
}


@dataclass
class RepoData:
    """Aggregated data collected from a GitHub repository."""

    owner: str
    name: str
    description: str | None = None
    language: str | None = None
    languages: dict[str, int] = field(default_factory=dict)
    stars: int = 0
    forks: int = 0
    open_issues: int = 0
    default_branch: str = "main"
    created_at: str = ""
    updated_at: str = ""
    readme_content: str = ""
    recent_commits: list[dict] = field(default_factory=list)
    pull_requests: list[dict] = field(default_factory=list)
    tree_structure: list[str] = field(default_factory=list)
    sample_files: dict[str, str] = field(default_factory=dict)


class GitHubDataCollector:
    """Fetches repository data from GitHub API for analysis."""

    def __init__(self, http_client: AsyncClient, access_token: str):
        self._client = http_client
        self._headers = {**GITHUB_API_HEADERS}
        if access_token:
            self._headers["Authorization"] = f"Bearer {access_token}"

    async def collect(self, owner: str, repo: str) -> RepoData:
        repo_info = await self._fetch_repo_info(owner, repo)
        data = RepoData(
            owner=owner,
            name=repo,
            description=repo_info.get("description"),
            language=repo_info.get("language"),
            stars=repo_info.get("stargazers_count", 0),
            forks=repo_info.get("forks_count", 0),
            open_issues=repo_info.get("open_issues_count", 0),
            default_branch=repo_info.get("default_branch", "main"),
            created_at=repo_info.get("created_at", ""),
            updated_at=repo_info.get("updated_at", ""),
        )

        # Fetch all data concurrently would be ideal but let's keep sequential
        # to avoid rate limit issues
        data.languages = await self._fetch_languages(owner, repo)
        data.readme_content = await self._fetch_readme(owner, repo)
        data.recent_commits = await self._fetch_recent_commits(owner, repo, data.default_branch)
        data.pull_requests = await self._fetch_pull_requests(owner, repo)
        data.tree_structure = await self._fetch_tree(owner, repo, data.default_branch)
        data.sample_files = await self._fetch_sample_files(owner, repo, data.default_branch, data.tree_structure)

        return data

    async def _fetch_repo_info(self, owner: str, repo: str) -> dict:
        resp = await self._client.get(
            f"{GITHUB_API_BASE}/repos/{owner}/{repo}",
            headers=self._headers,
        )
        resp.raise_for_status()
        return resp.json()

    async def _fetch_languages(self, owner: str, repo: str) -> dict[str, int]:
        resp = await self._client.get(
            f"{GITHUB_API_BASE}/repos/{owner}/{repo}/languages",
            headers=self._headers,
        )
        if resp.status_code != 200:
            return {}
        return resp.json()

    async def _fetch_readme(self, owner: str, repo: str) -> str:
        resp = await self._client.get(
            f"{GITHUB_API_BASE}/repos/{owner}/{repo}/readme",
            headers={**self._headers, "Accept": "application/vnd.github.raw+json"},
        )
        if resp.status_code != 200:
            return ""
        return resp.text[:5000]  # Limit to avoid huge payloads

    async def _fetch_recent_commits(self, owner: str, repo: str, branch: str) -> list[dict]:
        resp = await self._client.get(
            f"{GITHUB_API_BASE}/repos/{owner}/{repo}/commits",
            headers=self._headers,
            params={"sha": branch, "per_page": 30},
        )
        if resp.status_code != 200:
            return []
        commits = resp.json()
        return [
            {
                "sha": c["sha"][:7],
                "message": c["commit"]["message"][:200],
                "author": c["commit"]["author"]["name"],
                "date": c["commit"]["author"]["date"],
            }
            for c in commits
        ]

    async def _fetch_pull_requests(self, owner: str, repo: str) -> list[dict]:
        resp = await self._client.get(
            f"{GITHUB_API_BASE}/repos/{owner}/{repo}/pulls",
            headers=self._headers,
            params={"state": "all", "per_page": 20, "sort": "updated", "direction": "desc"},
        )
        if resp.status_code != 200:
            return []
        prs = resp.json()
        return [
            {
                "number": pr["number"],
                "title": pr["title"][:100],
                "state": pr["state"],
                "merged": pr.get("merged_at") is not None,
                "body": (pr.get("body") or "")[:300],
                "created_at": pr["created_at"],
                "labels": [l["name"] for l in pr.get("labels", [])],
            }
            for pr in prs
        ]

    async def _fetch_tree(self, owner: str, repo: str, branch: str) -> list[str]:
        resp = await self._client.get(
            f"{GITHUB_API_BASE}/repos/{owner}/{repo}/git/trees/{branch}",
            headers=self._headers,
            params={"recursive": "1"},
        )
        if resp.status_code != 200:
            return []
        tree = resp.json().get("tree", [])
        # Return paths only (limit to 200 entries to keep manageable)
        return [item["path"] for item in tree[:200] if item["type"] in ("blob", "tree")]

    async def _fetch_sample_files(
        self, owner: str, repo: str, branch: str, tree: list[str]
    ) -> dict[str, str]:
        """Fetch a few representative code files for quality analysis."""
        # Priority: main entry files, config files, source code
        priority_patterns = [
            "package.json", "pyproject.toml", "Cargo.toml", "go.mod",
            "Makefile", "Dockerfile", ".github/workflows",
        ]
        code_extensions = (".py", ".js", ".ts", ".jsx", ".tsx", ".go", ".rs", ".java", ".rb")

        files_to_fetch: list[str] = []

        # Add priority files
        for path in tree:
            for pattern in priority_patterns:
                if pattern in path and len(files_to_fetch) < 3:
                    files_to_fetch.append(path)

        # Add code files (pick a few diverse ones)
        code_files = [p for p in tree if any(p.endswith(ext) for ext in code_extensions)]
        for f in code_files[:5]:
            if f not in files_to_fetch:
                files_to_fetch.append(f)
            if len(files_to_fetch) >= 6:
                break

        # Fetch content
        result: dict[str, str] = {}
        for path in files_to_fetch:
            content = await self._fetch_file_content(owner, repo, branch, path)
            if content:
                result[path] = content

        return result

    async def _fetch_file_content(self, owner: str, repo: str, branch: str, path: str) -> str:
        resp = await self._client.get(
            f"{GITHUB_API_BASE}/repos/{owner}/{repo}/contents/{path}",
            headers={**self._headers, "Accept": "application/vnd.github.raw+json"},
            params={"ref": branch},
        )
        if resp.status_code != 200:
            return ""
        return resp.text[:3000]  # Limit file size
