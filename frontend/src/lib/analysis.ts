import { apiFetch } from "./api"

export interface AnalysisDimension {
  dimension: string
  score: number
  summary: string
  strengths: string[]
  issues: string[]
  recommendations: string[]
}

export interface AnalysisReport {
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
}

export async function runAnalysis(owner: string, repo: string): Promise<AnalysisReport> {
  return apiFetch<AnalysisReport>("/analysis", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ owner, repo }),
  })
}
