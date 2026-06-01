import type { Metadata } from "next";
import { Suspense } from "react";

import { AnalysisPage } from "@/components/analysis/analysis-page";

export const metadata: Metadata = {
  title: "Analisando repositório — GitReview",
  description: "Executando a pipeline de análise de código.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background grid place-items-center"><p className="text-muted-foreground">Carregando...</p></div>}>
      <AnalysisPage />
    </Suspense>
  );
}
