import { Check, Cloud, Cpu, Folder, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { ProgressBar } from "@/components/ui/progress-bar";
import type { StepState } from "@/lib/types/analysis";

const STEP_ICONS: Record<string, LucideIcon> = {
  clone: Cloud,
  tree: Folder,
  rubric: Cpu,
  report: Sparkles,
};

interface StepRowProps {
  step: StepState;
  idx: number;
  first: boolean;
}

export function StepRow({ step, idx, first }: StepRowProps) {
  const isDone = step.status === "done";
  const isActive = step.status === "active";
  const Icon = STEP_ICONS[step.key] ?? Sparkles;

  return (
    <div
      className={`grid gap-4 items-center px-5 py-4 transition-opacity duration-200 ${
        first ? "" : "border-t border-border"
      } ${step.status === "pending" ? "opacity-50" : "opacity-100"}`}
      style={{ gridTemplateColumns: "auto 1fr auto" }}
    >
      <div
        className={`w-8 h-8 rounded-lg grid place-items-center transition-all duration-200 ${
          isDone
            ? "bg-primary text-primary-foreground"
            : isActive
              ? "bg-primary/20 text-primary"
              : "bg-muted text-muted-foreground"
        }`}
      >
        {isDone ? <Check size={16} /> : <Icon size={16} />}
      </div>

      <div>
        <div className="flex items-baseline gap-2.5">
          <span className="mono text-2.75 text-dim">
            {String(idx + 1).padStart(2, "0")}
          </span>
          <span className="text-sm text-foreground font-medium">{step.label}</span>
        </div>
        {isActive && (
          <div className="mt-2">
            <ProgressBar value={step.progress * 100} height={3} transitionMs={80} />
          </div>
        )}
      </div>

      <div className="mono text-2.75 text-dim min-w-12 text-right">
        {isDone ? "done" : isActive ? `${Math.floor(step.progress * 100)}%` : "queued"}
      </div>
    </div>
  );
}
