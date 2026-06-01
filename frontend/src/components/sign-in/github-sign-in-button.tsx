"use client"

import { Button } from "@/components/ui/button"
import { GitHubIcon } from "@/components/ui/github-icon"
import { useCopy } from "@/lib/use-language"

import { signInCopy } from "./copy"

export function GitHubSignInButton() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"
  const copy = useCopy(signInCopy)

  return (
    <Button
      variant="primary"
      size="lg"
      full
      type="button"
      onClick={() => {
        window.location.href = `${apiUrl}/auth/github`
      }}
    >
      <GitHubIcon size={18} />
      {copy.cta}
    </Button>
  )
}
