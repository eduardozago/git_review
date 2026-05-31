const pt = {
  heading: "Entrar no GitReview",
  sub: "Acesso somente leitura. Nunca fazemos push nos seus repos.",
  cta: "Continuar com o GitHub",
  back: "Voltar",
  terms: {
    prefix: "Ao continuar você concorda com nossos",
    terms: "Termos",
    and: "e",
    privacy: "Política de privacidade",
  },
  footer: "gitreview.dev · 2026",
  scope: {
    label: "Permissões",
    allowedHeading: "O que vamos ler",
    allowed: [
      "Sua lista de repositórios públicos",
      "Conteúdo do repositório que você escolher",
      "Perfil público (nome, avatar, usuário)",
    ],
    deniedHeading: "O que não faremos",
    denied: [
      "Sem commits, pushes ou pull requests",
      "Sem acesso a repositórios privados por padrão",
      "Código não é armazenado após o relatório",
    ],
  },
}

const en = {
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
}

export const signInCopy = { pt, en }
