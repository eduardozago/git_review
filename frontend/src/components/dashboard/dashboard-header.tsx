import Link from "next/link"
import { LogOut, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { InitialAvatar } from "@/components/ui/initial-avatar"
import { Logo } from "@/components/ui/logo"

import { dashboardCopy } from "./copy"

interface DashboardHeaderProps {
  username: string
}

export function DashboardHeader({ username }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background">
      <div className="mx-auto flex max-w-300 items-center justify-between gap-4 px-6 py-3.5 md:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <Logo size={16} />
          <span className="text-faint">/</span>
          <span className="mono truncate text-3.25 text-foreground">
            {username}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="secondary" size="sm" href="/repos">
            <Plus size={16} />
            {dashboardCopy.newAnalysis}
          </Button>
          <div className="flex items-center gap-2 border-l border-border pl-2">
            <InitialAvatar name={username} size={28} />
            <Link
              href="/"
              title={dashboardCopy.signOut}
              className="rounded-md p-1.5 text-dim transition-colors hover:text-muted-foreground"
            >
              <LogOut size={16} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
