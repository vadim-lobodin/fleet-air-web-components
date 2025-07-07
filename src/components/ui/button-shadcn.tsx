import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Icon } from "./icon"
import { FleetIcons } from "@/lib/fleet-icons";
import * as LucideIcons from "lucide-react";

// shadcn/ui button foundation with pixel-perfect Fleet Air styling
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-default leading-default font-body-regular tracking-default transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 disabled:pointer-events-none border relative",
  {
    variants: {
      variant: {
        // Primary Button - Fleet Blue with exact states
        primary: [
          "bg-[var(--fleet-button-primary-background-default)] text-[var(--fleet-button-primary-text-default)] border-[var(--fleet-button-primary-border-default)]",
          "hover:bg-[var(--fleet-button-primary-background-hovered)] hover:border-[var(--fleet-button-primary-border-hovered)]",
          "active:bg-[var(--fleet-button-primary-background-pressed)] active:border-[var(--fleet-button-primary-border-pressed)]",
          "focus-visible:ring-[var(--fleet-button-primary-focusOutline)] focus-visible:border-[var(--fleet-button-primary-focusOutline)]",
          "disabled:bg-[var(--fleet-button-primary-background-disabled)] disabled:border-[var(--fleet-button-primary-border-disabled)] disabled:text-[var(--fleet-button-primary-text-disabled)]"
        ],

        // Secondary Button - Light neutral with border (Fleet default button)
        secondary: [
          "bg-[var(--fleet-button-secondary-background-default)] text-[var(--fleet-button-secondary-text-default)] border-[var(--fleet-button-secondary-border-default)]",
          "hover:bg-[var(--fleet-button-secondary-background-hovered)] hover:border-[var(--fleet-button-secondary-border-hovered)]",
          "active:bg-[var(--fleet-button-secondary-background-pressed)] active:border-[var(--fleet-button-secondary-border-pressed)]",
          "focus-visible:ring-[var(--fleet-button-secondary-focusOutline)] focus-visible:border-[var(--fleet-button-secondary-focusBorder)]",
          "disabled:bg-[var(--fleet-button-secondary-background-disabled)] disabled:border-[var(--fleet-button-secondary-border-disabled)] disabled:text-[var(--fleet-button-secondary-text-disabled)]"
        ],

        // Dangerous Button - Fleet Red with exact states
        dangerous: [
          "bg-[var(--fleet-button-dangerous-background-default)] text-[var(--fleet-button-dangerous-text-default)] border-[var(--fleet-button-dangerous-border-default)]",
          "hover:bg-[var(--fleet-button-dangerous-background-hovered)] hover:border-[var(--fleet-button-dangerous-border-hovered)]",
          "active:bg-[var(--fleet-button-dangerous-background-pressed)] active:border-[var(--fleet-button-dangerous-border-pressed)]",
          "focus-visible:ring-[var(--fleet-button-dangerous-focusOutline)] focus-visible:border-[var(--fleet-button-dangerous-focusOutline)]",
          "disabled:bg-[var(--fleet-button-dangerous-background-disabled)] disabled:border-[var(--fleet-button-dangerous-border-disabled)] disabled:text-[var(--fleet-button-dangerous-text-disabled)]"
        ],

        // Positive Button - Fleet Green with exact states (Accept/Approve)
        positive: [
          "bg-[var(--fleet-button-positive-background-default)] text-[var(--fleet-button-positive-text-default)] border-[var(--fleet-button-positive-border-default)]",
          "hover:bg-[var(--fleet-button-positive-background-hovered)] hover:border-[var(--fleet-button-positive-border-hovered)]",
          "active:bg-[var(--fleet-button-positive-background-pressed)] active:border-[var(--fleet-button-positive-border-pressed)]",
          "focus-visible:ring-[var(--fleet-button-positive-focusOutline)] focus-visible:border-[var(--fleet-button-positive-focusOutline)]",
          "disabled:bg-[var(--fleet-button-positive-background-disabled)] disabled:border-[var(--fleet-button-positive-border-disabled)] disabled:text-[var(--fleet-button-positive-text-disabled)]"
        ],

        // Warning Button - Fleet Yellow with exact states
        warning: [
          "bg-[var(--fleet-button-warning-background-default)] text-[var(--fleet-button-warning-text-default)] border-[var(--fleet-button-warning-border-default)]",
          "hover:bg-[var(--fleet-button-warning-background-hovered)] hover:border-[var(--fleet-button-warning-border-hovered)]",
          "active:bg-[var(--fleet-button-warning-background-pressed)] active:border-[var(--fleet-button-warning-border-pressed)]",
          "focus-visible:ring-[var(--fleet-button-warning-focusOutline)] focus-visible:border-[var(--fleet-button-warning-focusOutline)]",
          "disabled:bg-[var(--fleet-button-warning-background-disabled)] disabled:border-[var(--fleet-button-warning-border-disabled)] disabled:text-[var(--fleet-button-warning-text-disabled)]"
        ],

        // Ghost Button - Fleet ghost button with exact styling
        ghost: [
          "bg-[var(--fleet-ghostButton-off-background-default)] text-[var(--fleet-ghostButton-off-text-default)] border-[var(--fleet-ghostButton-off-border-default)]",
          "hover:bg-[var(--fleet-ghostButton-off-background-hovered)] hover:text-[var(--fleet-ghostButton-off-text-hovered)] hover:border-[var(--fleet-ghostButton-off-border-hovered)]",
          "active:bg-[var(--fleet-ghostButton-off-background-pressed)] active:text-[var(--fleet-ghostButton-off-text-pressed)] active:border-[var(--fleet-ghostButton-off-border-pressed)]",
          "focus-visible:ring-[var(--fleet-ghostButton-off-focusBorder)] focus-visible:border-[var(--fleet-ghostButton-off-focusBorder)]",
          "disabled:bg-[var(--fleet-ghostButton-off-background-disabled)] disabled:text-[var(--fleet-ghostButton-off-text-disabled)] disabled:border-[var(--fleet-ghostButton-off-border-disabled)]"
        ],

        // Link Button - Fleet blue link styling
        link: [
          "bg-transparent text-[var(--fleet-button-primary-background-default)] border-transparent underline-offset-4",
          "hover:underline hover:text-[var(--fleet-button-primary-background-hovered)]",
          "active:text-[var(--fleet-button-primary-background-pressed)]",
          "focus-visible:ring-[var(--fleet-button-primary-focusOutline)] focus-visible:border-transparent",
          "disabled:text-[var(--fleet-button-secondary-text-disabled)] disabled:no-underline"
        ],
      },
      size: {
        // Small - Fleet small button: 20px height, 3dp radius, 6dp horizontal/2dp vertical padding
        sm: [
          "h-5 rounded-[3px] px-1.5 py-0.5 text-xs gap-1.5 min-w-12"
        ],

        // Default - Fleet default button: 24px height, 4dp radius, 12dp horizontal/4dp vertical padding
        default: [
          "h-6 rounded-[4px] px-3 py-1 text-sm gap-2 min-w-[60px]"
        ],

        // Large - Fleet large button: 28px height, 4dp radius, 16dp horizontal/6dp vertical padding
        lg: [
          "h-7 rounded-[4px] px-4 py-1.5 text-sm gap-2 min-w-[60px]"
        ],

        // Icon only - Fleet ghost button dimensions: 20px square, 3dp radius, 2dp padding
        icon: [
          "h-5 w-5 rounded-[3px] p-0.5",
          "min-w-5"
        ],

        // Toolbar icon - Compact icon buttons for toolbars: 24px square, 4dp radius, 4px padding for 16px icons
        toolbar: [
          "h-6 w-6 rounded-[4px] p-1",
          "min-w-6"
        ],

        // Toolbar large - Large toolbar buttons: 28px square, 3dp radius for Fleet toolbar spec
        toolbarLg: [
          "h-7 w-7 rounded-[3px] p-1",
          "min-w-7"
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

    // Helper function to render icons (Fleet-first, Lucide fallback) with smart sizing
    const renderIcon = (icon: React.ReactNode | string | undefined) => {
      if (!icon) return null;

      if (typeof icon === "string") {
        // Keep toolbar icons at sm (16px) as per Fleet specification
        const iconSize: "xs" | "sm" | "md" | "lg" = "sm";

        // Fleet-first: check if icon exists in FleetIcons registry
        if (icon in FleetIcons) {
          return <Icon fleet={icon} size={iconSize} className={disabled ? "opacity-[0.35]" : ""} />;
        }
        // Fallback: try Lucide
        if (icon in LucideIcons) {
          return <Icon lucide={icon as keyof typeof LucideIcons} size={iconSize} className={disabled ? "text-[var(--fleet-text-disabled)]" : ""} />;
        }
        // If not found, show fallback (optional)
        return <span className="text-xs text-destructive">?</span>;
      }

      return icon;
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
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
            {children && <span className="flex items-center">{children}</span>}
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

// Toggle Button Component - Fleet-style with proper on/off states
const ShadcnToggleButton = React.forwardRef<HTMLButtonElement, ShadcnButtonProps>(
  ({ selected = false, variant = "secondary", className, ...props }, ref) => {
    // Fleet toggle button uses specific color schemes for on/off states
    const toggleClasses = selected
      ? [
          // Toggle ON: Blue background, white text, transparent border
          "bg-[var(--fleet-toggleButton-on-background-default)] text-[var(--fleet-toggleButton-on-text-default)] border-[var(--fleet-toggleButton-on-border-default)]",
          "hover:bg-[var(--fleet-toggleButton-on-background-hovered)] hover:text-[var(--fleet-toggleButton-on-text-hovered)] hover:border-[var(--fleet-toggleButton-on-border-hovered)]",
          "active:bg-[var(--fleet-toggleButton-on-background-pressed)] active:text-[var(--fleet-toggleButton-on-text-pressed)] active:border-[var(--fleet-toggleButton-on-border-pressed)]",
          "focus-visible:ring-[var(--fleet-toggleButton-on-focusBorder)] focus-visible:border-[var(--fleet-toggleButton-on-focusBorder)]",
          "disabled:bg-[var(--fleet-toggleButton-on-background-disabled)] disabled:text-[var(--fleet-toggleButton-on-text-disabled)] disabled:border-[var(--fleet-toggleButton-on-border-disabled)]"
        ].join(" ")
      : [
          // Toggle OFF: Transparent background, normal text, border
          "bg-[var(--fleet-toggleButton-off-background-default)] text-[var(--fleet-toggleButton-off-text-default)] border-[var(--fleet-toggleButton-off-border-default)]",
          "hover:bg-[var(--fleet-toggleButton-off-background-hovered)] hover:text-[var(--fleet-toggleButton-off-text-hovered)] hover:border-[var(--fleet-toggleButton-off-border-hovered)]",
          "active:bg-[var(--fleet-toggleButton-off-background-pressed)] active:text-[var(--fleet-toggleButton-off-text-pressed)] active:border-[var(--fleet-toggleButton-off-border-pressed)]",
          "focus-visible:ring-[var(--fleet-toggleButton-off-focusBorder)] focus-visible:border-[var(--fleet-toggleButton-off-focusBorder)]",
          "disabled:bg-[var(--fleet-toggleButton-off-background-disabled)] disabled:text-[var(--fleet-toggleButton-off-text-disabled)] disabled:border-[var(--fleet-toggleButton-off-border-disabled)]"
        ].join(" ")

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

// Ghost Toggle Button Component - Fleet-style ghost button with toggle functionality
const ShadcnGhostToggleButton = React.forwardRef<HTMLButtonElement, ShadcnButtonProps>(
  ({ selected = false, variant = "ghost", className, ...props }, ref) => {
    // Fleet ghost toggle button: transparent when off, light overlay when selected
    // Using Fleet-like colors that match the original design
    const toggleClasses = selected
      ? [
          // Ghost Toggle ON: Light overlay background (Fleet-style selected ghost button)
          "bg-[#FFFFFF1B] text-foreground border-[#7A7F86]",
          "hover:bg-[#FFFFFF21] hover:border-[#7A7F86]",
          "active:bg-[#FFFFFF16] active:border-[#7A7F86]",
          "focus-visible:ring-[var(--fleet-button-primary-focusOutline)] focus-visible:border-[var(--fleet-button-primary-focusOutline)]",
          "disabled:bg-[#FFFFFF0F] disabled:text-[var(--fleet-button-secondary-text-disabled)] disabled:border-[#FFFFFF16]"
        ].join(" ")
      : [
          // Ghost Toggle OFF: Standard ghost button styling
          "bg-transparent text-foreground border-transparent",
          "hover:bg-[var(--fleet-button-secondary-background-hovered)] hover:border-transparent",
          "active:bg-[var(--fleet-button-secondary-background-pressed)] active:border-transparent",
          "focus-visible:ring-[var(--fleet-button-primary-focusOutline)] focus-visible:border-transparent",
          "disabled:bg-transparent disabled:border-transparent disabled:text-[var(--fleet-button-secondary-text-disabled)]"
        ].join(" ")

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
  }
>(({ children, onMenuClick, menuOpen = false, ...props }, ref) => {
  // Get the appropriate separator color based on variant and state
  const getSeparatorColor = () => {
    if (props.disabled) {
      return "var(--fleet-button-secondary-separator-disabled)"
    }
    switch (props.variant) {
      case "primary":
        return "var(--fleet-button-primary-separator-default)"
      case "dangerous":
        return "var(--fleet-button-dangerous-separator-default)"
      case "positive":
        return "var(--fleet-button-positive-separator-default)"
      case "warning":
        return "var(--fleet-button-warning-separator-default)"
      default:
        return "var(--fleet-button-secondary-separator-default)"
    }
  }

  return (
    <div className="flex items-center relative">
      {/* Main Button */}
      <ShadcnButton
        ref={ref}
        className="rounded-r-none border-r-0 shadow-none"
        {...props}
      >
        {children}
      </ShadcnButton>

      {/* Dropdown Button - touches the main button */}
      <ShadcnButton
        variant={props.variant}
        size={props.size}
        className="rounded-l-none border-l-0 px-1 min-w-6 shadow-none"
        onClick={onMenuClick}
        disabled={props.disabled}
        aria-label="Open menu"
        aria-expanded={menuOpen}
        aria-haspopup="menu"
      >
        <span
          className="transition-transform duration-[120ms] ease-out flex items-center justify-center"
          style={{
            transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        >
          <Icon fleet="chevron-down" size="sm" />
        </span>
      </ShadcnButton>

      {/* Separator overlay - positioned over the seam */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-px h-4 pointer-events-none opacity-50"
        style={{
          backgroundColor: getSeparatorColor(),
          right: '24px' // Position at the boundary (24px = min-w-6 of dropdown button)
        }}
      />
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
  }
>(({ children, onMenuClick, menuOpen = false, ...props }, ref) => {
  return (
    <ShadcnButton
      ref={ref}
      onClick={onMenuClick}
      aria-expanded={menuOpen}
      aria-haspopup="menu"
      {...props}
    >
      <div className="flex items-center justify-center h-full">
        {children && <span className="flex items-center">{children}</span>}
        {children && <div className="w-1" />} {/* 4dp spacer */}
        <span
          className="transition-transform duration-[120ms] ease-out flex items-center justify-center"
          style={{
            transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        >
          <Icon fleet="chevron-down" size="sm" />
        </span>
      </div>
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