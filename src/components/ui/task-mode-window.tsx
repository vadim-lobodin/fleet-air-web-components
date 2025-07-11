"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button-shadcn"
import { Typography } from "./typography"
import { AiChatInput } from "./ai-chat-input"
import { Icon } from "./icon"
import { cva, type VariantProps } from "class-variance-authority"

const taskModeWindowVariants = cva(
  "flex flex-col h-full w-full bg-[var(--fleet-background-primary)] text-foreground",
  {
    variants: {
      variant: {
        default: "",
        centered: "items-center justify-center",
      },
    },
    defaultVariants: {
      variant: "centered",
    },
  }
)

const taskModeContentVariants = cva(
  "flex flex-col w-full max-w-2xl mx-auto px-8 py-8 space-y-8",
  {
    variants: {
      alignment: {
        center: "items-center text-center",
        left: "items-start text-left",
      },
    },
    defaultVariants: {
      alignment: "center",
    },
  }
)

export interface TaskModeWindowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof taskModeWindowVariants> {
  title?: string
  informationItems?: Array<{
    icon: string
    text: string
  }>
  actionButtons?: Array<{
    label: string
    icon: string
    onClick?: () => void
  }>
  contextItemsCount?: number
  toolsCount?: number
  onAddContext?: () => void
  onBrowseFiles?: () => void
  onOpenTerminal?: () => void
  chatInputProps?: React.ComponentProps<typeof AiChatInput>
  alignment?: "center" | "left"
}

const TaskModeWindow = React.forwardRef<HTMLDivElement, TaskModeWindowProps>(
  (
    {
      className,
      variant,
      title = "New Task with Claude Code",
      informationItems = [
        {
          icon: "file-types-markdown",
          text: "Describe your task thoroughly — detailed instructions produce better results",
        },
        {
          icon: "configure",
          text: "Each task runs separately with a dedicated agent",
        },
        {
          icon: "info",
          text: "AI can still make mistakes, so review outputs carefully",
        },
      ],
      actionButtons = [
        {
          label: "Browse Project Files",
          icon: "folder",
        },
        {
          label: "Open Terminal",
          icon: "terminal",
        },
      ],
      contextItemsCount = 2,
      toolsCount = 4,
      onAddContext,
      onBrowseFiles,
      onOpenTerminal,
      chatInputProps,
      alignment = "center",
      ...props
    },
    ref
  ) => {
    const [contextItems, setContextItems] = React.useState(contextItemsCount)
    const [tools, setTools] = React.useState(toolsCount)

    const handleAddContext = () => {
      if (onAddContext) {
        onAddContext()
      } else {
        setContextItems(prev => prev + 1)
      }
    }

    const handleBrowseFiles = () => {
      if (onBrowseFiles) {
        onBrowseFiles()
      } else {
        console.log("Browse project files clicked")
      }
    }

    const handleOpenTerminal = () => {
      if (onOpenTerminal) {
        onOpenTerminal()
      } else {
        console.log("Open terminal clicked")
      }
    }

    return (
      <div
        className={cn(taskModeWindowVariants({ variant }), className)}
        ref={ref}
        {...props}
      >
        <div className={cn(taskModeContentVariants({ alignment }))}>
          {/* Title Section */}
          <div className="space-y-8">
            <Typography
              variant="header-1-semibold"
              className="text-[var(--fleet-text-primary)]"
            >
              {title}
            </Typography>

            {/* Information List */}
            <div className="space-y-4">
              {informationItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 max-w-lg"
                >
                  <Icon
                    fleet={item.icon}
                    size="sm"
                    className="text-[var(--fleet-text-secondary)] mt-0.5 flex-shrink-0"
                  />
                  <Typography
                    variant="default"
                    className="text-[var(--fleet-text-secondary)] text-left"
                  >
                    {item.text}
                  </Typography>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {actionButtons.map((button, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  size="default"
                  iconLeft={button.icon}
                  onClick={
                    button.label === "Browse Project Files"
                      ? handleBrowseFiles
                      : button.label === "Open Terminal"
                      ? handleOpenTerminal
                      : button.onClick
                  }
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Chat Input Section */}
          <div className="w-full space-y-3">
            {/* Context Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[var(--fleet-background-secondary)] rounded-lg border border-[var(--fleet-border-default)]">
              <Typography
                variant="default"
                className="text-[var(--fleet-text-secondary)] text-sm"
              >
                {contextItems} context items, {tools} tools
              </Typography>
              <Button
                variant="ghost"
                size="sm"
                iconLeft="add"
                onClick={handleAddContext}
                className="text-[var(--fleet-text-secondary)] hover:text-[var(--fleet-text-primary)]"
              />
            </div>

            {/* Chat Input */}
            <AiChatInput
              placeholder="Describe your task, @ for mentions, / for commands"
              selectedModel="claude-3-5-sonnet"
              availableModels={[
                { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet" },
                { id: "claude-3-haiku", name: "Claude 3 Haiku" },
                { id: "claude-3-opus", name: "Claude 3 Opus" },
              ]}
              {...chatInputProps}
            />
          </div>
        </div>
      </div>
    )
  }
)

TaskModeWindow.displayName = "TaskModeWindow"

export { TaskModeWindow }