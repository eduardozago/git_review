export const reposCopy = {
  heading: "Choose a repository",
  sub: "We'll scan the default branch. Takes about a minute.",
  searchPlaceholder: "Filter repositories…",
  sortRecent: "Recently updated",
  sortStars: "Most stars",
  sortAz: "A → Z",
  allLanguages: "All",
  startAnalysis: "Start analysis",
  cancel: "Cancel",
  repoCount: (count: number) => `${count} repositories`,
  lastScore: (score: number) => `Last: ${score}`,
  empty: "No repos match those filters.",
} as const
