import type { Metadata } from "next"

import { DashboardClient } from "@/components/dashboard/dashboard-client"

export const metadata: Metadata = {
  title: "Dashboard — GitReview",
  description: "Your recent repository analyses and scores.",
}

export default function DashboardPage() {
  return <DashboardClient />
}
