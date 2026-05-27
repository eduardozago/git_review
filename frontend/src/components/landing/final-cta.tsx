import { Button } from "@/components/ui/button"
import { GitHubIcon } from "@/components/ui/github-icon"

import { landingCopy } from "./copy"

export function LandingFinalCta() {
  const { finalCta, hero } = landingCopy

  return (
    <section className="border-t border-border px-6 py-24 text-center md:px-8">
      <div className="mx-auto max-w-180">
        <h2 className="text-balance text-4xl md:text-5xl font-semibold leading-[1.05] tracking-tight text-strong">
          {finalCta.heading}{" "}
          <span className="text-muted-foreground">{finalCta.headingMuted}</span>
        </h2>
        <div className="mt-8 flex justify-center">
          <Button variant="primary" size="lg" href="/sign-in">
            <GitHubIcon size={18} />
            {hero.cta}
          </Button>
        </div>
      </div>
    </section>
  )
}
