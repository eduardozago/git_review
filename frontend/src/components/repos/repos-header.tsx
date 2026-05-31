"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"

import { reposCopy } from "./copy"

interface ReposHeaderProps {
  selectedId: string | null
  isStarting: boolean
  onStart: () => void
}

export function ReposHeader({ selectedId, isStarting, onStart }: ReposHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background">
      <div className="mx-auto flex max-w-300 items-center justify-between gap-4 px-6 py-3.5 md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Button variant="ghost" size="sm" href="/dashboard">
            <ArrowLeft size={16} />
            {reposCopy.cancel}
          </Button>
          <span className="text-faint">/</span>
          <Link href="/dashboard">
            <Logo size={16} withWord={false} />
          </Link>
          <span className="hidden text-sm text-foreground sm:inline">
            {reposCopy.heading}
          </span>
        </div>

        <Button
          variant="primary"
          disabled={!selectedId || isStarting}
          type="button"
          onClick={onStart}
        >
          {isStarting ? reposCopy.starting : reposCopy.startAnalysis}
          <ArrowRight size={16} />
        </Button>
      </div>
    </header>
  )
}
