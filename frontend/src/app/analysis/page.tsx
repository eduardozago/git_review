import type { Metadata } from "next";

import { AnalysisPage } from "@/components/analysis/analysis-page";

export const metadata: Metadata = {
  title: "Analyzing repository — GitReview",
  description: "Running the code analysis pipeline.",
};

export default function Page() {
  return <AnalysisPage />;
}
