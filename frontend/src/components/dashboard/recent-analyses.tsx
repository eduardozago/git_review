"use client"

import { useCopy } from "@/lib/use-language"
import type { AnalyzedRepo } from "@/lib/types/repo"

import { dashboardCopy } from "./copy"
import { NewAnalysisCard } from "./new-analysis-card"
import { RecentRepoCard } from "./recent-repo-card"
import { SectionHeader } from "./section-header"

interface RecentAnalysesProps {
  repos: AnalyzedRepo[]
}

export function RecentAnalyses({ repos }: RecentAnalysesProps) {
  const copy = useCopy(dashboardCopy)

  return (
    <section>
      <SectionHeader
        title={copy.recentAnalyses}
      />
      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
        {repos.map((repo) => (
          <RecentRepoCard key={repo.id} repo={repo} />
        ))}
        <NewAnalysisCard />
      </div>
    </section>
  )
}
