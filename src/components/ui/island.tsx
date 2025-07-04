"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ScrollArea } from "./scroll-area"

// Fleet Islands Theme Implementation
// Based on Fleet Kotlin source: SplitPanelView.kt and AirWindowView.kt
// Islands have 8dp rounded corners and gray background with 8dp splitter width

const islandVariants = cva(
  "bg-card text-card-foreground rounded-[8px]",
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
        default: "px-1.5", // 6px Fleet padding - left and right only
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
  scrollable?: boolean
}

export interface IslandSplitterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof islandSplitterVariants> {}

const Island = React.forwardRef<HTMLDivElement, IslandProps>(
  ({ className, variant, padding, shadow, scrollable, children, ...props }, ref) => {
    const islandClasses = cn(islandVariants({ variant, padding, shadow }), className)
    
    // Auto-detect if the island has a fixed height and make it scrollable
    const hasFixedHeight = className?.includes('h-') || props.style?.height
    const shouldScroll = scrollable || hasFixedHeight
    
    if (shouldScroll) {
      return (
        <div
          className={cn(islandClasses, "overflow-hidden")}
          ref={ref}
          {...props}
        >
          <ScrollArea className="h-full w-full">
            <div className={padding === "none" ? "" : "px-1.5"}>
              {children}
            </div>
          </ScrollArea>
        </div>
      )
    }

    return (
      <div
        className={islandClasses}
        ref={ref}
        {...props}
      >
        {children}
      </div>
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
  }
>(({ className, direction = "horizontal", children, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex gap-2",
        direction === "horizontal" ? "flex-row" : "flex-col",
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

// Tab Bar Component - for pinned tabs
const TabBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode
  }
>(({ className, children, ...props }, ref) => {
  return (
    <div 
      className={cn("bg-card p-1.5 flex-shrink-0", className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})
TabBar.displayName = "TabBar"

// Tab Content Area Component - for scrollable content
const TabContentArea = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode
  }
>(({ className, children, ...props }, ref) => {
  return (
    <div 
      className={cn("flex-1 min-h-0", className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})
TabContentArea.displayName = "TabContentArea"

// Island with Tab Group - Fleet Tab Island pattern
// This is a specialized Island variant that handles tabs properly
// Tabs are automatically pinned at the top, only content is scrollable
const IslandWithTabs = React.forwardRef<
  HTMLDivElement,
  IslandProps & {
    children?: React.ReactNode
  }
>(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground rounded-[8px] overflow-hidden flex flex-col",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})
IslandWithTabs.displayName = "IslandWithTabs"



// Air Conversation Island - specific to Fleet Air chat interface
const ConversationIsland = React.forwardRef<HTMLDivElement, IslandProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Island
        className={cn(className)}
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
  TabBar,
  TabContentArea,
  ConversationIsland,
  islandVariants,
  islandSplitterVariants
}
