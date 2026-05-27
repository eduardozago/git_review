import { Logo } from "@/components/ui/logo"

import { landingCopy } from "./copy"

export function LandingFooter() {
  const { footer } = landingCopy

  return (
    <footer className="border-t border-border px-6 py-10 md:px-8">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-6 text-[13px] text-dim">
        <div className="flex items-center gap-3">
          <Logo size={16} />
          <span className="text-muted-foreground">·</span>
          <span>{footer.made}</span>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <a href="#" className="transition-colors hover:text-muted-foreground">
            {footer.links.product}
          </a>
          <a href="#" className="transition-colors hover:text-muted-foreground">
            {footer.links.company}
          </a>
          <a href="#" className="transition-colors hover:text-muted-foreground">
            {footer.links.legal}
          </a>
        </div>
      </div>
    </footer>
  )
}
