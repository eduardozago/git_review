import { apiFetch } from "./api"
import type { ApiRepo, RepoSummary, ReposResponse } from "./types/repo"
import { timeAgo } from "./utils"

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  "C#": "#178600",
  "C++": "#f34b7d",
  C: "#555555",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  Svelte: "#ff3e00",
}

export function langColor(language: string | null): string {
  return (language && LANG_COLORS[language]) || "#8b949e"
}

export function mapApiRepo(repo: ApiRepo): RepoSummary {
  return {
    id: repo.name,
    name: repo.name,
    full_name: repo.full_name,
    url: repo.url,
    description: repo.description ?? "",
    lang: repo.language ?? "",
    langColor: langColor(repo.language),
    stars: repo.stars,
    forks: repo.forks,
    sizeInKb: repo.size,
    score: null,
    analyzed: false,
    updated: timeAgo(repo.pushed_at),
    updatedISO: repo.pushed_at,
  }
}

export interface RepoSelectionOut {
  id: number
  repo_name: string
  repo_full_name: string
  repo_url: string
  language: string | null
  created_at: string
}

export async function getRepos(): Promise<RepoSummary[]> {
  const data = await apiFetch<ReposResponse>("/repos")
  return data.repos.map(mapApiRepo)
}

export async function selectRepo(repo: RepoSummary): Promise<RepoSelectionOut> {
  return apiFetch<RepoSelectionOut>("/repos/select", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      repo_name: repo.name,
      repo_full_name: repo.full_name,
      repo_url: repo.url,
      language: repo.lang || null,
    }),
  })
}
