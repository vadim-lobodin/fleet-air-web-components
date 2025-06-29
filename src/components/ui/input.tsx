"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Fleet TextInput variants based on the original Compose implementation
const textInputVariants = cva(
  // Base styles matching Fleet's design system exactly
  "flex w-full border transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--fleet-inputField-hint-default)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: [
          // Default state - matching Fleet exactly
          "border-[var(--fleet-inputField-border-default)]",
          "bg-[var(--fleet-inputField-background-default)]",
          "text-[var(--fleet-inputField-text-default)]",
          "caret-[var(--fleet-inputField-caret-default)]",
          // Hover state
          "hover:border-[var(--fleet-inputField-border-hovered)]",
          "hover:bg-[var(--fleet-inputField-background-hovered)]",
          "hover:text-[var(--fleet-inputField-text-hovered)]",
          // Focus state - proper Fleet focus colors  
          "focus-visible:border-[var(--fleet-inputField-focusBorder-default)]",
          "focus-visible:ring-2",
          "focus-visible:ring-[var(--fleet-inputField-focusOutline-default)]",
          "focus-visible:ring-offset-0",
          // Selection
          "selection:bg-[var(--fleet-inputField-selectionBackground-default)]",
          // Disabled state
          "disabled:border-[var(--fleet-inputField-border-disabled)]",
          "disabled:bg-[var(--fleet-inputField-background-disabled)]",
          "disabled:text-[var(--fleet-inputField-text-disabled)]",
          "disabled:placeholder:text-[var(--fleet-inputField-hint-disabled)]",
        ],
        error: [
          // Error state
          "border-[var(--fleet-inputField-border-error)]",
          "bg-[var(--fleet-inputField-background-error)]",
          "text-[var(--fleet-inputField-text-error)]",
          "caret-[var(--fleet-inputField-caret-error)]",
          // Hover state for error (same as default in Fleet)
          "hover:border-[var(--fleet-inputField-border-error)]",
          "hover:bg-[var(--fleet-inputField-background-error)]",
          "hover:text-[var(--fleet-inputField-text-error)]",
          // Focus state for error - proper Fleet error colors
          "focus-visible:border-[var(--fleet-inputField-focusBorder-error)]",
          "focus-visible:ring-2",
          "focus-visible:ring-[var(--fleet-inputField-focusOutline-error)]",
          "focus-visible:ring-offset-0",
          // Selection for error
          "selection:bg-[var(--fleet-inputField-selectionBackground-error)]",
          // Disabled state
          "disabled:border-[var(--fleet-inputField-border-disabled)]",
          "disabled:bg-[var(--fleet-inputField-background-disabled)]",
          "disabled:text-[var(--fleet-inputField-text-disabled)]",
          "disabled:placeholder:text-[var(--fleet-inputField-hint-disabled)]",
        ],
        inner: [
          // Inner style - no border, minimal padding, no focus ring
          "border-transparent",
          "bg-transparent",
          "text-[var(--fleet-inputField-text-default)]",
          "caret-[var(--fleet-inputField-caret-default)]",
          "focus-visible:border-transparent",
          "focus-visible:ring-0",
          "focus-visible:ring-offset-0",
          "selection:bg-[var(--fleet-inputField-selectionBackground-default)]",
          "disabled:border-transparent",
          "disabled:bg-transparent",
          "disabled:text-[var(--fleet-inputField-text-disabled)]",
        ],
        borderless: [
          // Borderless style - transparent borders but keeps background
          "border-transparent",
          "bg-[var(--fleet-inputField-background-default)]",
          "text-[var(--fleet-inputField-text-default)]",
          "caret-[var(--fleet-inputField-caret-default)]",
          "hover:border-transparent",
          "hover:bg-[var(--fleet-inputField-background-hovered)]",
          "focus-visible:border-transparent",
          "focus-visible:ring-0",
          "selection:bg-[var(--fleet-inputField-selectionBackground-default)]",
          "disabled:border-transparent",
          "disabled:bg-[var(--fleet-inputField-background-disabled)]",
          "disabled:text-[var(--fleet-inputField-text-disabled)]",
        ],
        borderlessTransparent: [
          // Borderless transparent style - completely transparent
          "border-transparent",
          "bg-transparent",
          "text-[var(--fleet-inputField-text-default)]",
          "caret-[var(--fleet-inputField-caret-default)]",
          "hover:border-transparent",
          "hover:bg-transparent",
          "focus-visible:border-transparent",
          "focus-visible:ring-0",
          "selection:bg-[var(--fleet-inputField-selectionBackground-default)]",
          "disabled:border-transparent",
          "disabled:bg-transparent",
          "disabled:text-[var(--fleet-inputField-text-disabled)]",
        ],
      },
      size: {
        // Fleet sizes: default minHeight=24dp, large minHeight=28dp, inner minHeight=18dp
        default: [
          "h-6", // 24px = 6 * 4px
          "min-w-[60px]", // Fleet minWidth = 60.dp
          "rounded", // 4px border radius (rounded = 0.25rem = 4px)
          "px-[6px] py-[2px]", // Fleet padding: start=6dp, top=2dp, end=2dp, bottom=2dp
        ],
        large: [
          "h-7", // 28px = 7 * 4px  
          "min-w-[68px]", // Fleet large minWidth = 68.dp
          "rounded", // 4px border radius
          "px-2 py-1", // Fleet large padding: start=8dp, top=4dp, end=4dp, bottom=4dp
        ],
        inner: [
          "h-[18px]", // Fleet inner minHeight = 18.dp
          "min-w-[60px]",
          "rounded-none", // Fleet inner uses RectangleShape
          "px-[2px] py-[2px]", // Fleet inner padding: vertical=2dp, horizontal=2dp
        ],
      },
      textStyle: {
        // Fleet Typography classes - defined in globals.css with proper theme-aware font weights
        default: [
          "text-default", 
          "leading-default", 
          "font-sans", 
          "font-body-regular", // Uses CSS var: light=520, dark=480 weight
          "tracking-default"
        ], 
        multiline: [
          "text-default-multiline", 
          "leading-default-multiline", 
          "font-sans", 
          "font-body-regular", 
          "tracking-default"
        ], 
        chatMultiline: [
          "text-default-chat", 
          "leading-default-chat", 
          "font-sans", 
          "font-body-regular", 
          "tracking-default"
        ],  
        code: [
          "text-code", 
          "leading-code", 
          "font-mono", 
          "font-code" // Uses CSS var: light=420, dark=400 weight
        ],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      textStyle: "default",
    },
  }
)

// Container variants for handling prefix/suffix layout
const textInputContainerVariants = cva(
  "relative flex w-full items-center border transition-colors",
  {
    variants: {
      variant: {
        default: [
          "border-[var(--fleet-inputField-border-default)]",
          "bg-[var(--fleet-inputField-background-default)]",
          "hover:border-[var(--fleet-inputField-border-hovered)]",
          "hover:bg-[var(--fleet-inputField-background-hovered)]",
          "focus-within:border-[var(--fleet-inputField-focusBorder-default)]",
          "focus-within:ring-2",
          "focus-within:ring-[var(--fleet-inputField-focusOutline-default)]",
          "focus-within:ring-offset-0",
          "has-[:disabled]:border-[var(--fleet-inputField-border-disabled)]",
          "has-[:disabled]:bg-[var(--fleet-inputField-background-disabled)]",
        ],
        error: [
          "border-[var(--fleet-inputField-border-error)]",
          "bg-[var(--fleet-inputField-background-error)]",
          "hover:border-[var(--fleet-inputField-border-error)]",
          "hover:bg-[var(--fleet-inputField-background-error)]",
          "focus-within:border-[var(--fleet-inputField-focusBorder-error)]",
          "focus-within:ring-2",
          "focus-within:ring-[var(--fleet-inputField-focusOutline-error)]",
          "focus-within:ring-offset-0",
          "has-[:disabled]:border-[var(--fleet-inputField-border-disabled)]",
          "has-[:disabled]:bg-[var(--fleet-inputField-background-disabled)]",
        ],
        inner: [
          "border-transparent",
          "bg-transparent",
          "hover:border-transparent",
          "hover:bg-transparent",
          "focus-within:border-transparent",
          "focus-within:ring-0",
          "has-[:disabled]:border-transparent",
          "has-[:disabled]:bg-transparent",
        ],
        borderless: [
          "border-transparent",
          "bg-[var(--fleet-inputField-background-default)]",
          "hover:border-transparent",
          "hover:bg-[var(--fleet-inputField-background-hovered)]",
          "focus-within:border-transparent",
          "focus-within:ring-0",
          "has-[:disabled]:border-transparent",
          "has-[:disabled]:bg-[var(--fleet-inputField-background-disabled)]",
        ],
        borderlessTransparent: [
          "border-transparent",
          "bg-transparent",
          "hover:border-transparent",
          "hover:bg-transparent",
          "focus-within:border-transparent",
          "focus-within:ring-0",
          "has-[:disabled]:border-transparent",
          "has-[:disabled]:bg-transparent",
        ],
      },
      size: {
        default: "h-6 rounded min-w-[60px]",
        large: "h-7 rounded min-w-[68px]",
        inner: "h-[18px] rounded-none min-w-[60px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix">,
    VariantProps<typeof textInputVariants> {
  /**
   * Optional prefix element (icon, text, etc.) - Fleet calls this prefixBuilder
   */
  prefix?: React.ReactNode
  /**
   * Optional suffix element (icon, button, etc.) - Fleet calls this suffixBuilder  
   */
  suffix?: React.ReactNode
  /**
   * Container className for styling the wrapper when prefix/suffix are used
   */
  containerClassName?: string
  /**
   * Whether the input is in an error state - Fleet uses errorTextInputStyle()
   */
  error?: boolean
  /**
   * Alignment for prefix element in multiline inputs
   */
  prefixAlignment?: "center" | "top" | "bottom"
  /**
   * Alignment for suffix element in multiline inputs
   */
  suffixAlignment?: "center" | "top" | "bottom"
  /**
   * Whether to render as multiline textarea
   */
  multiline?: boolean
  /**
   * Minimum number of lines for multiline inputs
   */
  minLines?: number
  /**
   * Maximum number of lines for multiline inputs
   */
  maxLines?: number
  /**
   * Whether text should wrap in multiline inputs
   */
  softWrap?: boolean
  /**
   * Whether input should grow with content (auto-width)
   */
  growing?: boolean
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ 
    className, 
    containerClassName,
    variant, 
    size, 
    textStyle,
    prefix, 
    suffix, 
    error,
    disabled,
    prefixAlignment = "center",
    suffixAlignment = "center",
    multiline,
    minLines = 1,
    maxLines,
    softWrap = true,
    growing,
    style,
    ...props 
  }, ref) => {
    // Determine the variant based on props - match Fleet's logic
    const computedVariant = React.useMemo(() => {
      if (error) return "error"
      return variant || "default"
    }, [error, variant])

    // Handle multiline inputs
    if (multiline) {
      const lineHeight = 1.5
      const minHeight = minLines * lineHeight
      const maxHeight = maxLines ? maxLines * lineHeight : undefined

      const textareaStyle = {
        minHeight: `${minHeight}rem`,
        maxHeight: maxHeight ? `${maxHeight}rem` : undefined,
        resize: maxLines ? 'none' as const : 'vertical' as const,
        whiteSpace: softWrap ? 'pre-wrap' as const : 'pre' as const,
        overflowWrap: softWrap ? 'break-word' as const : 'normal' as const,
        ...style
      }

      if (prefix || suffix) {
        return (
          <div className={cn(
            textInputContainerVariants({ variant: computedVariant, size }),
            "items-start", // Align to top for multiline
            containerClassName
          )}>
            {prefix && (
              <div className={cn(
                "flex pl-[6px] pointer-events-none text-[var(--fleet-inputField-hint-default)]",
                prefixAlignment === "center" && "items-center self-center",
                prefixAlignment === "top" && "items-start self-start pt-[2px]",
                prefixAlignment === "bottom" && "items-end self-end pb-[2px]"
              )}>
                {prefix}
              </div>
            )}
            <textarea
              className={cn(
                textInputVariants({ variant: computedVariant, size, textStyle }),
                "border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 resize-none",
                prefix && "pl-1",
                suffix && "pr-1",
                className
              )}
              ref={ref as any}
              disabled={disabled}
              style={textareaStyle}
              {...(props as any)}
            />
            {suffix && (
              <div className={cn(
                "flex pr-[2px] text-[var(--fleet-inputField-hint-default)]",
                suffixAlignment === "center" && "items-center self-center",
                suffixAlignment === "top" && "items-start self-start pt-[2px]",
                suffixAlignment === "bottom" && "items-end self-end pb-[2px]"
              )}>
                {suffix}
              </div>
            )}
          </div>
        )
      }

      return (
        <textarea
          className={cn(textInputVariants({ variant: computedVariant, size, textStyle }), "resize-none", className)}
          ref={ref as any}
          disabled={disabled}
          style={textareaStyle}
          {...(props as any)}
        />
      )
    }

    // Handle growing inputs
    if (growing) {
      return (
        <div className="inline-flex">
          <div className={cn(textInputContainerVariants({ variant: computedVariant, size }), containerClassName)}>
            {prefix && (
              <div className="flex items-center pl-[6px] pointer-events-none text-[var(--fleet-inputField-hint-default)]">
                {prefix}
              </div>
            )}
            <input
              className={cn(
                textInputVariants({ variant: computedVariant, size, textStyle }),
                "border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 min-w-[4ch] w-auto",
                prefix && "pl-1",
                suffix && "pr-1",
                className
              )}
              ref={ref}
              disabled={disabled}
              {...props}
            />
            {suffix && (
              <div className="flex items-center pr-[2px] text-[var(--fleet-inputField-hint-default)]">
                {suffix}
              </div>
            )}
          </div>
        </div>
      )
    }

    // If we have prefix or suffix, we need to use a container layout
    if (prefix || suffix) {
  return (
        <div className={cn(textInputContainerVariants({ variant: computedVariant, size }), containerClassName)}>
          {prefix && (
            <div className="flex items-center pl-[6px] pointer-events-none text-[var(--fleet-inputField-hint-default)]">
              {prefix}
            </div>
          )}
    <input
      className={cn(
              textInputVariants({ variant: computedVariant, size, textStyle }),
              "border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
              prefix && "pl-1", // Reduced padding when prefix present
              suffix && "pr-1", // Reduced padding when suffix present
        className
      )}
            ref={ref}
            disabled={disabled}
            {...props}
          />
          {suffix && (
            <div className="flex items-center pr-[2px] text-[var(--fleet-inputField-hint-default)]">
              {suffix}
            </div>
          )}
        </div>
      )
    }

    // Simple input without prefix/suffix
    return (
      <input
        className={cn(textInputVariants({ variant: computedVariant, size, textStyle }), className)}
        ref={ref}
        disabled={disabled}
      {...props}
    />
  )
  }
)
TextInput.displayName = "TextInput"

// Fleet-specific style variants as separate components
const DefaultTextInput = React.forwardRef<HTMLInputElement, Omit<TextInputProps, "variant">>(
  (props, ref) => <TextInput ref={ref} variant="default" {...props} />
)
DefaultTextInput.displayName = "DefaultTextInput"

const ErrorTextInput = React.forwardRef<HTMLInputElement, Omit<TextInputProps, "variant" | "error">>(
  (props, ref) => <TextInput ref={ref} variant="error" error {...props} />
)
ErrorTextInput.displayName = "ErrorTextInput"

const LargeTextInput = React.forwardRef<HTMLInputElement, Omit<TextInputProps, "size">>(
  (props, ref) => <TextInput ref={ref} size="large" {...props} />
)
LargeTextInput.displayName = "LargeTextInput"

const LargeErrorTextInput = React.forwardRef<HTMLInputElement, Omit<TextInputProps, "size" | "variant" | "error">>(
  (props, ref) => <TextInput ref={ref} size="large" variant="error" error {...props} />
)
LargeErrorTextInput.displayName = "LargeErrorTextInput"

const InnerTextInput = React.forwardRef<HTMLInputElement, Omit<TextInputProps, "variant" | "size">>(
  (props, ref) => <TextInput ref={ref} variant="inner" size="inner" {...props} />
)
InnerTextInput.displayName = "InnerTextInput"

const InnerErrorTextInput = React.forwardRef<HTMLInputElement, Omit<TextInputProps, "variant" | "size" | "error">>(
  (props, ref) => <TextInput ref={ref} variant="inner" size="inner" error {...props} />
)
InnerErrorTextInput.displayName = "InnerErrorTextInput"

const BorderlessTextInput = React.forwardRef<HTMLInputElement, Omit<TextInputProps, "variant">>(
  (props, ref) => <TextInput ref={ref} variant="borderless" {...props} />
)
BorderlessTextInput.displayName = "BorderlessTextInput"

const BorderlessTransparentTextInput = React.forwardRef<HTMLInputElement, Omit<TextInputProps, "variant">>(
  (props, ref) => <TextInput ref={ref} variant="borderlessTransparent" {...props} />
)
BorderlessTransparentTextInput.displayName = "BorderlessTransparentTextInput"

// Tree cell variants - used in Fleet's tree components
const TreeCellInnerTextInput = React.forwardRef<HTMLInputElement, Omit<TextInputProps, "variant" | "size">>(
  (props, ref) => <TextInput ref={ref} variant="inner" size="inner" {...props} />
)
TreeCellInnerTextInput.displayName = "TreeCellInnerTextInput"

const TreeCellInnerErrorTextInput = React.forwardRef<HTMLInputElement, Omit<TextInputProps, "variant" | "size" | "error">>(
  (props, ref) => <TextInput ref={ref} variant="inner" size="inner" error {...props} />
)
TreeCellInnerErrorTextInput.displayName = "TreeCellInnerErrorTextInput"

// Code-specific variants
const CodeTextInput = React.forwardRef<HTMLInputElement, Omit<TextInputProps, "textStyle">>(
  (props, ref) => <TextInput ref={ref} textStyle="code" {...props} />
)
CodeTextInput.displayName = "CodeTextInput"

const LargeCodeTextInput = React.forwardRef<HTMLInputElement, Omit<TextInputProps, "size" | "textStyle">>(
  (props, ref) => <TextInput ref={ref} size="large" textStyle="code" {...props} />
)
LargeCodeTextInput.displayName = "LargeCodeTextInput"

// Password-specific variants
const PasswordTextInput = React.forwardRef<HTMLInputElement, Omit<TextInputProps, "type">>(
  (props, ref) => <TextInput ref={ref} type="password" {...props} />
)
PasswordTextInput.displayName = "PasswordTextInput"

const LargePasswordTextInput = React.forwardRef<HTMLInputElement, Omit<TextInputProps, "size" | "type">>(
  (props, ref) => <TextInput ref={ref} size="large" type="password" {...props} />
)
LargePasswordTextInput.displayName = "LargePasswordTextInput"

// Growing input variant
const GrowingTextInput = React.forwardRef<HTMLInputElement, Omit<TextInputProps, "growing">>(
  (props, ref) => <TextInput ref={ref} growing {...props} />
)
GrowingTextInput.displayName = "GrowingTextInput"

// Multiline variants
const MultilineTextInput = React.forwardRef<HTMLInputElement, Omit<TextInputProps, "multiline">>(
  (props, ref) => <TextInput ref={ref} multiline {...props} />
)
MultilineTextInput.displayName = "MultilineTextInput"

const MultilineCodeTextInput = React.forwardRef<HTMLInputElement, Omit<TextInputProps, "multiline" | "textStyle">>(
  (props, ref) => <TextInput ref={ref} multiline textStyle="code" {...props} />
)
MultilineCodeTextInput.displayName = "MultilineCodeTextInput"

export {
  TextInput,
  DefaultTextInput,
  ErrorTextInput,
  LargeTextInput,
  LargeErrorTextInput,
  InnerTextInput,
  InnerErrorTextInput,
  BorderlessTextInput,
  BorderlessTransparentTextInput,
  TreeCellInnerTextInput,
  TreeCellInnerErrorTextInput,
  CodeTextInput,
  LargeCodeTextInput,
  PasswordTextInput,
  LargePasswordTextInput,
  GrowingTextInput,
  MultilineTextInput,
  MultilineCodeTextInput,
  textInputVariants,
}

// Compatibility alias for shadcn/ui users
export const Input = TextInput
