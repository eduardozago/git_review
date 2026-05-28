interface InitialAvatarProps {
  name?: string
  size?: number
  className?: string
}

export function InitialAvatar({
  name = "user",
  size = 32,
  className,
}: InitialAvatarProps) {
  const initial = name.charAt(0).toUpperCase()

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background:
          "linear-gradient(135deg, var(--accent) 0%, var(--plum) 100%)",
        display: "grid",
        placeItems: "center",
        color: "#fff",
        fontWeight: 600,
        fontSize: size * 0.42,
        letterSpacing: -0.5,
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      {initial}
    </div>
  )
}
