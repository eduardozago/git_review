import { ArrowRight, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GitHubIcon } from "@/components/ui/github-icon"

import { landingCopy } from "./copy"
import { HeroPreviewCard } from "./hero-preview-card"
import type { LandingReportPreview } from "./mock-report"

interface LandingHeroProps {
  report: LandingReportPreview
}

export function LandingHero({ report }: LandingHeroProps) {
  const { hero, nav } = landingCopy

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 md:px-8 md:pb-24 md:pt-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_800px_400px_at_50%_0%,var(--accent-soft)_0%,transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--grid)_1px,transparent_1px),linear-gradient(90deg,var(--grid)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_60%_50%_at_50%_30%,black_0%,transparent_75%)]"
      />

      <div className="relative mx-auto max-w-[1100px] text-center">
        <Badge tone="outline" size="lg" className="mb-7">
          <Sparkles size={12} />
          <span className="mono text-[11px] tracking-wide uppercase">
            {hero.eyebrow}
          </span>
        </Badge>

        <h1 className="text-balance text-[clamp(40px,6vw,76px)] font-semibold leading-[1.02] tracking-[-0.06em] text-[var(--text-strong)]">
          {hero.h1a}
          <br />
          <span className="text-muted-foreground">{hero.h1b}</span>
        </h1>

        <p className="mx-auto mt-7 max-w-[640px] text-pretty text-lg leading-relaxed text-muted-foreground">
          {hero.sub}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" size="lg" href="/sign-in">
            <GitHubIcon size={18} />
            {hero.cta}
          </Button>
          <Button variant="ghost" size="lg" href="#preview">
            {nav.preview}
            <ArrowRight size={18} />
          </Button>
        </div>

        <p className="mt-3.5 text-[13px] text-[var(--text-dim)]">
          {hero.ctaSub}
        </p>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-7 text-[13px] text-muted-foreground">
          {hero.meta.map((item, index) => (
            <span key={item} className="flex items-center gap-2">
              {index > 0 && (
                <span className="size-1 rounded-full bg-[var(--text-dim)]" />
              )}
              {index === 0 && (
                <span className="size-1 rounded-full bg-primary" />
              )}
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-[980px] md:mt-20">
        <HeroPreviewCard report={report} />
      </div>
    </section>
  )
}
