import { landingCopy } from "./copy"

export function LandingHowItWorks() {
  const { how } = landingCopy

  return (
    <section id="how" className="border-t border-border px-6 py-24 md:px-8">
      <div className="mx-auto max-w-275">
        <div className="mb-14">
          <p className="mono m-0 text-xs tracking-wide text-primary uppercase">
            {how.eyebrow}
          </p>
          <h2 className="mt-3 max-w-180 text-balance text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-strong">
            {how.heading}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {how.steps.map((step) => (
            <div key={step.n}>
              <div className="mono text-xs tracking-wide text-dim">
                STEP / {step.n}
              </div>
              <h3 className="mt-4 text-5.5 font-semibold tracking-tight text-strong">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
