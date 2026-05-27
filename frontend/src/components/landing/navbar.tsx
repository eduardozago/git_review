import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/github-icon";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

import { landingCopy } from "./copy";

export function LandingNavbar() {
  const { nav, hero } = landingCopy;

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6 py-4 md:px-8">
        <div className="flex items-center gap-7">
          <Logo />
          <nav className="hidden items-center gap-5 text-[13.5px] text-muted-foreground md:flex">
            <a
              href="#pillars"
              className="transition-colors hover:text-foreground"
            >
              {nav.pillars}
            </a>
            <a
              href="#how"
              className="transition-colors hover:text-foreground"
            >
              {nav.how}
            </a>
            <a
              href="#preview"
              className="transition-colors hover:text-foreground"
            >
              {nav.preview}
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Button variant="primary" size="sm" href="/sign-in">
            <GitHubIcon size={16} />
            {hero.cta}
          </Button>
        </div>
      </div>
    </header>
  );
}
