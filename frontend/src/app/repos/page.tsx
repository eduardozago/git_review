import type { Metadata } from "next"

import { ReposPage } from "@/components/repos/repos-page"

export const metadata: Metadata = {
  title: "Choose a repository — GitReview",
  description: "Select a public GitHub repository to analyze.",
}

export default function Page() {
  return <ReposPage />
}
