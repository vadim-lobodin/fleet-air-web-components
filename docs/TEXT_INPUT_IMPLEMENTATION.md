# Fleet Air Input & Textarea Components Implementation

## Overview

The Fleet Air input system consists of two separate components that mirror the Fleet Compose TextInput component:

- **TextInput**: Single-line input fields (replaces shadcn/ui Input)
- **Textarea**: Multiline text areas (dedicated multiline component)

Both provide comprehensive integration with Fleet's design system, including semantic color tokens, multiple variants, states, and advanced features like prefix/suffix elements.

## Architecture

### Clean Separation of Concerns

**TextInput (`src/components/ui/input.tsx`)**:
- Single-line inputs only
- Replaces shadcn/ui Input component
- Supports all Fleet variants and features
- No multiline functionality

**Textarea (`src/components/ui/textarea.tsx`)**:
- Multiline text areas only  
- Independent implementation
- Supports same Fleet variants and features
- Auto-grow, resize control, specialized variants

### Benefits of Separation

1. **Clear API**: No confusion about which component to use
2. **Type Safety**: Each component has appropriate types (HTMLInputElement vs HTMLTextAreaElement)
3. **Maintainability**: Single responsibility principle
4. **Performance**: No unnecessary multiline logic in single-line inputs
5. **Ecosystem Compatibility**: Follows shadcn/ui pattern of separate Input/Textarea

## TextInput Component

### Features
- **Fleet Design System Integration**: Uses all Fleet semantic color tokens
- **Multiple Variants**: Default, error, inner, borderless, borderlessTransparent
- **Size Variants**: Default (24px), large (28px), inner (18px)
- **Prefix/Suffix Support**: Icons, buttons, or any React elements
- **Growing Support**: Auto-width for dynamic content
- **Type Safety**: Full TypeScript support

### Usage

```tsx
import { TextInput, DefaultTextInput, ErrorTextInput } from "@/components/ui/input"

// Basic usage (replaces shadcn Input)
<TextInput placeholder="Enter text..." />

// Fleet-specific variants
<DefaultTextInput placeholder="Default style" />
<ErrorTextInput placeholder="Error state" />
<LargeTextInput placeholder="Large input" />
<InnerTextInput placeholder="Inline editing" />

// With prefix/suffix
<TextInput 
  prefix={<Search className="h-4 w-4" />}
  suffix={<Button size="sm">Go</Button>}
  placeholder="Search..."
/>

// Growing input
<TextInput growing placeholder="Auto-width input" />
```

### Available Variants

```tsx
// Basic variants
DefaultTextInput, ErrorTextInput, LargeTextInput, LargeErrorTextInput
InnerTextInput, InnerErrorTextInput, BorderlessTextInput, BorderlessTransparentTextInput

// Specialized variants  
TreeCellInnerTextInput, TreeCellInnerErrorTextInput
CodeTextInput, LargeCodeTextInput
PasswordTextInput, LargePasswordTextInput
GrowingTextInput

// Compatibility alias
Input // Same as TextInput
```

## Textarea Component

### Features
- **Fleet Design System Integration**: Same Fleet variants as TextInput
- **Auto-Growing**: Dynamic height adjustment (minRows/maxRows)
- **Resize Control**: none, vertical, horizontal, both
- **Text Styles**: default, chatMultiline, code variants
- **Prefix/Suffix Support**: Same as TextInput
- **Specialized Variants**: Code editing, chat interfaces

### Usage

```tsx
import { Textarea, DefaultTextarea, CodeTextarea, ChatTextarea } from "@/components/ui/textarea"

// Basic multiline
<Textarea placeholder="Enter text..." rows={4} />

// Auto-growing chat interface
<ChatTextarea placeholder="Type message..." autoGrow maxRows={8} />

// Code editing
<CodeTextarea placeholder="Enter code..." rows={10} resize="both" />

// Fleet variants
<DefaultTextarea placeholder="Default style" />
<ErrorTextarea placeholder="Error state" />
<LargeTextarea placeholder="Large textarea" />
<InnerTextarea placeholder="Inline editing" />

// With prefix/suffix
<Textarea 
  prefix={<FileText className="h-4 w-4" />}
  suffix={<Button size="sm">Save</Button>}
  placeholder="Document content..."
  rows={6}
/>
```

### Available Variants

```tsx
// Basic variants
DefaultTextarea, ErrorTextarea, LargeTextarea, LargeErrorTextarea
InnerTextarea, InnerErrorTextarea, BorderlessTextarea, BorderlessTransparentTextarea

// Specialized variants
CodeTextarea, LargeCodeTextarea, ChatTextarea

// shadcn/ui compatibility
ShadcnTextarea
```

## Fleet Component Mapping

### TextInput Variants (Single-line)
| React Component | Fleet Function | Measurements |
|----------------|----------------|--------------|
| `DefaultTextInput` | `defaultTextInputStyle()` | 24px height, 6px/2px padding |
| `ErrorTextInput` | `errorTextInputStyle()` | 24px height, error colors |
| `LargeTextInput` | `largeTextInputStyle()` | 28px height, 8px/4px padding |
| `LargeErrorTextInput` | `largeErrorTextInputStyle()` | 28px height, large + error |
| `InnerTextInput` | `innerTextInputStyle()` | 18px height, 2px padding |
| `InnerErrorTextInput` | `innerErrorTextInputStyle()` | 18px height, inner + error |
| `BorderlessTextInput` | `borderlessTextInputStyle()` | Transparent borders |
| `BorderlessTransparentTextInput` | `borderlessTransparentTextInputStyle()` | 1px end padding |

### Textarea Variants (Multiline)
| React Component | Fleet Equivalent | Measurements |
|----------------|----------------|--------------|
| `DefaultTextarea` | `defaultTextInputStyle()` + multiline | 64px min-height, 6px/2px padding |
| `ErrorTextarea` | `errorTextInputStyle()` + multiline | 64px min-height, error colors |
| `LargeTextarea` | `largeTextInputStyle()` + multiline | 80px min-height, 8px/4px padding |
| `InnerTextarea` | `innerTextInputStyle()` + multiline | 48px min-height, 2px padding |
| `CodeTextarea` | Code text style + multiline | Monospace font, syntax highlighting |
| `ChatTextarea` | Chat text style + auto-grow | Auto-growing, 1-8 lines |

## Migration Guide

### From Previous Implementation (with multiline prop)

```tsx
// ❌ Before (confusing multiline prop)
<TextInput multiline placeholder="Enter text..." />
<TextInput multiline textStyle="code" />

// ✅ After (dedicated components)
<Textarea placeholder="Enter text..." />
<CodeTextarea placeholder="Enter code..." />
```

### From shadcn/ui

```tsx
// ❌ shadcn/ui Input
import { Input } from "@/components/ui/input"
<Input placeholder="Single line" />

// ❌ shadcn/ui Textarea  
import { Textarea } from "@/components/ui/textarea"
<Textarea placeholder="Multiple lines" />

// ✅ Fleet Input (drop-in replacement)
import { TextInput } from "@/components/ui/input"
<TextInput placeholder="Single line" />

// ✅ Fleet Textarea (enhanced with Fleet styling)
import { Textarea } from "@/components/ui/textarea"
<Textarea placeholder="Multiple lines" />
```

## Color System Integration

Both components use the same Fleet semantic color tokens:

```css
/* Default state colors */
--fleet-inputField-background-default
--fleet-inputField-border-default
--fleet-inputField-text-default
--fleet-inputField-caret-default

/* Focus state colors */
--fleet-inputField-focusBorder-default
--fleet-inputField-focusOutline-default

/* Error state colors */
--fleet-inputField-border-error
--fleet-inputField-focusBorder-error
--fleet-inputField-focusOutline-error
```

## Typography System

Both components use consistent Fleet typography classes:

**TextInput (Single-line):**
```css
text-default leading-default font-body-regular tracking-default
```

**Textarea (Multiline):**
```css
text-default-multiline leading-default-multiline font-body-regular tracking-default
text-default-chat leading-default-chat font-body-regular tracking-default /* Chat variant */
text-code leading-code font-code /* Code variant */
```

## Testing

```tsx
import { TextInput, Textarea } from "@/components/ui"

describe('Fleet Input Components', () => {
  it('TextInput works for single-line inputs', () => {
    render(<TextInput placeholder="test" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
  
  it('Textarea works for multiline inputs', () => {
    render(<Textarea placeholder="multiline" rows={4} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
  
  it('both support Fleet variants', () => {
    render(<ErrorTextInput placeholder="error" />)
    render(<ErrorTextarea placeholder="error" />)
    // Both should have error styling
  })
})
```

## File Structure

```
src/components/ui/
├── input.tsx              # TextInput - single-line inputs only
├── textarea.tsx            # Textarea - multiline inputs only  
├── index.ts               # Exports both components
└── ...other components
```

## Conclusion

The separated Fleet Air input system provides:

- **Clear Separation**: Single-line vs multiline components
- **Fleet Fidelity**: Exact matching to Fleet Compose TextInput
- **Type Safety**: Proper TypeScript support for each use case
- **Maintainability**: Single responsibility principle
- **Ecosystem Compatibility**: Follows React/shadcn patterns
- **No Duplication**: Clean APIs without confusing props

This approach eliminates the confusion of multiline props while providing comprehensive Fleet design system integration for both single-line and multiline text inputs. 