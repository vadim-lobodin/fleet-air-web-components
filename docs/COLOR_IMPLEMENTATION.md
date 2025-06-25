# Fleet Color System Implementation

## Overview

This project implements a scalable, theme-aware Fleet color system for all UI components, mirroring JetBrains Fleet's Compose palette and semantic tokens.

## Architecture (Current)

- **Single Source of Truth:** All Fleet palette and semantic color mappings are now defined in two JSON files:
  - `src/lib/fleet-palette.json` (raw palette colors)
  - `src/lib/fleet-semantic-colors.json` (semantic tokens for light/dark themes)
- **Semantic Tokens:** 200+ semantic tokens (e.g., `button.primary.background.default`, `text.primary`) mapped to palette colors for both light and dark themes.
- **Palette:** 200+ raw palette colors (e.g., `Blue_90`, `Neutral_140`) matching Fleet's design system.
- **CSS Variable Generation:** A Node.js script reads the JSON files and generates `fleet-semantic-vars-light.css` and `fleet-semantic-vars-dark.css`, exposing all semantic tokens as CSS variables for each theme.
- **Global CSS Integration:** Both CSS variable files are imported in `globals.css` and `layout.tsx` to ensure variables are available globally and early.
- **Tailwind Integration:** Tailwind config exposes all Fleet semantic tokens as color utilities via the `[var(--...)]` syntax, e.g., `bg-[var(--fleet-button-primary-background-default)]`.
- **Component Usage:** All components (e.g., Button) use the semantic CSS variables for all color styling, ensuring full theme support and design consistency.
- **Validation:** A validation script checks for missing palette keys and unused palette entries, ensuring the system is robust and error-free.

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
- **Update color mappings only in JSON**; do not edit TypeScript files for color data.

## Benefits

- **Theme-aware:** All colors adapt to light/dark mode automatically.
- **Design fidelity:** Matches Fleet Compose palette and semantic system exactly.
- **Scalable:** Easy to add new tokens or palette colors in JSON.
- **Consistent:** All components use the same color source, ensuring visual harmony.
- **Robust:** Validation scripts prevent missing or broken color references.

## Migration Note

- The old TypeScript-based color system (`fleet-colors.ts`) is deprecated. All color data and scripts should use the JSON-based workflow.

See also: `BUTTON_IMPLEMENTATION.md`, `ICON_IMPLEMENTATION.md` for usage in components. 