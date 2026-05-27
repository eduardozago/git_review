import type { AnalyzedRepo } from "@/lib/types/repo";
import type { User } from "@/lib/types/user";

export interface DashboardStats {
  reportsGenerated: number;
  averageScore: number;
  bestDimension: { score: number; label: string };
  daysAnalyzed: number;
}

export interface DashboardData {
  user: User;
  analyzedRepos: AnalyzedRepo[];
  stats: DashboardStats;
}

const mockUser: User = {
  username: "gabriellopessdev",
  name: "Gabriel Lopes",
  bio: "Full-stack dev. TypeScript, Python, building things.",
  followers: 47,
  following: 132,
  publicRepos: 24,
};

const mockRepos: AnalyzedRepo[] = [
  {
    id: "spotify-clone-react",
    name: "spotify-clone-react",
    description:
      "A faithful Spotify Web Player clone built with React + TypeScript. Auth, playlists, playback controls.",
    lang: "TypeScript",
    langColor: "#3178c6",
    stars: 47,
    forks: 8,
    files: 142,
    score: 72,
    analyzed: true,
    analyzedAgo: "2 days ago",
  },
  {
    id: "task-manager-api",
    name: "task-manager-api",
    description:
      "REST API for a task manager. Node, Express, Postgres, JWT auth, integration tests.",
    lang: "TypeScript",
    langColor: "#3178c6",
    stars: 12,
    forks: 2,
    files: 68,
    score: 81,
    analyzed: true,
    analyzedAgo: "1 week ago",
  },
  {
    id: "ml-stock-predictor",
    name: "ml-stock-predictor",
    description:
      "LSTM + ARIMA stock price predictor. Jupyter notebooks, scikit-learn, pandas.",
    lang: "Python",
    langColor: "#3572a5",
    stars: 23,
    forks: 5,
    files: 41,
    score: 64,
    analyzed: true,
    analyzedAgo: "3 weeks ago",
  },
  {
    id: "chat-realtime",
    name: "chat-realtime",
    description:
      "Realtime chat with rooms. Socket.io + Redis pub/sub. Presence indicators.",
    lang: "JavaScript",
    langColor: "#f1e05a",
    stars: 31,
    forks: 6,
    files: 54,
    score: 69,
    analyzed: true,
    analyzedAgo: "2 months ago",
  },
  {
    id: "react-hooks-lab",
    name: "react-hooks-lab",
    description:
      "Custom hooks I keep reaching for. useDebounce, useMediaQuery, useLocalStorage.",
    lang: "TypeScript",
    langColor: "#3178c6",
    stars: 19,
    forks: 4,
    files: 22,
    score: 75,
    analyzed: true,
    analyzedAgo: "6 months ago",
  },
];

function buildStats(repos: AnalyzedRepo[]): DashboardStats {
  const averageScore = Math.round(
    repos.reduce((sum, repo) => sum + repo.score, 0) / repos.length,
  );

  return {
    reportsGenerated: repos.length,
    averageScore,
    bestDimension: { score: 78, label: "Clean Code" },
    daysAnalyzed: 12,
  };
}

export function getDashboardData(): DashboardData {
  const analyzedRepos = [...mockRepos];

  return {
    user: mockUser,
    analyzedRepos,
    stats: buildStats(analyzedRepos),
  };
}
