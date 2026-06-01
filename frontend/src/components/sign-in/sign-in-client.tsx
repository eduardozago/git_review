"use client"

import { PermissionsPanel } from "./permissions-panel"
import { SignInPanel } from "./sign-in-panel"

export function SignInClient() {
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-2">
      <SignInPanel />
      <PermissionsPanel />
    </div>
  )
}
