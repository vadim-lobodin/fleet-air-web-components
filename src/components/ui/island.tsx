"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Fleet Islands Theme Implementation
// Based on Fleet Kotlin source: SplitPanelView.kt and AirWindowView.kt
// Islands have 8dp rounded corners and gray background with 8dp splitter width

const islandVariants = cva(
  "bg-card text-card-foreground rounded-lg border",
  {
    variants: {
      variant: {
        default: "",
        panel: "",
        conversation: "",
        main: ""
      },
      padding: {
        none: "p-0",
        default: "p-1.5", // 6px Fleet padding
      },
      shadow: {
        none: "",
        sm: "shadow-sm",
        default: "shadow-md",
        lg: "shadow-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      shadow: "none"
    }
  }
)

const islandSplitterVariants = cva(
  "bg-border hover:bg-border/80 transition-colors",
  {
    variants: {
      direction: {
        horizontal: "w-2 h-full cursor-col-resize",
        vertical: "h-2 w-full cursor-row-resize"
      }
    },
    defaultVariants: {
      direction: "horizontal"
    }
  }
)

export interface IslandProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof islandVariants> {
  asChild?: boolean
}

export interface IslandSplitterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof islandSplitterVariants> {}

const Island = React.forwardRef<HTMLDivElement, IslandProps>(
  ({ className, variant, padding, shadow, ...props }, ref) => {
    return (
      <div
        className={cn(islandVariants({ variant, padding, shadow }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Island.displayName = "Island"

const IslandSplitter = React.forwardRef<HTMLDivElement, IslandSplitterProps>(
  ({ className, direction, ...props }, ref) => {
    return (
      <div
        className={cn(islandSplitterVariants({ direction }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
IslandSplitter.displayName = "IslandSplitter"

// Island Container - wraps multiple islands with proper spacing
const IslandContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    direction?: "horizontal" | "vertical"
    gap?: number // Gap between islands in pixels (default 8dp)
  }
>(({ className, direction = "horizontal", gap = 8, children, ...props }, ref) => {
  const gapClass = direction === "horizontal" ? `space-x-${gap / 4}` : `space-y-${gap / 4}`
  const flexDirection = direction === "horizontal" ? "flex-row" : "flex-col"
  
  return (
    <div
      className={cn(
        "flex",
        flexDirection,
        gapClass,
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})
IslandContainer.displayName = "IslandContainer"

// Island with Tab Group - common pattern in Fleet
const IslandWithTabs = React.forwardRef<
  HTMLDivElement,
  IslandProps & {
    tabs?: React.ReactNode
    content?: React.ReactNode
  }
>(({ className, tabs, content, ...props }, ref) => {
  return (
    <Island
      className={cn("overflow-hidden", className)}
      ref={ref}
      padding="none"
      {...props}
    >
      {tabs && (
        <div className="border-b border-border bg-muted/30">
          {tabs}
        </div>
      )}
      {content && (
        <div className="p-1.5">
          {content}
        </div>
      )}
    </Island>
  )
})
IslandWithTabs.displayName = "IslandWithTabs"


// Fleet-specific island layouts based on the Kotlin implementation

// Left Panel Island - for file trees, project explorer
const LeftPanelIsland = React.forwardRef<HTMLDivElement, IslandProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Island
        className={cn("h-full", className)}
        ref={ref}
        variant="panel"
        {...props}
      >
        {children}
      </Island>
    )
  }
)
LeftPanelIsland.displayName = "LeftPanelIsland"

// Right Panel Island - for inspectors, documentation
const RightPanelIsland = React.forwardRef<HTMLDivElement, IslandProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Island
        className={cn("h-full", className)}
        ref={ref}
        variant="panel"
        {...props}
      >
        {children}
      </Island>
    )
  }
)
RightPanelIsland.displayName = "RightPanelIsland"

// Bottom Panel Island - for terminal, console, problems
const BottomPanelIsland = React.forwardRef<HTMLDivElement, IslandProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Island
        className={cn("w-full", className)}
        ref={ref}
        variant="panel"
        {...props}
      >
        {children}
      </Island>
    )
  }
)
BottomPanelIsland.displayName = "BottomPanelIsland"

// Main Content Island - for editors, main content area
const MainContentIsland = React.forwardRef<HTMLDivElement, IslandProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Island
        className={cn("flex-1 h-full", className)}
        ref={ref}
        variant="main"
        {...props}
      >
        {children}
      </Island>
    )
  }
)
MainContentIsland.displayName = "MainContentIsland"

// Air Conversation Island - specific to Fleet Air chat interface
const ConversationIsland = React.forwardRef<HTMLDivElement, IslandProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Island
        className={cn("h-full", className)}
        ref={ref}
        variant="conversation"
        {...props}
      >
        {children}
      </Island>
    )
  }
)
ConversationIsland.displayName = "ConversationIsland"

export {
  Island,
  IslandSplitter,
  IslandContainer,
  IslandWithTabs,
  LeftPanelIsland,
  RightPanelIsland,
  BottomPanelIsland,
  MainContentIsland,
  ConversationIsland,
  islandVariants,
  islandSplitterVariants,
  type IslandProps,
  type IslandSplitterProps
}
