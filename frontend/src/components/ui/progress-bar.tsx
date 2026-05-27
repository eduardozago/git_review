"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  max?: number
  color?: string
  height?: number
  animated?: boolean
  className?: string
}

export function ProgressBar({
  value,
  max = 100,
  color,
  height = 6,
  animated = false,
  className,
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  const [width, setWidth] = useState(animated ? 0 : pct)

  useEffect(() => {
    if (!animated) return
    const timer = setTimeout(() => setWidth(pct), 80)
    return () => clearTimeout(timer)
  }, [pct, animated])

  const displayWidth = animated ? width : pct

  return (
    <div
      className={cn("w-full overflow-hidden rounded-full bg-[var(--surface-2)]", className)}
      style={{ height }}
    >
      <div
        className="h-full rounded-full bg-primary transition-[width] ease-[cubic-bezier(.2,.7,.2,1)]"
        style={{
          width: `${displayWidth}%`,
          background: color ?? undefined,
          transitionDuration: "900ms",
        }}
      />
    </div>
  )
}
