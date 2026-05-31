"use client"

import Link from "next/link"
import { Folder } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ProgressBar } from "@/components/ui/progress-bar"
import { getScoreLevel } from "@/lib/score-level"
import { useCopy } from "@/lib/use-language"
import type { AnalyzedRepo } from "@/lib/types/repo"

import { dashboardCopy } from "./copy"
import { LangPill } from "./lang-pill"

interface RecentRepoCardProps {
  repo: AnalyzedRepo
}

export function RecentRepoCard({ repo }: RecentRepoCardProps) {
  const copy = useCopy(dashboardCopy)
  const level = getScoreLevel(repo.score)
  const levelLabel = copy.levels[level.key]

  return (
    <Link href={`/report/${repo.id}`} className="block">
      <Card hoverable className="gap-0 p-4.5">
        <div className="mb-3.5 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <Folder size={14} className="shrink-0 text-dim" />
            <span className="mono truncate text-3.25 text-foreground">{repo.name}</span>
          </div>
          <Badge tone="outline" size="sm">{levelLabel}</Badge>
        </div>

        <div className="mb-4 flex items-baseline gap-1">
          <span className="text-9 leading-[0.95] font-semibold tracking-tighter text-strong">{repo.score}</span>
          <span className="mono text-xs text-dim">/100</span>
        </div>

        <ProgressBar value={repo.score} animated />

        <div className="mt-3.5 flex items-center justify-between gap-2 text-xs text-dim">
          <LangPill name={repo.lang} color={repo.langColor} />
          {repo.analyzedAgo && <span>{repo.analyzedAgo}</span>}
        </div>
      </Card>
    </Link>
  )
}
