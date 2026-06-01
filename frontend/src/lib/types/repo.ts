export interface RepoSummary {
  id: string
  name: string
  full_name: string
  url: string
  description: string
  lang: string
  langColor: string
  stars: number
  forks: number
  sizeInKb: number
  score: number | null
  analyzed: boolean
  analyzedAgo?: string
  updated: string
  updatedISO: string
}

export interface AnalyzedRepo extends RepoSummary {
  score: number
  files?: number
  analyzedAgo: string
}

export interface ApiRepo {
  name: string
  full_name: string
  description: string | null
  url: string
  language: string | null
  stars: number
  forks: number
  pushed_at: string
  created_at: string
  has_readme: boolean | null
  topics: string[]
  size: number
}

export interface ReposResponse {
  repos: ApiRepo[]
  total: number
}
