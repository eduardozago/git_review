"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { AnalysisReportView } from "@/components/report/analysis-report-view"
import { getAnalysisReportById, type AnalysisReport } from "@/lib/analysis"

export default function ReportByIdPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [report, setReport] = useState<AnalysisReport | null>(null)

  useEffect(() => {
    const reportId = Number(params.id)

    if (!Number.isFinite(reportId) || reportId <= 0) {
      router.push("/dashboard")
      return
    }

    getAnalysisReportById(reportId)
      .then(setReport)
      .catch(() => {
        router.push("/dashboard")
      })
  }, [params.id, router])

  if (!report) {
    return (
      <div className="min-h-screen bg-background grid place-items-center">
        <div className="animate-pulse text-muted-foreground">Carregando relatório...</div>
      </div>
    )
  }

  return <AnalysisReportView report={report} showHeader backHref="/dashboard" />
}
