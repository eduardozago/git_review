"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { getMe } from "@/lib/auth"
import { getDashboardData } from "@/lib/mock/dashboard"
import type { User } from "@/lib/types/user"

import { DashboardHeader } from "./dashboard-header"
import { LatestReportCard } from "./latest-report-card"
import { RecentAnalyses } from "./recent-analyses"
import { SectionHeader } from "./section-header"
import { StatsStrip } from "./stats-strip"
import { dashboardCopy } from "./copy"

export function DashboardClient() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => router.replace("/sign-in"))
  }, [router])

  if (!user) return null

  const { analyzedRepos, stats } = getDashboardData()
  const latest = analyzedRepos[0]
  const recent = analyzedRepos.slice(1)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader username={user.login} avatarUrl={user.avatar_url} />

      <main className="mx-auto max-w-300 px-6 py-10 pb-20 md:px-8">
        <div className="mb-8">
          <p className="mono m-0 text-xs tracking-wide text-dim uppercase">
            {dashboardCopy.greeting}
          </p>
          <h1 className="mt-2 text-8 font-semibold tracking-tight text-strong">
            {user.name ?? user.login}{" "}
            <span className="font-normal text-dim">· @{user.login}</span>
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
