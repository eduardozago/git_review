"use client"

import { Code2, Grid3x3, Layers, Shield } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { useCopy } from "@/lib/use-language"

import { landingCopy } from "./copy"

const pillarIcons: Record<string, LucideIcon> = {
  clean: Code2,
  patterns: Layers,
  system: Grid3x3,
  practices: Shield,
}

export function LandingPillars() {
  const { pillars } = useCopy(landingCopy)

  return (
    <section id="pillars" className="border-t border-border px-6 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-275">
        <div className="mb-14 max-w-180">
          <p className="mono m-0 text-xs tracking-wide text-primary uppercase">{pillars.eyebrow}</p>
          <h2 className="mt-3 text-balance text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-strong">
            {pillars.heading}
          </h2>
        </div>

        <div className="grid overflow-hidden rounded-3.5 border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {pillars.items.map((pillar) => {
            const Icon = pillarIcons[pillar.key] ?? Code2
            return (
              <div key={pillar.key} className="bg-background p-7">
                <Icon size={22} className="text-primary" />
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-strong">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
