import { Check, Shield, X } from "lucide-react"

import { signInCopy } from "./copy"

export function PermissionsPanel() {
  const { scope } = signInCopy

  return (
    <div className="flex min-h-[280px] flex-col justify-center border-t border-border bg-elev px-6 py-10 md:min-h-screen md:border-t-0 md:border-l md:px-12 lg:px-14">
      <div className="mx-auto w-full max-w-[440px]">
        <div className="mb-5 flex items-center gap-2.5">
          <Shield size={18} className="text-primary" />
          <span className="mono text-xs tracking-wide text-primary uppercase">
            {scope.label}
          </span>
        </div>

        <h2 className="text-[22px] font-semibold tracking-tight text-strong">
          {scope.allowedHeading}
        </h2>
        <ul className="mt-4 flex flex-col gap-3">
          {scope.allowed.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check size={16} className="mt-0.5 shrink-0 text-primary" />
              <span className="text-sm text-foreground">{item}</span>
            </li>
          ))}
        </ul>

        <div className="my-8 h-px bg-border" />

        <h3 className="text-base font-semibold text-strong">
          {scope.deniedHeading}
        </h3>
        <ul className="mt-3.5 flex flex-col gap-2.5">
          {scope.denied.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <X size={14} className="mt-0.5 shrink-0 text-dim" />
              <span className="text-[13.5px] text-muted-foreground">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
