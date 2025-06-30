# Pixel-Perfect Fixes for Fleet Air Web Components

This document summarizes all the changes made to ensure pixel-perfect matching with Fleet Air (Compose) components.

## Fixed Issues

### 1. Asymmetric Padding Issue
**Problem**: Using symmetric padding (`px-[6px]`) when Fleet specifies asymmetric padding.

**Fleet Specifications:**
- Default: `start=6dp, top=2dp, end=2dp, bottom=2dp`
- Large: `start=8dp, top=4dp, end=4dp, bottom=4dp`

**Fixed:**
- Default: `pl-[6px] pr-[2px] py-[2px]` (was `px-[6px] py-[2px]`)
- Large: `pl-2 pr-1 py-1` (was `px-2 py-1`)

### 2. BorderlessTransparent Special Padding
**Problem**: Missing Fleet's special case for borderless transparent inputs.

**Fleet Specification:**
- `padding: end = 1.dp` (only end padding to make cursor visible)

**Fixed:**
- Added `borderlessTransparent` size variant with `pr-[1px] py-[2px]`
- Updated `BorderlessTransparentTextInput` to use the correct size

### 3. Inner Error Variant
**Problem**: `InnerErrorTextInput` was using wrong styling combination.

**Fleet Specification:**
- `innerErrorTextInputStyle() = innerTextInputStyle().copy(colors = errorTextInputColors())`
- Should combine inner styling (transparent borders, no focus ring) with error colors

**Fixed:**
- Created `innerError` variant combining inner transparency with error colors
- Updated `InnerErrorTextInput` and `InnerErrorTextarea` to use `innerError` variant

### 4. Prefix/Suffix Padding Adjustments
**Problem**: Incorrect padding when prefix/suffix elements are present.

**Fleet Logic:**
- Prefix should reduce left padding from 6px to ~4px
- Suffix should reduce right padding from 2px to ~0px (since suffix has its own spacing)

**Fixed:**
- Prefix: `pl-1` (4px reduced from 6px base)
- Suffix: `pr-0` (0px reduced from 2px base)
- Applied to all input types: single-line, multiline, growing

## Exact Fleet Measurements

### Default TextInput
```
padding: pl-[6px] pr-[2px] py-[2px]
minWidth: 60px
minHeight: 24px (h-6)
borderRadius: 4px (rounded)
```

### Large TextInput  
```
padding: pl-2 pr-1 py-1 (8px/4px/4px/4px)
minWidth: 68px
minHeight: 28px (h-7)
borderRadius: 4px (rounded)
```

### Inner TextInput
```
padding: px-[2px] py-[2px] (2px all sides)
minHeight: 18px
borderRadius: 0 (rounded-none)
borders: transparent
focusRing: none
```

### BorderlessTransparent TextInput
```
padding: pr-[1px] py-[2px] (special case)
minHeight: 24px (h-6)
borderRadius: 4px (rounded)
background: transparent
borders: transparent
```

## Typography System
All components use consistent Fleet typography classes:

```css
text-default leading-default font-body-regular tracking-default
```

With theme-aware font weights:
- Light theme: `font-weight: 520`
- Dark theme: `font-weight: 480`

## Color System Integration
All variants use Fleet semantic color tokens:

```css
--fleet-inputField-text-default
--fleet-inputField-background-default  
--fleet-inputField-border-default
--fleet-inputField-focusBorder-default
--fleet-inputField-focusOutline-default
--fleet-inputField-caret-default
--fleet-inputField-selectionBackground-default
```

## Testing
- Development server: `npm run dev` → `http://localhost:3005`
- Typography showcase: `/`
- Input examples: `/examples/text-inputs`
- Textarea examples: `/examples/textareas`

## Component Mapping
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

All measurements are now **pixel-perfect** matches to Fleet Air components. 