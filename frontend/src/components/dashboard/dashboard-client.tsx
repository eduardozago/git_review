"use client"

import { useEffect, useState } from "react"

import { getMe } from "@/lib/auth"
import { getDashboardData, type DashboardData } from "@/lib/dashboard"
import { useCopy } from "@/lib/use-language"
import type { User } from "@/lib/types/user"
import { PageHeader } from "@/components/ui/page-header"

import { LatestReportCard } from "./latest-report-card"
import { RecentAnalyses } from "./recent-analyses"
import { SectionHeader } from "./section-header"
import { StatsStrip } from "./stats-strip"
import { dashboardCopy } from "./copy"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardClient() {
  const [user, setUser] = useState<User | null>(null)
  const [data, setData] = useState<DashboardData | null>(null)
  const copy = useCopy(dashboardCopy)

  useEffect(() => {
    getMe().then(setUser).catch(() => { })
    getDashboardData().then(setData).catch(() => {
      setData({
        analyzedRepos: [],
        stats: {
          reportsGenerated: 0,
          averageScore: 0,
          bestDimension: { score: 0, label: "Overall" },
          daysAnalyzed: 0,
        },
      })
    })
  }, [])

  if (!user || !data) return null

  const { analyzedRepos, stats } = data
  const latest = analyzedRepos[0]
  const recent = analyzedRepos.slice(1)

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        breadcrumb={user.login}
        actions={
          <Button variant="secondary" size="sm" href="/repos">
            <Plus size={16} />
            {copy.newAnalysis}
          </Button>
        }
      />

      <main className="mx-auto max-w-300 px-6 py-10 pb-20 md:px-8">
        <div className="mb-8">
          <p className="mono m-0 text-xs tracking-wide text-dim uppercase">
            {copy.greeting}
          </p>
          <h1 className="mt-2 text-8 font-semibold tracking-tight text-strong">
            {user.name ?? user.login}{" "}
            <span className="font-normal text-dim">· @{user.login}</span>
          </h1>
        </div>

        <StatsStrip stats={stats} />

        {latest && (
          <section className="mb-10">
            <SectionHeader title={copy.latestReport} />
            <LatestReportCard repo={latest} />
          </section>
        )}

        <RecentAnalyses repos={recent} />
      </main>
    </div>
  )
}
