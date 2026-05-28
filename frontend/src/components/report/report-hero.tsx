import { Code2, FileText, GitBranch, Timer } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "@/components/ui/progress-bar"
import { getScoreLevel } from "@/lib/score-level"
import type { Report, ReportDimension } from "@/lib/types/report"

import { reportCopy } from "./copy"
import { Gauge } from "./gauge"

const LEVEL_TONE = {
  architect: "plum",
  senior: "accent",
  mid: "accent",
  junior: "warn",
} as const

interface ReportHeroProps {
  report: Report
}

export function ReportHero({ report }: ReportHeroProps) {
  const level = getScoreLevel(report.score)
  const tone = LEVEL_TONE[level.key]
  const delta =
    report.prevScore != null ? report.score - report.prevScore : null

  return (
    <div>
      {/* Meta strip */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground mb-6">
        <span className="flex items-center gap-1.5">
          <GitBranch size={13} />
          {report.branch} {reportCopy.branchLabel}
        </span>
        <span className="flex items-center gap-1.5">
          <FileText size={13} />
          {report.files} {reportCopy.filesLabel} · {report.lines.toLocaleString()} loc
        </span>
        <span className="flex items-center gap-1.5">
          <Code2 size={13} />
          {report.primaryLang} {reportCopy.langLabel}
        </span>
        <span className="flex items-center gap-1.5">
          <Timer size={13} />
          {report.durationSec}s
        </span>
        <span className="mono text-dim">· {report.generatedAt}</span>
      </div>

      {/* 2-col grid: score display | summary + dimension rows */}
      <div
        className="grid gap-12 items-center"
        style={{ gridTemplateColumns: "minmax(280px, 1fr) minmax(360px, 1.4fr)" }}
      >
        {/* Left: ScoreDisplay "mix" variant */}
        <div className="flex items-center gap-7">
          <Gauge value={report.score} size={180} />
          <div>
            <div
              className="mono text-dim uppercase"
              style={{ fontSize: 11, letterSpacing: 1 }}
            >
              {reportCopy.scoreLabel}
            </div>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span
                className="font-semibold text-strong"
                style={{ fontSize: 64, lineHeight: 1, letterSpacing: -2.5 }}
              >
                {report.score}
              </span>
              <span className="mono text-dim text-sm">/100</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-3.5">
              <Badge tone={tone} size="lg">
                {level.label}
              </Badge>
              {delta != null && (
                <Badge tone="outline">
                  <span className="mono">
                    {delta >= 0 ? "+" : ""}
                    {delta} vs last
                  </span>
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Right: summary text + dimension rows */}
        <div>
          <div
            className="mono text-dim uppercase mb-3"
            style={{ fontSize: 11, letterSpacing: 1 }}
          >
            {reportCopy.summaryLabel}
          </div>
          <p
            className="text-foreground leading-relaxed mb-7"
            style={{ fontSize: 18, letterSpacing: -0.2 }}
          >
            {report.summary}
          </p>
          <div className="flex flex-col gap-3.5">
            {report.dimensions.map((d) => (
              <DimensionRow key={d.id} dim={d} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DimensionRow({ dim }: { dim: ReportDimension }) {
  return (
    <div className="flex items-center gap-3.5">
      <span className="text-sm text-foreground shrink-0" style={{ width: 130 }}>
        {dim.label}
      </span>
      <div className="flex-1">
        <ProgressBar value={dim.score} animated />
      </div>
      <span className="mono text-sm text-muted-foreground text-right shrink-0 w-9">
        {dim.score}
      </span>
    </div>
  )
}
