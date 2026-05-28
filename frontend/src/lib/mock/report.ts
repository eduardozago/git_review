import type { Report } from "@/lib/types/report"

export const MOCK_REPORT: Report = {
  id: "demo",
  owner: "gabriellopessdev",
  repo: "spotify-clone-react",
  branch: "main",
  commit: "8f2c1d4",
  files: 142,
  lines: 9847,
  primaryLang: "TypeScript",
  durationSec: 47,
  generatedAt: "May 24, 2026 · 14:32",
  score: 72,
  prevScore: 64,
  summary:
    "Solid mid-level codebase with clear momentum. The architecture instincts are there — naming and folder structure are above average for the level. The fastest gains will come from extracting a service layer and adding meaningful tests.",
  dimensions: [
    {
      id: "clean",
      label: "Clean Code",
      score: 78,
      tagline:
        "Naming and function size are strong. A handful of god-functions in /pages drag the average.",
      positives: [
        {
          h: "Consistent naming conventions",
          d: "camelCase for variables, PascalCase for components, kebab-case for files. No exceptions found.",
        },
        {
          h: "Small, single-purpose components",
          d: "82% of components are under 80 lines. Below the 'too much logic in JSX' threshold.",
        },
        {
          h: "Type names are intentional",
          d: "Track, Album, Playlist are domain-modeled — not just stand-ins for any.",
        },
      ],
      improvements: [
        {
          h: "Three functions exceed 60 lines",
          d: "PlayerPage.handlePlay, AuthCallback.useEffect, and PlaylistGrid.render. Extract handlers.",
          severity: "warn",
        },
        {
          h: "27 `any` casts across the repo",
          d: "Most are in /api response handlers. Generate types from your OpenAPI spec.",
          severity: "warn",
        },
        {
          h: "Magic numbers in PlayerControls",
          d: "`300`, `0.8`, `24` appear inline. Promote to named constants.",
          severity: "info",
        },
      ],
      snippet: {
        file: "src/pages/PlayerPage.tsx",
        startLine: 84,
        comment:
          "This handler bundles network, state, and UI concerns. Extract a usePlayback hook.",
        code: `function handlePlay(trackId: string) {
  setLoading(true);
  fetch(\`/api/tracks/\${trackId}\`)
    .then(r => r.json())
    .then((data: any) => {
      audioRef.current.src = data.preview_url;
      audioRef.current.play();
      setCurrentTrack(data);
      setLoading(false);
      analytics.track("play", { id: trackId });
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
}`,
      },
    },
    {
      id: "patterns",
      label: "Design Patterns",
      score: 65,
      tagline:
        "Container/Presenter split is healthy. A Context is doing the work of a store — that's the ceiling.",
      positives: [
        {
          h: "Clean Container/Presenter split",
          d: "Pages own data fetching, components are presentational. Easy to test in isolation.",
        },
        {
          h: "Custom hooks for cross-cutting concerns",
          d: "useAuth, useDebounce, useMediaQuery — reused 11+ times each.",
        },
      ],
      improvements: [
        {
          h: "PlayerContext is doing too much",
          d: "Holds queue, current track, volume, shuffle, repeat. This is a store. Migrate to Zustand or Redux Toolkit.",
          severity: "warn",
        },
        {
          h: "Prop drilling in Library tree",
          d: "onPlay is threaded 4 levels deep through Sidebar → Section → Card → PlayButton.",
          severity: "warn",
        },
        {
          h: "Duplicated fetch logic",
          d: "Same try/catch + loading pattern in 6 files. Build a useQuery wrapper or adopt TanStack Query.",
          severity: "info",
        },
      ],
      snippet: {
        file: "src/contexts/PlayerContext.tsx",
        startLine: 1,
        comment:
          "This Context manages 9 distinct state slices. That's a store, not a context.",
        code: `export const PlayerContext = createContext<{
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  volume: number;
  shuffle: boolean;
  repeat: "off" | "one" | "all";
  history: Track[];
  position: number;
  duration: number;
  setVolume: (v: number) => void;
  play: (t: Track) => void;
  pause: () => void;
  next: () => void;
  // ...11 more methods
}>(null!);`,
      },
    },
    {
      id: "system",
      label: "System Design",
      score: 70,
      tagline:
        "Layered structure is clear. The /api layer leaks into components — pinch that off behind a service.",
      positives: [
        {
          h: "Clear top-level layout",
          d: "/pages, /components, /hooks, /lib. A new contributor finds things in under 30 seconds.",
        },
        {
          h: "Barrel exports stay shallow",
          d: "No deep re-export chains. Tree-shaking works.",
        },
        {
          h: "Env handling via a single config module",
          d: "All process.env reads happen in src/lib/env.ts. Easy to audit.",
        },
      ],
      improvements: [
        {
          h: "API calls in 14 components",
          d: "fetch() lives next to JSX. Introduce a /services layer that components consume via hooks.",
          severity: "warn",
        },
        {
          h: "No clear domain boundaries",
          d: "Auth, playback, and library entities are interleaved in /types. Group by feature or domain.",
          severity: "info",
        },
        {
          h: "Build artifacts checked into git",
          d: "/dist appears in 3 commits. Add to .gitignore retroactively.",
          severity: "info",
        },
      ],
      snippet: {
        file: "src/components/TrackRow.tsx",
        startLine: 12,
        comment:
          "A presentational component is fetching. This belongs in a hook or service, called by the parent page.",
        code: `export function TrackRow({ id }: { id: string }) {
  const [track, setTrack] = useState<Track | null>(null);
  useEffect(() => {
    fetch(\`/api/tracks/\${id}\`)
      .then(r => r.json())
      .then(setTrack);
  }, [id]);
  if (!track) return <Skeleton />;
  return <div>{track.name}</div>;
}`,
      },
    },
    {
      id: "practices",
      label: "Best Practices",
      score: 75,
      tagline:
        "README and CI are above average. Tests are thin where it matters — auth and payments.",
      positives: [
        {
          h: "Strong README",
          d: "Setup, env vars, architecture diagram, contribution guide. Cited as a portfolio asset.",
        },
        {
          h: "Pre-commit hooks via husky",
          d: "Lint + typecheck before commit. No broken main.",
        },
        {
          h: "CI runs on every PR",
          d: "GitHub Actions: install → lint → test → build. 2m 14s average.",
        },
      ],
      improvements: [
        {
          h: "23% test coverage",
          d: "Healthy lib/ coverage, almost nothing in /pages. The branches that matter are untested.",
          severity: "warn",
        },
        {
          h: "Errors are swallowed",
          d: "11 catch blocks log to console and continue. Add a toast/notify layer.",
          severity: "warn",
        },
        {
          h: "No accessibility checks in CI",
          d: "axe-core or pa11y would catch missing labels and contrast issues automatically.",
          severity: "info",
        },
      ],
      snippet: {
        file: "src/lib/auth.ts",
        startLine: 42,
        comment:
          "Auth failure goes to console.error and the user keeps moving. This needs to surface to the UI.",
        code: `export async function refreshToken() {
  try {
    const res = await fetch("/api/auth/refresh", { method: "POST" });
    const data = await res.json();
    localStorage.setItem("token", data.token);
    return data.token;
  } catch (err) {
    console.error("refresh failed", err);
    // user is silently logged out
  }
}`,
      },
    },
  ],
  nextSteps: [
    {
      h: "Extract a /services layer for API calls",
      d: "Move every fetch() into src/services/ and consume via custom hooks. Unblocks pattern fixes and test coverage at the same time.",
      priority: "high",
      effort: "medium",
      impact: "high",
      dim: "system",
    },
    {
      h: "Migrate PlayerContext to a real store",
      d: "Zustand is the lightest option. You'll lose ~80 lines of context boilerplate and gain selectors that prevent unnecessary re-renders.",
      priority: "high",
      effort: "medium",
      impact: "high",
      dim: "patterns",
    },
    {
      h: "Add coverage on /pages and /lib/auth",
      d: "Aim for 50% over the next two weeks. Recruiters notice. The hard branches (token refresh, error paths) move the needle most.",
      priority: "medium",
      effort: "high",
      impact: "medium",
      dim: "practices",
    },
  ],
}
