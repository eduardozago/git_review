"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { useCopy } from "@/lib/use-language"

import { signInCopy } from "./copy"
import { GitHubSignInButton } from "./github-sign-in-button"

export function SignInPanel() {
  const { heading, sub, back, terms, footer } = useCopy(signInCopy)

  return (
    <div className="flex min-h-screen flex-col px-6 py-8 md:px-12 lg:px-14">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <Button variant="ghost" size="sm" href="/">
          <ArrowLeft size={16} />
          {back}
        </Button>
      </div>

      <div className="grid flex-1 place-items-center py-10">
        <div className="w-full max-w-95">
          <h1 className="text-9 font-semibold leading-tight tracking-tight text-strong">
            {heading}
          </h1>
          <p className="mt-3.5 text-3.75 leading-relaxed text-muted-foreground">
            {sub}
          </p>

          <div className="mt-7">
            <GitHubSignInButton />
          </div>

          <p className="mt-4 text-xs leading-relaxed text-dim">
            {terms.prefix}{" "}
            <a href="#" className="text-muted-foreground underline">
              {terms.terms}
            </a>{" "}
            {terms.and}{" "}
            <a href="#" className="text-muted-foreground underline">
              {terms.privacy}
            </a>
            .
          </p>
        </div>
      </div>

      <p className="mono text-xs text-dim">{footer}</p>
    </div>
  )
}
