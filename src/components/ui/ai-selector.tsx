"use client"

import { EditorBubbleItem, useEditor } from "novel"
import { Fragment, useEffect, useState } from "react"
import { Button } from "./button-shadcn"
import { Check, RefreshCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface AISelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface AISelectorCommand {
  name: string
  label: string
  iconName: string
  description: string
}

const aiCommands: AISelectorCommand[] = [
  {
    name: "improve",
    label: "Improve writing",
    iconName: "enhance",
    description: "Improve clarity and quality",
  },
  {
    name: "fix",
    label: "Fix grammar",
    iconName: "spellcheck",
    description: "Fix spelling and grammar",
  },
  {
    name: "shorter",
    label: "Make shorter",
    iconName: "compress",
    description: "Make the text more concise",
  },
  {
    name: "longer",
    label: "Make longer",
    iconName: "expand",
    description: "Expand with more detail",
  },
  {
    name: "continue",
    label: "Continue writing",
    iconName: "pencil",
    description: "Continue from where you left off",
  },
]

export function AISelector({ open, onOpenChange }: AISelectorProps) {
  const { editor } = useEditor()
  const [isLoading, setIsLoading] = useState(false)
  const [completion, setCompletion] = useState("")

  useEffect(() => {
    if (!open) {
      setCompletion("")
      setIsLoading(false)
    }
  }, [open])

  const handleCommand = async (command: AISelectorCommand) => {
    if (!editor) return

    const selection = editor.state.selection
    const selectedText = editor.state.doc.textBetween(selection.from, selection.to)
    
    if (!selectedText.trim()) {
      // If no selection, get some context around cursor
      const contextRange = Math.min(selection.from, 100)
      const context = editor.state.doc.textBetween(
        Math.max(0, selection.from - contextRange),
        selection.from
      )
      if (!context.trim()) return
    }

    setIsLoading(true)
    
    try {
      // Mock AI completion - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      let mockCompletion = ""
      const text = selectedText || "your text"
      
      switch (command.name) {
        case "improve":
          mockCompletion = `Enhanced version of ${text} with improved clarity and flow.`
          break
        case "fix":
          mockCompletion = `Corrected version of ${text} with proper grammar and spelling.`
          break
        case "shorter":
          mockCompletion = `Concise version: ${text.slice(0, Math.max(10, text.length / 2))}...`
          break
        case "longer":
          mockCompletion = `${text} Additionally, this expanded version includes more detailed explanations and context to provide a comprehensive understanding of the topic.`
          break
        case "continue":
          mockCompletion = `${text} Furthermore, continuing from this point, we can explore additional aspects and develop the ideas further.`
          break
        default:
          mockCompletion = `AI-processed version of ${text}`
      }
      
      setCompletion(mockCompletion)
    } catch (error) {
      console.error("AI completion error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccept = () => {
    if (!editor || !completion) return
    
    const selection = editor.state.selection
    editor.chain().focus().insertContentAt(selection, completion).run()
    setCompletion("")
    onOpenChange(false)
  }

  const handleRegenerate = () => {
    // Find the last used command and run it again
    // For now, just clear completion to allow new selection
    setCompletion("")
  }

  if (!editor) return null

  return (
    <div className="flex w-60 flex-col overflow-hidden rounded-[4px]">
      {!completion ? (
        <div className="flex flex-col">
          <div className="flex flex-col p-1">
            {aiCommands.map((command) => (
              <Button
                key={command.name}
                variant="ghost"
                className={cn(
                  "justify-start gap-2 px-3 py-2 h-auto",
                  "text-default leading-default font-body-regular tracking-default",
                  "text-[var(--fleet-listItem-text-default)]",
                  "hover:bg-[var(--fleet-listItem-background-hovered)]",
                  "focus:bg-[var(--fleet-listItem-background-focused)]"
                )}
                onClick={() => handleCommand(command)}
                disabled={isLoading}
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-default leading-default font-body-regular tracking-default">
                    {command.label}
                  </span>
                  <span className="text-small leading-small font-body-regular tracking-default text-[var(--fleet-text-secondary)]">
                    {command.description}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className={cn(
            "flex items-center justify-between p-3 border-b border-[var(--fleet-border)]",
            "text-default leading-default font-body-regular tracking-default",
            "text-[var(--fleet-text-primary)]"
          )}>
            AI Suggestion
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRegenerate}
                className={cn(
                  "h-6 w-6 p-0",
                  "hover:bg-[var(--fleet-listItem-background-hovered)]"
                )}
              >
                <RefreshCcw className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAccept}
                className={cn(
                  "h-6 w-6 p-0",
                  "hover:bg-[var(--fleet-listItem-background-hovered)]"
                )}
              >
                <Check className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className={cn(
            "p-3 max-h-40 overflow-y-auto",
            "text-default leading-default font-body-regular tracking-default",
            "text-[var(--fleet-text-primary)]"
          )}>
            {completion}
          </div>
        </div>
      )}
      
      {isLoading && (
        <div className={cn(
          "flex items-center justify-center p-4",
          "text-default leading-default font-body-regular tracking-default",
          "text-[var(--fleet-text-secondary)]"
        )}>
          <div className="animate-spin h-4 w-4 border-2 border-[var(--fleet-border)] border-t-[var(--fleet-text-accent)] rounded-full" />
          <span className="ml-2">AI is thinking...</span>
        </div>
      )}
    </div>
  )
}