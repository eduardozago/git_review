"use client"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import { useCopy } from "@/lib/use-language"
import { dashboardCopy } from "./copy"

interface DashboardHeaderProps {
  username: string
  avatarUrl?: string | null
}

export function DashboardHeader({ username, avatarUrl }: DashboardHeaderProps) {
  const copy = useCopy(dashboardCopy)

  return (
    <PageHeader
      breadcrumb={username}
      actions={
        <Button variant="secondary" size="sm" href="/repos">
          <Plus size={16} />
          {copy.newAnalysis}
        </Button>
      }
    />
  )
}
