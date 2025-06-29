# Fleet Button Implementation

## Overview

Fleet Air's Button system provides all button variants, sizes, and states found in JetBrains Fleet, implemented as a single, type-safe React component. **The Button is based on the shadcn/ui Button, extended for Fleet Air design, color system, and advanced features.** The Button is fully theme-aware, pixel-perfect, and uses the Fleet color system via CSS variables for all states.

- **Variants:** primary, secondary, dangerous, positive, warning, ghost, link
- **Sizes:** sm, default, lg, icon
- **Features:** loading state, icons (left/right/custom), hint text, toggle, split, menu, disabled, full accessibility
- **Color:** All colors use Fleet semantic tokens (e.g., `bg-[var(--fleet-button-primary-background-default)]`)
- **Typography:** Uses consistent CSS utility classes: `text-default leading-default font-body-regular tracking-default`
- **Demo:** See the canonical Button gallery at `/examples/buttons` (labeled "Button" in the sidebar)

## Usage

```tsx
import { Button, ToggleButton, SplitButton, MenuButton, GhostToggleButton } from "@/components/ui"

<Button variant="primary">Save</Button>
<Button variant="secondary" iconLeft="settings">Settings</Button>
<Button variant="dangerous" isLoading>Delete</Button>
<ToggleButton selected={isOn}>Toggle</ToggleButton>
<SplitButton onMenuClick={openMenu}>Split</SplitButton>
<MenuButton menuOpen={open}>Menu</MenuButton>
```

## Best Practices
- Use the `variant` and `size` props to match Fleet's design system
- Use semantic color tokens for any custom styling
- All buttons are accessible and theme-aware by default
- For advanced usage (icons, loading, split/menu), see the Button gallery page for examples

## Extending
- Extend the Button using CVA for new variants or sizes
- Use the Fleet color system for all new styles
- All button-related components are exported from `@/components/ui`

## Theme-Aware Styling

During development, an issue was identified where the secondary button's border and text color appeared incorrect in the light theme. Investigation revealed that the CSS variables for the dark theme were inadvertently overriding the light theme variables due to an incorrect CSS selector in `fleet-semantic-vars-dark.css`. Previously, these variables were defined under `:root`, making them globally active. The fix involved scoping the dark theme variables specifically to the `.dark` class:

```css
/* Before */
:root {
  --fleet-button-secondary-border-default: #FFFFFF21; /* Dark theme value applied globally */
}

/* After */
.dark {
  --fleet-button-secondary-border-default: #FFFFFF21; /* Only applies when .dark class is present */
}
```

This ensures that theme-specific CSS variables are correctly applied based on the active theme class on the `<html>` element, resolving the visual inconsistencies and reinforcing the theme-aware nature of the components.

## Typography Consistency

During development, typography consistency across all components was standardized. The Button component now uses the same CSS utility classes as other components (TextInput, Typography):

**Consistent Typography Classes:**
```tsx
"text-default leading-default font-body-regular tracking-default"
```

**Font Specifications (matching Fleet exactly):**
- **Size**: 13px (`text-default`)
- **Line Height**: 16px (`leading-default`)
- **Weight**: 520 (light theme) / 480 (dark theme) (`font-body-regular`)
- **Letter Spacing**: 0% (light) / 0.4% (dark) (`tracking-default`)

This replaces the previous inconsistent approach where arbitrary CSS values were used:
```tsx
// ❌ Before (inconsistent)
"text-[13px] leading-[16px]"

// ✅ After (consistent)
"text-default leading-default font-body-regular tracking-default"
```

**Benefits:**
- **Theme-aware font weights**: Automatically adapts between light (520) and dark (480) themes
- **Maintainability**: Single source of truth for typography in `globals.css`
- **Consistency**: All components use identical typography classes
- **Fleet accuracy**: Matches Fleet's exact font specifications

## Reference
- The Button system matches the Fleet Compose reference implementation for all variants, states, and behaviors
- The examples page is located at `/examples/buttons` ("Button" in the sidebar) 