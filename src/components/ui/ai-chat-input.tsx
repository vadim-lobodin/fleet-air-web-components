"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button-shadcn"
import { Textarea } from "./textarea"
import { Icon } from "./icon"

import { Toolbar, ToolbarButton } from "./toolbar"
import { ContextMenu, type FleetMenuItem } from "./context-menu"

export interface AiChatInputProps extends React.FormHTMLAttributes<HTMLFormElement> {
  inputProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  isSending?: boolean
  
  
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
  // Send/stop handler
  onSend?: (message: string) => void
  onStop?: () => void
}

const AiChatInput = React.forwardRef<HTMLFormElement, AiChatInputProps>(
  (
    {
      className,
      inputProps,
      buttonProps,
      isSending: externalIsSending,
      onMentionClick: externalOnMentionClick,
      onCommandClick: externalOnCommandClick,
      onFilesDrop,
      placeholder = "What would you like to accomplish today? Use @ for mentions and / for commands",
      maxHeightLines = 7,
      minHeightLines = 1,
      isEnabled = true,
      customBorderColor,
      hasFocus: externalHasFocus,
      showHistory = false,
      history = [],
      onHistorySelect,
      selectedModel: externalSelectedModel,
      availableModels = [
        { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet" },
        { id: "claude-3-haiku", name: "Claude 3 Haiku" },
        { id: "claude-3-opus", name: "Claude 3 Opus" },
      ],
      onModelChange: externalOnModelChange,
      onSend: externalOnSend,
      onStop: externalOnStop,
      ...props
    },
  ) => {
    // Internal state for self-managing mode
    const [internalIsSending, setInternalIsSending] = React.useState(false)
    
    
    const [internalSelectedModel, setInternalSelectedModel] = React.useState("claude-3-5-sonnet")
    
    // Use external values if provided, otherwise internal
    const isSending = externalIsSending !== undefined ? externalIsSending : internalIsSending
    
    const selectedModel = externalSelectedModel !== undefined ? externalSelectedModel : internalSelectedModel
    
    // Internal handlers for self-managing mode
    
    
    const handleMentionClick = () => {
      if (externalOnMentionClick) {
        externalOnMentionClick()
      } else {
        console.log("Mention clicked - add mention functionality")
      }
    }
    
    const handleCommandClick = () => {
      if (externalOnCommandClick) {
        externalOnCommandClick()
      } else {
        console.log("Command clicked - add command functionality")
      }
    }
    
    const handleModelChange = React.useCallback((modelId: string) => {
      if (externalOnModelChange) {
        externalOnModelChange(modelId)
      } else {
        setInternalSelectedModel(modelId)
      }
    }, [externalOnModelChange])
    
    const handleSend = () => {
      if (!value.trim() || isSending) return
      
      const messageToSend = value
      
      if (externalOnSend) {
        externalOnSend(messageToSend)
      } else {
        // Internal mode - simulate sending
        console.log('Sending message:', messageToSend)
        setInternalIsSending(true)
        setValue('')
      }
    }
    
    const handleStop = () => {
      if (externalOnStop) {
        externalOnStop()
      } else {
        setInternalIsSending(false)
      }
    }
    const [value, setValue] = React.useState("")
    const [internalHasFocus, setInternalHasFocus] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)
    const [historyIndex, setHistoryIndex] = React.useState(-1)
    const [isDragOver, setIsDragOver] = React.useState(false)
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    const formRef = React.useRef<HTMLFormElement>(null)
    const containerRef = React.useRef<HTMLDivElement>(null)

    const hasFocus = externalHasFocus !== undefined ? externalHasFocus : internalHasFocus

    // Animated gradient border effect for sending state
    React.useEffect(() => {
      const containerElement = containerRef.current

      if (!containerElement || !isSending) {
        return
      }

      let startTime: number | null = null
      let animationId: number | null = null
      const animationSpeed = 0.1 // degrees per millisecond (36 degrees per second)

      const updateAnimation = (timestamp: number) => {
        if (startTime === null) {
          startTime = timestamp
        }

        const elapsed = timestamp - startTime
        const angle = (elapsed * animationSpeed) % 360
        containerElement.style.setProperty("--angle", `${angle}deg`)
        
        if (isSending) {
          animationId = requestAnimationFrame(updateAnimation)
        }
      }

      containerElement.style.setProperty("--angle", "0deg")
      animationId = requestAnimationFrame(updateAnimation)

      // Cleanup function to cancel animation
      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId)
        }
      }
    }, [isSending])

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
        if (isSending) {
          handleStop()
        } else {
          handleSend()
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

    

    const calculateTextareaHeight = () => {
      const baseHeight = 24 // Base line height
      const lineHeight = 20 // Approximate line height
      const lines = Math.max(minHeightLines, Math.min(maxHeightLines, value.split('\n').length))
      return baseHeight + (lines - 1) * lineHeight
    }

    return (
      <div
        ref={containerRef}
        className={cn(
          "ai-chat-container rounded-lg border transition-all duration-200 focus:outline-none focus-visible:outline-none",
          isSending
            ? "border-transparent animate-border-flow"
            : "border-[var(--fleet-ai-chat-input-border-default)]",
          isDragOver && "border-[var(--fleet-ai-chat-input-border-focused)] bg-[var(--fleet-ai-chat-input-background-default)]/50",
          hasFocus && "ring-1 ring-[var(--fleet-ai-input-field-focus-outline-default)] ring-offset-0",
          "p-0"
        )}
        style={{
          borderColor: !isSending && !isDragOver ? getBorderColor() : undefined,
          ...(isSending && {
            "--angle": "0deg",
            background: `
              linear-gradient(var(--fleet-ai-chat-input-background-default), var(--fleet-ai-chat-input-background-default)) padding-box,
              linear-gradient(var(--angle), transparent 0%, transparent 30%, var(--fleet-ai-chat-input-border-progress) 50%, transparent 70%, transparent 100%) border-box
            `,
          } as React.CSSProperties),
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div 
          className={cn(
            "px-2 pt-2 pb-0 bg-[var(--fleet-ai-chat-input-background-default)] rounded-[8px] transition-all duration-200"
          )}
        >
          <form
            ref={formRef}
            className={cn(
              "flex items-start",
              className
            )}
            onSubmit={(e) => {
              e.preventDefault()
              if (isSending) {
                handleStop()
              } else {
                handleSend()
              }
            }}
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
                "ai-chat-textarea flex-1 resize-none border-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none self-center transition-all duration-200 rounded-[4px] px-2 py-2 [&:focus]:outline-none [&:focus-visible]:outline-none [&:focus]:ring-0 [&:focus-visible]:ring-0",
                inputProps?.className
              )}
              style={{
                height: calculateTextareaHeight(),
                ...inputProps?.style,
                backgroundColor: 'var(--fleet-inputField-ai-background-default)',
                outline: 'none',
                boxShadow: 'none',
                border: 'none',
              }}
            />
          </form>
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              <Toolbar variant="regular" size="default" className="gap-1">
                <ToolbarButton
                  icon="ai-mention"
                  onClick={handleMentionClick}
                  disabled={!isEnabled}
                />
                <ToolbarButton
                  icon="ai-run-commands"
                  onClick={handleCommandClick}
                  disabled={!isEnabled}
                />
              </Toolbar>
              <ContextMenu
                items={React.useMemo(() => 
                  availableModels.map((model): FleetMenuItem => ({
                    type: 'action',
                    name: model.name,
                    id: model.id,
                    action: () => handleModelChange(model.id),
                    checked: model.id === selectedModel,
                  })), [availableModels, selectedModel, handleModelChange]
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
            </div>
            <div className="flex items-center gap-3">
              <ToolbarButton
                icon={isSending ? "stop" : "ai-send"}
                disabled={!isEnabled || (isSending ? false : !value.trim())}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault()
                }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (isSending) {
                    handleStop()
                  } else {
                    handleSend()
                  }
                  buttonProps?.onClick?.(e)
                }}
              />
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
          .animate-border-flow {
            border: 1px solid transparent !important;
          }
        `}</style>
      </div>
    )
  }
)

AiChatInput.displayName = "AiChatInput"

export { AiChatInput }
