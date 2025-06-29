import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { TextInput, type TextInputProps } from "./input"

// Keep the original shadcn/ui Textarea for compatibility
function ShadcnTextarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

// Fleet Textarea variants using CVA
const textareaVariants = cva(
  "min-h-16", // Base minimum height for textarea
  {
    variants: {
      variant: {
        default: "",
        error: "",
        inner: "",
        borderless: "",
        borderlessTransparent: "",
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
      minHeight: {
        1: "min-h-6",
        2: "min-h-12", 
        3: "min-h-16",
        4: "min-h-20",
        5: "min-h-24",
        6: "min-h-28",
        8: "min-h-32",
        10: "min-h-40",
      },
    },
    defaultVariants: {
      variant: "default",
      resize: "vertical",
      minHeight: 3,
    },
  }
)

// Fleet Textarea component interface
interface TextareaProps
  extends Omit<TextInputProps, "multiline" | "textStyle"> {
  /**
   * Number of visible text lines
   * @default 3
   */
  rows?: number
  /**
   * Minimum number of lines
   * @default rows value
   */
  minRows?: number
  /**
   * Maximum number of lines (for auto-growing)
   * @default undefined (no limit)
   */
  maxRows?: number
  /**
   * Text style variant for multiline text
   * @default "multiline"
   */
  textStyle?: "multiline" | "chatMultiline" | "code"
  /**
   * Resize behavior
   * @default "vertical"
   */
  resize?: "none" | "vertical" | "horizontal" | "both"
  /**
   * Auto-grow to content (up to maxRows)
   * @default false
   */
  autoGrow?: boolean
}

/**
 * Fleet Textarea Component
 * 
 * A multiline text input component that wraps TextInput with multiline-specific
 * defaults and features. Provides Fleet Air design system integration.
 */
const Textarea = React.forwardRef<HTMLInputElement, TextareaProps>(
  (
    {
      className,
      variant = "default",
      textStyle = "multiline",
      resize = "vertical", 
      rows = 3,
      minRows,
      maxRows,
      autoGrow = false,
      ...props
    },
    ref
  ) => {
    const actualMinRows = minRows ?? rows
    const actualMaxRows = maxRows ?? (autoGrow ? undefined : rows)

    return (
      <TextInput
        ref={ref}
        multiline
        minLines={actualMinRows}
        maxLines={actualMaxRows}
        textStyle={textStyle}
        variant={variant}
        className={cn(
          textareaVariants({ 
            variant, 
            resize, 
            minHeight: Math.min(Math.max(rows, 1), 10) as 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 
          }),
          className
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

// Pre-configured Fleet Textarea variants
const DefaultTextarea = React.forwardRef<HTMLInputElement, TextareaProps>(
  ({ textStyle = "multiline", ...props }, ref) => (
    <Textarea ref={ref} variant="default" textStyle={textStyle} {...props} />
  )
)
DefaultTextarea.displayName = "DefaultTextarea"

const ErrorTextarea = React.forwardRef<HTMLInputElement, TextareaProps>(
  ({ textStyle = "multiline", ...props }, ref) => (
    <Textarea ref={ref} variant="error" textStyle={textStyle} {...props} />
  )
)
ErrorTextarea.displayName = "ErrorTextarea"

const CodeTextarea = React.forwardRef<HTMLInputElement, TextareaProps>(
  ({ textStyle = "code", resize = "both", ...props }, ref) => (
    <Textarea ref={ref} variant="default" textStyle={textStyle} resize={resize} {...props} />
  )
)
CodeTextarea.displayName = "CodeTextarea"

const ChatTextarea = React.forwardRef<HTMLInputElement, TextareaProps>(
  ({ textStyle = "chatMultiline", autoGrow = true, minRows = 1, maxRows = 8, ...props }, ref) => (
    <Textarea 
      ref={ref} 
      variant="default" 
      textStyle={textStyle} 
      autoGrow={autoGrow}
      minRows={minRows}
      maxRows={maxRows}
      {...props} 
    />
  )
)
ChatTextarea.displayName = "ChatTextarea"

const InnerTextarea = React.forwardRef<HTMLInputElement, TextareaProps>(
  ({ textStyle = "multiline", resize = "none", ...props }, ref) => (
    <Textarea ref={ref} variant="inner" textStyle={textStyle} resize={resize} {...props} />
  )
)
InnerTextarea.displayName = "InnerTextarea"

export type { TextareaProps }
export {
  Textarea,
  DefaultTextarea,
  ErrorTextarea,
  CodeTextarea,
  ChatTextarea,
  InnerTextarea,
  ShadcnTextarea, // For pure shadcn/ui compatibility
  textareaVariants,
}
