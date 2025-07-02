"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "./button-shadcn"
import { Icon } from "./icon"
import { Typography } from "./typography"

// Fleet MainToolbar - Precise implementation based on MainToolbar.kt
// Four-section layout with intelligent spacing and progressive collapse

const mainToolbarVariants = cva(
  "flex items-center w-full bg-[var(--fleet-background-primary)]",
  {
    variants: {
      platform: {
        default: "h-9 px-2", // 36dp windowHeaderHeight
        mac: "h-9 pl-20 pr-2", // Space for traffic lights
        windows: "h-9 pl-2 pr-8", // Space for window controls  
        linux: "h-9 px-2",
      },
      focused: {
        true: "opacity-100",
        false: "opacity-50",
      },
    },
    defaultVariants: {
      platform: "default",
      focused: true,
    },
  }
)

// Fleet toolbar follows the exact layout algorithm from MainToolbar.kt

const separatorVariants = cva(
  "w-px bg-border mx-1",
  {
    variants: {
      height: {
        default: "h-6", // 24dp separator height
        full: "h-full",
      },
    },
    defaultVariants: {
      height: "default",
    },
  }
)

// Types
export interface MainToolbarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mainToolbarVariants> {
  leftButtons?: React.ReactNode
  workspace?: React.ReactNode
  progress?: React.ReactNode
  rightButtons?: React.ReactNode
  children?: React.ReactNode
}

export interface ToolbarButtonProps
  extends React.ComponentProps<typeof Button> {
  icon?: string
  tooltip?: string
  active?: boolean
}

export interface ToolbarSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {}

export interface WorkspaceWidgetProps {
  projectName?: string
  branchName?: string
  className?: string
  projectMenu?: React.ReactNode
  branchMenu?: React.ReactNode
}

export interface ProgressWidgetProps {
  visible?: boolean
  progress?: number
  text?: string
  collapsed?: boolean
  className?: string
}

// MainToolbar Component - Implements Fleet's intelligent layout algorithm
export const MainToolbar = React.forwardRef<HTMLDivElement, MainToolbarProps>(
  ({ className, platform, focused, leftButtons, workspace, progress, rightButtons, children, ...props }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const leftRef = React.useRef<HTMLDivElement>(null)
    const workspaceRef = React.useRef<HTMLDivElement>(null)
    const progressRef = React.useRef<HTMLDivElement>(null)
    const rightRef = React.useRef<HTMLDivElement>(null)

    // Fleet's intelligent layout algorithm
    const [layout, setLayout] = React.useState({
      workspaceX: 0,
      progressX: 0,
      progressCollapsed: false,
    })

    React.useLayoutEffect(() => {
      if (!containerRef.current || !leftRef.current || !workspaceRef.current || 
          !progressRef.current || !rightRef.current) return

      const container = containerRef.current
      const left = leftRef.current
      const workspace = workspaceRef.current
      const right = rightRef.current

      const toolbarWidth = container.offsetWidth
      const leftWidth = left.offsetWidth
      const workspaceWidth = workspace.offsetWidth
      const rightWidth = right.offsetWidth

      // Fleet constants (converted from dp to px)
      const progressMaxWidthCollapsed = 32 // 32dp
      const progressMaxWidthDefault = 360 // 360dp  
      const progressMinWidth = 150 // 150dp

      // Calculate ideal workspace center (Fleet algorithm)
      const workspaceIdealCenter = toolbarWidth / 2
      const workspaceIdealEnd = workspaceIdealCenter + workspaceWidth / 2

      // Determine if progress should collapse
      const progressCollapsed = workspaceIdealEnd > toolbarWidth - rightWidth - progressMinWidth

      // Calculate progress width
      const progressWidth = progressCollapsed 
        ? progressMaxWidthCollapsed 
        : Math.min(progressMaxWidthDefault, toolbarWidth - rightWidth - workspaceIdealEnd)

      // Calculate workspace position (tries to center, falls back to right-aligned)
      const whereWorkspaceStartShouldBeDefault = workspaceIdealCenter - workspaceWidth / 2
      const whereWorkspaceEndShouldBe = workspaceIdealCenter + workspaceWidth / 2
      const whereWorkspaceStartShouldBeWhenNotEnoughSpace = toolbarWidth - rightWidth - progressWidth - workspaceWidth

      const workspaceX = (toolbarWidth - rightWidth - progressWidth < whereWorkspaceEndShouldBe)
        ? whereWorkspaceStartShouldBeWhenNotEnoughSpace
        : Math.max(leftWidth, whereWorkspaceStartShouldBeDefault)

      // Calculate progress position
      const progressX = toolbarWidth - rightWidth - progressWidth

      setLayout({
        workspaceX,
        progressX,
        progressCollapsed,
      })
    }, [leftButtons, workspace, progress, rightButtons])

    if (children) {
      return (
        <div
          className={cn(mainToolbarVariants({ platform, focused }), className)}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      )
    }

    return (
      <div
        className={cn(mainToolbarVariants({ platform, focused }), "relative", className)}
        ref={containerRef}
        {...props}
      >
        {/* Left Buttons - Always stick to left */}
        <div
          ref={leftRef}
          className="flex items-center gap-1"
          style={{ position: 'absolute', left: 8, top: 0, height: '100%' }}
        >
          {leftButtons}
        </div>

        {/* Workspace - Intelligently centered */}
        <div
          ref={workspaceRef}
          className="flex items-center"
          style={{ 
            position: 'absolute', 
            left: layout.workspaceX, 
            top: 0, 
            height: '100%',
            maxWidth: 'calc(100% - 200px)' // Prevent overflow
          }}
        >
          {workspace}
        </div>

        {/* Progress - Collapses when workspace gets close */}
        <div
          ref={progressRef}
          className="flex items-center"
          style={{ 
            position: 'absolute', 
            left: layout.progressX, 
            top: 0, 
            height: '100%'
          }}
        >
          {progress && React.cloneElement(progress as React.ReactElement<{ collapsed?: boolean }>, {
            collapsed: layout.progressCollapsed
          })}
        </div>

        {/* Right Buttons - Always stick to right */}
        <div
          ref={rightRef}
          className="flex items-center gap-1"
          style={{ position: 'absolute', right: 8, top: 0, height: '100%' }}
        >
          {rightButtons}
        </div>
      </div>
    )
  }
)
MainToolbar.displayName = "MainToolbar"

// ToolbarButton Component - Uses improved Button component with toolbar size
// Fleet spec: Box(height=36dp, requiredWidthIn(min=32dp)) containing ActionLargeGhostButton
export const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ className, icon, tooltip, children, ...props }, ref) => {
    return (
      <Button
        variant="ghost"
        size="toolbar"
        className={cn(className)}
        ref={ref}
        title={tooltip}
        iconLeft={icon}
        {...props}
      >
        {children}
      </Button>
    )
  }
)
ToolbarButton.displayName = "ToolbarButton"

// ToolbarSeparator Component
export const ToolbarSeparator = React.forwardRef<HTMLDivElement, ToolbarSeparatorProps>(
  ({ className, height, ...props }, ref) => {
    return (
      <div
        className={cn(separatorVariants({ height }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
ToolbarSeparator.displayName = "ToolbarSeparator"

// WorkspaceWidget Component - Matches Fleet's WorkspaceWidget exactly 
// Fleet implementation: Row(verticalAlignment = CenterVertically) { Workspace(weight(1f, fill=false)); Branch(weight(1f, fill=false)) }
export const WorkspaceWidget = React.forwardRef<HTMLDivElement, WorkspaceWidgetProps>(
  ({ projectName = "Fleet Project", branchName = "main", className, projectMenu, branchMenu }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn("flex items-center min-w-0", className)}
      >
        {projectMenu ? (
          projectMenu
        ) : (
          <ToolbarButton
            tooltip="Project actions"
            className="h-auto w-auto px-1 py-0.5 min-w-0"
          >
            <Typography variant="default-semibold" className="truncate">
              {projectName}
            </Typography>
          </ToolbarButton>
        )}
        <Icon fleet="vcs-branch" size="sm" className="flex-shrink-0 mx-1" />
        {branchMenu ? (
          branchMenu
        ) : (
          <ToolbarButton
            tooltip="Branch actions"
            className="h-auto w-auto px-1 py-0.5 min-w-0"
          >
            <Typography variant="default-semibold" className="truncate">
              {branchName}
            </Typography>
          </ToolbarButton>
        )}
      </div>
    )
  }
)
WorkspaceWidget.displayName = "WorkspaceWidget"

// ProgressWidget Component - Collapsible progress indicator
export const ProgressWidget = React.forwardRef<HTMLDivElement, ProgressWidgetProps>(
  ({ visible = false, progress = 0, text = "", collapsed = false, className }, ref) => {
    if (!visible) return null

    return (
      <div 
        ref={ref}
        className={cn(
          "flex items-center gap-2 transition-all duration-200",
          collapsed ? "w-8" : "w-full max-w-[360px]",
          className
        )}
      >
        {!collapsed && text && (
          <Typography variant="default" className="truncate">
            {text}
          </Typography>
        )}
        <div className={cn(
          "h-1 bg-muted rounded-full overflow-hidden",
          collapsed ? "w-4" : "flex-1"
        )}>
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      </div>
    )
  }
)
ProgressWidget.displayName = "ProgressWidget"

// Pre-built toolbar sections
export const LeftToolbarSection = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-1">
    {children}
  </div>
)

export const RightToolbarSection = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-1">
    {children}
  </div>
)

// Export variants for customization
export {
  mainToolbarVariants,
  separatorVariants,
}