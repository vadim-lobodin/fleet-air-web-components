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
      <div className="w-80 border-r border-[var(--fleet-border-primary)] bg-[var(--fleet-background-secondary)] overflow-auto">
        <div className="p-4">
          <Typography variant="header-2-semibold" as="h2" className="text-[var(--fleet-text-primary)]">
            Fleet Air Gallery
          </Typography>
          <Typography variant="default" className="text-[var(--fleet-text-secondary)] mt-1">
            Component library showcasing Fleet Air design patterns
          </Typography>
        </div>
        
        <nav className="px-2 pb-4">
          {sections.map((section) => (
            <div key={section.name} className="mb-6">
              <Typography
                variant="header-5-semibold"
                className="px-3 py-2 text-[var(--fleet-text-secondary)]"
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
                      "hover:bg-[var(--fleet-background-hover)]",
                      selectedItem?.section === section.name &&
                        selectedItem?.item === item.name
                        ? "bg-[var(--fleet-background-selected)] text-[var(--fleet-text-primary)]"
                        : "text-[var(--fleet-text-secondary)]"
                    )}
                  >
                    <Typography variant="default-semibold" className="text-[var(--fleet-text-primary)]">
                      {item.name}
                    </Typography>
                    {item.description && (
                      <Typography variant="default" className="text-[var(--fleet-text-secondary)] mt-1">
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
      <div className="flex-1 overflow-auto bg-[var(--fleet-background-primary)]">
        {currentItem ? (
          <div className="p-8">
            <div className="mb-6">
              <Typography variant="header-1-semibold" as="h1" className="text-[var(--fleet-text-primary)]">
                {currentItem.name}
              </Typography>
              {currentItem.description && (
                <Typography variant="default-multiline" className="text-[var(--fleet-text-secondary)] mt-2">
                  {currentItem.description}
                </Typography>
              )}
            </div>
            
            <div className="space-y-8">
              {/* Component showcase */}
              <div>
                <Typography variant="header-3-semibold" className="mb-4 text-[var(--fleet-text-primary)]">
                  Preview
                </Typography>
                <div className="p-6 rounded-lg border border-[var(--fleet-border-primary)] bg-[var(--fleet-background-primary)]">
                  {currentItem.component}
                </div>
              </div>

              {/* Source code (if available) */}
              {currentItem.sourceCode && (
                <div>
                  <Typography variant="header-3-semibold" className="mb-4 text-[var(--fleet-text-primary)]">
                    Source Code
                  </Typography>
                  <pre className="p-4 rounded-lg bg-[var(--fleet-background-secondary)] overflow-auto">
                    <Typography variant="code" as="code">{currentItem.sourceCode}</Typography>
                  </pre>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Typography variant="default" className="text-[var(--fleet-text-secondary)]">
              Select an item from the sidebar to view its details
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
} 