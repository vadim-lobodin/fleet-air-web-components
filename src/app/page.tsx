import { Typography } from "@/components/ui/typography"
import { FleetIcon, LucideIcon, Icon } from "@/components/ui/icon"

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Typography variant="header-1-semibold">
          Welcome to Fleet Air Web Components
        </Typography>
        <Typography variant="default" className="text-muted-foreground">
          A React component library that mirrors Fleet Air design patterns for rapid web prototyping.
          Use the navigation panel on the left to explore different components and design system elements.
        </Typography>
      </div>

      {/* Quick Start Section */}
      <div className="space-y-4">
        <Typography variant="header-2-semibold">Quick Start</Typography>
        <div className="p-6 border border-border rounded-lg bg-muted/20">
          <div className="space-y-4">
            <Typography variant="default">
              Get started by exploring the different sections:
            </Typography>
            <ul className="space-y-2 ml-6">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <Typography variant="default">
                  <Typography variant="default-semibold">Typography</Typography> - Complete text styling system
                </Typography>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <Typography variant="default">
                  <Typography variant="default-semibold">Colors</Typography> - Fleet color palette and semantic tokens
                </Typography>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <Typography variant="default">
                  <Typography variant="default-semibold">Icons</Typography> - Fleet and Lucide icon systems
                </Typography>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <Typography variant="default">
                  <Typography variant="default-semibold">Buttons</Typography> - Interactive button components
                </Typography>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Icon System Preview */}
      <div className="space-y-4">
        <Typography variant="header-2-semibold">Icon System Preview</Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 p-4 border border-border rounded-lg">
            <Typography variant="header-3-semibold">Fleet Icons</Typography>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center space-y-1">
                <FleetIcon fleet="run" size="lg" />
                <Typography variant="code" className="text-xs">run</Typography>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <FleetIcon fleet="chevron-down" size="lg" />
                <Typography variant="code" className="text-xs">chevron-down</Typography>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <FleetIcon fleet="ai/chat" size="lg" />
                <Typography variant="code" className="text-xs">ai/chat</Typography>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <FleetIcon fleet="terminal" size="lg" />
                <Typography variant="code" className="text-xs">terminal</Typography>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <FleetIcon fleet="folder" size="lg" />
                <Typography variant="code" className="text-xs">folder</Typography>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <FleetIcon fleet="settings" size="lg" />
                <Typography variant="code" className="text-xs">settings</Typography>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 border border-border rounded-lg">
            <Typography variant="header-3-semibold">Lucide Icons</Typography>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center space-y-1">
                <LucideIcon lucide="Play" size="lg" />
                <Typography variant="code" className="text-xs">Play</Typography>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <LucideIcon lucide="ChevronDown" size="lg" />
                <Typography variant="code" className="text-xs">ChevronDown</Typography>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <LucideIcon lucide="MessageCircle" size="lg" />
                <Typography variant="code" className="text-xs">MessageCircle</Typography>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <LucideIcon lucide="Terminal" size="lg" />
                <Typography variant="code" className="text-xs">Terminal</Typography>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <LucideIcon lucide="Folder" size="lg" />
                <Typography variant="code" className="text-xs">Folder</Typography>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <LucideIcon lucide="Settings" size="lg" />
                <Typography variant="code" className="text-xs">Settings</Typography>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 border border-border rounded-lg">
          <Typography variant="header-3-semibold">Icon Sizes</Typography>
          <div className="flex items-center space-x-2 mt-2">
            <FleetIcon fleet="run" size="xs" />
            <FleetIcon fleet="run" size="sm" />
            <FleetIcon fleet="run" size="md" />
            <FleetIcon fleet="run" size="lg" />
            <FleetIcon fleet="run" size="xl" />
            <FleetIcon fleet="run" size="2xl" />
          </div>
          <Typography variant="code" className="text-xs mt-2">xs, sm, md, lg, xl, 2xl</Typography>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="space-y-4">
        <Typography variant="header-2-semibold">Technology Stack</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <Typography variant="header-4-semibold">Frontend</Typography>
            <ul className="mt-2 space-y-1">
              <li><Typography variant="small">React 19 with modern hooks</Typography></li>
              <li><Typography variant="small">Next.js 15 with App Router</Typography></li>
              <li><Typography variant="small">TypeScript for type safety</Typography></li>
              <li><Typography variant="small">Tailwind CSS for styling</Typography></li>
            </ul>
          </div>
          <div className="p-4 border border-border rounded-lg">
            <Typography variant="header-4-semibold">Components</Typography>
            <ul className="mt-2 space-y-1">
              <li><Typography variant="small">Radix UI primitives</Typography></li>
              <li><Typography variant="small">Class Variance Authority</Typography></li>
              <li><Typography variant="small">Fleet design system</Typography></li>
              <li><Typography variant="small">Lucide React icons</Typography></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
