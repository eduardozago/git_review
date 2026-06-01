import { apiFetch, storeToken, clearToken } from "./api"
import type { User } from "./types/user"

export function getMe(): Promise<User> {
  return apiFetch<User>("/auth/me")
}

export async function logout(): Promise<void> {
  await apiFetch("/auth/logout", { method: "POST" })
  clearToken()
}

/**
 * After OAuth redirect the backend appends ?token=<jwt> to the URL.
 * Call this before getMe() to capture and store the token, then clean the URL.
 */
export function captureTokenFromUrl(): void {
  if (typeof window === "undefined") return
  const params = new URLSearchParams(window.location.search)
  const token = params.get("token")
  if (!token) return
  storeToken(token)
  params.delete("token")
  const clean = params.toString() ? `?${params}` : window.location.pathname
  window.history.replaceState({}, "", clean)
}
