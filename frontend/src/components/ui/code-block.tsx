"use client"

import { File, Sparkles } from "lucide-react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

const KEYWORDS = new Set([
  "const",
  "let",
  "var",
  "function",
  "return",
  "import",
  "from",
  "export",
  "if",
  "else",
  "for",
  "while",
  "new",
  "class",
  "extends",
  "interface",
  "type",
  "async",
  "await",
  "try",
  "catch",
  "then",
  "throw",
  "null",
  "true",
  "false",
  "of",
  "in",
])

const TOKEN_RE =
  /(\/\/[^\n]*$|"[^"\\]*(?:\\.[^"\\]*)*"|`[^`\\]*(?:\\.[^`\\]*)*`|'[^'\\]*(?:\\.[^'\\]*)*'|\b(?:const|let|var|function|return|import|from|export|if|else|for|while|new|class|extends|interface|type|async|await|try|catch|then|throw|null|true|false|of|in)\b|\b\d+(?:\.\d+)?\b|\b[A-Z][A-Za-z0-9_]*\b|\b[a-z_][A-Za-z0-9_]*(?=\())/g

function tokenizeLine(line: string): ReactNode[] {
  const commentMatch = line.match(/^(\s*)(\/\/.*)$/)
  if (commentMatch) {
    return [
      <span key="indent">{commentMatch[1]}</span>,
      <span key="comment" className="text-code-comment">
        {commentMatch[2]}
      </span>,
    ]
  }

  const parts: ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null

  while ((match = TOKEN_RE.exec(line))) {
    if (match.index > last) {
      parts.push(<span key={`t-${last}`}>{line.slice(last, match.index)}</span>)
    }

    const token = match[0]
    let colorClass = "text-code-text"

    if (token.startsWith("//")) {
      colorClass = "text-code-comment"
    } else if (
      token.startsWith('"') ||
      token.startsWith("`") ||
      token.startsWith("'")
    ) {
      colorClass = "text-code-string"
    } else if (/^\d/.test(token)) {
      colorClass = "text-code-num"
    } else if (KEYWORDS.has(token)) {
      colorClass = "text-code-keyword"
    } else {
      colorClass = "text-code-fn"
    }

    parts.push(
      <span key={`t-${match.index}`} className={colorClass}>
        {token}
      </span>
    )
    last = match.index + token.length
  }

  if (last < line.length) {
    parts.push(<span key={`t-${last}`}>{line.slice(last)}</span>)
  }

  return parts
}

interface CodeBlockProps {
  code: string
  file?: string
  startLine?: number
  comment?: string
  className?: string
}

export function CodeBlock({
  code,
  file,
  startLine = 1,
  comment,
  className,
}: CodeBlockProps) {
  const lines = code.split("\n")

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2.5 border border-border bg-code-bg text-3.25",
        className
      )}
    >
      {(file || comment) && (
        <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-3.5 py-2.5">
          {file && (
            <div className="row mono gap-2 text-xs text-muted-foreground">
              <File size={13} />
              {file}
            </div>
          )}
          <div className="mono text-2.75 text-dim">
            L{startLine}–L{startLine + lines.length - 1}
          </div>
        </div>
      )}

      <div className="mono overflow-auto py-3.5">
        {lines.map((line, index) => (
          <div
            key={`${startLine + index}-${line}`}
            className="grid grid-cols-[11_1fr] leading-[1.6]"
          >
            <span className="select-none pr-3.5 text-right text-faint">
              {startLine + index}
            </span>
            <code className="whitespace-pre text-code-text">
              {tokenizeLine(line)}
            </code>
          </div>
        ))}
      </div>

      {comment && (
        <div className="flex items-start gap-2.5 border-t border-border bg-card px-3.5 py-2.5 text-3.25 text-muted-foreground">
          <Sparkles size={14} className="mt-0.5 shrink-0 text-plum" />
          <span>{comment}</span>
        </div>
      )}
    </div>
  )
}
