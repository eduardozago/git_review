"use client";

import { useEffect, useRef } from "react";

import { analysisCopy } from "./copy";

interface LogLine {
  text: string;
}

interface PipelineLogProps {
  lines: LogLine[];
}

export function PipelineLog({ lines }: PipelineLogProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [lines.length]);

  return (
    <div className="mt-7">
      <div className="flex justify-between items-center mb-2">
        <span className="mono text-2.75 text-dim uppercase tracking-widest">
          {analysisCopy.logLabel}
        </span>
        <span className="mono text-2.75 text-dim">{lines.length} lines</span>
      </div>
      <div
        ref={ref}
        className="mono bg-code-bg border border-border rounded-xl p-4 h-40 overflow-auto text-xs leading-relaxed"
      >
        {lines.map((l, i) => (
          <div
            key={i}
            className={
              l.text.startsWith("✓")
                ? "text-primary"
                : l.text.startsWith("$")
                  ? "text-foreground"
                  : "text-muted-foreground"
            }
          >
            {l.text}
          </div>
        ))}
        <Cursor />
      </div>
    </div>
  );
}

function Cursor() {
  return (
    <>
      <span className="inline-block w-1.5 h-3.5 bg-primary align-middle animate-[blink_1s_steps(2)_infinite]" />
      <style>{`@keyframes blink{50%{opacity:0}}`}</style>
    </>
  );
}
