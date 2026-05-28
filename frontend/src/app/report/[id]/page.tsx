import type { Metadata } from "next"

import { ReportPage } from "@/components/report/report-page"
import { MOCK_REPORT } from "@/lib/mock/report"

export const metadata: Metadata = {
  title: "Code Review Report — GitReview",
  description: "Your AI-powered code quality report.",
}

export default function Page() {
  return <ReportPage report={MOCK_REPORT} />
}
