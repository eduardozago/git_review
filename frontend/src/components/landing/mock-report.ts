export interface LandingReportSnippet {
  file: string
  startLine: number
  code: string
  comment?: string
}

export interface LandingReportDimension {
  id: string
  label: string
  score: number
  tagline: string
  positives: { h: string }[]
  improvements: { h: string }[]
  snippet: LandingReportSnippet
}

export interface LandingReportPreview {
  owner: string
  repo: string
  score: number
  prevScore: number
  generatedAt: string
  dimensions: LandingReportDimension[]
}

/** Minimal report data for landing preview cards only. */
export const landingReportPreview: LandingReportPreview = {
  owner: "gabriellopessdev",
  repo: "spotify-clone-react",
  score: 72,
  prevScore: 64,
  generatedAt: "May 24, 2026 · 14:32",
  dimensions: [
    {
      id: "clean",
      label: "Clean Code",
      score: 78,
      tagline:
        "Naming and function size are strong. A handful of god-functions in /pages drag the average.",
      positives: [
        { h: "Consistent naming conventions" },
        { h: "Small, single-purpose components" },
      ],
      improvements: [
        { h: "Three functions exceed 60 lines" },
        { h: "27 `any` casts across the repo" },
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
        { h: "Clean Container/Presenter split" },
        { h: "Custom hooks for cross-cutting concerns" },
      ],
      improvements: [
        { h: "PlayerContext is doing too much" },
        { h: "Prop drilling in Library tree" },
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
      positives: [{ h: "Clear top-level layout" }],
      improvements: [{ h: "API calls in 14 components" }],
      snippet: {
        file: "src/components/TrackRow.tsx",
        startLine: 12,
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
      label: "Best practices",
      score: 75,
      tagline:
        "README and CI are above average. Tests are thin where it matters — auth and payments.",
      positives: [{ h: "Strong README" }],
      improvements: [{ h: "Auth flow has zero integration tests" }],
      snippet: {
        file: "src/pages/PlayerPage.tsx",
        startLine: 84,
        code: `function handlePlay(trackId: string) {
  setLoading(true);
  fetch(\`/api/tracks/\${trackId}\`)
    .then(r => r.json())
    .then((data: any) => {
      audioRef.current.src = data.preview_url;
      audioRef.current.play();
    });
}`,
      },
    },
  ],
}
