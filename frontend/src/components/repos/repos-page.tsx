"use client"

import { Search } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  filterAndSortRepos,
  getRepoLanguages,
  type RepoSort,
} from "@/lib/filter-repos"
import { getRepos, selectRepo } from "@/lib/repos"
import type { RepoSummary } from "@/lib/types/repo"

import { reposCopy } from "./copy"
import { RepoRow } from "./repo-row"
import { ReposHeader } from "./repos-header"

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  return "An unexpected error occurred. Please try again."
}

export function ReposPage() {
  const router = useRouter()

  const [repos, setRepos] = useState<RepoSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isStarting, setIsStarting] = useState(false)

  const [query, setQuery] = useState("")
  const [langFilter, setLangFilter] = useState("all")
  const [sort, setSort] = useState<RepoSort>("recent")
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    let cancelled = false

    getRepos()
      .then((data) => {
        if (!cancelled) setRepos(data)
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [])

  const languages = useMemo(() => getRepoLanguages(repos), [repos])
  const filtered = useMemo(
    () => filterAndSortRepos(repos, query, langFilter, sort),
    [repos, query, langFilter, sort]
  )

  async function handleStart() {
    const repo = repos.find((r) => r.id === selectedId)
    if (!repo) return
    setIsStarting(true)
    setError(null)
    try {
      const selection = await selectRepo(repo)
      router.push(`/analysis?selection=${selection.id}`)
    } catch (err) {
      setError(getErrorMessage(err))
      setIsStarting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <ReposHeader
        selectedId={selectedId}
        isStarting={isStarting}
        onStart={handleStart}
      />

      <main className="mx-auto max-w-275 px-6 py-12 pb-20 md:px-8">
        <div className="mb-7">
          <h1 className="text-8 font-semibold tracking-tight text-strong">
            {reposCopy.heading}
          </h1>
          <p className="mt-2.5 text-3.75 text-muted-foreground">
            {reposCopy.sub}
          </p>
        </div>

        <div className="mb-4 grid gap-2.5 md:grid-cols-[1fr_auto_auto]">
          <div className="flex h-10 items-center gap-2 rounded-2.5 border border-border bg-card px-3">
            <Search size={14} className="shrink-0 text-dim" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={reposCopy.searchPlaceholder}
              className="h-auto flex-1 border-0 bg-transparent px-2 shadow-none focus-visible:ring-0"
            />
            <span className="mono shrink-0 text-xs text-dim">
              {reposCopy.repoCount(filtered.length)}
            </span>
          </div>

          <Select
            value={langFilter}
            onValueChange={(value) => setLangFilter(value as string)}
          >
            <SelectTrigger className="h-10 min-w-40 w-full bg-card md:w-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="all">{reposCopy.allLanguages}</SelectItem>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={sort}
            onValueChange={(value) => setSort(value as RepoSort)}
          >
            <SelectTrigger className="h-10 min-w-40 w-full bg-card md:w-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="recent">{reposCopy.sortRecent}</SelectItem>
              <SelectItem value="stars">{reposCopy.sortStars}</SelectItem>
              <SelectItem value="az">{reposCopy.sortAz}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {loading ? (
            <p className="px-6 py-16 text-center text-dim">
              Loading repositories…
            </p>
          ) : error ? (
            <p className="px-6 py-16 text-center text-destructive">{error}</p>
          ) : filtered.length === 0 ? (
            <p className="px-6 py-16 text-center text-dim">{reposCopy.empty}</p>
          ) : (
            filtered.map((repo, index) => (
              <RepoRow
                key={repo.id}
                repo={repo}
                selected={selectedId === repo.id}
                onSelect={() => setSelectedId(repo.id)}
                isFirst={index === 0}
              />
            ))
          )}
        </div>
      </main>
    </div>
  )
}
