const pt = {
  heading: "Escolha um repositório",
  sub: "Vamos escanear a branch padrão. Leva cerca de um minuto.",
  searchPlaceholder: "Filtrar repositórios…",
  sortRecent: "Atualizado recentemente",
  sortStars: "Mais estrelas",
  sortAz: "A → Z",
  allLanguages: "Todos",
  startAnalysis: "Iniciar análise",
  starting: "Iniciando…",
  cancel: "Cancelar",
  repoCount: (count: number) => `${count} repositórios`,
  lastScore: (score: number) => `Último: ${score}`,
  empty: "Nenhum repositório encontrado.",
}

const en = {
  heading: "Choose a repository",
  sub: "We'll scan the default branch. Takes about a minute.",
  searchPlaceholder: "Filter repositories…",
  sortRecent: "Recently updated",
  sortStars: "Most stars",
  sortAz: "A → Z",
  allLanguages: "All",
  startAnalysis: "Start analysis",
  starting: "Starting…",
  cancel: "Cancel",
  repoCount: (count: number) => `${count} repositories`,
  lastScore: (score: number) => `Last: ${score}`,
  empty: "No repos match those filters.",
}

export const reposCopy = { pt, en }
