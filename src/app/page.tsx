import { Typography } from "@/components/ui/typography"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-12">
      <div className="space-y-4">
        <Typography variant="header-1-semibold">
          Fleet Air Web Components
        </Typography>
        <Typography variant="default" className="text-muted-foreground">
          A React component library that mirrors Fleet Air design patterns for rapid web prototyping.
          Use the navigation panel on the left to explore different components and design system elements.
        </Typography>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/examples/typography" className="group">
          <div className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors bg-card hover:bg-accent/5">
            <Typography variant="header-3-semibold" className="mb-2">
              Typography
            </Typography>
            <Typography variant="default" className="text-muted-foreground">
              Complete text styling system with Fleet variants, weights, and sizes
            </Typography>
          </div>
        </Link>

        <Link href="/examples/colors" className="group">
          <div className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors bg-card hover:bg-accent/5">
            <Typography variant="header-3-semibold" className="mb-2">
              Colors
            </Typography>
            <Typography variant="default" className="text-muted-foreground">
              Fleet color palette with 200+ colors and semantic tokens
            </Typography>
          </div>
        </Link>

        <Link href="/examples/icons" className="group">
          <div className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors bg-card hover:bg-accent/5">
            <Typography variant="header-3-semibold" className="mb-2">
              Icons
            </Typography>
            <Typography variant="default" className="text-muted-foreground">
              Fleet and Lucide icon systems with multiple sizes and variants
            </Typography>
          </div>
        </Link>

        <Link href="/examples/buttons" className="group">
          <div className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors bg-card hover:bg-accent/5">
            <Typography variant="header-3-semibold" className="mb-2">
              Buttons
            </Typography>
            <Typography variant="default" className="text-muted-foreground">
              Interactive button components with Fleet styling and states
            </Typography>
          </div>
        </Link>

        <Link href="/examples/text-inputs" className="group">
          <div className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors bg-card hover:bg-accent/5">
            <Typography variant="header-3-semibold" className="mb-2">
              Text Inputs
            </Typography>
            <Typography variant="default" className="text-muted-foreground">
              Complete text input and textarea components with Fleet styling and variants
            </Typography>
          </div>
        </Link>

        <Link href="/examples/lists" className="group">
          <div className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors bg-card hover:bg-accent/5">
            <Typography variant="header-3-semibold" className="mb-2">
              Lists
            </Typography>
            <Typography variant="default" className="text-muted-foreground">
              Fleet list components with multiple variants and interactive file tree examples
            </Typography>
          </div>
        </Link>

        <Link href="/examples/checkboxes" className="group">
          <div className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors bg-card hover:bg-accent/5">
            <Typography variant="header-3-semibold" className="mb-2">
              Checkboxes
            </Typography>
            <Typography variant="default" className="text-muted-foreground">
              Fleet checkbox components with multiple states and variants
            </Typography>
          </div>
        </Link>

        <Link href="/examples/tabs" className="group">
          <div className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors bg-card hover:bg-accent/5">
            <Typography variant="header-3-semibold" className="mb-2">
              Tabs
            </Typography>
            <Typography variant="default" className="text-muted-foreground">
              Draggable tab system with islands and multi-panel support
            </Typography>
          </div>
        </Link>

        <Link href="/examples/islands" className="group">
          <div className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors bg-card hover:bg-accent/5">
            <Typography variant="header-3-semibold" className="mb-2">
              Islands
            </Typography>
            <Typography variant="default" className="text-muted-foreground">
              Fleet island components for organizing UI into distinct floating panels
            </Typography>
          </div>
        </Link>

        <Link href="/examples/main-toolbar" className="group">
          <div className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors bg-card hover:bg-accent/5">
            <Typography variant="header-3-semibold" className="mb-2">
              Main Toolbar
            </Typography>
            <Typography variant="default" className="text-muted-foreground">
              Fleet main toolbar with workspace controls and navigation
            </Typography>
          </div>
        </Link>

        <Link href="/examples/window-layout" className="group">
          <div className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors bg-card hover:bg-accent/5">
            <Typography variant="header-3-semibold" className="mb-2">
              Window Layout
            </Typography>
            <Typography variant="default" className="text-muted-foreground">
              Complete Fleet window layout with resizable panels and draggable tabs
            </Typography>
          </div>
        </Link>

        <Link href="/examples/3d-islands" className="group">
          <div className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors bg-card hover:bg-accent/5 transform hover:scale-[1.02] transition-transform">
            <Typography variant="header-3-semibold" className="mb-2">
              🌊 3D Islands
            </Typography>
            <Typography variant="default" className="text-muted-foreground">
              Experimental 3D floating islands with depth, perspective, and interactive effects
            </Typography>
          </div>
        </Link>
      </div>
      </div>
    </div>
  )
}
