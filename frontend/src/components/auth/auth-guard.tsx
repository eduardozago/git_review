"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { getMe } from "@/lib/auth"

interface Props {
  children: React.ReactNode
}

export function AuthGuard({ children }: Props) {
  const router = useRouter()

  useEffect(() => {
    getMe().catch(() => router.replace("/sign-in"))
  }, [router])

  return <>{children}</>
}
