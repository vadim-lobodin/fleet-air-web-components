import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Icon } from "./icon"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 border relative",
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
        
        // Secondary Button - Light neutral with border (default Fleet button)
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
        
        // Positive Button - Fleet Green with exact states  
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
        
        // Pill Button - Rounded button for tags/filters
        pill: [
          "bg-[var(--fleet-button-secondary-background-default)] text-[var(--fleet-button-secondary-text-default)] border-[var(--fleet-button-secondary-border-default)] shadow-sm rounded-[9px]",
          "hover:bg-[var(--fleet-button-secondary-background-hovered)] hover:border-[var(--fleet-button-secondary-border-hovered)]",
          "active:bg-[var(--fleet-button-secondary-background-pressed)] active:border-[var(--fleet-button-secondary-border-pressed)]",
          "focus-visible:ring-[var(--fleet-button-secondary-focusOutline)] focus-visible:border-[var(--fleet-button-secondary-focusOutline)]",
          "disabled:bg-[var(--fleet-button-secondary-background-disabled)] disabled:border-[var(--fleet-button-secondary-border-disabled)] disabled:text-[var(--fleet-button-secondary-text-disabled)]"
        ],
        
        // Tile Button - Large tile-style button with rounded corners
        tile: [
          "bg-[var(--fleet-button-secondary-background-default)] text-[var(--fleet-button-secondary-text-default)] border-[var(--fleet-button-secondary-border-default)] shadow-sm rounded-[6px]",
          "hover:bg-[var(--fleet-button-secondary-background-hovered)] hover:border-[var(--fleet-button-secondary-border-hovered)]",
          "active:bg-[var(--fleet-button-secondary-background-pressed)] active:border-[var(--fleet-button-secondary-border-pressed)]",
          "focus-visible:ring-[var(--fleet-button-secondary-focusOutline)] focus-visible:border-[var(--fleet-button-secondary-focusOutline)]",
          "disabled:bg-[var(--fleet-button-secondary-background-disabled)] disabled:border-[var(--fleet-button-secondary-border-disabled)] disabled:text-[var(--fleet-button-secondary-text-disabled)]"
        ],
        
        // AI Button - Special purple AI-themed button
        ai: [
          "bg-[var(--fleet-button-ai-background-default)] text-[var(--fleet-button-ai-text-default)] border-[var(--fleet-button-ai-border-default)] shadow-sm",
          "hover:bg-[var(--fleet-button-ai-background-hovered)] hover:border-[var(--fleet-button-ai-border-hovered)]",
          "active:bg-[var(--fleet-button-ai-background-pressed)] active:border-[var(--fleet-button-ai-border-pressed)]",
          "focus-visible:ring-[var(--fleet-button-ai-focusOutline)] focus-visible:border-[var(--fleet-button-ai-focusOutline)]",
          "disabled:bg-[var(--fleet-button-ai-background-disabled)] disabled:border-[var(--fleet-button-ai-border-disabled)] disabled:text-[var(--fleet-button-ai-text-disabled)]"
        ],
      },
      size: {
        // Small - Fleet small button: 20px height, 3px radius, 4px/2px padding, 48px min-width
        sm: [
          "h-5 rounded-[3px] px-1 py-0.5 text-xs gap-1 min-w-12",
          "text-[13px] leading-[16px]" // Fleet default text size
        ],
        
        // Default - Fleet default button: 24px height, 4px radius, 8px/4px padding, 60px min-width  
        default: [
          "h-6 rounded px-2 py-1 text-sm gap-2 min-w-[60px]",
          "text-[13px] leading-[16px]" // Fleet default text size
        ],
        
        // Large - Fleet large button: 28px height, 4px radius, 8px/4px padding, 60px min-width
        lg: [
          "h-7 rounded px-2 py-1 text-sm gap-2 min-w-[60px]",
          "text-[13px] leading-[16px]" // Fleet default text size
        ],
        
        // Icon only - Fleet ghost button dimensions: 20px square, 3px radius, 2px padding
        icon: [
          "h-5 w-5 rounded-[3px] p-0.5",
          "min-w-5"
        ],
        
        // Tiny - Fleet tiny ghost button: 16px height, 2px radius, 2px padding
        tiny: [
          "h-4 rounded-[2px] px-1 py-0 text-xs gap-1 min-w-8",
          "text-[11px] leading-[12px]"
        ],
        
        // Pill size - Special sizing for pill buttons
        pill: [
          "h-5 rounded-[9px] px-2 py-0 text-xs gap-1 min-w-[60px]",
          "text-[11px] leading-[14px]" // Small text for pills
        ],
        
        // Tile size - Large tile button
        tile: [
          "h-auto rounded-[6px] p-4 text-sm gap-2 min-w-[60px]",
          "text-[13px] leading-[16px]"
        ],
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "default",
    },
  }
)

export interface ButtonProps
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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
Button.displayName = "Button"

// Toggle Button Component
const ToggleButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ selected = false, variant = "secondary", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        selected={selected}
        {...props}
      />
    )
  }
)
ToggleButton.displayName = "ToggleButton"

// Ghost Toggle Button Component
const GhostToggleButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ selected = false, variant = "ghost", className, ...props }, ref) => {
    const toggleClasses = selected ? "bg-[#FFFFFF1B] border-[#7A7F86]" : ""
    
    return (
      <Button
        ref={ref}
        variant={variant}
        selected={selected}
        className={cn(toggleClasses, className)}
        {...props}
      />
    )
  }
)
GhostToggleButton.displayName = "GhostToggleButton"

// Split Button Component (simplified - would need dropdown implementation)
const SplitButton = React.forwardRef<
  HTMLButtonElement, 
  ButtonProps & { 
    onMenuClick?: () => void
    menuOpen?: boolean
  }
>(({ children, onMenuClick, menuOpen = false, ...props }, ref) => {
  return (
    <div className="flex">
      <Button ref={ref} className="rounded-r-none border-r-0" {...props}>
        {children}
      </Button>
      <Button
        variant={props.variant}
        size={props.size}
        className="rounded-l-none px-1 min-w-6"
        onClick={onMenuClick}
      >
        <span className={cn(
          "transition-transform duration-120 flex items-center",
          menuOpen && "rotate-180"
        )}>
          <Icon fleet="arrow-down" size="sm" />
        </span>
      </Button>
    </div>
  )
})
SplitButton.displayName = "SplitButton"

// Menu Button Component (simplified)
const MenuButton = React.forwardRef<
  HTMLButtonElement, 
  ButtonProps & { 
    onMenuClick?: () => void
    menuOpen?: boolean
  }
>(({ children, onMenuClick, menuOpen = false, ...props }, ref) => {
  return (
    <Button ref={ref} onClick={onMenuClick} {...props}>
      {children}
      <span className={cn(
        "ml-1 transition-transform duration-120 flex items-center",
        menuOpen && "rotate-180"
      )}>
        <Icon fleet="arrow-down" size="sm" />
      </span>
    </Button>
  )
})
MenuButton.displayName = "MenuButton"

export { 
  Button, 
  ToggleButton, 
  GhostToggleButton,
  SplitButton, 
  MenuButton, 
  buttonVariants 
}
