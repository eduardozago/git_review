"use client"

import { Check, Star } from "lucide-react"

import { LangPill } from "@/components/dashboard/lang-pill"
import { Badge } from "@/components/ui/badge"
import { useCopy } from "@/lib/use-language"
import type { RepoSummary } from "@/lib/types/repo"
import { cn } from "@/lib/utils"

import { reposCopy } from "./copy"

interface RepoRowProps {
  repo: RepoSummary
  selected: boolean
  onSelect: () => void
  isFirst: boolean
}

export function RepoRow({ repo, selected, onSelect, isFirst }: RepoRowProps) {
  const copy = useCopy(reposCopy)

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "grid w-full cursor-pointer grid-cols-[6_1fr] items-center gap-4 border-border px-4 py-4 text-left transition-colors sm:grid-cols-[6_1fr_auto_auto_auto] sm:gap-4.5 sm:px-4.5",
        !isFirst && "border-t",
        selected ? "bg-accent-soft" : "hover:bg-surface-hover"
      )}
    >
      <div
        className={cn(
          "grid size-4.5 place-items-center rounded-md border-1.5 transition-colors",
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border-strong bg-transparent"
        )}
      >
        {selected && <Check size={12} />}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mono text-sm font-medium text-strong">{repo.name}</span>
          {repo.analyzed && repo.score !== null && (
            <Badge tone="outline" size="sm">{copy.lastScore(repo.score)}</Badge>
          )}
        </div>
        <p className="mt-1 truncate text-3.25 text-muted-foreground">{repo.description}</p>
      </div>

      <div className="hidden min-w-24 sm:flex">
        <LangPill name={repo.lang} color={repo.langColor} />
      </div>

      <div className="hidden items-center gap-1 text-xs text-dim sm:flex">
        <Star size={12} />
        <span className="mono">{repo.stars}</span>
      </div>

      <div className="hidden min-w-22.5 text-right text-xs text-dim sm:block">{repo.updated}</div>
    </button>
  )
}
