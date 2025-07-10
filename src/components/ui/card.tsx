import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Typography } from "./typography"

// Fleet Card - Based on Fleet island/panel system
const cardVariants = cva(
  // Fleet foundation - islands use rounded corners and subtle elevation
  "flex flex-col bg-[var(--fleet-terminal-background)] border border-[var(--fleet-border-default)] shadow-sm",
  {
    variants: {
      variant: {
        default: "rounded-[8px]", // Fleet standard radius
        island: "rounded-[12px]", // Fleet island radius
        panel: "rounded-[6px]", // Fleet panel radius
      },
      padding: {
        none: "",
        sm: "p-3",
        default: "p-4",
        lg: "p-6",
      },
      spacing: {
        none: "gap-0",
        sm: "gap-2",
        default: "gap-4",
        lg: "gap-6",
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      spacing: "default",
    },
  }
)

export interface CardProps extends React.ComponentProps<"div">, VariantProps<typeof cardVariants> {}

function Card({ className, variant, padding, spacing, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, padding, spacing }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <Typography
      variant="header-3-semibold"
      data-slot="card-title"
      className={cn("text-[var(--fleet-text-primary)]", className)}
      {...props}
    >
      {children}
    </Typography>
  )
}

function CardDescription({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <Typography
      variant="default"
      data-slot="card-description"
      className={cn("text-[var(--fleet-text-secondary)]", className)}
      {...props}
    >
      {children}
    </Typography>
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={className}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
