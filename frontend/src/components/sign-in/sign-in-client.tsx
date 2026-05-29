"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { getMe } from "@/lib/auth"

import { PermissionsPanel } from "./permissions-panel"
import { SignInPanel } from "./sign-in-panel"

export function SignInClient() {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    getMe()
      .then(() => router.replace("/dashboard"))
      .catch(() => setReady(true))
  }, [router])

  if (!ready) return null

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-2">
      <SignInPanel />
      <PermissionsPanel />
    </div>
  )
}
