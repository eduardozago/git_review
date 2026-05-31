"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/ui/progress-bar"
import { Logo } from "@/components/ui/logo"
import type { AnalysisReport } from "@/lib/analysis"

const DIMENSION_LABELS: Record<string, string> = {
  commits: "Commits",
  code_quality: "Qualidade do Código",
  readme: "README",
  pull_requests: "Pull Requests",
  project_structure: "Estrutura do Projeto",
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-500"
  if (score >= 60) return "text-yellow-500"
  if (score >= 40) return "text-orange-500"
  return "text-red-500"
}

function getScoreBg(score: number): string {
  if (score >= 80) return "bg-green-500"
  if (score >= 60) return "bg-yellow-500"
  if (score >= 40) return "bg-orange-500"
  return "bg-red-500"
}

export default function ReportResultPage() {
  const router = useRouter()
  const [report, setReport] = useState<AnalysisReport | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("analysis_report")
    if (stored) {
      setReport(JSON.parse(stored))
    } else {
      router.push("/repos")
    }
  }, [router])

  if (!report) {
    return (
      <div className="min-h-screen bg-background grid place-items-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex items-center justify-between px-8 py-3.5" style={{ maxWidth: 1100 }}>
          <div className="flex items-center gap-3.5">
            <Button variant="ghost" size="sm" icon={ArrowLeft} href="/repos">
              Voltar
            </Button>
            <span className="text-muted-foreground">/</span>
            <span className="mono text-sm text-foreground">
              {report.owner}/{report.repo}
            </span>
          </div>
          <Logo />
        </div>
      </header>

      {/* Hero Score */}
      <div className="mx-auto px-8 pt-12 pb-8" style={{ maxWidth: 1100 }}>
        <div className="flex items-center gap-8 mb-8">
          <div className="relative w-28 h-28 shrink-0">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-border" />
              <circle
                cx="50" cy="50" r="42" fill="none" strokeWidth="8"
                strokeDasharray={`${report.overall_score * 2.64} 264`}
                strokeLinecap="round"
                className={getScoreColor(report.overall_score)}
                stroke="currentColor"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-3xl font-bold ${getScoreColor(report.overall_score)}`}>
                {report.overall_score}
              </span>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-2">
              Relatório de Análise
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {report.summary}
            </p>
            {report.repo_metadata && (
              <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                {report.repo_metadata.language && (
                  <span>Linguagem: <strong>{report.repo_metadata.language}</strong></span>
                )}
                <span>⭐ {report.repo_metadata.stars}</span>
                <span>🍴 {report.repo_metadata.forks}</span>
              </div>
            )}
          </div>
        </div>

        {/* Top Strengths & Critical Issues */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="border border-border rounded-xl p-5 bg-card">
            <h3 className="text-sm font-medium text-green-500 mb-3">✅ Pontos Fortes</h3>
            <ul className="space-y-2">
              {report.top_strengths.map((s, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-border rounded-xl p-5 bg-card">
            <h3 className="text-sm font-medium text-red-500 mb-3">⚠️ Problemas Críticos</h3>
            <ul className="space-y-2">
              {report.critical_issues.map((issue, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dimensions */}
        <h2 className="text-lg font-semibold text-foreground mb-4">Análise por Dimensão</h2>
        <div className="space-y-4 mb-10">
          {report.dimensions.map((dim) => (
            <DimensionCard key={dim.dimension} dim={dim} />
          ))}
        </div>

        {/* Next Steps */}
        <div className="border border-border rounded-xl p-6 bg-card mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-4">🚀 Próximos Passos</h2>
          <ol className="space-y-3">
            {report.next_steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm text-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

function DimensionCard({ dim }: { dim: AnalysisReport["dimensions"][0] }) {
  const [open, setOpen] = useState(false)
  const label = DIMENSION_LABELS[dim.dimension] || dim.dimension

  return (
    <div className="border border-border rounded-xl bg-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">{label}</span>
            <span className={`text-sm font-bold ${getScoreColor(dim.score)}`}>
              {dim.score}/100
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 truncate">{dim.summary}</p>
        </div>
        <div className="w-24 shrink-0">
          <div className="h-2 rounded-full bg-border overflow-hidden">
            <div className={`h-full rounded-full ${getScoreBg(dim.score)}`} style={{ width: `${dim.score}%` }} />
          </div>
        </div>
        <svg className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-border pt-4">
          {dim.strengths.length > 0 && (
            <div className="mb-3">
              <h4 className="text-xs font-medium text-green-500 mb-1.5">Pontos fortes</h4>
              <ul className="space-y-1">
                {dim.strengths.map((s, i) => (
                  <li key={i} className="text-xs text-muted-foreground">• {s}</li>
                ))}
              </ul>
            </div>
          )}
          {dim.issues.length > 0 && (
            <div className="mb-3">
              <h4 className="text-xs font-medium text-red-500 mb-1.5">Problemas</h4>
              <ul className="space-y-1">
                {dim.issues.map((s, i) => (
                  <li key={i} className="text-xs text-muted-foreground">• {s}</li>
                ))}
              </ul>
            </div>
          )}
          {dim.recommendations.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-blue-500 mb-1.5">Recomendações</h4>
              <ul className="space-y-1">
                {dim.recommendations.map((s, i) => (
                  <li key={i} className="text-xs text-muted-foreground">• {s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
