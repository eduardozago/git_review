import type { DashboardStats } from "@/lib/mock/dashboard"

import { dashboardCopy } from "./copy"

interface StatsStripProps {
  stats: DashboardStats
}

export function StatsStrip({ stats }: StatsStripProps) {
  const { stats: labels } = dashboardCopy

  const items = [
    {
      label: labels.reportsGenerated,
      value: stats.reportsGenerated,
      hint: labels.allTime,
    },
    {
      label: labels.averageScore,
      value: stats.averageScore,
      hint: "/ 100",
    },
    {
      label: labels.bestDimension,
      value: stats.bestDimension.score,
      hint: stats.bestDimension.label,
    },
    {
      label: labels.daysAnalyzed,
      value: stats.daysAnalyzed,
      hint: labels.thisMonth,
    },
  ]

  return (
    <div className="mb-10 grid grid-cols-2 overflow-hidden rounded-xl border border-border bg-card lg:grid-cols-4">
      {items.map((item, index) => (
        <div
          key={item.label}
          className={[
            "min-w-0 p-5",
            index > 0 ? "border-border lg:border-l" : "",
            index % 2 === 1 ? "border-l lg:border-l" : "",
            index >= 2 ? "border-t lg:border-t-0" : "",
          ].join(" ")}
        >
          <div className="mono text-2.75 tracking-wide text-dim uppercase">
            {item.label}
          </div>
          <div className="mt-2.5 flex items-baseline gap-1.5">
            <span className="text-7 font-semibold tracking-tight text-strong">
              {item.value}
            </span>
            <span className="mono text-xs whitespace-nowrap text-dim">
              {item.hint}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
