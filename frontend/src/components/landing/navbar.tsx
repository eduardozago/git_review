"use client"

import { Button } from "@/components/ui/button"
import { GitHubIcon } from "@/components/ui/github-icon"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { Logo } from "@/components/ui/logo"

import { useCopy } from "@/lib/use-language"

import { landingCopy } from "./copy"

export function LandingNavbar() {
  const { nav, hero } = useCopy(landingCopy)

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex max-w-300 items-center justify-between gap-6 px-6 py-4 md:px-8">
        <div className="flex items-center gap-7">
          <Logo />
          <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
            <a href="#pillars" className="transition-colors hover:text-foreground">{nav.pillars}</a>
            <a href="#how" className="transition-colors hover:text-foreground">{nav.how}</a>
            <a href="#preview" className="transition-colors hover:text-foreground">{nav.preview}</a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle className="hidden sm:inline-flex" />
          <Button variant="primary" size="sm" href="/sign-in">
            <GitHubIcon size={16} />
            {hero.cta}
          </Button>
        </div>
      </div>
    </header>
  )
}
