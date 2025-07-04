"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Icon } from "./icon"

export interface AttachmentPillProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: string
  text: string
  onRemove?: () => void
}

const AttachmentPill = React.forwardRef<HTMLDivElement, AttachmentPillProps>(
  ({ className, icon, text, onRemove, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-1.5 pl-1.5 pr-1 py-1 rounded-md bg-[var(--fleet-ai-attachment-background-default)]",
          className
        )}
        {...props}
      >
        <Icon fleet={icon} size="sm" />
        <span className="text-sm">{text}</span>
        <button onClick={onRemove} className="p-0.5 rounded-sm hover:bg-black/10 dark:hover:bg-white/10">
          <Icon fleet="close-small" size="xs" />
        </button>
      </div>
    )
  }
)

AttachmentPill.displayName = "AttachmentPill"

export { AttachmentPill }
