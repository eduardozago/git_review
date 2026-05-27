"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { GitHubIcon } from "@/components/ui/github-icon"

import { signInCopy } from "./copy"

/** Mock navigation until backend GitHub OAuth is wired in Phase 3. */
export function GitHubSignInButton() {
  const router = useRouter()

  return (
    <Button
      variant="primary"
      size="lg"
      full
      type="button"
      onClick={() => router.push("/dashboard")}
    >
      <GitHubIcon size={18} />
      {signInCopy.cta}
    </Button>
  )
}
