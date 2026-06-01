const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"
const TOKEN_KEY = "access_token"

export function storeToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(TOKEN_KEY)
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken()
  const authHeader: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {}

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { ...authHeader, ...(init?.headers as Record<string, string> | undefined) },
    credentials: "include",
  })
  if (!res.ok) throw new Error(String(res.status))
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}
