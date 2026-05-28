export interface ReportSnippet {
  file: string
  startLine: number
  code: string
  comment?: string
}

export interface ReportPositive {
  h: string
  d: string
}

export interface ReportImprovement {
  h: string
  d: string
  severity: "warn" | "info"
}

export interface ReportDimension {
  id: string
  label: string
  score: number
  tagline: string
  positives: ReportPositive[]
  improvements: ReportImprovement[]
  snippet: ReportSnippet
}

export interface ReportNextStep {
  h: string
  d: string
  priority: "high" | "medium" | "low"
  effort: string
  impact: string
  dim: string
}

export interface Report {
  id: string
  owner: string
  repo: string
  branch: string
  commit: string
  files: number
  lines: number
  primaryLang: string
  durationSec: number
  generatedAt: string
  score: number
  prevScore?: number
  summary: string
  dimensions: ReportDimension[]
  nextSteps: ReportNextStep[]
}
