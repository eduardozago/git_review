const pt = {
  nav: {
    pillars: "O que avaliamos",
    how: "Como funciona",
    preview: "Relatório exemplo",
    signIn: "Entrar",
  },
  hero: {
    eyebrow: "Revisão de código IA para a era do portfólio",
    h1a: "Veja seu repositório",
    h1b: "como um revisor sênior vê.",
    sub: "O GitReview lê seu código da forma como um recrutador lê um currículo — do início ao fim, com intenção. Você recebe uma nota, quatro avaliações por dimensão, e as linhas exatas que fizeram diferença.",
    cta: "Analisar com GitHub",
    ctaSub: "Acesso somente leitura a repositórios públicos. Sem commits, sem PRs.",
    meta: [
      "Usado por 4.200+ devs",
      "Análise em: 48 segundos",
      "Grátis para repos públicos",
    ],
  },
  pillars: {
    eyebrow: "A rubrica",
    heading: "Quatro dimensões. Um número que você pode colocar no LinkedIn.",
    items: [
      {
        key: "clean",
        title: "Código Limpo",
        description: "Nomes, tamanho de funções, responsabilidade única. O que todo sênior aponta na primeira leitura.",
      },
      {
        key: "patterns",
        title: "Padrões de Design",
        description: "Identificamos os padrões que você usou bem, e os anti-padrões escondidos à vista de todos.",
      },
      {
        key: "system",
        title: "Design de Sistema",
        description: "Estrutura de pastas, separação de camadas, escalabilidade. Se sua base de código aguenta crescer sem reescrever.",
      },
      {
        key: "practices",
        title: "Boas Práticas",
        description: "Testes, docs, tratamento de erros, observabilidade. O básico chato que separa juniores de sêniores.",
      },
    ],
  },
  how: {
    eyebrow: "Três passos",
    heading: "Do repositório ao relatório em menos de um minuto.",
    steps: [
      {
        n: "01",
        title: "Conectar GitHub",
        description: "Login com OAuth. Somente leitura. Nunca fazemos push, comentamos ou abrimos PRs.",
      },
      {
        n: "02",
        title: "Escolher repositório",
        description: "Qualquer repositório público seu. Indexamos a árvore, mix de linguagens e commits recentes.",
      },
      {
        n: "03",
        title: "Receber o relatório",
        description: "Nota, detalhamento, trechos de evidência e uma lista ranqueada do que corrigir primeiro.",
      },
    ],
  },
  preview: {
    eyebrow: "Exemplo de saída",
    heading: "É isso que os revisores realmente veem.",
    sub: "Um relatório ao vivo de um repositório público real. Clique nas abas — é interativo.",
    openFull: "Abrir relatório completo",
    liveDemo: "Demo ao vivo",
    tabs: {
      overview: "Visão geral",
      clean: "Código Limpo",
      patterns: "Padrões de Design",
    },
    summary: "Resumo",
    summaryBlurb: "Base de código de nível médio sólida com momentum claro. Os instintos de arquitetura estão lá — nomenclatura e estrutura de pastas estão acima da média para o nível. Os ganhos mais rápidos virão de extrair uma camada de serviço e adicionar testes significativos.",
  },
  finalCta: {
    heading: "Uma nota. Quatro análises.",
    headingMuted: "Cerca de um minuto.",
  },
  footer: {
    made: "Um projeto paralelo, levado a sério.",
    links: {
      product: "Produto",
      company: "Empresa",
      legal: "Legal",
    },
  },
  report: {
    level: "Intermediário",
    delta: "+8 vs último",
  },
}

const en = {
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
        description: "Naming, function size, single-responsibility. The things every senior calls out in the first pass.",
      },
      {
        key: "patterns",
        title: "Design Patterns",
        description: "We flag the patterns you used well, and the anti-patterns hiding in plain sight.",
      },
      {
        key: "system",
        title: "System Design",
        description: "Folder structure, layer separation, scalability. Whether your codebase can grow without rewriting.",
      },
      {
        key: "practices",
        title: "Best practices",
        description: "Tests, docs, error handling, observability. The boring stuff that separates juniors from seniors.",
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
        description: "OAuth sign-in. Read-only. We never push, comment, or open PRs.",
      },
      {
        n: "02",
        title: "Pick a repo",
        description: "Any public repository you own. We index the tree, language mix, and recent commits.",
      },
      {
        n: "03",
        title: "Get your report",
        description: "Score, breakdown, evidence snippets, and a ranked list of what to fix next.",
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
    summaryBlurb: "Solid mid-level codebase with clear momentum. The architecture instincts are there — naming and folder structure are above average for the level. The fastest gains will come from extracting a service layer and adding meaningful tests.",
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
}

export const landingCopy = { pt, en }
