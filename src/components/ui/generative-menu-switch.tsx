"use client"

import { EditorBubble, EditorBubbleItem, useEditor } from "novel"
import { Fragment, type ReactNode, useEffect } from "react"
import { Sparkles } from "lucide-react"
import { AISelector } from "./ai-selector"
import { cn } from "@/lib/utils"

interface GenerativeMenuSwitchProps {
  children: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

const GenerativeMenuSwitch = ({ 
  children, 
  open, 
  onOpenChange 
}: GenerativeMenuSwitchProps) => {
  const { editor } = useEditor()

  useEffect(() => {
    if (!open && editor) {
      // Remove AI highlights when closing
      editor.chain().focus().run()
    }
  }, [open, editor])

  return (
    <EditorBubble
      tippyOptions={{
        placement: open ? "bottom-start" : "top",
        onHidden: () => {
          onOpenChange(false)
        },
      }}
      className={cn(
        "flex w-fit max-w-[90vw] overflow-hidden",
        "bg-[var(--fleet-popup-background)]",
        "border border-[var(--fleet-popup-border)]",
        "shadow-lg rounded-[4px]",
        !open && "p-1 gap-1"
      )}
    >
      {open && <AISelector open={open} onOpenChange={onOpenChange} />}
      {!open && (
        <Fragment>
          <EditorBubbleItem
            onSelect={() => onOpenChange(true)}
            className={cn(
              "flex items-center justify-center gap-1",
              "h-8 px-2 rounded-[4px]",
              "text-sm text-[var(--fleet-listItem-text-default)]",
              "hover:bg-[var(--fleet-listItem-background-hovered)]",
              "focus:bg-[var(--fleet-listItem-background-focused)]",
              "transition-colors cursor-pointer"
            )}
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-xs">Ask AI</span>
          </EditorBubbleItem>
          <div className="h-6 w-px bg-[var(--fleet-border)]" />
          {children}
        </Fragment>
      )}
    </EditorBubble>
  )
}

export default GenerativeMenuSwitch