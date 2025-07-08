"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ScrollArea } from "./scroll-area"
import { Icon } from "./icon"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs"

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

// Chat Island - specialized island for AI chat interface
// Features: Proper tab system with context and input per tab
const ChatIsland = React.forwardRef<
  HTMLDivElement,
  IslandProps & {
    children?: React.ReactNode
    defaultTab?: string
    tabs?: Array<{
      value: string
      label: string
      icon?: string
      chatContent: React.ReactNode
      contextPreview?: React.ReactNode
      chatInput?: React.ReactNode
    }>
  }
>(({ className, children, defaultTab, tabs = [], ...props }, ref) => {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground rounded-[8px] overflow-hidden flex flex-col h-full",
        className
      )}
      ref={ref}
      {...props}
    >
      <Tabs defaultValue={defaultTab || tabs[0]?.value} className="w-full h-full flex flex-col">
        {/* Tab Bar - Pinned */}
        {tabs.length > 0 && (
          <TabBar>
            <TabsList className="h-auto bg-transparent gap-1 p-0">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.icon && <Icon fleet={tab.icon} size="sm" className="mr-1" />}
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </TabBar>
        )}
        
        {/* Content Area with Context and Input per Tab */}
        <TabContentArea className="flex-1 min-h-0">
          {tabs.length > 0 ? (
            // Multiple tabs with content, context, and input per tab
            tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="mt-0 h-full flex flex-col">
                {/* Chat Content Area - Scrollable */}
                <div className="flex-1 min-h-0">
                  <ScrollArea className="h-full w-full">
                    <div className="p-3">
                      {tab.chatContent}
                    </div>
                  </ScrollArea>
                </div>
                
                {/* Context Preview and Input - Pinned per tab */}
                <div className="flex-shrink-0">
                  {/* Context Preview - Full width */}
                  {tab.contextPreview && (
                    <div className="w-full px-2">
                      {tab.contextPreview}
                    </div>
                  )}
                  
                  {/* Chat Input - 4px gap from context preview */}
                  {tab.chatInput && (
                    <div className={cn("", tab.contextPreview ? "pt-1" : "pt-3")}>
                      {tab.chatInput}
                    </div>
                  )}
                </div>
              </TabsContent>
            ))
          ) : (
            // Single content area when no tabs
            <ScrollArea className="h-full w-full">
              <div className="p-3">
                {children}
              </div>
            </ScrollArea>
          )}
        </TabContentArea>
      </Tabs>
    </div>
  )
})
ChatIsland.displayName = "ChatIsland"





export {
  Island,
  IslandSplitter,
  IslandContainer,
  IslandWithTabs,
  TabBar,
  TabContentArea,
  ChatIsland,
  islandVariants,
  islandSplitterVariants
}
