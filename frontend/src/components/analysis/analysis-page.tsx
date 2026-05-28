"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ProgressBar } from "@/components/ui/progress-bar";
import { analysisSteps, TOTAL_SEC } from "@/lib/mock/analysis";
import type { StepState } from "@/lib/types/analysis";

import { analysisCopy } from "./copy";
import { PipelineLog } from "./pipeline-log";
import { StepRow } from "./step-row";

const REPO_NAME = "spotify-clone-react";

export function AnalysisPage() {
  const router = useRouter();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf: number;
    const tick = () => {
      const e = (performance.now() - start) / 1000;
      setElapsed(e);
      if (e >= TOTAL_SEC) {
        setTimeout(() => router.push("/report/demo"), 800);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [router]);

  const log = analysisSteps.reduce<{ lines: { text: string }[]; offset: number }>(
    ({ lines, offset }, step) => {
      if (elapsed < offset) return { lines, offset: offset + step.durSec };
      const localT = Math.min(1, (elapsed - offset) / step.durSec);
      const n = Math.floor(localT * step.lines.length);
      return {
        lines: [...lines, ...step.lines.slice(0, n).map((text) => ({ text }))],
        offset: offset + step.durSec,
      };
    },
    { lines: [], offset: 0 }
  ).lines;

  const stepStates: StepState[] = analysisSteps.reduce<{
    states: StepState[];
    offset: number;
  }>(
    ({ states, offset }, s) => {
      const end = offset + s.durSec;
      const state: StepState =
        elapsed >= end
          ? { ...s, status: "done", progress: 1 }
          : elapsed >= offset
            ? { ...s, status: "active", progress: (elapsed - offset) / s.durSec }
            : { ...s, status: "pending", progress: 0 };
      return { states: [...states, state], offset: end };
    },
    { states: [], offset: 0 }
  ).states;

  const overallPct = Math.min(100, (elapsed / TOTAL_SEC) * 100);
  const eta = Math.max(0, Math.ceil(TOTAL_SEC - elapsed));

  return (
    <div className="min-h-screen bg-background grid place-items-center p-8">
      <div className="w-full max-w-180">
        <div className="flex justify-between items-center mb-9">
          <Logo />
          <Button variant="ghost" size="sm" icon={X} href="/repos">
            {analysisCopy.cancel}
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <Spinner />
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground m-0">
              Analyzing{" "}
              <span className="text-muted-foreground">{REPO_NAME}</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1 mb-0">
              {analysisCopy.sub}
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="mono text-2.75 text-dim uppercase tracking-widest">
              {analysisCopy.etaLabel}
            </div>
            <div className="mono text-base text-foreground mt-1">~{eta}s</div>
          </div>
        </div>

        <div className="mt-7">
          <div className="flex justify-between items-center mb-2">
            <span className="mono text-2.75 text-dim uppercase tracking-widest">
              {analysisCopy.overallLabel}
            </span>
            <span className="mono text-xs text-muted-foreground">
              {Math.floor(overallPct)}%
            </span>
          </div>
          <ProgressBar value={overallPct} height={4} transitionMs={80} />
        </div>

        <div className="mt-8 border border-border rounded-xl bg-card overflow-hidden">
          {stepStates.map((s, i) => (
            <StepRow key={s.key} step={s} idx={i} first={i === 0} />
          ))}
        </div>

        <PipelineLog lines={log} />
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div className="w-9 h-9 shrink-0 rounded-full border-2 border-border border-t-primary animate-[spinSlow_800ms_linear_infinite]" />
  );
}
