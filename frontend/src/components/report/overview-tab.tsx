import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "@/components/ui/progress-bar"
import { getScoreLevel } from "@/lib/score-level"
import type { Report, ReportDimension, ReportNextStep } from "@/lib/types/report"

import { reportCopy } from "./copy"

const PRIORITY_TONE = {
  high: "warn",
  medium: "info",
  low: "neutral",
} as const

interface OverviewTabProps {
  report: Report
  onJumpTab: (id: string) => void
}

export function OverviewTab({ report, onJumpTab }: OverviewTabProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Dimension breakdown */}
      <div>
        <h3 className="text-sm text-muted-foreground font-medium mb-4">
          {reportCopy.overview.dimScores}
        </h3>
        <div
          className="grid gap-3.5"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
        >
          {report.dimensions.map((d) => (
            <DimensionSummaryCard
              key={d.id}
              dim={d}
              onJump={() => onJumpTab(d.id)}
            />
          ))}
        </div>
      </div>

      {/* Top 3 next steps */}
      <div>
        <h3 className="text-sm text-muted-foreground font-medium mb-4">
          {reportCopy.overview.nextH}
        </h3>
        <div
          className="grid gap-3.5"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
        >
          {report.nextSteps.map((step, i) => (
            <NextStepCardCompact key={i} step={step} idx={i + 1} />
          ))}
        </div>
      </div>
    </div>
  )
}

function DimensionSummaryCard({
  dim,
  onJump,
}: {
  dim: ReportDimension
  onJump: () => void
}) {
  const level = getScoreLevel(dim.score)

  return (
    <button
      onClick={onJump}
      className="text-left p-5 rounded-xl border border-border bg-card hover:border-border-strong transition-colors"
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-sm text-foreground font-medium">{dim.label}</span>
        <ArrowRight size={14} className="text-dim" />
      </div>
      <div className="flex items-baseline gap-1 mb-3.5">
        <span
          className="font-semibold text-strong"
          style={{ fontSize: 40, lineHeight: 0.95, letterSpacing: -1.6 }}
        >
          {dim.score}
        </span>
        <span className="mono text-dim text-xs">/100</span>
        <span className="ml-auto">
          <Badge tone="outline" size="sm">
            {level.label}
          </Badge>
        </span>
      </div>
      <ProgressBar value={dim.score} animated />
      <p className="text-muted-foreground text-xs leading-relaxed mt-3.5">
        {dim.tagline}
      </p>
    </button>
  )
}

function NextStepCardCompact({
  step,
  idx,
}: {
  step: ReportNextStep
  idx: number
}) {
  const tone = PRIORITY_TONE[step.priority]

  return (
    <div className="p-4.5 rounded-xl border border-border bg-card flex gap-4 items-start">
      <div
        className="mono font-semibold text-primary shrink-0"
        style={{ fontSize: 22, lineHeight: 1, width: 28 }}
      >
        {String(idx).padStart(2, "0")}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge tone={tone} size="sm">
            {reportCopy.nextSteps.priority}: {step.priority}
          </Badge>
        </div>
        <h4
          className="text-strong font-semibold"
          style={{ fontSize: 15, letterSpacing: -0.3 }}
        >
          {step.h}
        </h4>
      </div>
    </div>
  )
}
