import { Code2, Grid3x3, Layers, Shield } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { landingCopy } from "./copy"

const pillarIcons: Record<string, LucideIcon> = {
  clean: Code2,
  patterns: Layers,
  system: Grid3x3,
  practices: Shield,
}

export function LandingPillars() {
  const { pillars } = landingCopy

  return (
    <section id="pillars" className="border-t border-border px-6 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-14 max-w-[720px]">
          <p className="mono m-0 text-xs tracking-wide text-primary uppercase">
            {pillars.eyebrow}
          </p>
          <h2 className="mt-3 text-balance text-[clamp(32px,5vw,44px)] font-semibold leading-tight tracking-[-0.04em] text-[var(--text-strong)]">
            {pillars.heading}
          </h2>
        </div>

        <div className="grid overflow-hidden rounded-[14px] border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {pillars.items.map((pillar) => {
            const Icon = pillarIcons[pillar.key] ?? Code2
            return (
              <div key={pillar.key} className="bg-background p-7">
                <Icon size={22} className="text-primary" />
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--text-strong)]">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
