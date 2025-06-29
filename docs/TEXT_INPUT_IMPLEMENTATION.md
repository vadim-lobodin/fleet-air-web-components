# Fleet Air Input Component Implementation

## Overview

The Fleet Air Input component is a React implementation that mirrors the Fleet Compose TextInput component. It provides a comprehensive input field system with full support for Fleet's design system, including semantic color tokens, multiple variants, states, and advanced features like prefix/suffix elements.

**Note**: This component replaces and extends the standard shadcn/ui Input component with Fleet-specific styling and functionality.

## Features

### Core Features
- **Fleet Design System Integration**: Uses all Fleet semantic color tokens for consistent theming
- **Multiple Variants**: Default, error, positive, and AI-specific styling
- **Prefix/Suffix Support**: Icons, buttons, or any React elements
- **Size Variants**: Small, default, and large sizes
- **Accessibility**: Built on shadcn/ui foundation with ARIA compliance
- **Type Safety**: Full TypeScript support with strict typing

### Variants

#### State Variants  
- `default`: Standard input styling with Fleet's default colors
- `error`: Red border and focus ring for validation errors
- `inner`: Transparent borders, minimal padding, no focus ring (for inline editing)
- `borderless`: Transparent borders but keeps background
- `borderlessTransparent`: Completely transparent background and borders

#### Size Variants (Fleet-accurate)
- `default`: Height 24px (6 Tailwind units), min-width 60px, padding 6px/2px, 4px border radius
- `large`: Height 28px (7 Tailwind units), min-width 68px, padding 8px/4px, 4px border radius  
- `inner`: Height 18px, min-width 60px, padding 2px/2px, no border radius (rectangle)

## Architecture

The component is built using:
- **shadcn/ui input** as the foundation for accessibility and behavior
- **Class Variance Authority (CVA)** for type-safe variant management
- **Tailwind CSS** with Fleet's semantic color tokens
- **React forwardRef** for proper ref handling
- **Consistent Typography**: Uses same CSS utility classes as other components: `text-default leading-default font-body-regular tracking-default`

### Single Component Approach

Unlike typical component libraries that have separate `Input` and `TextInput` components, we use a **single consolidated component** that:

1. **Replaces shadcn/ui Input**: Provides all basic input functionality
2. **Extends with Fleet features**: Adds Fleet-specific variants and styling
3. **Supports all use cases**: From simple text inputs to complex prefix/suffix layouts

## Fleet Component Variants

The implementation provides exact Fleet component equivalents:

```tsx
import { 
  TextInput,              // Main component - replaces shadcn Input
  DefaultTextInput,       // Fleet defaultTextInputStyle()
  ErrorTextInput,         // Fleet errorTextInputStyle()  
  LargeTextInput,         // Fleet largeTextInputStyle()
  LargeErrorTextInput,    // Fleet largeErrorTextInputStyle()
  InnerTextInput,         // Fleet innerTextInputStyle()
  InnerErrorTextInput,    // Fleet innerErrorTextInputStyle()
  BorderlessTextInput,    // Fleet borderlessTextInputStyle()
  BorderlessTransparentTextInput, // Fleet borderlessTransparentTextInputStyle()
  TreeCellInnerTextInput, // Fleet TreeCellInnerTextInputStyle()
  TreeCellInnerErrorTextInput, // Fleet TreeCellInnerErrorTextInputStyle()
} from "@/components/ui/input"

// Also available as Input for shadcn compatibility
import { Input } from "@/components/ui/input" // Same as TextInput
```

## Usage Examples

### Basic Usage (replaces shadcn Input)

```tsx
// Instead of shadcn Input
import { Input } from "@/components/ui/input"
<Input placeholder="Enter text..." />

// Use Fleet TextInput (recommended)
import { TextInput } from "@/components/ui/input"
<TextInput placeholder="Enter text..." />
```

### Fleet-Specific Components

```tsx
// Fleet default style (24px height, 6px padding)
<DefaultTextInput placeholder="Enter text..." />

// Fleet error style (red borders)
<ErrorTextInput placeholder="This has an error" />

// Fleet large style (28px height, 8px padding)
<LargeTextInput placeholder="Large input" />

// Fleet inner style (18px height, minimal padding, no borders)
<InnerTextInput placeholder="Inline editing" />
```

### With Icons and Interactive Elements

```tsx
import { Search, User, Mail, Lock, Eye, EyeOff } from "lucide-react"

// Search input with icon
<TextInput 
  prefix={<Search className="h-4 w-4" />}
  placeholder="Search..."
/>

// Password input with toggle
<TextInput 
  type={showPassword ? "text" : "password"}
  prefix={<Lock className="h-4 w-4" />}
  suffix={
    <button onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  }
  placeholder="Password"
/>
```

## Migration Guide

### From shadcn/ui Input

```tsx
// Before (shadcn/ui)
import { Input } from "@/components/ui/input"
<Input placeholder="Enter text" />

// After (Fleet Input - drop-in replacement)
import { TextInput } from "@/components/ui/input"
<TextInput placeholder="Enter text" />

// Or use the alias for compatibility
import { Input } from "@/components/ui/input"
<Input placeholder="Enter text" />
```

### Benefits of Consolidation

1. **Single Import**: One component handles all input needs
2. **Consistent API**: Same props and behavior across all variants
3. **Better Maintenance**: Single file to update and maintain
4. **Smaller Bundle**: No duplicate code or functionality
5. **Fleet Integration**: Built-in Fleet design system support

## Color System Integration

The component uses Fleet's semantic color tokens for consistent theming:

```css
/* Default state colors */
--fleet-inputField-background-default
--fleet-inputField-border-default
--fleet-inputField-text-default
--fleet-inputField-caret-default

/* Hover state colors */
--fleet-inputField-border-hovered
--fleet-inputField-background-hovered
--fleet-inputField-text-hovered

/* Focus state colors */
--fleet-inputField-focusBorder-default
--fleet-inputField-focusOutline-default

/* Error state colors */
--fleet-inputField-border-error
--fleet-inputField-focusBorder-error
--fleet-inputField-focusOutline-error

/* Disabled state colors */
--fleet-inputField-border-disabled
--fleet-inputField-background-disabled
--fleet-inputField-text-disabled
```

## API Reference

### TextInputProps

```tsx
interface TextInputProps extends 
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix">,
  VariantProps<typeof textInputVariants> {
  
  // Visual variants
  variant?: "default" | "error" | "inner" | "borderless" | "borderlessTransparent"
  size?: "default" | "large" | "inner"
  textStyle?: "default" | "multiline" | "chatMultiline" | "code"
  
  // State shortcuts
  error?: boolean      // Sets variant to "error"
  
  // Layout elements
  prefix?: React.ReactNode    // Icon, text, or component before input
  suffix?: React.ReactNode    // Icon, button, or component after input
  
  // Container styling
  containerClassName?: string // For styling the wrapper when prefix/suffix are used
}
```

## File Structure

```
src/components/ui/
├── input.tsx              # Single consolidated Fleet Input component
├── index.ts               # Exports TextInput, Input (alias), and all variants
└── ...other components
```

## Testing

```tsx
import { TextInput, DefaultTextInput, ErrorTextInput } from "@/components/ui/input"

describe('Fleet Input Component', () => {
  it('works as drop-in replacement for shadcn Input', () => {
    render(<TextInput placeholder="test" />)
    expect(screen.getByPlaceholderText('test')).toBeInTheDocument()
  })
  
  it('supports Fleet-specific variants', () => {
    render(<ErrorTextInput placeholder="error" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })
  
  it('handles prefix/suffix elements', () => {
    render(
      <TextInput 
        prefix={<span data-testid="prefix">Icon</span>}
        suffix={<button data-testid="suffix">Clear</button>}
      />
    )
    expect(screen.getByTestId('prefix')).toBeInTheDocument()
    expect(screen.getByTestId('suffix')).toBeInTheDocument()
  })
})
```

## Conclusion

The consolidated Fleet Air Input component provides a comprehensive, accessible, and themeable input solution that:

- **Replaces shadcn/ui Input** with enhanced functionality
- **Maintains full compatibility** with existing shadcn patterns
- **Adds Fleet-specific features** and styling
- **Simplifies the component API** with a single, powerful component
- **Reduces bundle size** by eliminating duplicate functionality

This approach gives you the best of both worlds: shadcn/ui's solid foundation with Fleet's design system integration and advanced features.

## Recent Fixes and Improvements

### Typography Consistency

During development, typography consistency across all components was standardized. The TextInput component now uses the same CSS utility classes as other components (Button, Typography):

**Consistent Typography Classes:**
```tsx
"text-default leading-default font-body-regular tracking-default"
```

**Font Specifications (matching Fleet exactly):**
- **Size**: 13px (`text-default`)
- **Line Height**: 16px (`leading-default`) for default, 18px for multiline, 20px for chatMultiline
- **Weight**: 520 (light theme) / 480 (dark theme) (`font-body-regular`)
- **Letter Spacing**: 0% (light) / 0.4% (dark) (`tracking-default`)

**Benefits:**
- **Theme-aware font weights**: Automatically adapts between light (520) and dark (480) themes
- **Maintainability**: Single source of truth for typography in `globals.css`
- **Consistency**: All components use identical typography classes
- **Fleet accuracy**: Matches Fleet's exact font specifications

### Focus Ring Color Issues

Fixed focus ring colors appearing black instead of Fleet colors:

**Problem:** Ring colors were not properly visible due to ring opacity issues.

**Solution:** 
```tsx
// ❌ Before (black focus ring)
"focus-visible:ring-opacity-100"

// ✅ After (proper Fleet colors)
"focus-visible:ring-offset-0"
```

**Focus Ring Colors (properly applied):**
- **Light Theme**: `#A8C6F4` (Blue_120)
- **Dark Theme**: `#224271` (Blue_40)

These fixes ensure that input focus states are clearly visible and match Fleet's design system exactly.

## Textarea Integration

Following the shadcn/ui pattern of separate `Input` and `Textarea` components, while maintaining Fleet Air's unified approach, we've implemented a comprehensive Textarea system:

### **Hybrid Architecture**

**Unified Core (Fleet Air approach):**
- **TextInput**: Main component supporting both single-line and multiline via `multiline` prop
- **Fleet consistency**: Matches exactly the Fleet Air TextInput with `TextInputMode.MultiLine`

**Dedicated Components (shadcn/ui compatibility):**
- **Textarea**: Wrapper around TextInput with multiline-specific defaults
- **Specialized variants**: CodeTextarea, ChatTextarea, InnerTextarea, etc.
- **shadcn compatibility**: ShadcnTextarea for pure shadcn/ui integration

### **Textarea Component Features**

**Core Features:**
- **Fleet Design Integration**: Uses Fleet semantic color tokens and typography
- **Auto-growing**: Dynamic height adjustment based on content (minRows/maxRows)
- **Resize Control**: none, vertical, horizontal, both resize options
- **Text Styles**: multiline, chatMultiline, code variants
- **Prefix/Suffix Support**: Icons, buttons, or custom elements

**Specialized Variants:**
```tsx
// General multiline input
<Textarea placeholder="Enter text..." rows={4} />

// Code editing with monospace font
<CodeTextarea placeholder="Enter code..." rows={8} resize="both" />

// Chat interface with auto-growing (1-8 lines)
<ChatTextarea placeholder="Type message..." autoGrow />

// Inline editing with transparent borders
<InnerTextarea placeholder="Edit inline..." rows={2} />

// Error state for validation
<ErrorTextarea placeholder="Required field..." />
```

### **Integration Benefits**

**Dual Compatibility:**
- **Fleet Air fidelity**: TextInput matches Kotlin/Compose implementation exactly
- **shadcn/ui ecosystem**: Textarea provides familiar shadcn component patterns
- **Gradual migration**: Can use either approach based on project needs

**Consistent Foundation:**
- **Same base**: All textarea variants use the same TextInput foundation
- **Typography consistency**: All use identical CSS utility classes
- **Color system**: Unified Fleet semantic color tokens
- **Accessibility**: Built on Radix UI primitives via shadcn/ui

**Developer Experience:**
```tsx
// ✅ Fleet Air approach (unified component)
<TextInput multiline minLines={3} maxLines={8} />

// ✅ shadcn/ui approach (dedicated component)  
<Textarea rows={3} autoGrow maxRows={8} />

// ✅ Specialized use cases
<CodeTextarea rows={10} />
<ChatTextarea />
```

### **Implementation Reference**

The Textarea system implementation can be found at:
- **Component**: `src/components/ui/textarea.tsx`
- **Examples**: `src/app/examples/textareas/page.tsx` ([Textarea Examples](http://localhost:3000/examples/textareas))
- **Fleet Reference**: Fleet Air `TextInput.kt` with `TextInputMode.MultiLine`

This approach provides the best of both worlds: Fleet Air design fidelity with modern React/shadcn ecosystem compatibility. 