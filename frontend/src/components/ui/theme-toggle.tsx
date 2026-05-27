"use client"

import { Moon, Sun } from "lucide-react"
import type { ReactNode } from "react"
import { useSyncExternalStore } from "react"

import {
  applyTheme,
  DEFAULT_THEME,
  getThemeSnapshot,
  subscribeTheme,
  type Theme,
} from "@/lib/theme"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
}

function SegButton({
  active,
  onClick,
  title,
  children,
}: {
  active: boolean
  onClick: () => void
  title: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-pressed={active}
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-full transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  )
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    () => DEFAULT_THEME
  )

  function select(next: Theme) {
    applyTheme(next)
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-card p-0.5",
        className
      )}
      role="group"
      aria-label="Tema da interface"
    >
      <SegButton
        active={theme === "light"}
        onClick={() => select("light")}
        title="Modo claro"
      >
        <Sun size={14} />
      </SegButton>
      <SegButton
        active={theme === "dark"}
        onClick={() => select("dark")}
        title="Modo escuro"
      >
        <Moon size={14} />
      </SegButton>
    </div>
  )
}
