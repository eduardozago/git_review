import { landingCopy } from "./copy"

export function LandingHowItWorks() {
  const { how } = landingCopy

  return (
    <section id="how" className="border-t border-border px-6 py-24 md:px-8">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-14">
          <p className="mono m-0 text-xs tracking-wide text-primary uppercase">
            {how.eyebrow}
          </p>
          <h2 className="mt-3 max-w-[720px] text-balance text-[clamp(32px,5vw,44px)] font-semibold leading-tight tracking-[-0.04em] text-strong">
            {how.heading}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {how.steps.map((step) => (
            <div key={step.n}>
              <div className="mono text-xs tracking-wide text-dim">
                STEP / {step.n}
              </div>
              <h3 className="mt-4 text-[22px] font-semibold tracking-tight text-strong">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
