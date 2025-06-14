import { ThemeProvider } from "@/components/theme/theme-provider"

export default function DestinationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="guinee-tourisme-theme">
      {children}
    </ThemeProvider>
  )
} 