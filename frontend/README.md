# GitReview — Frontend

Next.js frontend for the GitReview application. Lets users sign in with GitHub, browse and select their public repositories, and view an AI-powered portfolio audit across five scoring pillars.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4**
- **shadcn/ui** + **Base UI** for primitives
- **Lucide React** for icons
- **Geist** (Sans + Mono) fonts via `next/font/google`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

```bash
cp .env.example .env
```

| Variable              | Description      |
| --------------------- | ---------------- |
| `NEXT_PUBLIC_API_URL` | Backend base URL |

## Screens

| Route            | Screen                                      |
| ---------------- | ------------------------------------------- |
| `/`              | Landing page                                |
| `/sign-in`       | GitHub OAuth sign-in                        |
| `/dashboard`     | User dashboard with recent analyses         |
| `/repos`         | Repository selection (real API data)        |
| `/analysis`      | Animated analysis pipeline progress         |
| `/report/[id]`   | Full portfolio audit report                 |
| `/report/result` | Analysis result view                        |

## Project structure

```
src/
├── app/                        # Next.js routes (thin server pages)
├── components/
│   ├── ui/                     # Design system atoms (Button, Badge, Card, …)
│   ├── landing/                # Landing page sections
│   ├── sign-in/                # Sign-in panel and GitHub button
│   ├── dashboard/              # Dashboard cards, stats, recent analyses
│   ├── repos/                  # Repo list, header, row, filters
│   ├── analysis/               # Pipeline progress log and step rows
│   └── report/                 # Gauge, score display, tabs, dimension cards
└── lib/
    ├── api.ts                  # apiFetch<T>() — credentials: include, 204 handling
    ├── auth.ts                 # getMe(), logout()
    ├── repos.ts                # getRepos(), selectRepo(), langColor(), LANG_COLORS
    ├── analysis.ts             # analysis API calls and polling helpers
    ├── dashboard.ts            # dashboard data fetching
    ├── filter-repos.ts         # filterAndSortRepos(), getRepoLanguages()
    ├── score-level.ts          # score → level mapping (Beginner / Mid / Senior / Architect)
    ├── i18n.ts                 # internationalisation helpers
    ├── theme.ts                # theme utilities
    ├── use-language.ts         # language preference hook
    ├── utils.ts                # cn(), timeAgo()
    ├── mock/                   # Static mock data (used while API is being wired)
    └── types/                  # TypeScript interfaces per domain
        ├── user.ts
        ├── repo.ts
        ├── analysis.ts
        └── report.ts
```

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # ESLint
```
