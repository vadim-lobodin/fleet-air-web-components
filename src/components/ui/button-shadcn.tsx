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
          "bg-[#0870E4] text-white border-[#0870E4] shadow-sm",
          "hover:bg-[#1868CB] hover:border-[#1868CB]",
          "active:bg-[#1D61BA] active:border-[#1D61BA]",
          "focus-visible:ring-[#4B8DEC] focus-visible:border-[#4B8DEC]",
          "disabled:bg-[#5D636B] disabled:border-[#5D636B] disabled:text-[#898E94]"
        ],
        
        // Secondary Button - Light neutral with border (Fleet default button)
        secondary: [
          "bg-[#FFFFFF21] text-foreground border-[#646B71] shadow-sm",
          "hover:bg-[#FFFFFF1B] hover:border-[#7A7F86]",
          "active:bg-[#FFFFFF16] active:border-[#898E94]",
          "focus-visible:ring-[#4B8DEC] focus-visible:border-[#4B8DEC]",
          "disabled:bg-[#323438] disabled:border-[#4C5157] disabled:text-[#6E747B]"
        ],
        
        // Dangerous Button - Fleet Red with exact states
        dangerous: [
          "bg-[#D73251] text-white border-[#D73251] shadow-sm",
          "hover:bg-[#C72C49] hover:border-[#C72C49]",
          "active:bg-[#B82D46] active:border-[#B82D46]",
          "focus-visible:ring-[#EC5D6F] focus-visible:border-[#EC5D6F]",
          "disabled:bg-[#5D636B] disabled:border-[#5D636B] disabled:text-[#898E94]"
        ],
        
        // Positive Button - Fleet Green with exact states (Accept/Approve)
        positive: [
          "bg-[#14835E] text-white border-[#14835E] shadow-sm",
          "hover:bg-[#1E7857] hover:border-[#1E7857]",
          "active:bg-[#216F52] active:border-[#216F52]",
          "focus-visible:ring-[#409D78] focus-visible:border-[#409D78]",
          "disabled:bg-[#5D636B] disabled:border-[#5D636B] disabled:text-[#898E94]"
        ],
        
        // Warning Button - Fleet Yellow with exact states
        warning: [
          "bg-[#9F680C] text-white border-[#9F680C] shadow-sm",
          "hover:bg-[#916012] hover:border-[#916012]",
          "active:bg-[#865A15] active:border-[#865A15]",
          "focus-visible:ring-[#BD8128] focus-visible:border-[#BD8128]",
          "disabled:bg-[#5D636B] disabled:border-[#5D636B] disabled:text-[#898E94]"
        ],
        
        // AI Button - Special purple AI-themed button
        ai: [
          "bg-[#8060A9] text-white border-[#8060A9] shadow-sm",
          "hover:bg-[#986DD1] hover:border-[#986DD1]",
          "active:bg-[#B183F2] active:border-[#B183F2]",
          "focus-visible:ring-[#C29FFF] focus-visible:border-[#C29FFF]",
          "disabled:bg-[#5D636B] disabled:border-[#5D636B] disabled:text-[#898E94]"
        ],
        
        // Ghost Button - Transparent with hover (Fleet ghost button)
        ghost: [
          "bg-transparent text-foreground border-transparent",
          "hover:bg-[#FFFFFF1B] hover:border-transparent",
          "active:bg-[#FFFFFF16] active:border-transparent",
          "focus-visible:ring-[#4B8DEC] focus-visible:border-transparent",
          "disabled:bg-transparent disabled:border-transparent disabled:text-[#6E747B]"
        ],
        
        // Link Button - Fleet blue link styling
        link: [
          "bg-transparent text-[#0870E4] border-transparent underline-offset-4",
          "hover:underline hover:text-[#1868CB]",
          "active:text-[#1D61BA]",
          "focus-visible:ring-[#4B8DEC] focus-visible:border-transparent",
          "disabled:text-[#6E747B] disabled:no-underline"
        ],
        
        // Pill Button - Rounded button for tags/filters (9dp radius override)
        pill: [
          "bg-[#FFFFFF21] text-foreground border-[#646B71] shadow-sm",
          "hover:bg-[#FFFFFF1B] hover:border-[#7A7F86]",
          "active:bg-[#FFFFFF16] active:border-[#898E94]",
          "focus-visible:ring-[#4B8DEC] focus-visible:border-[#4B8DEC]",
          "disabled:bg-[#323438] disabled:border-[#4C5157] disabled:text-[#6E747B]",
          "rounded-[9px]" // Override radius for pill shape
        ],
        
        // Tile Button - Large tile-style button (6dp radius override)
        tile: [
          "bg-[#FFFFFF21] text-foreground border-[#646B71] shadow-sm",
          "hover:bg-[#FFFFFF1B] hover:border-[#7A7F86]",
          "active:bg-[#FFFFFF16] active:border-[#898E94]",
          "focus-visible:ring-[#4B8DEC] focus-visible:border-[#4B8DEC]",
          "disabled:bg-[#323438] disabled:border-[#4C5157] disabled:text-[#6E747B]",
          "rounded-[6px]" // Override radius for tile shape
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
  ShadcnButton, 
  ShadcnToggleButton,
  ShadcnGhostToggleButton,
  ShadcnSplitButton,
  ShadcnMenuButton,
  buttonVariants as shadcnButtonVariants 
} 