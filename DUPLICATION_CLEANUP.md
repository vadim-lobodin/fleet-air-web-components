# Duplication Cleanup: Input vs Textarea Separation

## Problem Identified

The user correctly identified that we had created unnecessary duplication between `input.tsx` and `textarea.tsx`:

1. **input.tsx** had a `multiline` prop that rendered textarea elements
2. **textarea.tsx** wrapped TextInput with `multiline=true`
3. This created confusion and code duplication

## Solution Implemented

### ✅ Clean Separation of Concerns

**TextInput (input.tsx):**
- **Single-line inputs only**
- Removed all multiline-related props and logic
- No textarea rendering
- Focused on `<input>` elements only

**Textarea (textarea.tsx):**
- **Multiline inputs only**
- Independent implementation 
- Directly renders `<textarea>` elements
- No dependency on TextInput's multiline functionality

### ✅ Changes Made

#### Removed from input.tsx:
- `multiline?: boolean` prop
- `minLines?: number` prop  
- `maxLines?: number` prop
- `softWrap?: boolean` prop
- All multiline handling logic
- `MultilineTextInput` and `MultilineCodeTextInput` components

#### Enhanced textarea.tsx:
- Complete standalone implementation
- Full Fleet variant system (default, error, inner, borderless, etc.)
- Auto-grow functionality
- Prefix/suffix support
- Proper TypeScript types (`HTMLTextAreaElement`)

### ✅ Benefits Achieved

1. **Clear API**: No confusion about which component to use
   - Single-line text? → `TextInput`
   - Multiline text? → `Textarea`

2. **Type Safety**: Each component has correct types
   - `TextInput` → `HTMLInputElement`  
   - `Textarea` → `HTMLTextAreaElement`

3. **No Duplication**: Each component handles its own concerns

4. **Better Performance**: No unnecessary logic in single-line inputs

5. **Ecosystem Compatibility**: Follows shadcn/ui pattern of separate components

## Migration Path

### ❌ Before (Confusing multiline prop)
```tsx
<TextInput multiline placeholder="Enter text..." />
<TextInput multiline textStyle="code" />
```

### ✅ After (Clean separation)
```tsx
<Textarea placeholder="Enter text..." />
<CodeTextarea placeholder="Enter code..." />
```

## File Structure (After Cleanup)

```
src/components/ui/
├── input.tsx              # Single-line inputs only
├── textarea.tsx            # Multiline inputs only
├── index.ts               # Exports both components
└── ...
```

## Component Mapping

| Use Case | Component | File |
|----------|-----------|------|
| Single-line text input | `TextInput` | `input.tsx` |
| Search input | `TextInput` with prefix | `input.tsx` |
| Password input | `PasswordTextInput` | `input.tsx` |
| Growing input | `GrowingTextInput` | `input.tsx` |
| Multiline text | `Textarea` | `textarea.tsx` |
| Code editor | `CodeTextarea` | `textarea.tsx` |
| Chat input | `ChatTextarea` | `textarea.tsx` |

## Result

✅ **Clean, maintainable architecture** with no duplication  
✅ **Clear separation of concerns** between input types  
✅ **Follows React/shadcn best practices** with dedicated components  
✅ **Maintains full Fleet design system integration** in both components  
✅ **Eliminates user confusion** about which component to use when 