"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button, ToggleButton } from "./button-shadcn"
import { Textarea } from "./textarea"
import { Icon } from "./icon"
import { AttachmentPill, AttachmentPillProps } from "./attachment-pill"
import {
  ContextMenu,
  RightClickContextMenu,
  type FleetMenuItem,
} from "./context-menu"
import { Toolbar, ToolbarButton } from "./toolbar"

export interface AiChatInputProps extends React.FormHTMLAttributes<HTMLFormElement> {
  inputProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  isSending?: boolean
  attachments?: AttachmentPillProps[]
  onRemoveAttachment?: (index: number) => void
  onMentionClick?: () => void
  onCommandClick?: () => void
  onFilesDrop?: (files: File[]) => void
  placeholder?: string
  maxHeightLines?: number
  minHeightLines?: number
  isEnabled?: boolean
  customBorderColor?: string
  customOutlineColor?: string
  hasFocus?: boolean
  showHistory?: boolean
  history?: string[]
  onHistorySelect?: (value: string) => void
  // Model selector props
  selectedModel?: string
  availableModels?: Array<{ id: string; name: string }>
  onModelChange?: (modelId: string) => void
  // Agent mode props
  agentMode?: boolean
  onAgentModeToggle?: () => void
}

const AiChatInput = React.forwardRef<HTMLFormElement, AiChatInputProps>(
  (
    {
      className,
      inputProps,
      buttonProps,
      isSending,
      attachments = [],
      onRemoveAttachment,
      onMentionClick,
      onCommandClick,
      onFilesDrop,
      placeholder = "What would you like to accomplish today? Use @ for mentions and / for commands",
      maxHeightLines = 7,
      minHeightLines = 1,
      isEnabled = true,
      customBorderColor,
      customOutlineColor,
      hasFocus: externalHasFocus,
      showHistory = false,
      history = [],
      onHistorySelect,
      selectedModel = "claude-3-5-sonnet",
      availableModels = [
        { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet" },
        { id: "claude-3-haiku", name: "Claude 3 Haiku" },
        { id: "claude-3-opus", name: "Claude 3 Opus" },
      ],
      onModelChange,
      agentMode = false,
      onAgentModeToggle,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = React.useState("")
    const [internalHasFocus, setInternalHasFocus] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)
    const [historyIndex, setHistoryIndex] = React.useState(-1)
    const [isDragOver, setIsDragOver] = React.useState(false)
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    const formRef = React.useRef<HTMLFormElement>(null)

    const hasFocus = externalHasFocus !== undefined ? externalHasFocus : internalHasFocus

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value)
      setHistoryIndex(-1)
      if (inputProps?.onChange) {
        inputProps.onChange(e)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (showHistory && history.length > 0) {
        if (e.key === 'ArrowUp' && e.ctrlKey) {
          e.preventDefault()
          const newIndex = Math.min(historyIndex + 1, history.length - 1)
          setHistoryIndex(newIndex)
          const historyValue = history[history.length - 1 - newIndex]
          setValue(historyValue)
          onHistorySelect?.(historyValue)
        } else if (e.key === 'ArrowDown' && e.ctrlKey) {
          e.preventDefault()
          const newIndex = Math.max(historyIndex - 1, -1)
          setHistoryIndex(newIndex)
          if (newIndex === -1) {
            setValue("")
          } else {
            const historyValue = history[history.length - 1 - newIndex]
            setValue(historyValue)
            onHistorySelect?.(historyValue)
          }
        }
      }
      
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        if (value.trim() && !isSending) {
          formRef.current?.requestSubmit()
        }
      }
      
      if (e.key === 'Escape') {
        textareaRef.current?.blur()
      }
      
      if (inputProps?.onKeyDown) {
        inputProps.onKeyDown(e)
      }
    }

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      
      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0 && onFilesDrop) {
        onFilesDrop(files)
      }
    }

    const getBorderColor = () => {
      if (customBorderColor) {
        if (hasFocus) return customBorderColor
        if (isHovered) return customBorderColor + '80' // 50% opacity
        return customBorderColor
      }
      
      if (hasFocus) return 'var(--fleet-ai-chat-input-border-focused)'
      if (isHovered) return 'var(--fleet-ai-chat-input-border-hovered)'
      return 'var(--fleet-ai-chat-input-border-default)'
    }

    const getOutlineColor = () => {
      return customOutlineColor || 'var(--fleet-ai-input-field-focus-outline-default)'
    }

    const calculateTextareaHeight = () => {
      const baseHeight = 24 // Base line height
      const lineHeight = 20 // Approximate line height
      const lines = Math.max(minHeightLines, Math.min(maxHeightLines, value.split('\n').length))
      return baseHeight + (lines - 1) * lineHeight
    }

    return (
      <div
        className={cn(
          "ai-chat-container rounded-lg border transition-all duration-200 focus:outline-none focus-visible:outline-none",
          isSending
            ? "border-transparent bg-gradient-to-r from-[var(--fleet-ai-chat-input-border-progress)] to-[var(--fleet-ai-chat-input-border-progress-2)] animate-border-flow"
            : "border-[var(--fleet-ai-chat-input-border-default)]",
          isDragOver && "border-[var(--fleet-ai-chat-input-border-focused)] bg-[var(--fleet-ai-chat-input-background-default)]/50",
          hasFocus && "ring-1 ring-[var(--fleet-ai-input-field-focus-outline-default)] ring-offset-0",
          "p-0.5"
        )}
        style={{
          borderColor: !isSending && !isDragOver ? getBorderColor() : undefined,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div 
          className={cn(
            "px-2 pt-2 pb-0.5 bg-[var(--fleet-ai-chat-input-background-default)] rounded-[7px] transition-all duration-200"
          )}
        >
          <form
            ref={formRef}
            className={cn(
              "flex items-start",
              className
            )}
            {...props}
          >
            <Textarea
              ref={textareaRef}
              variant="borderlessTransparent"
              size="default"
              textStyle="chatMultiline"
              placeholder={placeholder}
              {...inputProps}
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={(e) => {
                setInternalHasFocus(true)
                inputProps?.onFocus?.(e)
              }}
              onBlur={(e) => {
                setInternalHasFocus(false)
                inputProps?.onBlur?.(e)
              }}
              disabled={!isEnabled}
              className={cn(
                "ai-chat-textarea flex-1 resize-none border-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none self-center transition-all duration-200 rounded-md px-2 py-2 [&:focus]:outline-none [&:focus-visible]:outline-none [&:focus]:ring-0 [&:focus-visible]:ring-0",
                inputProps?.className
              )}
              style={{
                height: calculateTextareaHeight(),
                ...inputProps?.style,
                backgroundColor: 'var(--fleet-ai-chat-input-background-default)',
                outline: 'none',
                boxShadow: 'none',
                border: 'none',
              }}
            />
          </form>
          <div className="flex items-center justify-between py-1">
            <Toolbar variant="regular" size="default" className="gap-1">
              <ToolbarButton
                icon="ai-mention"
                onClick={onMentionClick}
                disabled={!isEnabled}
              />
              <ToolbarButton
                icon="ai-run-commands"
                onClick={onCommandClick}
                disabled={!isEnabled}
              />
            </Toolbar>
            <div className="flex items-center gap-3">
              <ContextMenu
                items={React.useMemo(() => 
                  availableModels.map((model): FleetMenuItem => ({
                    type: 'action',
                    name: model.name,
                    id: model.id,
                    action: () => onModelChange?.(model.id),
                    checked: model.id === selectedModel,
                  })), [availableModels, selectedModel, onModelChange]
                )}
                trigger={
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={!isEnabled}
                    className="text-sm text-[var(--fleet-text-secondary)] hover:text-[var(--fleet-text-primary)] focus:text-[var(--fleet-text-primary)] h-auto p-0 font-normal"
                  >
                    {availableModels.find(m => m.id === selectedModel)?.name || selectedModel}
                    <Icon fleet="chevron-down" size="xs" className="ml-1" />
                  </Button>
                }
              />
              <ToggleButton
                selected={agentMode}
                onClick={onAgentModeToggle}
                disabled={!isEnabled}
                size="default"
              >
                Agent Mode
              </ToggleButton>
              <ToolbarButton
                icon={isSending ? undefined : "ai-send"}
                disabled={!value.trim() || isSending || !isEnabled}
                onClick={(e) => {
                  formRef.current?.requestSubmit()
                  buttonProps?.onClick?.(e)
                }}
              >
                {isSending && (
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                )}
              </ToolbarButton>
            </div>
          </div>
          {showHistory && historyIndex >= 0 && (
            <div className="text-xs text-[var(--fleet-text-secondary)] px-2">
              History: {historyIndex + 1} of {history.length}
            </div>
          )}
        </div>
        <style jsx>{`
          .ai-chat-container:focus,
          .ai-chat-container:focus-visible,
          .ai-chat-container:focus-within,
          .ai-chat-textarea:focus,
          .ai-chat-textarea:focus-visible,
          .ai-chat-textarea:focus-within {
            outline: none !important;
            box-shadow: none !important;
          }
          @keyframes border-flow {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-border-flow {
            background-size: 200% 200%;
            animation: border-flow 2s ease infinite;
          }
        `}</style>
      </div>
    )
  }
)

AiChatInput.displayName = "AiChatInput"

export { AiChatInput }
