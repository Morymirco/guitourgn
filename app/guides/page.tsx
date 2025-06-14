"use client"

import GuidesPage from "@/components/guides/guides-page"
import { ThemeProvider } from "@/components/theme/theme-provider"

export default function Guides() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="guinee-tourisme-theme">
      <GuidesPage />
    </ThemeProvider>
  )
}
