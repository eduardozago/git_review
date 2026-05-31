"use client"

import { useCopy } from "@/lib/use-language"
import type { AnalysisReport } from "@/lib/analysis"
import type { LandingReportPreview } from "@/lib/mock/mock-report"
import { AnalysisReportView } from "@/components/report/analysis-report-view"

import { landingCopy } from "./copy"

interface LandingReportPreviewSectionProps {
  report: LandingReportPreview
}

function toAnalysisReport(report: LandingReportPreview, summaryBlurb: string): AnalysisReport {
  const dimensions = report.dimensions.map((dim) => ({
    dimension: dim.id,
    score: dim.score,
    summary: dim.tagline,
    strengths: dim.positives.map((item) => item.h),
    issues: dim.improvements.map((item) => item.h),
    recommendations: [],
  }))

  return {
    owner: report.owner,
    repo: report.repo,
    overall_score: report.score,
    summary: summaryBlurb,
    top_strengths: dimensions.flatMap((d) => d.strengths).slice(0, 3),
    critical_issues: dimensions.flatMap((d) => d.issues).slice(0, 2),
    next_steps: [
      "Extrair camada de serviço para separar lógica de UI",
      "Adicionar testes nas áreas críticas do fluxo principal",
      "Reduzir funções longas e remover pontos com acoplamento alto",
    ],
    dimensions,
    repo_metadata: {
      language: null,
      languages: {},
      stars: 0,
      forks: 0,
      description: null,
      created_at: "",
      updated_at: "",
    },
  }
}

export function LandingReportPreviewSection({ report }: LandingReportPreviewSectionProps) {
  const { preview } = useCopy(landingCopy)
  const mapped = toAnalysisReport(report, preview.summaryBlurb)

  return (
    <section id="preview" className="border-t border-border bg-elev px-6 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-300">
        <div className="mb-8 max-w-180">
          <p className="mono m-0 text-xs tracking-wide text-primary uppercase">{preview.eyebrow}</p>
          <h2 className="mt-3 text-balance text-3xl md:text-4xl font-semibold tracking-tight text-strong">{preview.heading}</h2>
          <p className="mt-3 text-3.75 leading-relaxed text-muted-foreground">{preview.sub}</p>
        </div>

        <div className="rounded-2xl border border-border bg-background overflow-hidden">
          <AnalysisReportView report={mapped} />
        </div>
      </div>
    </section>
  )
}
