export type ScoreLevelKey = "junior" | "mid" | "senior" | "architect"

export interface ScoreLevel {
  key: ScoreLevelKey
  label: string
}

const LEVELS: ScoreLevel[] = [
  { key: "architect", label: "Architect" },
  { key: "senior", label: "Senior" },
  { key: "mid", label: "Intermediate" },
  { key: "junior", label: "Beginner" },
]

export function getScoreLevel(score: number): ScoreLevel {
  if (score >= 88) return LEVELS[0]
  if (score >= 75) return LEVELS[1]
  if (score >= 55) return LEVELS[2]
  return LEVELS[3]
}
