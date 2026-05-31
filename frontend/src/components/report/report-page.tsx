"use client"

import { useState } from "react"
import { ArrowLeft, Code2, Download, Layers, LayoutGrid, Share2, Shield, Sparkles, Target } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Report } from "@/lib/types/report"

import { reportCopy } from "./copy"
import { DimensionTab } from "./dimension-tab"
import { NextStepsTab } from "./next-steps-tab"
import { OverviewTab } from "./overview-tab"
import { ReportHero } from "./report-hero"

type TabId = "overview" | "clean" | "patterns" | "system" | "practices" | "next"

interface TabDef {
  id: TabId
  label: string
  icon: LucideIcon
}

const TABS: TabDef[] = [
  { id: "overview", label: reportCopy.tabs.overview, icon: Target },
  { id: "clean", label: reportCopy.tabs.clean, icon: Code2 },
  { id: "patterns", label: reportCopy.tabs.patterns, icon: Layers },
  { id: "system", label: reportCopy.tabs.system, icon: LayoutGrid },
  { id: "practices", label: reportCopy.tabs.practices, icon: Shield },
  { id: "next", label: reportCopy.tabs.next, icon: Sparkles },
]

const DIM_TAB_IDS = new Set(["clean", "patterns", "system", "practices"])

interface ReportPageProps {
  report: Report
}

export function ReportPage({ report }: ReportPageProps) {
  const [tab, setTab] = useState<TabId>("overview")

  const activeDim = DIM_TAB_IDS.has(tab)
    ? report.dimensions.find((d) => d.id === tab)
    : undefined

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky nav */}
      <header
        className="sticky top-0 z-30 border-b border-border bg-background"
        style={{ top: 0 }}
      >
        <div
          className="mx-auto flex items-center justify-between px-8"
          style={{ maxWidth: 1200, padding: "14px 32px" }}
        >
          {/* Left: back + breadcrumb */}
          <div className="flex items-center gap-3.5">
            <Button variant="ghost" size="sm" icon={ArrowLeft} href="/dashboard">
              {reportCopy.back}
            </Button>
            <span className="text-faint">/</span>
            <div className="flex items-center gap-2">
              <span className="mono text-sm text-foreground">
                {report.owner}/{report.repo}
              </span>
              <span className="mono text-sm text-dim">· {report.commit}</span>
            </div>
          </div>

          {/* Right: share + export */}
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" icon={Share2}>
              {reportCopy.share}
            </Button>
            <Button variant="secondary" size="sm" icon={Download}>
              {reportCopy.exportPdf}
            </Button>
          </div>
        </div>
      </header>

      <main
        className="mx-auto px-8 pb-24"
        style={{ maxWidth: 1200, paddingTop: 48 }}
      >
        {/* Hero */}
        <ReportHero report={report} />

        {/* Tab bar */}
        <div
          className="sticky z-20 bg-background border-b border-border flex overflow-x-auto"
          style={{
            top: 57,
            marginTop: 48,
            marginBottom: 32,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {TABS.map((t) => {
            const Icon = t.icon
            const isActive = tab === t.id
            const dimScore =
              DIM_TAB_IDS.has(t.id)
                ? report.dimensions.find((d) => d.id === t.id)?.score
                : undefined

            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="flex items-center gap-2 whitespace-nowrap border-b-2 -mb-px transition-colors"
                style={{
                  padding: "14px 18px",
                  background: "transparent",
                  border: "none",
                  borderBottom: isActive
                    ? "2px solid var(--accent)"
                    : "2px solid transparent",
                  color: isActive ? "var(--text-strong)" : "var(--text-muted)",
                  fontSize: 13.5,
                  fontWeight: 500,
                  cursor: "pointer",
                  marginBottom: -1,
                }}
              >
                <Icon size={14} />
                {t.label}
                {dimScore !== undefined && (
                  <span
                    className="mono"
                    style={{
                      fontSize: 11,
                      color: isActive ? "var(--accent)" : "var(--text-dim)",
                      background: isActive
                        ? "var(--accent-soft)"
                        : "var(--surface-2)",
                      padding: "2px 6px",
                      borderRadius: 4,
                    }}
                  >
                    {dimScore}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Tab content */}
        {tab === "overview" && (
          <OverviewTab report={report} onJumpTab={(id) => setTab(id as TabId)} />
        )}
        {activeDim && <DimensionTab dim={activeDim} />}
        {tab === "next" && <NextStepsTab report={report} />}
      </main>
    </div>
  )
}
