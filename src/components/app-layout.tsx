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
            <NavLink href="/examples/typography">Typography</NavLink>
            <NavLink href="/examples/colors">Colors</NavLink>
            <NavLink href="/examples/icons">Icons</NavLink>
          </div>
        </div>
        
        <div className="mb-4">
          <Typography variant="header-4-semibold" className="px-3 py-2 text-xs uppercase tracking-wider text-muted-foreground">
            Components
          </Typography>
          <div className="space-y-1">
            <NavLink href="/examples/buttons">Buttons</NavLink>
            <NavLink href="/examples/toolbar">Toolbar</NavLink>
            <NavLink href="/examples/text-inputs">Text Inputs</NavLink>
            <NavLink href="/examples/tabs">Tabs</NavLink>
            <NavLink href="/examples/lists">Lists</NavLink>
            <NavLink href="/examples/context-menu">Context Menu</NavLink>
            <NavLink href="/examples/checkboxes">Checkboxes</NavLink>
            <NavLink href="/examples/editor">Editor</NavLink>
            <NavLink href="/examples/islands">Islands</NavLink>
            <NavLink href="/examples/main-toolbar">Main Toolbar</NavLink>
            <NavLink href="/examples/ai-chat-input">AI Chat Input</NavLink>
            <NavLink href="/examples/ai-chat-context-preview">AI Chat Context Preview</NavLink>
            <NavLink href="/examples/control-panel">Control Panel</NavLink>
          </div>
        </div>
        
        <div className="mb-4">
          <Typography variant="header-4-semibold" className="px-3 py-2 text-xs uppercase tracking-wider text-muted-foreground">
            Layouts
          </Typography>
          <div className="space-y-1">
            <NavLink href="/examples/window-layout">Window Layout</NavLink>
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