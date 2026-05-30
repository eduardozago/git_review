import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/lib/theme"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "GitReview — AI portfolio code review",
  description:
    "See your repository the way a senior reviewer would — score, dimension breakdowns, and actionable recommendations.",
}

const themeInitScript = `(() => {
  try {
    const stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    const theme = stored === "light" || stored === "dark" ? stored : "${DEFAULT_THEME}";
    document.documentElement.setAttribute("data-theme", theme);
  } catch {}
})();`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
