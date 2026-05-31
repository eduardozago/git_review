"use client"

import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import { useCopy } from "@/lib/use-language"

import { reposCopy } from "./copy"

interface ReposHeaderProps {
  selectedId: string | null
  isStarting: boolean
  onStart: () => void
}

export function ReposHeader({ selectedId, isStarting, onStart }: ReposHeaderProps) {
  const copy = useCopy(reposCopy)

  return (
    <PageHeader
      backHref="/dashboard"
      breadcrumb={copy.heading}
      actions={
        <Button
          variant="primary"
          disabled={!selectedId || isStarting}
          type="button"
          onClick={onStart}
        >
          {isStarting ? copy.starting : copy.startAnalysis}
          <ArrowRight size={16} />
        </Button>
      }
    />
  )
}
