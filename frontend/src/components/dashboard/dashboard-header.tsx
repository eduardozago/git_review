"use client"

import { Plus } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import { useCopy } from "@/lib/use-language"

import { LogoutButton } from "./logout-button"
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
      username={username}
      avatarUrl={avatarUrl}
      actions={
        <Button variant="secondary" size="sm" href="/repos">
          <Plus size={16} />
          {copy.newAnalysis}
        </Button>
      }
    />
  )
}
