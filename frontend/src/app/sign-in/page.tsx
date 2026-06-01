import type { Metadata } from "next"

import { SignInClient } from "@/components/sign-in/sign-in-client"

export const metadata: Metadata = {
  title: "Sign in — GitReview",
  description:
    "Connect your GitHub account with read-only access to analyze public repositories.",
}

export default function SignInPage() {
  return <SignInClient />
}
