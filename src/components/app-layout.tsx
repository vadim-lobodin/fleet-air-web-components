"use client"

import { Typography } from "@/components/ui/typography"
import { ThemeSwitcher } from "@/components/theme-switcher"
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {children}
    </Link>
  )
}

const Sidebar = () => (
  <aside className="fixed top-16 h-[calc(100vh-4rem)] w-64 hidden md:block border-r border-border bg-background">
    <div className="py-6 pr-4 pl-6">
      <nav className="space-y-1">
        <NavLink href="/">Typography</NavLink>
        <NavLink href="/colors">Colors</NavLink>
        <NavLink href="/buttons">Buttons</NavLink>
      </nav>
    </div>
  </aside>
)

const Header = () => (
  <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
    <div className="container mx-auto flex items-center justify-between px-6 py-4">
      <div>
        <Typography variant="header-3-semibold">Fleet Air Web Components</Typography>
        <Typography variant="small" className="text-muted-foreground">
          A showcase of Fleet design system components
        </Typography>
      </div>
      <ThemeSwitcher />
    </div>
  </header>
)

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="container mx-auto flex">
        <Sidebar />
        <main className="md:pl-64 w-full">
          <div className="p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 