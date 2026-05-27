import { ArrowRight, File, Folder, Star, Timer } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getScoreLevel } from "@/lib/score-level"
import type { AnalyzedRepo } from "@/lib/types/repo"

import { dashboardCopy } from "./copy"

interface LatestReportCardProps {
  repo: AnalyzedRepo
}

export function LatestReportCard({ repo }: LatestReportCardProps) {
  const level = getScoreLevel(repo.score)
  const levelLabel = dashboardCopy.levels[level.key]

  return (
    <Card className="gap-0 overflow-hidden p-0">
      <div className="grid min-h-[200px] md:grid-cols-[260px_1fr]">
        <div className="flex flex-col justify-between border-b border-border bg-elev p-7 md:border-r md:border-b-0">
          <div className="mono text-[11px] tracking-wide text-dim uppercase">
            {dashboardCopy.overallScore}
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-[88px] leading-[0.95] font-semibold tracking-[-0.08em] text-strong">
                {repo.score}
              </span>
              <span className="mono text-sm text-dim">/100</span>
            </div>
            <div className="mt-2.5">
              <Badge tone="accent">{levelLabel}</Badge>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between p-7">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2.5">
              <Folder size={14} className="text-muted-foreground" />
              <span className="mono text-[13px] text-foreground">
                {repo.name}
              </span>
              <Badge tone="outline" size="sm">
                {repo.lang}
              </Badge>
            </div>
            <p className="mt-2 max-w-[520px] text-sm leading-relaxed text-muted-foreground">
              {repo.description}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs text-dim">
              <span className="flex items-center gap-1.5">
                <File size={12} />
                {repo.files} {dashboardCopy.files}
              </span>
              {repo.analyzedAgo && (
                <span className="flex items-center gap-1.5">
                  <Timer size={12} />
                  {repo.analyzedAgo}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Star size={12} />
                {repo.stars}
              </span>
            </div>
            <Button variant="primary" size="sm" href={`/report/${repo.id}`}>
              {dashboardCopy.openReport}
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
