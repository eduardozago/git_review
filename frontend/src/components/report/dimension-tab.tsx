"use client"

import { Check, Zap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/ui/code-block"
import { ProgressBar } from "@/components/ui/progress-bar"
import { getScoreLevel } from "@/lib/score-level"
import { useCopy } from "@/lib/use-language"
import type { ReportDimension, ReportImprovement, ReportPositive } from "@/lib/types/report"

import { reportCopy } from "./copy"

const LEVEL_TONE = { architect: "plum", senior: "accent", mid: "accent", junior: "warn" } as const

interface DimensionTabProps {
  dim: ReportDimension
}

export function DimensionTab({ dim }: DimensionTabProps) {
  const copy = useCopy(reportCopy)
  const level = getScoreLevel(dim.score)
  const tone = LEVEL_TONE[level.key]

  return (
    <div className="grid gap-10 items-start" style={{ gridTemplateColumns: "minmax(0, 1fr) minmax(360px, 1.2fr)" }}>
      <div className="flex flex-col gap-7">
        <div>
          <h2 className="text-strong font-semibold" style={{ fontSize: 28, letterSpacing: -0.8, margin: 0 }}>{dim.label}</h2>
          <p className="text-muted-foreground leading-relaxed mt-2.5" style={{ fontSize: 15 }}>{dim.tagline}</p>
          <div className="flex items-baseline gap-1.5 mt-5">
            <span className="font-semibold text-strong" style={{ fontSize: 64, lineHeight: 1, letterSpacing: -2.5 }}>{dim.score}</span>
            <span className="mono text-dim text-sm">/100</span>
            <span className="ml-3"><Badge tone={tone} size="lg">{level.label}</Badge></span>
          </div>
          <div className="mt-4"><ProgressBar value={dim.score} animated height={6} /></div>
        </div>
        <PositivesList items={dim.positives} label={copy.dimension.positives} />
        <ImprovementsList items={dim.improvements} label={copy.dimension.improvements} />
      </div>

      <div>
        <h3 className="text-sm text-muted-foreground font-medium mb-3.5">{copy.dimension.evidence}</h3>
        <CodeBlock code={dim.snippet.code} file={dim.snippet.file} startLine={dim.snippet.startLine} comment={dim.snippet.comment} />
        <div className="mt-3.5">
          <Button variant="ghost" size="sm">
            {copy.dimension.openFile} · {dim.snippet.file.split("/").pop()}
          </Button>
        </div>
      </div>
    </div>
  )
}

function PositivesList({ items, label }: { items: ReportPositive[]; label: string }) {
  return (
    <div>
      <h3 className="text-sm text-muted-foreground font-medium mb-3.5 flex items-center gap-2">
        <Check size={14} className="text-primary" />{label}
      </h3>
      <div className="flex flex-col gap-3">
        {items.map((p, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-start gap-2.5">
              <Check size={14} className="shrink-0 mt-0.5 text-primary" />
              <div>
                <div className="text-sm text-strong font-medium">{p.h}</div>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{p.d}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ImprovementsList({ items, label }: { items: ReportImprovement[]; label: string }) {
  return (
    <div>
      <h3 className="text-sm text-muted-foreground font-medium mb-3.5 flex items-center gap-2">
        <Zap size={14} className="text-warn" />{label}
      </h3>
      <div className="flex flex-col gap-3">
        {items.map((imp, i) => {
          const iconColor = imp.severity === "warn" ? "text-warn" : "text-info"
          const badgeTone = imp.severity === "warn" ? "warn" : "info"
          return (
            <div key={i} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-start gap-2.5">
                <Zap size={14} className={`shrink-0 mt-0.5 ${iconColor}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm text-strong font-medium">{imp.h}</div>
                    <Badge tone={badgeTone} size="sm" className="shrink-0">{imp.severity}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{imp.d}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
