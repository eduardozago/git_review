import type { RepoSummary } from "@/lib/types/repo"

export type RepoSort = "recent" | "stars" | "az"

export function filterAndSortRepos(
  repos: RepoSummary[],
  query: string,
  langFilter: string,
  sort: RepoSort
): RepoSummary[] {
  const normalizedQuery = query.trim().toLowerCase()

  let filtered = repos.filter((repo) => {
    if (langFilter !== "all" && repo.lang !== langFilter) return false
    if (!normalizedQuery) return true
    return (
      repo.name.toLowerCase().includes(normalizedQuery) ||
      repo.description.toLowerCase().includes(normalizedQuery)
    )
  })

  filtered = [...filtered].sort((a, b) => {
    if (sort === "stars") return b.stars - a.stars
    if (sort === "az") return a.name.localeCompare(b.name)
    return b.updatedISO.localeCompare(a.updatedISO)
  })

  return filtered
}

export function getRepoLanguages(repos: RepoSummary[]): string[] {
  return [...new Set(repos.map((repo) => repo.lang))].sort()
}
