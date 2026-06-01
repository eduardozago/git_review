import type { AnalyzedRepo } from "@/lib/types/repo"

import { getAnalysisHistory, type AnalysisHistoryItem } from "./analysis"
import { langColor } from "./repos"
import { timeAgo } from "./utils"

export interface DashboardStats {
  reportsGenerated: number
  averageScore: number
  bestDimension: { score: number; label: string }
  daysAnalyzed: number
}

export interface DashboardData {
  analyzedRepos: AnalyzedRepo[]
  stats: DashboardStats
}

function mapHistoryToAnalyzedRepo(item: AnalysisHistoryItem): AnalyzedRepo {
  return {
    id: String(item.id),
    name: item.repo,
    full_name: `${item.owner}/${item.repo}`,
    url: `https://github.com/${item.owner}/${item.repo}`,
    description: item.summary,
    lang: "",
    langColor: langColor(null),
    stars: 0,
    forks: 0,
    sizeInKb: 0,
    score: item.overall_score,
    analyzed: true,
    analyzedAgo: timeAgo(item.created_at),
    updated: timeAgo(item.created_at),
    updatedISO: item.created_at,
  }
}

function getCurrentMonthCount(items: AnalysisHistoryItem[]): number {
  const now = new Date()
  const month = now.getMonth()
  const year = now.getFullYear()

  return items.filter((item) => {
    const date = new Date(item.created_at)
    return date.getMonth() === month && date.getFullYear() === year
  }).length
}

function buildStats(items: AnalysisHistoryItem[]): DashboardStats {
  const reportsGenerated = items.length
  const averageScore = reportsGenerated
    ? Math.round(items.reduce((sum, item) => sum + item.overall_score, 0) / reportsGenerated)
    : 0
  const bestScore = reportsGenerated
    ? Math.max(...items.map((item) => item.overall_score))
    : 0

  return {
    reportsGenerated,
    averageScore,
    bestDimension: { score: bestScore, label: "Overall" },
    daysAnalyzed: getCurrentMonthCount(items),
  }
}

export async function getDashboardData(): Promise<DashboardData> {
  const history = await getAnalysisHistory()
  const sorted = [...history].sort((a, b) => b.created_at.localeCompare(a.created_at))

  return {
    analyzedRepos: sorted.map(mapHistoryToAnalyzedRepo),
    stats: buildStats(sorted),
  }
}
