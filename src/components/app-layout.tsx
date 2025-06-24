"use client"

import { Typography } from "@/components/ui/typography"
import { ThemeSwitcher } from "@/components/theme-switcher"
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { FleetIcon } from "@/components/ui/icon"

const NavLink = ({ href, children, icon }: { href: string, children: React.ReactNode, icon?: string }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {icon && (
        <div className="w-4 h-4 flex items-center justify-center">
          <FleetIcon fleet={icon} size="sm" />
        </div>
      )}
      {children}
    </Link>
  )
}

const Sidebar = () => (
  <aside className="fixed top-16 h-[calc(100vh-4rem)] w-64 hidden md:block border-r border-border bg-background overflow-y-auto">
    <div className="py-6 pr-4 pl-6">
      <nav className="space-y-1">
        <div className="mb-4">
          <Typography variant="header-4-semibold" className="px-3 py-2 text-xs uppercase tracking-wider text-muted-foreground">
            Overview
          </Typography>
          <div className="space-y-1">
            <NavLink href="/">Home</NavLink>
          </div>
        </div>
        
        <div className="mb-4">
          <Typography variant="header-4-semibold" className="px-3 py-2 text-xs uppercase tracking-wider text-muted-foreground">
            Design System
          </Typography>
          <div className="space-y-1">
            <NavLink href="/typography">Typography</NavLink>
            <NavLink href="/colors">Colors</NavLink>
            <NavLink href="/icons">Icons</NavLink>
          </div>
        </div>
        
        <div className="mb-4">
          <Typography variant="header-4-semibold" className="px-3 py-2 text-xs uppercase tracking-wider text-muted-foreground">
            Components
          </Typography>
          <div className="space-y-1">
            {/* Removed: <NavLink href="/buttons">Buttons</NavLink> */}
          </div>
        </div>
        
        <div className="mb-4">
          <Typography variant="header-4-semibold" className="px-3 py-2 text-xs uppercase tracking-wider text-muted-foreground">
            Components
          </Typography>
          <div className="space-y-1">
            <NavLink href="/button">Button</NavLink>
          </div>
        </div>
        
        <div className="mb-4">
          <Typography variant="header-4-semibold" className="px-3 py-2 text-xs uppercase tracking-wider text-muted-foreground">
            Development
          </Typography>
          <div className="space-y-1">
            <NavLink href="/test-icons">Icon Debug</NavLink>
          </div>
        </div>
      </nav>
    </div>
  </aside>
)

const Header = () => (
  <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
    <div className="container mx-auto flex items-center justify-between px-6 py-4">
      <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
          <Typography variant="header-4-semibold" className="text-primary-foreground text-xs">
            F
          </Typography>
        </div>
        <div>
          <Typography variant="header-3-semibold">Fleet Air Web Components</Typography>
          <Typography variant="small" className="text-muted-foreground">
            React component library mirroring Fleet design patterns
          </Typography>
        </div>
      </Link>
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