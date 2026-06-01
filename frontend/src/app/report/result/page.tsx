"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { AnalysisReportView } from "@/components/report/analysis-report-view"
import type { AnalysisReport } from "@/lib/analysis"

export default function ReportResultPage() {
  const router = useRouter()
  const [report] = useState<AnalysisReport | null>(() => {
    if (typeof window === "undefined") return null
    const stored = sessionStorage.getItem("analysis_report")
    return stored ? JSON.parse(stored) : null
  })

  useEffect(() => {
    if (!report) router.push("/repos")
  }, [report, router])

  if (!report) {
    return (
      <div className="min-h-screen bg-background grid place-items-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    )
  }

  return <AnalysisReportView report={report} showHeader backHref="/repos" />
}
