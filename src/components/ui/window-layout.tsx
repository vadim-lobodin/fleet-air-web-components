"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Window Layout Variants
const windowLayoutVariants = cva(
  "flex flex-col h-screen w-full bg-background text-foreground",
  {
    variants: {
      variant: {
        default: "",
        air: "bg-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const windowHeaderVariants = cva(
  "flex-none h-10 flex items-center justify-between bg-background border-b border-border",
  {
    variants: {
      platform: {
        default: "px-2",
        mac: "pl-20 pr-2", // Space for traffic lights
        windows: "pl-2 pr-32", // Space for window controls
      },
    },
    defaultVariants: {
      platform: "default",
    },
  }
)

const toolbarVariants = cva(
  "flex items-center justify-between h-full w-full",
  {
    variants: {
      variant: {
        main: "gap-2",
        compact: "gap-1",
      },
    },
    defaultVariants: {
      variant: "main",
    },
  }
)

const panelContainerVariants = cva(
  "flex-1 flex overflow-hidden",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

const panelVariants = cva(
  "flex flex-col bg-card overflow-hidden transition-all duration-200",
  {
    variants: {
      position: {
        left: "min-w-0 rounded-lg",
        right: "min-w-0 rounded-lg", 
        bottom: "min-h-0 rounded-lg",
        main: "min-w-0 min-h-0 rounded-lg",
      },
      size: {
        xs: "w-48",
        sm: "w-56",
        md: "w-64",
        lg: "w-80",
        xl: "w-96",
        auto: "flex-1",
        collapsed: "w-0 opacity-0 pointer-events-none overflow-hidden",
      },
      height: {
        xs: "h-32",
        sm: "h-40",
        md: "h-48", 
        lg: "h-64",
        xl: "h-80",
        auto: "flex-1",
        collapsed: "h-0 opacity-0 pointer-events-none overflow-hidden",
      },
    },
    defaultVariants: {
      position: "main",
      size: "auto",
      height: "auto",
    },
  }
)

const splitterVariants = cva(
  "flex-none bg-transparent transition-colors cursor-resize",
  {
    variants: {
      orientation: {
        horizontal: "w-2 cursor-col-resize hover:bg-border/80",
        vertical: "h-2 cursor-row-resize hover:bg-border/80",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

// Types
export interface WindowLayoutProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof windowLayoutVariants> {
  children?: React.ReactNode
}

export interface WindowHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof windowHeaderVariants> {
  leftContent?: React.ReactNode
  centerContent?: React.ReactNode
  rightContent?: React.ReactNode
}

export interface ToolbarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toolbarVariants> {
  leftActions?: React.ReactNode
  workspace?: React.ReactNode
  progress?: React.ReactNode
  rightActions?: React.ReactNode
}

export interface PanelContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelContainerVariants> {
  children?: React.ReactNode
}

export interface PanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelVariants> {
  isVisible?: boolean
  children?: React.ReactNode
}

export interface SplitterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof splitterVariants> {
  onResize?: (size: number) => void
}

// Main Window Layout Component
export const WindowLayout = React.forwardRef<HTMLDivElement, WindowLayoutProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div
        className={cn(windowLayoutVariants({ variant }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)
WindowLayout.displayName = "WindowLayout"

// Window Header Component
export const WindowHeader = React.forwardRef<HTMLDivElement, WindowHeaderProps>(
  ({ className, platform, leftContent, centerContent, rightContent, children, ...props }, ref) => {
    return (
      <div
        className={cn(windowHeaderVariants({ platform }), className)}
        ref={ref}
        {...props}
      >
        {children || (
          <>
            <div className="flex items-center gap-2">
              {leftContent}
            </div>
            <div className="flex-1 flex items-center justify-center">
              {centerContent}
            </div>
            <div className="flex items-center gap-2">
              {rightContent}
            </div>
          </>
        )}
      </div>
    )
  }
)
WindowHeader.displayName = "WindowHeader"

// Toolbar Component
export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ className, variant, leftActions, workspace, progress, rightActions, children, ...props }, ref) => {
    return (
      <div
        className={cn(toolbarVariants({ variant }), className)}
        ref={ref}
        {...props}
      >
        {children || (
          <>
            <div className="flex items-center gap-1">
              {leftActions}
            </div>
            <div className="flex-1 flex items-center justify-center gap-2">
              {workspace}
              {progress}
            </div>
            <div className="flex items-center gap-1">
              {rightActions}
            </div>
          </>
        )}
      </div>
    )
  }
)
Toolbar.displayName = "Toolbar"

// Panel Container Component
export const PanelContainer = React.forwardRef<HTMLDivElement, PanelContainerProps>(
  ({ className, orientation, children, ...props }, ref) => {
    return (
      <div
        className={cn(panelContainerVariants({ orientation }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)
PanelContainer.displayName = "PanelContainer"

// Panel Component
export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ className, position, size, height, isVisible = true, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          panelVariants({ 
            position, 
            size: isVisible ? size : "collapsed",
            height: isVisible ? height : "collapsed"
          }), 
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Panel.displayName = "Panel"

// Splitter Component
export const Splitter = React.forwardRef<HTMLDivElement, SplitterProps>(
  ({ className, orientation, onResize, ...props }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false)

    const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
      e.preventDefault()
      setIsDragging(true)
      
      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (onResize) {
          const size = orientation === "horizontal" 
            ? moveEvent.clientX 
            : moveEvent.clientY
          onResize(size)
        }
      }

      const handleMouseUp = () => {
        setIsDragging(false)
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }, [onResize, orientation])

    return (
      <div
        className={cn(
          splitterVariants({ orientation }),
          isDragging && "bg-border",
          className
        )}
        onMouseDown={handleMouseDown}
        ref={ref}
        {...props}
      />
    )
  }
)
Splitter.displayName = "Splitter"

// Pre-built Layout Compositions
export const StandardWindowLayout = React.forwardRef<
  HTMLDivElement,
  {
    header?: React.ReactNode
    leftPanel?: React.ReactNode
    rightPanel?: React.ReactNode
    bottomPanel?: React.ReactNode
    mainContent?: React.ReactNode
    leftPanelVisible?: boolean
    rightPanelVisible?: boolean
    bottomPanelVisible?: boolean
    leftPanelSize?: VariantProps<typeof panelVariants>["size"]
    rightPanelSize?: VariantProps<typeof panelVariants>["size"]
    bottomPanelHeight?: VariantProps<typeof panelVariants>["height"]
    className?: string
  }
>(({
  header,
  leftPanel,
  rightPanel,
  bottomPanel,
  mainContent,
  leftPanelVisible = true,
  rightPanelVisible = true,
  bottomPanelVisible = true,
  leftPanelSize = "md",
  rightPanelSize = "md",
  bottomPanelHeight = "md",
  className,
}, ref) => {
  return (
    <WindowLayout className={className} ref={ref}>
      {header}
      <PanelContainer orientation="horizontal" className="gap-2 p-2">
        <Panel
          position="left"
          size={leftPanelSize}
          isVisible={leftPanelVisible}
        >
          {leftPanel}
        </Panel>

        {leftPanelVisible && <Splitter orientation="horizontal" />}

        <PanelContainer orientation="vertical" className="gap-2">
          <Panel position="main">
            {mainContent}
          </Panel>

          {bottomPanelVisible && <Splitter orientation="vertical" />}

          <Panel
            position="bottom"
            height={bottomPanelHeight}
            isVisible={bottomPanelVisible}
          >
            {bottomPanel}
          </Panel>
        </PanelContainer>

        {rightPanelVisible && <Splitter orientation="horizontal" />}

        <Panel
          position="right"
          size={rightPanelSize}
          isVisible={rightPanelVisible}
        >
          {rightPanel}
        </Panel>
      </PanelContainer>
    </WindowLayout>
  )
})
StandardWindowLayout.displayName = "StandardWindowLayout"

export const AirWindowLayout = React.forwardRef<
  HTMLDivElement,
  {
    header?: React.ReactNode
    conversationHistory?: React.ReactNode
    activeConversation?: React.ReactNode
    mainPanel?: React.ReactNode
    mainPanelVisible?: boolean
    className?: string
  }
>(({
  header,
  conversationHistory,
  activeConversation,
  mainPanel,
  mainPanelVisible = true,
  className,
}, ref) => {
  return (
    <WindowLayout variant="air" className={className} ref={ref}>
      {header}
      <PanelContainer orientation="horizontal" className="gap-2 p-2">
        <Panel position="left" size="sm">
          {conversationHistory}
        </Panel>

        <Splitter orientation="horizontal" />

        <Panel position="main" size="lg">
          {activeConversation}
        </Panel>

        {mainPanelVisible && <Splitter orientation="horizontal" />}

        <Panel
          position="right"
          size="xl"
          isVisible={mainPanelVisible}
        >
          {mainPanel}
        </Panel>
      </PanelContainer>
    </WindowLayout>
  )
})
AirWindowLayout.displayName = "AirWindowLayout"

// Export variants for customization
export {
  windowLayoutVariants,
  windowHeaderVariants,
  toolbarVariants,
  panelContainerVariants,
  panelVariants,
  splitterVariants,
}