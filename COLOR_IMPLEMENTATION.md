# Fleet Color System Implementation

## Overview

This project implements a scalable, theme-aware Fleet color system for all UI components, mirroring JetBrains Fleet's Compose palette and semantic tokens.

## Architecture

- **Single Source of Truth:** All Fleet palette and semantic color mappings are defined in `src/lib/fleet-colors.ts` (TypeScript).
- **Semantic Tokens:** 80+ semantic tokens (e.g., `button.primary.background.default`, `text.primary`) mapped to palette colors for both light and dark themes.
- **Palette:** 200+ raw palette colors (e.g., `Blue_90`, `Neutral_140`) matching Fleet's design system.
- **CSS Variable Generation:** A Node script generates `fleet-semantic-vars-light.css` and `fleet-semantic-vars-dark.css` from the TypeScript source, exposing all semantic tokens as CSS variables for each theme.
- **Global CSS Integration:** Both CSS variable files are imported in `globals.css` and `layout.tsx` to ensure variables are available globally and early.
- **Tailwind Integration:** Tailwind config exposes all Fleet semantic tokens as color utilities via the `[var(--...)]` syntax, e.g., `bg-[var(--fleet-button-primary-background-default)]`.
- **Component Usage:** All components (e.g., Button) use the semantic CSS variables for all color styling, ensuring full theme support and design consistency.

## Usage Example

```tsx
<button className="bg-[var(--fleet-button-primary-background-default)] text-[var(--fleet-button-primary-text-default)] border-[var(--fleet-button-primary-border-default)]">
  Fleet Primary
</button>
```

## Best Practices

- **Always use semantic tokens** (not raw hex) for component colors.
- **Use Tailwind's arbitrary value syntax** for all Fleet color variables.
- **Import the generated CSS variable files globally** (in both `globals.css` and `layout.tsx`).
- **Test in both light and dark themes** to ensure correct color mapping.
- **For custom components**, use the same CSS variable approach for full theme support.

## Benefits

- **Theme-aware:** All colors adapt to light/dark mode automatically.
- **Design fidelity:** Matches Fleet Compose palette and semantic system exactly.
- **Scalable:** Easy to add new tokens or palette colors in TypeScript.
- **Consistent:** All components use the same color source, ensuring visual harmony.

See also: `BUTTON_IMPLEMENTATION.md`, `ICON_IMPLEMENTATION.md` for usage in components. 