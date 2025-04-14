// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gig-gle | Inclusive Job Platform",
  description: "An inclusive job discovery and gig-posting platform for youth with disabilities",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <footer className="border-t py-6 md:py-8">
                <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
                  <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © 2025 Gig-gle. All rights reserved.
                  </p>
                  <div className="flex items-center gap-4">
                    <a href="/accessibility" className="text-sm text-muted-foreground hover:underline">
                      Accessibility
                    </a>
                    <a href="/privacy" className="text-sm text-muted-foreground hover:underline">
                      Privacy
                    </a>
                    <a href="/terms" className="text-sm text-muted-foreground hover:underline">
                      Terms
                    </a>
                  </div>
                </div>
              </footer>
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
