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
        "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
        isActive
          ? "bg-[var(--fleet-background-selected)] text-[var(--fleet-text-primary)]"
          : "text-[var(--fleet-text-primary)] hover:bg-[var(--fleet-background-hover)] hover:text-[var(--fleet-text-primary)]"
      )}
    >
      {icon && (
        <div className="w-4 h-4 flex items-center justify-center">
          <FleetIcon fleet={icon} size="sm" />
        </div>
      )}
      <Typography variant="default-semibold">
        {children}
      </Typography>
    </Link>
  )
}

const Sidebar = () => (
  <aside className="fixed top-0 h-screen w-64 hidden md:block bg-[var(--fleet-background-primary)] overflow-y-auto">
    <div className="py-6 pr-4 pl-6">
      <div className="flex flex-col items-start gap-4 mb-4">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-[var(--fleet-accent-primary)] rounded-md flex items-center justify-center">
            <Typography variant="header-4-semibold" className="text-[var(--fleet-text-on-accent)] text-xs">
              A
            </Typography>
          </div>
          <div>
            <Typography variant="header-3-semibold" className="text-[var(--fleet-text-primary)]">Air Web Components</Typography>
          </div>
        </Link>
        <ThemeSwitcher />
      </div>
      <nav className="space-y-1">
        <div className="mb-4">
          <Typography variant="header-5-semibold" className="px-3 py-2 text-[var(--fleet-text-secondary)]">
            Overview
          </Typography>
          <div className="space-y-1">
            <NavLink href="/">Home</NavLink>
          </div>
        </div>
        
        <div className="mb-4">
          <Typography variant="header-5-semibold" className="px-3 py-2 text-[var(--fleet-text-secondary)]">
            Design System
          </Typography>
          <div className="space-y-1">
            <NavLink href="/examples/typography">Typography</NavLink>
            <NavLink href="/examples/colors">Colors</NavLink>
            <NavLink href="/examples/icons">Icons</NavLink>
          </div>
        </div>
        
        <div className="mb-4">
          <Typography variant="header-5-semibold" className="px-3 py-2 text-[var(--fleet-text-secondary)]">
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
          </div>
        </div>
        
        <div className="mb-4">
          <Typography variant="header-5-semibold" className="px-3 py-2 text-[var(--fleet-text-secondary)]">
            Experimental
          </Typography>
          <div className="space-y-1">
            <NavLink href="/examples/in-input-editor">In-Input Editor</NavLink>
            <NavLink href="/examples/control-panel">Control Panel</NavLink>
          </div>
        </div>
        
        <div className="mb-4">
          <Typography variant="header-5-semibold" className="px-3 py-2 text-[var(--fleet-text-secondary)]">
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

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--fleet-background-primary)] text-[var(--fleet-text-primary)]">
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