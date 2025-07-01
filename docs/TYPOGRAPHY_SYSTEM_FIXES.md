# Typography System Fixes and Improvements

This document details the comprehensive fixes applied to resolve typography conflicts between Fleet design system and Tailwind CSS 4.

## Problem Summary

The original implementation had several critical issues:

1. **CSS Layer Ordering**: Tailwind imports at the end overrode Fleet utilities
2. **Font Size Conflicts**: Tailwind 4's `text-sm` rendered as 14px instead of Fleet's 13px
3. **Font Weight Overrides**: Fleet font classes had insufficient specificity
4. **Layout Shifts**: Tabs jumping when font-weight changed on hover/active states
5. **Inconsistent Typography**: Mixed usage of arbitrary values vs Fleet system

## Root Cause Analysis

### CSS Import Order Issue
```css
/* ❌ PROBLEMATIC ORDER (before fix) */
@import "../../fleet-semantic-vars-light.css";
@import "../../fleet-semantic-vars-dark.css";
@import "tailwindcss";                    /* Last - overrode Fleet */

/* Bottom of file - duplicate imports */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Tailwind 4 Font Size Override Issue
Tailwind 4 introduced a new CSS variable system where `text-sm` uses `var(--text-sm)` instead of direct pixel values. Our `tailwind.config.js` fontSize overrides weren't working because Tailwind 4 requires CSS variable overrides in the `@theme inline` block.

### Font Weight Specificity Issue
Fleet font classes like `.font-body-semibold` were defined in `@layer utilities` but needed higher specificity to override Tailwind's base styles.

## Solutions Implemented

### 1. CSS Layer Architecture Fix

**Before:**
```css
@import "../../fleet-semantic-vars-light.css";
@import "../../fleet-semantic-vars-dark.css";
@import "tailwindcss";
```

**After:**
```css
@import "tailwindcss";                    /* First - proper cascade order */
@import "../../fleet-semantic-vars-light.css";
@import "../../fleet-semantic-vars-dark.css";
```

**Removed duplicate imports** at bottom of file:
```css
/* ❌ REMOVED - these were causing conflicts */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 2. Tailwind 4 Font Size Integration

Added proper CSS variable overrides in `@theme inline` block:

```css
@theme inline {
  /* Override Tailwind 4 font size theme variables with Fleet sizes */
  --text-xs: var(--text-small);     /* 10px - Fleet small */
  --text-sm: var(--text-default);   /* 13px - Fleet default */
  --text-base: var(--text-default); /* 13px - Fleet default */
  --text-lg: var(--text-header-3);  /* 15px - Fleet header-3 */
  --text-xl: var(--text-header-2);  /* 19px - Fleet header-2 */
  --text-2xl: var(--text-header-1); /* 23px - Fleet header-1 */
  --text-3xl: var(--text-header-0); /* 26px - Fleet header-0 */
}
```

### 3. CSS Layer Specificity Fix

**Before:**
```css
@layer utilities {  /* Lower specificity */
  .font-body-semibold {
    font-weight: var(--font-weight-semibold) !important;  /* Required !important */
  }
}
```

**After:**
```css
@layer components {  /* Higher specificity */
  .font-body-semibold {
    font-weight: var(--font-weight-semibold);  /* No !important needed */
  }
  .fleet-tab-semibold {
    font-weight: var(--font-weight-semibold);  /* Specific class for tabs */
  }
}
```

### 4. Typography Layout Shift Prevention

**Problem:** Tabs jumping when font-weight changed from regular to semibold on hover.

**Solution:** Use consistent semibold weight in all states:

**Before:**
```tsx
// Base: font-body-regular (480 weight)
// Hover/Active: font-semibold (640 weight) ← Caused jumping
```

**After:**
```tsx
// All states: fleet-tab-semibold (640 weight) ← Consistent, no jumping
"leading-default fleet-tab-semibold tracking-normal font-shift-safe"
```

**Anti-Shift CSS:**
```css
.font-shift-safe {
  text-rendering: optimizeSpeed;
  font-feature-settings: "kern" 1;
  font-synthesis: none;
}
```

### 5. Button Typography Cleanup

**Before:**
```tsx
// Arbitrary pixel values
size: {
  sm: "h-5 rounded-[3px] px-1.5 py-0.5 text-xs gap-1.5 min-w-12 text-[13px] leading-[16px]",
  default: "h-6 rounded-[4px] px-3 py-1 text-sm gap-2 min-w-[60px] text-[13px] leading-[16px]",
}
```

**After:**
```tsx
// Clean Fleet typography system
const buttonVariants = cva(
  "text-default leading-default font-body-regular tracking-default ...", // Base typography
  {
    variants: {
      size: {
        sm: "h-5 rounded-[3px] px-1.5 py-0.5 text-xs gap-1.5 min-w-12",
        default: "h-6 rounded-[4px] px-3 py-1 text-sm gap-2 min-w-[60px]",
      }
    }
  }
)
```

## Implementation Results

### ✅ Font Sizes Now Correct
- `text-sm` renders as 13px (Fleet default) instead of 14px
- All Tailwind font size utilities map to Fleet typography system
- Consistent sizing across components

### ✅ Font Weights Working
- Fleet font classes have proper specificity without `!important`
- `font-body-semibold` applies 640 weight correctly
- Theme-aware weights (light: 640, dark: 600)

### ✅ No Layout Shifts
- Tabs maintain consistent font-weight (semibold) in all states
- No typography jumping on hover/active interactions
- Smooth visual transitions

### ✅ Clean Architecture
- Proper CSS cascade order
- No duplicate imports or conflicting layers
- Elegant solution without hacks

## Files Modified

1. **`src/app/globals.css`**
   - Fixed CSS import order
   - Added Tailwind 4 font size overrides
   - Moved Fleet utilities to `@layer components`
   - Added `.font-shift-safe` and `.fleet-tab-semibold` classes

2. **`src/components/ui/tabs.tsx`**
   - Updated base typography to use `fleet-tab-semibold`
   - Removed font-weight changes on hover/active states
   - Added `font-shift-safe` class

3. **`src/components/ui/button-shadcn.tsx`**
   - Added Fleet typography foundation to base classes
   - Removed arbitrary pixel font sizes
   - Cleaned up size variant definitions

4. **`CLAUDE.md`**
   - Updated tabs documentation with new typography patterns
   - Added typography system improvement section
   - Updated component structure examples

## Best Practices Going Forward

### Typography Usage
```tsx
// ✅ CORRECT: Use Fleet-mapped Tailwind utilities
"text-sm leading-default font-body-regular tracking-default"

// ✅ CORRECT: Use Fleet CSS classes directly  
"text-default leading-default font-body-regular tracking-default"

// ❌ WRONG: Arbitrary values
"text-[13px] leading-[16px] font-[480]"
```

### Component Foundation
```tsx
const componentVariants = cva(
  // Always include complete Fleet typography foundation
  "text-default leading-default font-body-regular tracking-default",
  {
    variants: {
      // Component-specific variants
    }
  }
)
```

### Layout Shift Prevention
- Use consistent font-weights across all states when possible
- Add `font-shift-safe` class for components with font-weight changes
- Test hover interactions for visual stability

## Testing Verification

Run these commands to verify the fixes:

```bash
npm run dev          # Start development server
npm run lint         # Verify no linting errors
npm run build        # Verify TypeScript compilation
```

Visual verification:
- Check tabs for smooth hover transitions (no jumping)
- Verify buttons display correct 13px font size
- Test light/dark theme font weight switching
- Confirm all components use consistent Fleet typography

## Migration Notes

Existing components may need updates to follow new patterns:

1. Replace arbitrary font sizes with Fleet utilities
2. Use `font-body-semibold` instead of generic `font-semibold`
3. Add complete typography foundation to CVA base classes
4. Test for layout shifts after font-weight changes

This comprehensive fix ensures robust, consistent typography throughout the Fleet component library while maintaining design fidelity and preventing layout issues.