export interface AnalysisStep {
  key: string;
  label: string;
  durSec: number;
  lines: string[];
}

export interface StepState extends AnalysisStep {
  status: "pending" | "active" | "done";
  progress: number;
}
