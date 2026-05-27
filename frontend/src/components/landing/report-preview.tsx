"use client"

import { Bolt, Check, Folder } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/ui/code-block"
import { ProgressBar } from "@/components/ui/progress-bar"

import { landingCopy } from "./copy"
import type { LandingReportPreview } from "./mock-report"

interface LandingReportPreviewSectionProps {
  report: LandingReportPreview
}

type PreviewTab = "overview" | "clean" | "patterns"

export function LandingReportPreviewSection({
  report,
}: LandingReportPreviewSectionProps) {
  const { preview } = landingCopy
  const [tab, setTab] = useState<PreviewTab>("overview")

  const tabs: { id: PreviewTab; label: string }[] = [
    { id: "overview", label: preview.tabs.overview },
    { id: "clean", label: preview.tabs.clean },
    { id: "patterns", label: preview.tabs.patterns },
  ]

  const activeDimension =
    report.dimensions.find((d) => d.id === tab) ?? report.dimensions[0]
  const repoPath = `${report.owner} / ${report.repo}`

  return (
    <section
      id="preview"
      className="border-t border-border bg-elev px-6 py-24 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-275">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-160">
            <p className="mono m-0 text-xs tracking-wide text-primary uppercase">
              {preview.eyebrow}
            </p>
            <h2 className="mt-3 text-balance text-3xl md:text-4xl font-semibold tracking-tight text-strong">
              {preview.heading}
            </h2>
            <p className="mt-3 text-3.75 leading-relaxed text-muted-foreground">
              {preview.sub}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 py-4">
            <div className="flex items-center gap-3">
              <Folder size={16} className="text-muted-foreground" />
              <div>
                <div className="mono text-3.25 text-foreground">{repoPath}</div>
                <div className="text-xs text-dim">{report.generatedAt}</div>
              </div>
            </div>
            <Badge tone="accent" icon={Check}>
              {preview.liveDemo}
            </Badge>
          </div>

          <div className="flex border-b border-border">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={[
                  "-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                  tab === item.id
                    ? "border-primary text-strong"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            className={[
              "grid gap-6 p-6",
              tab === "overview" ? "md:grid-cols-2" : "md:grid-cols-2",
            ].join(" ")}
          >
            {tab === "overview" ? (
              <>
                <div>
                  <div className="mono text-xs tracking-wide text-dim uppercase">
                    {preview.summary}
                  </div>
                  <p className="mt-3 text-pretty text-3.75 leading-relaxed text-foreground">
                    {preview.summaryBlurb}
                  </p>
                  <div className="mt-5 flex flex-col gap-3">
                    {report.dimensions.map((dim) => (
                      <div key={dim.id} className="flex items-center gap-3">
                        <span className="w-32.5 shrink-0 text-3.25 text-muted-foreground">
                          {dim.label}
                        </span>
                        <div className="min-w-0 flex-1">
                          <ProgressBar value={dim.score} animated />
                        </div>
                        <span className="mono w-7 shrink-0 text-right text-xs text-foreground">
                          {dim.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <CodeBlock
                  code={report.dimensions[0].snippet.code}
                  file={report.dimensions[0].snippet.file}
                  startLine={report.dimensions[0].snippet.startLine}
                  comment={report.dimensions[0].snippet.comment}
                />
              </>
            ) : (
              <>
                <div>
                  <p className="mt-0 text-sm leading-relaxed text-muted-foreground">
                    {activeDimension.tagline}
                  </p>
                  <div className="mt-4 flex flex-col gap-3">
                    {activeDimension.positives.map((item) => (
                      <div key={item.h} className="flex items-start gap-2.5">
                        <Check
                          size={14}
                          className="mt-0.5 shrink-0 text-primary"
                        />
                        <span className="text-sm text-foreground">
                          {item.h}
                        </span>
                      </div>
                    ))}
                    {activeDimension.improvements.map((item) => (
                      <div key={item.h} className="flex items-start gap-2.5">
                        <Bolt size={14} className="mt-0.5 shrink-0 text-warn" />
                        <span className="text-sm text-foreground">
                          {item.h}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <CodeBlock
                  code={activeDimension.snippet.code}
                  file={activeDimension.snippet.file}
                  startLine={activeDimension.snippet.startLine}
                  comment={activeDimension.snippet.comment}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
