"use client"

import * as React from "react"
import { useState } from "react"
import { GallerySection } from "@/lib/gallery-data"
import { Typography } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

interface GalleryLayoutProps {
  sections: GallerySection[]
  className?: string
}

export function GalleryLayout({ sections, className }: GalleryLayoutProps) {
  const [selectedItem, setSelectedItem] = useState<{
    section: string
    item: string
  } | null>(
    sections.length > 0 && sections[0].items.length > 0
      ? { section: sections[0].name, item: sections[0].items[0].name }
      : null
  )

  const currentItem = selectedItem
    ? sections
        .find((s) => s.name === selectedItem.section)
        ?.items.find((i) => i.name === selectedItem.item)
    : null

  return (
    <div className={cn("flex h-full", className)}>
      {/* Sidebar - List of gallery items */}
      <div className="w-80 border-r border-border bg-card overflow-auto">
        <div className="p-4">
          <Typography variant="header-2-semibold" as="h2">
            Fleet Air Gallery
          </Typography>
          <Typography variant="small" className="text-muted-foreground mt-1">
            Component library showcasing Fleet Air design patterns
          </Typography>
        </div>
        
        <nav className="px-2 pb-4">
          {sections.map((section) => (
            <div key={section.name} className="mb-6">
              <Typography
                variant="header-4-semibold"
                className="px-3 py-2 text-muted-foreground uppercase tracking-wider"
              >
                {section.name}
              </Typography>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.name}
                    onClick={() =>
                      setSelectedItem({ section: section.name, item: item.name })
                    }
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md transition-colors",
                      "hover:bg-muted/50",
                      selectedItem?.section === section.name &&
                        selectedItem?.item === item.name
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <Typography variant="default" className="font-medium">
                      {item.name}
                    </Typography>
                    {item.description && (
                      <Typography variant="small" className="text-muted-foreground mt-1">
                        {item.description}
                      </Typography>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        {currentItem ? (
          <div className="p-8">
            <div className="mb-6">
              <Typography variant="header-1-semibold" as="h1">
                {currentItem.name}
              </Typography>
              {currentItem.description && (
                <Typography variant="default" className="text-muted-foreground mt-2">
                  {currentItem.description}
                </Typography>
              )}
            </div>
            
            <div className="space-y-8">
              {/* Component showcase */}
              <div>
                <Typography variant="header-3-semibold" className="mb-4">
                  Preview
                </Typography>
                <div className="p-6 rounded-lg border border-border bg-background">
                  {currentItem.component}
                </div>
              </div>

              {/* Source code (if available) */}
              {currentItem.sourceCode && (
                <div>
                  <Typography variant="header-3-semibold" className="mb-4">
                    Source Code
                  </Typography>
                  <pre className="p-4 rounded-lg bg-muted overflow-auto">
                    <code className="text-sm font-mono">{currentItem.sourceCode}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Typography variant="default" className="text-muted-foreground">
              Select an item from the sidebar to view its details
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
} 