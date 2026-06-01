import { apiFetch } from "./api"
import { getLanguageSnapshot } from "./i18n"

export interface AnalysisDimension {
  dimension: string
  score: number
  summary: string
  strengths: string[]
  issues: string[]
  recommendations: string[]
}

export interface AnalysisReport {
  id?: number
  owner: string
  repo: string
  overall_score: number
  summary: string
  top_strengths: string[]
  critical_issues: string[]
  next_steps: string[]
  dimensions: AnalysisDimension[]
  repo_metadata: {
    language: string | null
    languages: Record<string, number>
    stars: number
    forks: number
    description: string | null
    created_at: string
    updated_at: string
  }
  created_at?: string
}

export interface AnalysisHistoryItem {
  id: number
  owner: string
  repo: string
  overall_score: number
  summary: string
  created_at: string
}

export async function runAnalysis(owner: string, repo: string): Promise<AnalysisReport> {
  return apiFetch<AnalysisReport>("/analysis", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ owner, repo, language: getLanguageSnapshot() }),
  })
}

export async function getAnalysisHistory(): Promise<AnalysisHistoryItem[]> {
  return apiFetch<AnalysisHistoryItem[]>("/analysis/history")
}

export async function getAnalysisReportById(reportId: number): Promise<AnalysisReport> {
  return apiFetch<AnalysisReport>(`/analysis/history/${reportId}`)
}
