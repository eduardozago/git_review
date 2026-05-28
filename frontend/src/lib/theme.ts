export type Theme = "dark" | "light"

export const THEME_STORAGE_KEY = "theme"
export const DEFAULT_THEME: Theme = "dark"

const themeListeners = new Set<() => void>()

export function subscribeTheme(onStoreChange: () => void) {
  themeListeners.add(onStoreChange)
  return () => {
    themeListeners.delete(onStoreChange)
  }
}

export function getThemeSnapshot(): Theme {
  if (typeof document === "undefined") return DEFAULT_THEME
  const attr = document.documentElement.getAttribute("data-theme")
  if (attr === "light" || attr === "dark") return attr
  return DEFAULT_THEME
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme)
  localStorage.setItem(THEME_STORAGE_KEY, theme)
  themeListeners.forEach((listener) => listener())
}

export function getStoredTheme(): Theme {
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === "light" || stored === "dark") return stored
  return DEFAULT_THEME
}
