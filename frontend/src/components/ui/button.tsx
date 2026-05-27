import Link from "next/link"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-accent-hover",
        primary:
          "bg-primary text-primary-foreground hover:bg-accent-hover",
        secondary:
          "border-border bg-card text-foreground hover:bg-surface-hover",
        ghost:
          "bg-transparent text-muted-foreground hover:bg-transparent hover:text-foreground",
        plum:
          "bg-plum-soft text-plum hover:opacity-90",
        danger:
          "border-border bg-transparent text-destructive hover:bg-destructive/10",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-3.5 text-sm",
        sm: "h-[30px] px-2.5 text-[13px] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 px-5 text-[15px] [&_svg:not([class*='size-'])]:size-[18px]",
        icon: "size-9",
        "icon-sm": "size-[30px]",
        "icon-lg": "size-11",
      },
      full: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      full: false,
    },
  }
)

interface ButtonProps
  extends Omit<ButtonPrimitive.Props, "color">,
    VariantProps<typeof buttonVariants> {
  href?: string
  icon?: LucideIcon
  iconRight?: LucideIcon
}

function Button({
  className,
  variant = "primary",
  size = "default",
  full = false,
  href,
  icon: Icon,
  iconRight: IconRight,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, full }), className)

  const content = (
    <>
      {Icon && <Icon />}
      {children}
      {IconRight && <IconRight />}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <ButtonPrimitive data-slot="button" className={classes} {...props}>
      {content}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
