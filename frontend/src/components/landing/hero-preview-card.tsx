import { Check, Eye, Folder } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "@/components/ui/progress-bar"

import { landingCopy } from "./copy"
import type { LandingReportPreview } from "@/lib/mock/mock-report"

interface HeroPreviewCardProps {
  report: LandingReportPreview
}

export function HeroPreviewCard({ report }: HeroPreviewCardProps) {
  const { report: reportCopy } = landingCopy
  const repoPath = `${report.owner} / ${report.repo}`

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-pop">
      <div className="flex items-center gap-2.5 border-b border-border bg-elev px-4 py-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full bg-faint" />
          ))}
        </div>
        <div className="mono flex-1 text-center text-xs text-muted-foreground">
          gitreview.dev/{report.owner}/{report.repo}
        </div>
        <Eye size={14} className="text-dim" />
      </div>

      <div className="grid items-center gap-8 p-7 md:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Folder size={14} className="text-muted-foreground" />
            <span className="mono text-3.25 text-muted-foreground">
              {repoPath}
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl sm:text-7xl lg:text-9xl font-semibold leading-none tracking-tighter text-strong">
              {report.score}
            </span>
            <span className="mono text-sm text-dim">/ 100</span>
          </div>
          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <Badge tone="accent" icon={Check} size="lg">
              {reportCopy.level}
            </Badge>
            <Badge tone="outline" size="lg">
              <span className="mono text-2.75">{reportCopy.delta}</span>
            </Badge>
          </div>
        </div>

        <div className="flex flex-col gap-3.5">
          {report.dimensions.map((dim) => (
            <div key={dim.id}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-3.25 text-foreground">{dim.label}</span>
                <span className="mono text-xs text-muted-foreground">
                  {dim.score}
                </span>
              </div>
              <ProgressBar value={dim.score} animated />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
