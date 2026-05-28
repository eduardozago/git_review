interface GaugeProps {
  value: number
  size?: number
}

export function Gauge({ value, size = 220 }: GaugeProps) {
  const r = (size - 16) / 2
  const c = 2 * Math.PI * r
  const offset = c - (value / 100) * c

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {/* SVG rotated so progress starts at 12 o'clock */}
      <svg
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)" }}
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--surface-2)"
          strokeWidth="8"
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 1100ms cubic-bezier(.2,.7,.2,1)",
          }}
        />
        {/* Level threshold ticks at 55 / 75 / 88 */}
        {[55, 75, 88].map((tick) => {
          const a = (tick / 100) * 2 * Math.PI
          const x1 = size / 2 + Math.cos(a) * (r - 8)
          const y1 = size / 2 + Math.sin(a) * (r - 8)
          const x2 = size / 2 + Math.cos(a) * (r + 4)
          const y2 = size / 2 + Math.sin(a) * (r + 4)
          return (
            <line
              key={tick}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--text-faint)"
              strokeWidth="1"
            />
          )
        })}
      </svg>

      {/* Centered score overlay */}
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div
            className="font-semibold text-strong"
            style={{ fontSize: size * 0.32, lineHeight: 1, letterSpacing: -2 }}
          >
            {value}
          </div>
          <div
            className="mono text-dim uppercase"
            style={{ fontSize: 11, letterSpacing: 1, marginTop: 4 }}
          >
            / 100
          </div>
        </div>
      </div>
    </div>
  )
}
