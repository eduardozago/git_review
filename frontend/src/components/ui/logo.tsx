import { cn } from "@/lib/utils"

interface LogoProps {
  size?: number
  withWord?: boolean
  className?: string
}

export function Logo({ size = 18, withWord = true, className }: LogoProps) {
  const markSize = size + 8
  const iconSize = size - 2

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className="grid shrink-0 place-items-center rounded-md bg-primary text-primary-foreground"
        style={{ width: markSize, height: markSize }}
      >
        <svg
          viewBox="0 0 24 24"
          width={iconSize}
          height={iconSize}
          aria-hidden="true"
        >
          <path
            d="M5 12h6M11 12l3-4M11 12l3 4M16 4l4 4-4 4M16 12l4 4-4 4"
            stroke="currentColor"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {withWord && (
        <span
          className="strong font-semibold tracking-tight"
          style={{ fontSize: size }}
        >
          GitReview
        </span>
      )}
    </div>
  )
}
