"use client"

import Link from "next/link"
import { Plus } from "lucide-react"

import { useCopy } from "@/lib/use-language"

import { dashboardCopy } from "./copy"

export function NewAnalysisCard() {
  const copy = useCopy(dashboardCopy)

  return (
    <Link
      href="/repos"
      className="flex min-h-34 flex-col items-start gap-3 rounded-xl border border-dashed border-border-strong p-4.5 text-left text-muted-foreground transition-colors hover:border-primary hover:bg-accent-soft hover:text-primary"
    >
      <Plus size={18} />
      <span className="text-sm font-medium">{copy.newAnalysis}</span>
      <span className="text-xs text-dim">{copy.newAnalysisHint}</span>
    </Link>
  )
}
