import type { AnalyzedRepo } from "@/lib/types/repo"
import type { User } from "@/lib/types/user"

import { getMockRepos } from "./repos"

export interface DashboardStats {
  reportsGenerated: number
  averageScore: number
  bestDimension: { score: number; label: string }
  daysAnalyzed: number
}

export interface DashboardData {
  user: User
  analyzedRepos: AnalyzedRepo[]
  stats: DashboardStats
}

const mockUser: User = {
  username: "gabriellopessdev",
  name: "Gabriel Lopes",
  bio: "Full-stack dev. TypeScript, Python, building things.",
  followers: 47,
  following: 132,
  publicRepos: 24,
}

function buildStats(repos: AnalyzedRepo[]): DashboardStats {
  const averageScore = Math.round(
    repos.reduce((sum, repo) => sum + repo.score, 0) / repos.length
  )

  return {
    reportsGenerated: repos.length,
    averageScore,
    bestDimension: { score: 78, label: "Clean Code" },
    daysAnalyzed: 12,
  }
}

function getAnalyzedRepos(): AnalyzedRepo[] {
  return getMockRepos()
    .filter(
      (repo): repo is AnalyzedRepo =>
        repo.analyzed && repo.score !== null && repo.analyzedAgo !== undefined
    )
    .sort((a, b) => b.updatedISO.localeCompare(a.updatedISO))
}

export function getDashboardData(): DashboardData {
  const analyzedRepos = getAnalyzedRepos()

  return {
    user: mockUser,
    analyzedRepos,
    stats: buildStats(analyzedRepos),
  }
}
