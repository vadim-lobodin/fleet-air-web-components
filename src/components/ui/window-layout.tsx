"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { MainToolbar } from "./main-toolbar"
import { IslandWithTabs } from "./island"
import { AiChatContextPreview } from "./ai-chat-context-preview"
import { Panel as ResizablePanel, PanelGroup, PanelResizeHandle, ImperativePanelHandle } from "react-resizable-panels"

// Window Layout Variants
const windowLayoutVariants = cva(
  "flex flex-col h-full w-full bg-[var(--fleet-background-primary)] text-foreground",
  {
    variants: {
      variant: {
        default: "",
        air: "bg-[var(--fleet-background-primary)]",
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
        linux: "px-2", // Same as default
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
  useMainToolbar?: boolean
  toolbarProps?: React.ComponentProps<typeof MainToolbar>
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
const WindowLayout = React.forwardRef<HTMLDivElement, WindowLayoutProps>(
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
const WindowHeader = React.forwardRef<HTMLDivElement, WindowHeaderProps>(
  ({ className, platform, leftContent, centerContent, rightContent, useMainToolbar, toolbarProps, children, ...props }, ref) => {
    if (useMainToolbar) {
      return (
        <div className="flex-none" ref={ref}>
          <MainToolbar platform={platform} {...toolbarProps} />
        </div>
      )
    }

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
const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
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
const PanelContainer = React.forwardRef<HTMLDivElement, PanelContainerProps>(
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
const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
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
const Splitter = React.forwardRef<HTMLDivElement, SplitterProps>(
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

// Fleet Window Layout - uses MainToolbar and Islands
// Layout: [Left Panel] [Central: Main Content + Bottom Panel] [Right Panel]
// Main content is always visible, panels are toggleable
const FleetWindowLayout = React.forwardRef<
  HTMLDivElement,
  {
    toolbarProps?: React.ComponentProps<typeof MainToolbar>
    leftPanel?: React.ReactNode
    rightPanel?: React.ReactNode
    bottomPanel?: React.ReactNode
    mainContent?: React.ReactNode // Always visible
    leftPanelVisible?: boolean
    rightPanelVisible?: boolean
    bottomPanelVisible?: boolean
    platform?: "default" | "mac" | "windows" | "linux"
    className?: string
    children?: React.ReactNode
  }
>(({
  toolbarProps: externalToolbarProps,
  leftPanel: externalLeftPanel,
  rightPanel: externalRightPanel,
  bottomPanel: externalBottomPanel,
  mainContent: externalMainContent,
  leftPanelVisible = true,
  rightPanelVisible = true,
  bottomPanelVisible = true,
  platform = "default",
  className,
  children,
}, ref) => {
  // Default content for self-managing mode - MainToolbar is now self-managing too!
  const defaultToolbarProps = React.useMemo(() => ({
    focused: true
    // No need for leftButtons, workspace, rightButtons - MainToolbar provides defaults
  }), [])

  const defaultLeftPanel = React.useMemo(() => (
    <div className="flex flex-col h-full p-4">
      <div className="text-[var(--fleet-text-primary)] font-medium mb-4">Project</div>
      <div className="space-y-2 text-sm">
        <div className="text-[var(--fleet-text-primary)]">📁 src/</div>
        <div className="text-[var(--fleet-text-primary)] ml-4">📄 App.tsx</div>
        <div className="text-[var(--fleet-text-primary)] ml-4">📄 index.ts</div>
        <div className="text-[var(--fleet-text-primary)]">📁 public/</div>
        <div className="text-[var(--fleet-text-primary)]">📄 package.json</div>
      </div>
    </div>
  ), [])

  const defaultMainContent = React.useMemo(() => (
    <div className="flex flex-col h-full p-4">
      <div className="text-[var(--fleet-text-primary)] font-medium mb-4">Welcome to Fleet</div>
      <div className="text-[var(--fleet-text-secondary)] space-y-2">
        <p>This is a Fleet window layout example.</p>
        <p>• Left panel shows project structure</p>
        <p>• Bottom panel for terminal/output</p>
        <p>• Right panel for chat/tools</p>
      </div>
    </div>
  ), [])

  const defaultBottomPanel = React.useMemo(() => (
    <div className="flex flex-col h-full p-4">
      <div className="text-[var(--fleet-text-primary)] font-medium mb-4">Terminal</div>
      <div className="font-mono text-sm text-[var(--fleet-text-secondary)]">
        <div>$ npm run dev</div>
        <div className="text-[var(--fleet-text-positive)]">✓ Ready on http://localhost:3000</div>
      </div>
    </div>
  ), [])

  const defaultRightPanel = React.useMemo(() => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-[var(--fleet-border-default)]">
        <div className="text-[var(--fleet-text-primary)] font-medium">Fleet AI</div>
      </div>
      <div className="flex-1 p-4">
        <AiChatContextPreview className="w-full" />
      </div>
    </div>
  ), [])

  // Use external props if provided, otherwise use defaults
  const toolbarProps = externalToolbarProps ?? defaultToolbarProps
  const leftPanel = externalLeftPanel ?? defaultLeftPanel
  const rightPanel = externalRightPanel ?? defaultRightPanel
  const bottomPanel = externalBottomPanel ?? defaultBottomPanel
  const mainContent = externalMainContent ?? defaultMainContent

  // Panel refs for imperative control
  const leftPanelRef = React.useRef<ImperativePanelHandle>(null)
  const rightPanelRef = React.useRef<ImperativePanelHandle>(null)
  const bottomPanelRef = React.useRef<ImperativePanelHandle>(null)

  // Track when we're in a visibility transition to enable animations
  const [isLeftTransitioning, setIsLeftTransitioning] = React.useState(false)
  const [isRightTransitioning, setIsRightTransitioning] = React.useState(false)
  const [isBottomTransitioning, setIsBottomTransitioning] = React.useState(false)

  // Handle panel visibility changes with smooth animations
  React.useEffect(() => {
    setIsLeftTransitioning(true)
    if (leftPanelVisible) {
      leftPanelRef.current?.resize(25)
    } else {
      leftPanelRef.current?.resize(0)
    }
    // Clear transition state after animation completes
    const timer = setTimeout(() => setIsLeftTransitioning(false), 350)
    return () => clearTimeout(timer)
  }, [leftPanelVisible])

  React.useEffect(() => {
    setIsRightTransitioning(true)
    if (rightPanelVisible) {
      rightPanelRef.current?.resize(25)
    } else {
      rightPanelRef.current?.resize(0)
    }
    const timer = setTimeout(() => setIsRightTransitioning(false), 350)
    return () => clearTimeout(timer)
  }, [rightPanelVisible])

  React.useEffect(() => {
    setIsBottomTransitioning(true)
    if (bottomPanelVisible) {
      bottomPanelRef.current?.resize(30)
    } else {
      bottomPanelRef.current?.resize(0)
    }
    const timer = setTimeout(() => setIsBottomTransitioning(false), 350)
    return () => clearTimeout(timer)
  }, [bottomPanelVisible])
  // Simple children mode - just render children inside window chrome
  if (children) {
    return (
      <WindowLayout className={className} ref={ref}>
        <WindowHeader 
          useMainToolbar 
          platform={platform}
          toolbarProps={toolbarProps}
        />
        <div className="flex-1">
          {children}
        </div>
      </WindowLayout>
    )
  }

  return (
    <WindowLayout className={className} ref={ref}>
      {/* Fleet MainToolbar */}
      <WindowHeader 
        useMainToolbar 
        platform={platform}
        toolbarProps={toolbarProps}
      />
      
      {/* Main Layout with Resizable Panels */}
      <div className="flex-1 px-1.5 pb-1.5">
        <PanelGroup direction="horizontal" className="h-full">
          {/* Left Panel - Always rendered */}
          <ResizablePanel 
            ref={leftPanelRef}
            defaultSize={leftPanelVisible ? 25 : 0}
            minSize={0}
            maxSize={40}
            className={cn(
              "h-full relative",
              isLeftTransitioning && "transition-all duration-300 ease-in-out"
            )}
          >
            <div className={cn(
              "absolute inset-0 transition-all duration-300 ease-in-out",
              leftPanelVisible 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 -translate-x-full"
            )}>
              <IslandWithTabs className="h-full w-full">
                {leftPanel}
              </IslandWithTabs>
            </div>
          </ResizablePanel>
          
          {/* Left Resize Handle - Only when visible */}
          {leftPanelVisible && <PanelResizeHandle className="w-2" />}
          
          {/* Central Container: Main Content + Bottom Panel */}
          <ResizablePanel className="h-full flex-1">
            <PanelGroup direction="vertical" className="h-full">
              {/* Main Content (always visible) */}
              <ResizablePanel 
                defaultSize={bottomPanelVisible ? 70 : 100}
                className="h-full"
              >
                <IslandWithTabs className="h-full w-full">
                  {mainContent}
                </IslandWithTabs>
              </ResizablePanel>
              
              {/* Bottom Resize Handle - Only when visible */}
              {bottomPanelVisible && <PanelResizeHandle className="h-2" />}
              
              {/* Bottom Panel - Always rendered */}
              <ResizablePanel 
                ref={bottomPanelRef}
                defaultSize={bottomPanelVisible ? 30 : 0}
                minSize={0}
                maxSize={50}
                className={cn(
                  "h-full relative",
                  isBottomTransitioning && "transition-all duration-300 ease-in-out"
                )}
              >
                <div className={cn(
                  "absolute inset-0 transition-all duration-300 ease-in-out",
                  bottomPanelVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-full"
                )}>
                  <IslandWithTabs className="h-full w-full">
                    {bottomPanel}
                  </IslandWithTabs>
                </div>
              </ResizablePanel>
            </PanelGroup>
          </ResizablePanel>
          
          {/* Right Resize Handle - Only when visible */}
          {rightPanelVisible && <PanelResizeHandle className="w-2" />}
          
          {/* Right Panel - Always rendered */}
          <ResizablePanel 
            ref={rightPanelRef}
            defaultSize={rightPanelVisible ? 25 : 0}
            minSize={0}
            maxSize={40}
            className={cn(
              "h-full relative",
              isRightTransitioning && "transition-all duration-300 ease-in-out"
            )}
          >
            <div className={cn(
              "absolute inset-0 transition-all duration-300 ease-in-out",
              rightPanelVisible 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 translate-x-full"
            )}>
              <IslandWithTabs className="h-full w-full">
                {rightPanel}
              </IslandWithTabs>
            </div>
          </ResizablePanel>
        </PanelGroup>
      </div>
    </WindowLayout>
  )
})
FleetWindowLayout.displayName = "FleetWindowLayout"

// Pre-built Layout Compositions (Legacy - kept for compatibility)
const StandardWindowLayout = React.forwardRef<
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

// Fleet Air Window Layout - optimized for conversation interfaces
const FleetAirWindowLayout = React.forwardRef<
  HTMLDivElement,
  {
    toolbarProps?: React.ComponentProps<typeof MainToolbar>
    conversationHistory?: React.ReactNode
    activeConversation?: React.ReactNode
    mainPanel?: React.ReactNode
    mainPanelVisible?: boolean
    platform?: "default" | "mac" | "windows" | "linux"
    className?: string
  }
>(({
  toolbarProps,
  conversationHistory,
  activeConversation,
  mainPanel,
  mainPanelVisible = true,
  platform = "default",
  className,
}, ref) => {
  return (
    <WindowLayout variant="air" className={className} ref={ref}>
      {/* Fleet MainToolbar */}
      <WindowHeader 
        useMainToolbar 
        platform={platform}
        toolbarProps={toolbarProps}
      />
      
      {/* Air Layout with Conversation Islands */}
      <div className="flex-1 flex px-2 pb-2 gap-2">
        {/* Conversation History */}
        <IslandWithTabs className="w-56 flex-none h-full">
          {conversationHistory}
        </IslandWithTabs>

        {/* Active Conversation */}
        <IslandWithTabs className="flex-1 min-w-0 h-full">
          {activeConversation}
        </IslandWithTabs>

        {/* Main Panel (optional) */}
        {mainPanelVisible && (
          <IslandWithTabs className="w-96 flex-none h-full">
            {mainPanel}
          </IslandWithTabs>
        )}
      </div>
    </WindowLayout>
  )
})
FleetAirWindowLayout.displayName = "FleetAirWindowLayout"

// Legacy Air Layout (kept for compatibility)
const AirWindowLayout = React.forwardRef<
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

// Export all components
export {
  WindowLayout,
  WindowHeader,
  Toolbar,
  PanelContainer,
  Panel,
  Splitter,
  FleetWindowLayout,
  FleetAirWindowLayout,
  StandardWindowLayout,
  AirWindowLayout,
  // Export variants for customization
  windowLayoutVariants,
  windowHeaderVariants,
  toolbarVariants,
  panelContainerVariants,
  panelVariants,
  splitterVariants,
}