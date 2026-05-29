import { Plus } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"

import { LogoutButton } from "./logout-button"
import { dashboardCopy } from "./copy"

interface DashboardHeaderProps {
  username: string
  avatarUrl?: string | null
}

export function DashboardHeader({ username, avatarUrl }: DashboardHeaderProps) {
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
            <Avatar size="sm">
              <AvatarImage src={avatarUrl ?? undefined} alt={username} />
              <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  )
}
