import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 border relative",
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
        
        // Secondary Button - Light neutral with border (default Fleet button)
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
        
        // Positive Button - Fleet Green with exact states  
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
        
        // Pill Button - Rounded button for tags/filters
        pill: [
          "bg-[#FFFFFF21] text-foreground border-[#646B71] shadow-sm rounded-[9px]",
          "hover:bg-[#FFFFFF1B] hover:border-[#7A7F86]",
          "active:bg-[#FFFFFF16] active:border-[#898E94]",
          "focus-visible:ring-[#4B8DEC] focus-visible:border-[#4B8DEC]",
          "disabled:bg-[#323438] disabled:border-[#4C5157] disabled:text-[#6E747B]"
        ],
        
        // Tile Button - Large tile-style button with rounded corners
        tile: [
          "bg-[#FFFFFF21] text-foreground border-[#646B71] shadow-sm rounded-[6px]",
          "hover:bg-[#FFFFFF1B] hover:border-[#7A7F86]",
          "active:bg-[#FFFFFF16] active:border-[#898E94]",
          "focus-visible:ring-[#4B8DEC] focus-visible:border-[#4B8DEC]",
          "disabled:bg-[#323438] disabled:border-[#4C5157] disabled:text-[#6E747B]"
        ],
        
        // AI Button - Special purple AI-themed button
        ai: [
          "bg-[#8060A9] text-white border-[#8060A9] shadow-sm",
          "hover:bg-[#986DD1] hover:border-[#986DD1]",
          "active:bg-[#B183F2] active:border-[#B183F2]",
          "focus-visible:ring-[#C29FFF] focus-visible:border-[#C29FFF]",
          "disabled:bg-[#5D636B] disabled:border-[#5D636B] disabled:text-[#898E94]"
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
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
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
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), toggleClasses, className)}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <div className="animate-spin h-3 w-3 border border-current border-t-transparent rounded-full" />
            {loadingText && <span className="ml-2">{loadingText}</span>}
          </>
        ) : (
          <>
            {iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
            {children && <span className="flex-1">{children}</span>}
            {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
            {hintText && (
              <span className="text-xs opacity-60 ml-2 flex-shrink-0">
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
  ({ selected = false, variant = "ghost", ...props }, ref) => {
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
          "transition-transform duration-120",
          menuOpen && "rotate-180"
        )}>
          ▼
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
        "ml-1 transition-transform duration-120",
        menuOpen && "rotate-180"
      )}>
        ▼
      </span>
    </Button>
  )
})
MenuButton.displayName = "MenuButton"

export { 
  Button, 
  ToggleButton, 
  SplitButton, 
  MenuButton, 
  buttonVariants 
}
