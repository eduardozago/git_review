"use client"

import { ArrowLeft, LogOut } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

import { getMe, logout } from "@/lib/auth"
import { useCopy } from "@/lib/use-language"
import type { User } from "@/lib/types/user"
import { dashboardCopy } from "@/components/dashboard/copy"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { Logo } from "@/components/ui/logo"

interface PageHeaderProps {
  backHref?: string
  breadcrumb?: string
  actions?: ReactNode
}

function LogoutButton() {
  const router = useRouter()
  const copy = useCopy(dashboardCopy)

  async function handleLogout() {
    try {
      await logout()
    } finally {
      router.replace("/sign-in")
    }
  }

  return (
    <button
      onClick={handleLogout}
      title={copy.signOut}
      className="rounded-md p-1.5 text-dim transition-colors hover:text-muted-foreground"
    >
      <LogOut size={16} />
    </button>
  )
}

export function PageHeader({ backHref, breadcrumb, actions }: PageHeaderProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    getMe().then(setUser).catch(() => {})
  }, [])

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background">
      <div className="mx-auto flex max-w-300 items-center justify-between gap-4 px-6 py-3.5 md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          {backHref && (
            <Button variant="ghost" size="sm" href={backHref}>
              <ArrowLeft size={16} />
            </Button>
          )}
          <Logo size={16} withWord={!backHref} />
          {breadcrumb && (
            <>
              <span className="text-faint">/</span>
              <span className="mono truncate text-3.25 text-foreground">{breadcrumb}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          {actions}
          <LanguageToggle />
          {user && (
            <div className="flex items-center gap-2 border-l border-border pl-2">
              <Avatar size="sm">
                <AvatarImage src={user.avatar_url ?? undefined} alt={user.login} />
                <AvatarFallback>{user.login.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <LogoutButton />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
