export type Language = "pt" | "en"

export const LANGUAGE_STORAGE_KEY = "language"
export const DEFAULT_LANGUAGE: Language = "pt"

const listeners = new Set<() => void>()

export function subscribeLanguage(onChange: () => void) {
  listeners.add(onChange)
  return () => listeners.delete(onChange)
}

export function getLanguageSnapshot(): Language {
  if (typeof document === "undefined") return DEFAULT_LANGUAGE
  const attr = document.documentElement.getAttribute("data-lang")
  if (attr === "pt" || attr === "en") return attr
  return DEFAULT_LANGUAGE
}

export function applyLanguage(lang: Language) {
  document.documentElement.setAttribute("data-lang", lang)
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
  listeners.forEach((l) => l())
}

export function getStoredLanguage(): Language {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
  if (stored === "pt" || stored === "en") return stored
  return DEFAULT_LANGUAGE
}
