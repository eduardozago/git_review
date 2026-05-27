import type { Metadata } from "next"

import { PermissionsPanel } from "@/components/sign-in/permissions-panel"
import { SignInPanel } from "@/components/sign-in/sign-in-panel"

export const metadata: Metadata = {
  title: "Sign in — GitReview",
  description:
    "Connect your GitHub account with read-only access to analyze public repositories.",
}

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-2">
      <SignInPanel />
      <PermissionsPanel />
    </div>
  )
}
