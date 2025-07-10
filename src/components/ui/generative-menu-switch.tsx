"use client"

import { EditorBubble, useEditor } from "novel"
import { Fragment, type ReactNode, useEffect } from "react"
import { Button } from "./button-shadcn"
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
        "shadow-lg rounded-[4px]"
      )}
    >
      {open && <AISelector open={open} onOpenChange={onOpenChange} />}
      {!open && (
        <Fragment>
          <Button
            className={cn(
              "gap-1 rounded-none",
              "text-sm text-[var(--fleet-listItem-text-default)]",
              "hover:bg-[var(--fleet-listItem-background-hovered)]",
              "focus:bg-[var(--fleet-listItem-background-focused)]"
            )}
            variant="ghost"
            onClick={() => onOpenChange(true)}
            size="sm"
          >
            <Sparkles className="h-4 w-4" />
            Ask AI
          </Button>
          {children}
        </Fragment>
      )}
    </EditorBubble>
  )
}

export default GenerativeMenuSwitch