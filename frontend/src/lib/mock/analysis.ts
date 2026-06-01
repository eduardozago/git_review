import type { AnalysisStep } from "@/lib/types/analysis";

export const analysisSteps: AnalysisStep[] = [
  {
    key: "clone",
    label: "Cloning repository",
    durSec: 6,
    lines: [
      "$ git clone https://github.com/gabriellopessdev/spotify-clone-react",
      "Cloning into 'spotify-clone-react'...",
      "remote: Enumerating objects: 2,847, done.",
      "remote: Compressing objects: 100% (1,204/1,204)",
      "Receiving objects: 100% (2,847/2,847), 12.4 MB | 8.2 MB/s",
      "Resolved deltas: 100% (1,891/1,891)",
    ],
  },
  {
    key: "tree",
    label: "Reading tree & dependencies",
    durSec: 8,
    lines: [
      "→ reading tree at HEAD (8f2c1d4)",
      "  142 files · 9,847 lines of code",
      "  primary: TypeScript (78%)",
      "  secondary: CSS (18%), HTML (4%)",
      "→ parsing package.json",
      "  18 deps · 12 devDeps",
      "→ building AST...",
    ],
  },
  {
    key: "rubric",
    label: "Running the rubric",
    durSec: 12,
    lines: [
      "→ running rubric on 142 files",
      "  clean_code      ░░░░░░░░░░ 0%",
      "  clean_code      ████████░░ 78%",
      "  design_patterns ░░░░░░░░░░ 0%",
      "  design_patterns ██████░░░░ 65%",
      "  system_design   ░░░░░░░░░░ 0%",
      "  system_design   ███████░░░ 70%",
      "  best_practices  ░░░░░░░░░░ 0%",
      "  best_practices  ███████░░░ 75%",
    ],
  },
  {
    key: "report",
    label: "Generating report",
    durSec: 5,
    lines: [
      "→ synthesizing summary",
      "→ ranking improvements by impact / effort",
      "→ extracting evidence snippets",
      "→ writing report.json (4.2 KB)",
      "✓ ready",
    ],
  },
];

export const TOTAL_SEC = analysisSteps.reduce((sum, s) => sum + s.durSec, 0);
