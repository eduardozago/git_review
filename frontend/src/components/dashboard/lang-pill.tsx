import { cn } from "@/lib/utils"

interface LangPillProps {
  name: string
  color: string
  className?: string
}

export function LangPill({ name, color, className }: LangPillProps) {
  return (
    <span
      className={cn("flex items-center gap-1.5 text-xs text-dim", className)}
    >
      <span
        className="size-2 shrink-0 rounded-full"
        style={{ backgroundColor: color }}
      />
      {name}
    </span>
  )
}
