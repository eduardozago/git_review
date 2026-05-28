export interface RepoSummary {
  id: string
  name: string
  description: string
  lang: string
  langColor: string
  stars: number
  forks: number
  files: number
  score: number | null
  analyzed: boolean
  analyzedAgo?: string
  updated: string
  updatedISO: string
}

export interface AnalyzedRepo extends RepoSummary {
  score: number
  analyzedAgo: string
}
