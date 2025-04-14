"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Briefcase } from "lucide-react"

export default function Header() {
  const { isSignedIn } = useUser()
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            <span className="text-xl font-bold">Gig-gle</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm ml-6">
            <Link
              href="/"
              className={`transition-colors hover:text-foreground/80 ${pathname === "/" ? "text-foreground font-medium" : "text-foreground/60"}`}
            >
              Home
            </Link>
            <Link
              href="/gigs"
              className={`transition-colors hover:text-foreground/80 ${pathname === "/gigs" || pathname.startsWith("/gigs/") ? "text-foreground font-medium" : "text-foreground/60"}`}
            >
              Find Gigs
            </Link>
            {isSignedIn && (
              <>
                <Link
                  href="/post-gig"
                  className={`transition-colors hover:text-foreground/80 ${pathname === "/post-gig" ? "text-foreground font-medium" : "text-foreground/60"}`}
                >
                  Post a Gig
                </Link>
                <Link
                  href="/my-gigs"
                  className={`transition-colors hover:text-foreground/80 ${pathname === "/my-gigs" ? "text-foreground font-medium" : "text-foreground/60"}`}
                >
                  My Gigs
                </Link>
                <Link
                  href="/applications"
                  className={`transition-colors hover:text-foreground/80 ${pathname === "/applications" ? "text-foreground font-medium" : "text-foreground/60"}`}
                >
                  My Applications
                </Link>
                <Link
                  href="/chat"
                  className={`transition-colors hover:text-foreground/80 ${pathname === "/chat" ? "text-foreground font-medium" : "text-foreground/60"}`}
                >
                  Messages
                </Link>
              </>
            )}
            <Link
              href="/about"
              className={`transition-colors hover:text-foreground/80 ${pathname === "/about" ? "text-foreground font-medium" : "text-foreground/60"}`}
            >
              About
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Sign up</Button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
