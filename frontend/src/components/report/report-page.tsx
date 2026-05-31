"use client"

import { useState } from "react"
import { Code2, Download, Layers, LayoutGrid, Share2, Shield, Sparkles, Target } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import { useCopy } from "@/lib/use-language"
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

const DIM_TAB_IDS = new Set(["clean", "patterns", "system", "practices"])

interface ReportPageProps {
  report: Report
}

export function ReportPage({ report }: ReportPageProps) {
  const copy = useCopy(reportCopy)
  const [tab, setTab] = useState<TabId>("overview")

  const TABS: TabDef[] = [
    { id: "overview", label: copy.tabs.overview, icon: Target },
    { id: "clean", label: copy.tabs.clean, icon: Code2 },
    { id: "patterns", label: copy.tabs.patterns, icon: Layers },
    { id: "system", label: copy.tabs.system, icon: LayoutGrid },
    { id: "practices", label: copy.tabs.practices, icon: Shield },
    { id: "next", label: copy.tabs.next, icon: Sparkles },
  ]

  const activeDim = DIM_TAB_IDS.has(tab)
    ? report.dimensions.find((d) => d.id === tab)
    : undefined

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        backHref="/dashboard"
        breadcrumb={`${report.owner}/${report.repo}`}
      />

      <main
        className="mx-auto px-8 pb-24"
        style={{ maxWidth: 1200, paddingTop: 48 }}
      >
        <div className="flex items-start justify-between gap-4 mb-8">
          <div className="flex-1 min-w-0">
            <ReportHero report={report} />
          </div>
          <div className="flex items-center gap-2 shrink-0 pt-1">
            <Button variant="secondary" size="sm" icon={Share2}>{copy.share}</Button>
            <Button variant="secondary" size="sm" icon={Download}>{copy.exportPdf}</Button>
          </div>
        </div>

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

        {tab === "overview" && <OverviewTab report={report} onJumpTab={(id) => setTab(id as TabId)} />}
        {activeDim && <DimensionTab dim={activeDim} />}
        {tab === "next" && <NextStepsTab report={report} />}
      </main>
    </div>
  )
}
