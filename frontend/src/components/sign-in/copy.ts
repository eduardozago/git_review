export const signInCopy = {
  heading: "Sign in to GitReview",
  sub: "Read-only access. We never push to your repos.",
  cta: "Continue with GitHub",
  back: "Back",
  terms: {
    prefix: "By continuing you agree to our",
    terms: "Terms",
    and: "and",
    privacy: "Privacy policy",
  },
  footer: "gitreview.dev · 2026",
  scope: {
    label: "Scope",
    allowedHeading: "What we'll read",
    allowed: [
      "Your public repository list",
      "File contents of the repo you choose",
      "Public profile (name, avatar, username)",
    ],
    deniedHeading: "What we won't do",
    denied: [
      "No writes, commits, or pull requests",
      "No access to private repos by default",
      "No code stored after the report is generated",
    ],
  },
} as const
