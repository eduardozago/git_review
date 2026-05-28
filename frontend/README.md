# GitReview — Frontend

AI-powered code review that scores your repository across four dimensions and generates a detailed report with evidence snippets and a ranked improvement roadmap.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** with custom design tokens
- **shadcn/ui** + **Base UI** for primitives
- **Lucide React** for icons
- **Geist** (Sans + Mono) fonts

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Screens

| Route | Screen |
|-------|--------|
| `/` | Landing page |
| `/sign-in` | GitHub OAuth sign-in |
| `/dashboard` | User dashboard with recent analyses |
| `/repos` | Repository selection |
| `/analysis` | Animated analysis pipeline |
| `/report/[id]` | Full code review report |

> All screens currently use mock data. Use `/report/demo` to see the report with the sample dataset.

## Project structure

```
src/
├── app/                  # Next.js routes (thin server pages)
├── components/
│   ├── ui/               # Design system atoms (Button, Badge, Card, …)
│   ├── landing/
│   ├── auth/
│   ├── dashboard/
│   ├── repos/
│   ├── analysis/
│   └── report/           # Gauge, ScoreDisplay, tabs, dimension cards
└── lib/
    ├── types/            # TypeScript interfaces per domain
    ├── mock/             # Static mock data (replaced by API in Phase 3)
    └── score-level.ts    # Score → level mapping (Beginner / Mid / Senior / Architect)
```

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # ESLint
```
