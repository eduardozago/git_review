import { cn } from "@/lib/utils"
import { getScoreLevel } from "@/lib/score-level"

const LEVEL_COLORS: Record<string, string> = {
  architect: "var(--plum)",
  senior: "var(--accent)",
  mid: "var(--info)",
  junior: "var(--warn)",
}

interface LevelBarProps {
  score: number
  className?: string
}

export function LevelBar({ score, className }: LevelBarProps) {
  const level = getScoreLevel(score)
  const color = LEVEL_COLORS[level.key]

  return (
    <div className={cn("select-none", className)}>
      {/* Track */}
      <div className="relative h-2 my-2">
        <div className="absolute inset-0 rounded-full bg-muted" />
        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${score}%`, background: color }}
        />
        {/* Segment ticks */}
        {[55, 75, 88].map((t) => (
          <div
            key={t}
            className="absolute inset-y-0 w-px bg-background/60"
            style={{ left: `${t}%` }}
          />
        ))}
        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-3 rounded-full border-2 border-background ring-1 ring-border"
          style={{ left: `${score}%`, background: color }}
        />
      </div>
      {/* Labels */}
      <div className="relative h-4">
        <span className="absolute left-0 mono text-2.75 text-dim">Beginner</span>
        <span
          className="absolute mono text-2.75 text-dim -translate-x-1/2"
          style={{ left: "55%" }}
        >
          Mid
        </span>
        <span
          className="absolute mono text-2.75 text-dim -translate-x-1/2"
          style={{ left: "75%" }}
        >
          Senior
        </span>
        <span className="absolute right-0 mono text-2.75 text-dim">Architect</span>
      </div>
    </div>
  )
}
