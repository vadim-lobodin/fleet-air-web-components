import * as React from "react"
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-[var(--fleet-background-secondary)] animate-pulse rounded-[4px]", 
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
