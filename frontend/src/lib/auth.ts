import { apiFetch } from "./api"
import type { User } from "./types/user"

export function getMe(): Promise<User> {
  return apiFetch<User>("/auth/me")
}

export async function logout(): Promise<void> {
  await apiFetch("/auth/logout", { method: "POST" })
}
