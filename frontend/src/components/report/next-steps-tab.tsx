"use client"

import { Badge } from "@/components/ui/badge"
import { useCopy } from "@/lib/use-language"
import type { Report, ReportNextStep } from "@/lib/types/report"

import { reportCopy } from "./copy"

const PRIORITY_TONE = { high: "warn", medium: "info", low: "neutral" } as const

interface NextStepsTabProps {
  report: Report
}

export function NextStepsTab({ report }: NextStepsTabProps) {
  const copy = useCopy(reportCopy)

  return (
    <div style={{ maxWidth: 880 }}>
      <p className="text-muted-foreground leading-relaxed mt-0 mb-8" style={{ fontSize: 16, maxWidth: 640 }}>
        {copy.nextSteps.blurb}
      </p>
      <div className="flex flex-col gap-4.5">
        {report.nextSteps.map((step, i) => (
          <NextStepCard key={i} step={step} idx={i + 1} copy={copy.nextSteps} />
        ))}
      </div>
    </div>
  )
}

function NextStepCard({ step, idx, copy }: { step: ReportNextStep; idx: number; copy: { priority: string; effort: string; impact: string } }) {
  const tone = PRIORITY_TONE[step.priority]

  return (
    <div className="p-6 rounded-xl border border-border bg-card">
      <div className="flex items-start gap-4">
        <div className="mono font-semibold text-primary shrink-0" style={{ fontSize: 32, lineHeight: 1, width: 44 }}>
          {String(idx).padStart(2, "0")}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge tone={tone} size="sm">{copy.priority}: {step.priority}</Badge>
            <Badge tone="outline" size="sm">{copy.effort}: {step.effort}</Badge>
            <Badge tone="outline" size="sm">{copy.impact}: {step.impact}</Badge>
          </div>
          <h4 className="text-strong font-semibold" style={{ fontSize: 18, letterSpacing: -0.3, margin: 0 }}>{step.h}</h4>
          <p className="text-sm text-muted-foreground mt-2.5 leading-relaxed">{step.d}</p>
        </div>
      </div>
    </div>
  )
}
