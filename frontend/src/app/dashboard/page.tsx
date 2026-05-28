import type { Metadata } from "next"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { dashboardCopy } from "@/components/dashboard/copy"
import { LatestReportCard } from "@/components/dashboard/latest-report-card"
import { RecentAnalyses } from "@/components/dashboard/recent-analyses"
import { SectionHeader } from "@/components/dashboard/section-header"
import { StatsStrip } from "@/components/dashboard/stats-strip"
import { getDashboardData } from "@/lib/mock/dashboard"

export const metadata: Metadata = {
  title: "Dashboard — GitReview",
  description: "Your recent repository analyses and scores.",
}

export default function DashboardPage() {
  const { user, analyzedRepos, stats } = getDashboardData()
  const latest = analyzedRepos[0]
  const recent = analyzedRepos.slice(1)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader username={user.username} />

      <main className="mx-auto max-w-300 px-6 py-10 pb-20 md:px-8">
        <div className="mb-8">
          <p className="mono m-0 text-xs tracking-wide text-dim uppercase">
            {dashboardCopy.greeting}
          </p>
          <h1 className="mt-2 text-8 font-semibold tracking-tight text-strong">
            {user.name}{" "}
            <span className="font-normal text-dim">· @{user.username}</span>
          </h1>
        </div>

        <StatsStrip stats={stats} />

        {latest && (
          <section className="mb-10">
            <SectionHeader title={dashboardCopy.latestReport} />
            <LatestReportCard repo={latest} />
          </section>
        )}

        <RecentAnalyses repos={recent} />
      </main>
    </div>
  )
}
