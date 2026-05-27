import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  action?: ReactNode;
}

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="m-0 text-sm font-medium tracking-tight text-muted-foreground">
        {title}
      </h2>
      {action}
    </div>
  );
}
