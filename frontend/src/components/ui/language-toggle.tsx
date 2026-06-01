"use client"

import { useSyncExternalStore } from "react"

import { applyLanguage, DEFAULT_LANGUAGE, getLanguageSnapshot, subscribeLanguage, type Language } from "@/lib/i18n"
import { cn } from "@/lib/utils"

interface LanguageToggleProps {
  className?: string
}

function LangButton({
  active,
  onClick,
  label,
}: {
  active: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "mono inline-flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 text-xs font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
    </button>
  )
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const lang = useSyncExternalStore(
    subscribeLanguage,
    getLanguageSnapshot,
    () => DEFAULT_LANGUAGE
  )

  function select(next: Language) {
    applyLanguage(next)
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-card p-0.5",
        className
      )}
      role="group"
      aria-label="Language"
    >
      <LangButton active={lang === "pt"} onClick={() => select("pt")} label="PT" />
      <LangButton active={lang === "en"} onClick={() => select("en")} label="EN" />
    </div>
  )
}
