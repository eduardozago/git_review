export const landingCopy = {
  nav: {
    pillars: "What we score",
    how: "How it works",
    preview: "Sample report",
    signIn: "Sign in",
  },
  hero: {
    eyebrow: "AI code review for the portfolio era",
    h1a: "See your repo",
    h1b: "the way a senior reviewer does.",
    sub: "GitReview reads your code the way a recruiter reads a resume — front to back, with intent. You get a score, four rubric breakdowns, and the exact lines that moved the needle.",
    cta: "Analyze with GitHub",
    ctaSub: "Read-only access to public repos. No commits, no PRs.",
    meta: [
      "Used by 4,200+ devs",
      "Avg review: 48 seconds",
      "Free for public repos",
    ],
  },
  pillars: {
    eyebrow: "The rubric",
    heading: "Four dimensions. One number you can put on LinkedIn.",
    items: [
      {
        key: "clean",
        title: "Clean Code",
        description:
          "Naming, function size, single-responsibility. The things every senior calls out in the first pass.",
      },
      {
        key: "patterns",
        title: "Design Patterns",
        description:
          "We flag the patterns you used well, and the anti-patterns hiding in plain sight.",
      },
      {
        key: "system",
        title: "System Design",
        description:
          "Folder structure, layer separation, scalability. Whether your codebase can grow without rewriting.",
      },
      {
        key: "practices",
        title: "Best practices",
        description:
          "Tests, docs, error handling, observability. The boring stuff that separates juniors from seniors.",
      },
    ],
  },
  how: {
    eyebrow: "Three steps",
    heading: "From repo to receipts in under a minute.",
    steps: [
      {
        n: "01",
        title: "Connect GitHub",
        description:
          "OAuth sign-in. Read-only. We never push, comment, or open PRs.",
      },
      {
        n: "02",
        title: "Pick a repo",
        description:
          "Any public repository you own. We index the tree, language mix, and recent commits.",
      },
      {
        n: "03",
        title: "Get your report",
        description:
          "Score, breakdown, evidence snippets, and a ranked list of what to fix next.",
      },
    ],
  },
  preview: {
    eyebrow: "Sample output",
    heading: "This is what reviewers actually see.",
    sub: "A live report from a real public repo. Click through the tabs — it's interactive.",
    openFull: "Open full report",
    liveDemo: "Live demo",
    tabs: {
      overview: "Overview",
      clean: "Clean Code",
      patterns: "Design Patterns",
    },
    summary: "Summary",
    summaryBlurb:
      "Solid mid-level codebase with clear momentum. The architecture instincts are there — naming and folder structure are above average for the level. The fastest gains will come from extracting a service layer and adding meaningful tests.",
  },
  finalCta: {
    heading: "One score. Four breakdowns.",
    headingMuted: "About a minute.",
  },
  footer: {
    made: "A side project, taken seriously.",
    links: {
      product: "Product",
      company: "Company",
      legal: "Legal",
    },
  },
  report: {
    level: "Intermediate",
    delta: "+8 vs last run",
  },
} as const
