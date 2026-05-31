import Link from "next/link"
import { Plus } from "lucide-react"

import { dashboardCopy } from "./copy"

export function NewAnalysisCard() {
  return (
    <Link
      href="/repos"
      className="flex min-h-34 flex-col items-start gap-3 rounded-xl border border-dashed border-border-strong p-4.5 text-left text-muted-foreground transition-colors hover:border-primary hover:bg-accent-soft hover:text-primary"
    >
      <Plus size={18} />
      <span className="text-sm font-medium">{dashboardCopy.newAnalysis}</span>
      <span className="text-xs text-dim">{dashboardCopy.newAnalysisHint}</span>
    </Link>
  )
}
