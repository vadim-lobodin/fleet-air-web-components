import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Typography } from "./typography"
import { Icon } from "./icon"

// Fleet Alert - Based on Fleet banner system with semantic variants
const alertVariants = cva(
  // Fleet typography foundation + layout
  "relative w-full rounded-[4px] border px-3 py-2.5 grid has-[>svg]:grid-cols-[16px_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-2 gap-y-1 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        // Default/Info - Fleet blue banner
        default: [
          "bg-[var(--fleet-banner-background-info)] text-[var(--fleet-banner-text)] border-[var(--fleet-banner-border-info)]"
        ],
        // Success/Positive - Fleet green banner
        positive: [
          "bg-[var(--fleet-banner-background-positive)] text-[var(--fleet-banner-text)] border-[var(--fleet-banner-border-positive)]"
        ],
        // Warning - Fleet yellow banner
        warning: [
          "bg-[var(--fleet-banner-background-warning)] text-[var(--fleet-banner-text)] border-[var(--fleet-banner-border-warning)]"
        ],
        // Error/Dangerous - Fleet red banner
        dangerous: [
          "bg-[var(--fleet-banner-background-dangerous)] text-[var(--fleet-banner-text)] border-[var(--fleet-banner-border-dangerous)]"
        ],
        // AI - Fleet purple banner
        ai: [
          "bg-[var(--fleet-banner-background-ai)] text-[var(--fleet-banner-text)] border-[var(--fleet-banner-border-ai)]"
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AlertProps extends React.ComponentProps<"div">, VariantProps<typeof alertVariants> {
  title?: string
  children?: React.ReactNode
  icon?: string | React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
}

// Main Alert component with self-managing pattern
function Alert({
  className,
  variant = "default",
  title,
  children,
  icon,
  dismissible = false,
  onDismiss,
  ...props
}: AlertProps) {
  const [isVisible, setIsVisible] = React.useState(true)

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss()
    } else {
      setIsVisible(false)
    }
  }

  if (!isVisible) return null

  const defaultIcons = {
    default: "info",
    positive: "check-circle",
    warning: "alert-triangle", 
    dangerous: "alert-circle",
    ai: "ai-chat"
  }

  const alertIcon = icon || defaultIcons[variant || "default"]

  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {/* Icon */}
      {alertIcon && (
        <div className="col-start-1">
          {typeof alertIcon === "string" ? (
            <Icon fleet={alertIcon} size="sm" />
          ) : (
            alertIcon
          )}
        </div>
      )}

      {/* Content */}
      <div className="col-start-2 space-y-1">
        {title && (
          <AlertTitle>{title}</AlertTitle>
        )}
        {children && (
          <AlertDescription>{children}</AlertDescription>
        )}
      </div>

      {/* Dismiss button */}
      {dismissible && (
        <div className="col-start-3 flex justify-end">
          <button
            onClick={handleDismiss}
            className="flex items-center justify-center w-4 h-4 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Dismiss alert"
          >
            <Icon fleet="close" size="xs" />
          </button>
        </div>
      )}
    </div>
  )
}

function AlertTitle({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <Typography
      variant="default-semibold"
      className={cn("line-clamp-1", className)}
      data-slot="alert-title"
      {...props}
    >
      {children}
    </Typography>
  )
}

function AlertDescription({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Typography
      variant="default"
      className={cn("text-[var(--fleet-banner-text)] [&_p]:leading-relaxed", className)}
      data-slot="alert-description"
      {...props}
    >
      {children}
    </Typography>
  )
}

export { Alert, AlertTitle, AlertDescription }
