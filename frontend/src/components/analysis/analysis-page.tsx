"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ProgressBar } from "@/components/ui/progress-bar";
import { runAnalysis, type AnalysisReport } from "@/lib/analysis";

import { analysisCopy } from "./copy";

export function AnalysisPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const repoFullName = searchParams.get("repo") || "";
  const [owner, repo] = repoFullName.includes("/")
    ? repoFullName.split("/")
    : ["", repoFullName];

  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");
  const [error, setError] = useState("");
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const interval = setInterval(() => {
      setElapsed(Math.floor((performance.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!owner || !repo) {
      setStatus("error");
      setError("Repositório não especificado.");
      return;
    }

    runAnalysis(owner, repo)
      .then((report) => {
        setStatus("done");
        // Store report in sessionStorage and redirect
        sessionStorage.setItem("analysis_report", JSON.stringify(report));
        setTimeout(() => router.push("/report/result"), 500);
      })
      .catch((err) => {
        setStatus("error");
        setError(err.message || "Erro ao analisar repositório.");
      });
  }, [owner, repo, router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-300">
        <div className="flex justify-between items-center mb-9">
          <Logo />
          <Button variant="ghost" size="sm" icon={X} href="/repos">
            {analysisCopy.cancel}
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-2">
          {status === "loading" && <Spinner />}
          {status === "done" && <DoneIcon />}
          {status === "error" && <ErrorIcon />}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground m-0">
              {status === "loading" && (
                <>
                  Analisando{" "}
                  <span className="text-muted-foreground">{repo}</span>
                </>
              )}
              {status === "done" && "Análise concluída!"}
              {status === "error" && "Erro na análise"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1 mb-0">
              {status === "loading" && analysisCopy.sub}
              {status === "done" && "Redirecionando para o relatório..."}
              {status === "error" && error}
            </p>
          </div>
          {status === "loading" && (
            <div className="text-right shrink-0">
              <div className="mono text-2.75 text-dim uppercase tracking-widest">
                Tempo
              </div>
              <div className="mono text-base text-foreground mt-1">{elapsed}s</div>
            </div>
          )}
        </div>

        {status === "loading" && (
          <div className="mt-7">
            <div className="flex justify-between items-center mb-2">
              <span className="mono text-2.75 text-dim uppercase tracking-widest">
                Progresso
              </span>
            </div>
            <ProgressBar value={Math.min(elapsed * 1.5, 95)} height={4} transitionMs={80} />
            <div className="mt-6 border border-border rounded-xl bg-card p-6">
              <div className="space-y-3 text-sm text-muted-foreground">
                <StepIndicator active={elapsed < 10} done={elapsed >= 10} label="Coletando dados do repositório..." />
                <StepIndicator active={elapsed >= 10 && elapsed < 25} done={elapsed >= 25} label="Analisando commits e PRs..." />
                <StepIndicator active={elapsed >= 25 && elapsed < 40} done={elapsed >= 40} label="Avaliando qualidade do código..." />
                <StepIndicator active={elapsed >= 40 && elapsed < 55} done={elapsed >= 55} label="Analisando README e estrutura..." />
                <StepIndicator active={elapsed >= 55} done={false} label="Gerando relatório final..." />
              </div>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="mt-6">
            <Button variant="secondary" href="/repos">
              Voltar para repositórios
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div className="w-9 h-9 shrink-0 rounded-full border-2 border-border border-t-primary animate-[spinSlow_800ms_linear_infinite]" />
  );
}

function DoneIcon() {
  return (
    <div className="w-9 h-9 shrink-0 rounded-full bg-green-500/20 flex items-center justify-center">
      <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}

function ErrorIcon() {
  return (
    <div className="w-9 h-9 shrink-0 rounded-full bg-red-500/20 flex items-center justify-center">
      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  );
}

function StepIndicator({ active, done, label }: { active: boolean; done: boolean; label: string }) {
  return (
    <div className="flex items-center gap-3">
      {done ? (
        <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
          <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      ) : active ? (
        <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      ) : (
        <div className="w-4 h-4 rounded-full border border-border" />
      )}
      <span className={done ? "text-foreground" : active ? "text-foreground" : "text-muted-foreground"}>
        {label}
      </span>
    </div>
  );
}
