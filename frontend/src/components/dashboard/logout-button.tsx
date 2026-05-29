"use client"

import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

import { logout } from "@/lib/auth"
import { dashboardCopy } from "./copy"

export function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    try {
      await logout()
    } finally {
      router.replace("/sign-in")
    }
  }

  return (
    <button
      onClick={handleLogout}
      title={dashboardCopy.signOut}
      className="rounded-md p-1.5 text-dim transition-colors hover:text-muted-foreground"
    >
      <LogOut size={16} />
    </button>
  )
}
