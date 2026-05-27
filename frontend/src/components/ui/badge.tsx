import { cva, type VariantProps } from "class-variance-authority"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-colors [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive/10 text-destructive",
        outline: "border-border bg-transparent text-muted-foreground",
        neutral: "border-border bg-muted text-muted-foreground",
        accent: "border-transparent bg-accent-soft text-accent",
        plum: "border-transparent bg-plum-soft text-plum",
        warn: "border-transparent bg-warn-soft text-warn",
        danger: "border-transparent bg-danger-soft text-destructive",
        info: "border-transparent bg-info-soft text-info",
        ghost: "border-transparent hover:bg-muted hover:text-muted-foreground",
        link: "border-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-5 px-1.5 text-[11px] [&>svg]:size-2.5",
        default: "h-6 px-2 text-xs",
        lg: "h-7 px-2.5 text-[13px]",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "default",
    },
  }
)

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"]

interface BadgeProps
  extends React.ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  tone?: BadgeVariant
  icon?: LucideIcon
}

function Badge({
  className,
  variant,
  tone,
  size,
  icon: Icon,
  children,
  ...props
}: BadgeProps) {
  const resolvedVariant = tone ?? variant ?? "neutral"

  return (
    <span
      data-slot="badge"
      data-variant={resolvedVariant}
      className={cn(
        badgeVariants({ variant: resolvedVariant, size }),
        className
      )}
      {...props}
    >
      {Icon && <Icon />}
      {children}
    </span>
  )
}

export { Badge, badgeVariants }
