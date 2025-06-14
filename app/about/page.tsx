"use client"

import AboutPage from "@/components/about/about-page"
import { ThemeProvider } from "@/components/theme/theme-provider"

export default function About() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="guinee-tourisme-theme">
      <AboutPage />
    </ThemeProvider>
  )
}
