import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Icon } from "./icon"

// shadcn/ui button foundation with pixel-perfect Fleet Air styling
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 border relative",
  {
    variants: {
      variant: {
        // Primary Button - Fleet Blue with exact states
        primary: [
          "bg-[var(--fleet-button-primary-background-default)] text-[var(--fleet-button-primary-text-default)] border-[var(--fleet-button-primary-border-default)] shadow-sm",
          "hover:bg-[var(--fleet-button-primary-background-hovered)] hover:border-[var(--fleet-button-primary-border-hovered)]",
          "active:bg-[var(--fleet-button-primary-background-pressed)] active:border-[var(--fleet-button-primary-border-pressed)]",
          "focus-visible:ring-[var(--fleet-button-primary-focusOutline)] focus-visible:border-[var(--fleet-button-primary-focusOutline)]",
          "disabled:bg-[var(--fleet-button-primary-background-disabled)] disabled:border-[var(--fleet-button-primary-border-disabled)] disabled:text-[var(--fleet-button-primary-text-disabled)]"
        ],
        
        // Secondary Button - Light neutral with border (Fleet default button)
        secondary: [
          "bg-[var(--fleet-button-secondary-background-default)] text-[var(--fleet-button-secondary-text-default)] border-[var(--fleet-button-secondary-border-default)] shadow-sm",
          "hover:bg-[var(--fleet-button-secondary-background-hovered)] hover:border-[var(--fleet-button-secondary-border-hovered)]",
          "active:bg-[var(--fleet-button-secondary-background-pressed)] active:border-[var(--fleet-button-secondary-border-pressed)]",
          "focus-visible:ring-[var(--fleet-button-secondary-focusOutline)] focus-visible:border-[var(--fleet-button-secondary-focusOutline)]",
          "disabled:bg-[var(--fleet-button-secondary-background-disabled)] disabled:border-[var(--fleet-button-secondary-border-disabled)] disabled:text-[var(--fleet-button-secondary-text-disabled)]"
        ],
        
        // Dangerous Button - Fleet Red with exact states
        dangerous: [
          "bg-[var(--fleet-button-dangerous-background-default)] text-[var(--fleet-button-dangerous-text-default)] border-[var(--fleet-button-dangerous-border-default)] shadow-sm",
          "hover:bg-[var(--fleet-button-dangerous-background-hovered)] hover:border-[var(--fleet-button-dangerous-border-hovered)]",
          "active:bg-[var(--fleet-button-dangerous-background-pressed)] active:border-[var(--fleet-button-dangerous-border-pressed)]",
          "focus-visible:ring-[var(--fleet-button-dangerous-focusOutline)] focus-visible:border-[var(--fleet-button-dangerous-focusOutline)]",
          "disabled:bg-[var(--fleet-button-dangerous-background-disabled)] disabled:border-[var(--fleet-button-dangerous-border-disabled)] disabled:text-[var(--fleet-button-dangerous-text-disabled)]"
        ],
        
        // Positive Button - Fleet Green with exact states (Accept/Approve)
        positive: [
          "bg-[var(--fleet-button-positive-background-default)] text-[var(--fleet-button-positive-text-default)] border-[var(--fleet-button-positive-border-default)] shadow-sm",
          "hover:bg-[var(--fleet-button-positive-background-hovered)] hover:border-[var(--fleet-button-positive-border-hovered)]",
          "active:bg-[var(--fleet-button-positive-background-pressed)] active:border-[var(--fleet-button-positive-border-pressed)]",
          "focus-visible:ring-[var(--fleet-button-positive-focusOutline)] focus-visible:border-[var(--fleet-button-positive-focusOutline)]",
          "disabled:bg-[var(--fleet-button-positive-background-disabled)] disabled:border-[var(--fleet-button-positive-border-disabled)] disabled:text-[var(--fleet-button-positive-text-disabled)]"
        ],
        
        // Warning Button - Fleet Yellow with exact states
        warning: [
          "bg-[var(--fleet-button-warning-background-default)] text-[var(--fleet-button-warning-text-default)] border-[var(--fleet-button-warning-border-default)] shadow-sm",
          "hover:bg-[var(--fleet-button-warning-background-hovered)] hover:border-[var(--fleet-button-warning-border-hovered)]",
          "active:bg-[var(--fleet-button-warning-background-pressed)] active:border-[var(--fleet-button-warning-border-pressed)]",
          "focus-visible:ring-[var(--fleet-button-warning-focusOutline)] focus-visible:border-[var(--fleet-button-warning-focusOutline)]",
          "disabled:bg-[var(--fleet-button-warning-background-disabled)] disabled:border-[var(--fleet-button-warning-border-disabled)] disabled:text-[var(--fleet-button-warning-text-disabled)]"
        ],
        
        // AI Button - Special purple AI-themed button
        ai: [
          "bg-[var(--fleet-button-ai-background-default)] text-[var(--fleet-button-ai-text-default)] border-[var(--fleet-button-ai-border-default)] shadow-sm",
          "hover:bg-[var(--fleet-button-ai-background-hovered)] hover:border-[var(--fleet-button-ai-border-hovered)]",
          "active:bg-[var(--fleet-button-ai-background-pressed)] active:border-[var(--fleet-button-ai-border-pressed)]",
          "focus-visible:ring-[var(--fleet-button-ai-focusOutline)] focus-visible:border-[var(--fleet-button-ai-focusOutline)]",
          "disabled:bg-[var(--fleet-button-ai-background-disabled)] disabled:border-[var(--fleet-button-ai-border-disabled)] disabled:text-[var(--fleet-button-ai-text-disabled)]"
        ],
        
        // Ghost Button - Transparent with hover (Fleet ghost button)
        ghost: [
          "bg-transparent text-foreground border-transparent",
          "hover:bg-[var(--fleet-button-secondary-background-hovered)] hover:border-transparent",
          "active:bg-[var(--fleet-button-secondary-background-pressed)] active:border-transparent",
          "focus-visible:ring-[var(--fleet-button-primary-focusOutline)] focus-visible:border-transparent",
          "disabled:bg-transparent disabled:border-transparent disabled:text-[var(--fleet-button-secondary-text-disabled)]"
        ],
        
        // Link Button - Fleet blue link styling
        link: [
          "bg-transparent text-[var(--fleet-button-primary-background-default)] border-transparent underline-offset-4",
          "hover:underline hover:text-[var(--fleet-button-primary-background-hovered)]",
          "active:text-[var(--fleet-button-primary-background-pressed)]",
          "focus-visible:ring-[var(--fleet-button-primary-focusOutline)] focus-visible:border-transparent",
          "disabled:text-[var(--fleet-button-secondary-text-disabled)] disabled:no-underline"
        ],
        
        // Pill Button - Rounded button for tags/filters (9dp radius override)
        pill: [
          "bg-[var(--fleet-button-secondary-background-default)] text-[var(--fleet-button-secondary-text-default)] border-[var(--fleet-button-secondary-border-default)] shadow-sm rounded-[9px]",
          "hover:bg-[var(--fleet-button-secondary-background-hovered)] hover:border-[var(--fleet-button-secondary-border-hovered)]",
          "active:bg-[var(--fleet-button-secondary-background-pressed)] active:border-[var(--fleet-button-secondary-border-pressed)]",
          "focus-visible:ring-[var(--fleet-button-secondary-focusOutline)] focus-visible:border-[var(--fleet-button-secondary-focusOutline)]",
          "disabled:bg-[var(--fleet-button-secondary-background-disabled)] disabled:border-[var(--fleet-button-secondary-border-disabled)] disabled:text-[var(--fleet-button-secondary-text-disabled)]"
        ],
        
        // Tile Button - Large tile-style button (6dp radius override)
        tile: [
          "bg-[var(--fleet-button-secondary-background-default)] text-[var(--fleet-button-secondary-text-default)] border-[var(--fleet-button-secondary-border-default)] shadow-sm rounded-[6px]",
          "hover:bg-[var(--fleet-button-secondary-background-hovered)] hover:border-[var(--fleet-button-secondary-border-hovered)]",
          "active:bg-[var(--fleet-button-secondary-background-pressed)] active:border-[var(--fleet-button-secondary-border-pressed)]",
          "focus-visible:ring-[var(--fleet-button-secondary-focusOutline)] focus-visible:border-[var(--fleet-button-secondary-focusOutline)]",
          "disabled:bg-[var(--fleet-button-secondary-background-disabled)] disabled:border-[var(--fleet-button-secondary-border-disabled)] disabled:text-[var(--fleet-button-secondary-text-disabled)]"
        ],
      },
      size: {
        // Small - Fleet small button: 20px height, 3dp radius, 1dp horizontal/1dp vertical padding
        sm: [
          "h-5 rounded-[3px] px-1 py-1 text-xs gap-1 min-w-12",
          "text-[13px] leading-[16px]" // Fleet default text size
        ],
        
        // Default - Fleet default button: 24px height, 4dp radius, 8dp horizontal/4dp vertical padding  
        default: [
          "h-6 rounded-[4px] px-2 py-1 text-sm gap-1 min-w-[60px]",
          "text-[13px] leading-[16px]" // Fleet default text size
        ],
        
        // Large - Fleet large button: 28px height, 4dp radius, 8dp horizontal/4dp vertical padding
        lg: [
          "h-7 rounded-[4px] px-2 py-1 text-sm gap-1 min-w-[60px]",
          "text-[13px] leading-[16px]" // Fleet default text size
        ],
        
        // Icon only - Fleet ghost button dimensions: 20px square, 3dp radius, 2dp padding
        icon: [
          "h-5 w-5 rounded-[3px] p-0.5",
          "min-w-5"
        ],
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "default",
    },
  }
)

export interface ShadcnButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
  iconLeft?: React.ReactNode | string // Support both React nodes and Fleet icon names
  iconRight?: React.ReactNode | string // Support both React nodes and Fleet icon names
  hintText?: string
  selected?: boolean // For toggle buttons
}

const ShadcnButton = React.forwardRef<HTMLButtonElement, ShadcnButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    isLoading = false,
    loadingText = "Loading…",
    iconLeft,
    iconRight,
    hintText,
    selected = false,
    children,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Handle toggle button styling
    const toggleClasses = selected && variant === "ghost" ? "bg-[#FFFFFF1B] border-[#7A7F86]" : ""
    
    // Helper function to render icons (supports both Fleet icon names and React nodes)
    const renderIcon = (icon: React.ReactNode | string | undefined) => {
      if (!icon) return null
      
      // If it's a string, assume it's a Fleet icon name
      if (typeof icon === 'string') {
        // Fleet icons are always 16px (sm size = h-4 w-4 = 1rem = 16px)
        return <Icon fleet={icon} size="sm" />
      }
      
      // Otherwise, render as-is (React node)
      return icon
    }
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), toggleClasses, className)}
        ref={ref}
        disabled={disabled || isLoading}
        aria-pressed={selected ? "true" : "false"}
        role="button"
        {...props}
      >
        {isLoading ? (
          <>
            <div className="animate-spin h-3 w-3 border border-current border-t-transparent rounded-full flex-shrink-0" />
            {loadingText && <span className="ml-2 flex items-center">{loadingText}</span>}
          </>
        ) : (
          <>
            {iconLeft && <span className="flex-shrink-0 flex items-center">{renderIcon(iconLeft)}</span>}
            {children && <span className="flex-1 flex items-center">{children}</span>}
            {iconRight && <span className="flex-shrink-0 flex items-center">{renderIcon(iconRight)}</span>}
            {hintText && (
              <span className="text-xs opacity-60 ml-2 flex-shrink-0 flex items-center">
                {hintText}
              </span>
            )}
          </>
        )}
      </Comp>
    )
  }
)
ShadcnButton.displayName = "ShadcnButton"

// Toggle Button Component - Maintains selected/unselected state
const ShadcnToggleButton = React.forwardRef<HTMLButtonElement, ShadcnButtonProps>(
  ({ selected = false, variant = "secondary", className, ...props }, ref) => {
    const toggleClasses = selected ? "bg-[#FFFFFF1B] border-[#7A7F86]" : ""
    
    return (
      <ShadcnButton
        ref={ref}
        variant={variant}
        selected={selected}
        className={cn(toggleClasses, className)}
        aria-pressed={selected}
        {...props}
      />
    )
  }
)
ShadcnToggleButton.displayName = "ShadcnToggleButton"

// Ghost Toggle Button Component - Specialized ghost button with toggle functionality
const ShadcnGhostToggleButton = React.forwardRef<HTMLButtonElement, ShadcnButtonProps>(
  ({ selected = false, variant = "ghost", className, ...props }, ref) => {
    const toggleClasses = selected ? "bg-[#FFFFFF1B] border-[#7A7F86]" : ""
    
    return (
      <ShadcnButton
        ref={ref}
        variant={variant}
        selected={selected}
        className={cn(toggleClasses, className)}
        aria-pressed={selected}
        {...props}
      />
    )
  }
)
ShadcnGhostToggleButton.displayName = "ShadcnGhostToggleButton"

// Split Button Component - Primary action + dropdown menu
const ShadcnSplitButton = React.forwardRef<
  HTMLButtonElement, 
  ShadcnButtonProps & { 
    onMenuClick?: () => void
    menuOpen?: boolean
    menuActions?: Array<{ label: string; action: () => void }>
  }
>(({ children, onMenuClick, menuOpen = false, menuActions = [], ...props }, ref) => {
  return (
    <div className="flex">
      <ShadcnButton 
        ref={ref} 
        className="rounded-r-none border-r-0" 
        {...props}
      >
        {children}
      </ShadcnButton>
      <ShadcnButton
        variant={props.variant}
        size={props.size}
        className="rounded-l-none px-1 min-w-6"
        onClick={onMenuClick}
        aria-label="Open menu"
        aria-expanded={menuOpen}
        aria-haspopup="menu"
      >
        <span className={cn(
          "transition-transform duration-200 flex items-center",
          menuOpen && "rotate-180"
        )}>
          <Icon fleet="chevron-down" size="sm" />
        </span>
      </ShadcnButton>
    </div>
  )
})
ShadcnSplitButton.displayName = "ShadcnSplitButton"

// Menu Button Component - Single button with dropdown menu
const ShadcnMenuButton = React.forwardRef<
  HTMLButtonElement, 
  ShadcnButtonProps & { 
    onMenuClick?: () => void
    menuOpen?: boolean
    menuActions?: Array<{ label: string; action: () => void }>
  }
>(({ children, onMenuClick, menuOpen = false, menuActions = [], ...props }, ref) => {
  return (
    <ShadcnButton 
      ref={ref} 
      onClick={onMenuClick}
      aria-expanded={menuOpen}
      aria-haspopup="menu"
      {...props}
    >
      {children}
      <span className={cn(
        "ml-1 transition-transform duration-200 flex items-center",
        menuOpen && "rotate-180"
      )}>
        <Icon fleet="chevron-down" size="sm" />
      </span>
    </ShadcnButton>
  )
})
ShadcnMenuButton.displayName = "ShadcnMenuButton"

export {
  ShadcnButton as Button,
  ShadcnToggleButton as ToggleButton,
  ShadcnGhostToggleButton as GhostToggleButton,
  ShadcnSplitButton as SplitButton,
  ShadcnMenuButton as MenuButton,
  buttonVariants
}; 