"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Fleet Islands Theme Implementation
// Based on Fleet Kotlin source: SplitPanelView.kt and AirWindowView.kt
// Islands have 8dp rounded corners and gray background with 8dp splitter width

const islandVariants = cva(
  "bg-card text-card-foreground rounded-[8px] transition-all duration-200 ease-out",
  {
    variants: {
      variant: {
        default: "",
        panel: "",
        conversation: "",
        main: "",
        floating: "transform-gpu backface-hidden",
        rotating: "transform-gpu backface-hidden",
        perspective: "transform-gpu backface-hidden",
        depth: "transform-gpu backface-hidden"
      },
      padding: {
        none: "p-0",
        default: "p-1.5", // 6px Fleet padding
      },
      shadow: {
        none: "",
        sm: "shadow-sm hover:shadow-md",
        default: "shadow-md hover:shadow-lg",
        lg: "shadow-lg hover:shadow-xl",
        floating: "shadow-lg hover:shadow-2xl",
        depth: "shadow-2xl hover:shadow-3xl"
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

// Island with Tab Group - Fleet Tab Island pattern
// This is a specialized Island variant that handles tabs properly
const IslandWithTabs = React.forwardRef<
  HTMLDivElement,
  IslandProps & {
    children?: React.ReactNode
  }
>(({ className, children, ...props }, ref) => {
  return (
    <Island
      className={cn(
        "overflow-hidden",
        className
      )}
      ref={ref}
      padding="none"
      {...props}
    >
      {children}
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
        className={cn(className)}
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
        className={cn(className)}
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
        className={cn(className)}
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
        className={cn(className)}
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

// 3D Island Component with advanced transforms
const ThreeDIsland = React.forwardRef<
  HTMLDivElement,
  IslandProps & {
    depth?: number
    rotateX?: number
    rotateY?: number
    rotateZ?: number
    scale?: number
    translateZ?: number
    perspective?: number
    isHovered?: boolean
    threeDVariant?: "floating" | "rotating" | "perspective" | "depth"
  } & React.HTMLAttributes<HTMLDivElement>
>(({ 
  className, 
  children, 
  depth = 1, 
  rotateX = 0, 
  rotateY = 0, 
  rotateZ = 0, 
  scale = 1, 
  translateZ = 0, 
  perspective = 1000,
  isHovered = false,
  threeDVariant = "floating",
  style,
  ...props 
}, ref) => {
  const getTransformStyles = () => {
    const baseTransform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale}) translateZ(${translateZ}px)`
    
    const shadowIntensity = Math.min(8 + depth * 4, 32)
    const shadowBlur = Math.min(16 + depth * 8, 64)
    const shadowOpacity = Math.min(0.1 + depth * 0.05, 0.3)
    
    return {
      transform: baseTransform,
      boxShadow: `0 ${shadowIntensity}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity})`,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    }
  }

  return (
    <Island
      ref={ref}
      className={cn(
        "transform-gpu backface-hidden",
        isHovered && "z-10",
        className
      )}
      style={{ ...getTransformStyles(), ...style }}
      variant={threeDVariant}
      shadow={threeDVariant === "depth" ? "depth" : "floating"}
      {...props}
    >
      {children}
    </Island>
  )
})
ThreeDIsland.displayName = "ThreeDIsland"

// Floating Island with auto-hover effects
const FloatingIsland = React.forwardRef<HTMLDivElement, IslandProps & {
  floatHeight?: number
  hoverLift?: number
}>(({ className, children, floatHeight = 8, hoverLift = 4, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <Island
      ref={ref}
      className={cn(
        "transform-gpu transition-all duration-300 ease-out cursor-pointer",
        className
      )}
      style={{
        transform: `translateY(${isHovered ? -hoverLift : 0}px) translateZ(${floatHeight}px)`,
        boxShadow: `0 ${floatHeight + (isHovered ? hoverLift * 2 : 0)}px ${(floatHeight + (isHovered ? hoverLift * 2 : 0)) * 2}px rgba(0, 0, 0, 0.15)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variant="floating"
      shadow="floating"
      {...props}
    >
      {children}
    </Island>
  )
})
FloatingIsland.displayName = "FloatingIsland"

export {
  Island,
  IslandSplitter,
  IslandContainer,
  IslandWithTabs,
  ConversationIsland,
  ThreeDIsland,
  FloatingIsland,
  islandVariants,
  islandSplitterVariants
}
