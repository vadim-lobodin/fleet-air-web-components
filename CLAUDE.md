# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React component library that mirrors Fleet Air (Compose) components for web prototyping. The goal is to recreate JetBrains Fleet's Compose-based UI components in React to enable rapid web prototyping using familiar Fleet design patterns.

Built on Next.js 15 + React 19 + shadcn/ui + Tailwind CSS 4, this project provides a comprehensive component system with 200+ Fleet colors, 80+ semantic tokens, unified icon system (Fleet + Lucide), and complete typography system.

## Key Development Commands

```bash
# Start development server
npm run dev                    # Runs on http://localhost:3000

# Build and deployment
npm run build                  # Build for production
npm run start                  # Start production server

# Code quality
npm run lint                   # Run ESLint

# Color system generation
npm run generate-fleet-css-vars # Generate CSS variables from color system

# Add new shadcn/ui components (ALWAYS do this first for new components)
npx shadcn@latest add [component-name]
```

## Architecture Overview

### Component Foundation Strategy
**CRITICAL**: Every component MUST be built on shadcn/ui foundations:
1. Install shadcn component first: `npx shadcn@latest add [component]`
2. Extend with Fleet-specific variants using CVA (Class Variance Authority)
3. Integrate Fleet color system via CSS variables
4. Maintain shadcn accessibility and behavior

### Color System Architecture
- **JSON-based**: Colors defined in `Light-Blue.json` and `Dark-Blue.json`
- **Semantic tokens**: 80+ tokens in `fleet-semantic-colors.json`
- **CSS variables**: Generated and available as `var(--fleet-*)`
- **Theme-aware**: Automatic light/dark mode switching
- **Tailwind integration**: All Fleet colors available as utilities

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages & examples
│   ├── examples/          # Component showcase pages
│   ├── globals.css        # CSS variables and typography utilities
│   └── layout.tsx         # Root layout with theme provider
├── components/
│   ├── ui/                # Core Fleet components (based on shadcn/ui)
│   ├── app-layout.tsx     # Navigation and layout
│   └── theme-provider.tsx # Theme management
├── lib/
│   ├── fleet-icons.ts     # Fleet icon registry (200+ icons)
│   ├── fleet-semantic-colors.json # Semantic color mappings
│   ├── fleet-palette.json # Color palette definitions
│   └── utils.ts           # cn() utility for class composition
└── scripts/               # Color system generation
```

## Core Principles

### 1. Typography Consistency
**ALWAYS** use consistent typography across ALL components. We've overridden Tailwind's default text sizes to match Fleet's typography system:

```tsx
// ✅ CORRECT: Use Fleet-mapped Tailwind utilities
"text-sm leading-default font-body-regular tracking-default"  // text-sm = 13px (Fleet default)
"text-xs"     // 10px (Fleet small)
"text-lg"     // 15px (Fleet header-3)

// ✅ ALSO CORRECT: Use Fleet CSS utility classes directly
"text-default leading-default font-body-regular tracking-default"

// ❌ WRONG: Arbitrary values (not theme-aware)
"text-[13px] leading-[16px] font-medium"
```

**Typography Mapping:**
- `text-xs` = `var(--text-small)` (10px)
- `text-sm` = `var(--text-default)` (13px) 
- `text-base` = `var(--text-default)` (13px)
- `text-lg` = `var(--text-header-3)` (15px)
- `text-xl` = `var(--text-header-2)` (19px)
- `text-2xl` = `var(--text-header-1)` (23px)
- `text-3xl` = `var(--text-header-0)` (26px)

**Benefits:**
- Consistent Fleet typography across Tailwind utilities and Fleet CSS classes
- Theme-aware font weights (520 light / 480 dark)
- Maintainability via single source in `globals.css`
- Visual consistency across all components

### 2. Fleet Color System Usage
```tsx
// ✅ Preferred: Use Fleet CSS variables
className="bg-[var(--fleet-button-primary-background-default)] hover:bg-[var(--fleet-button-primary-background-hover)]"

// ✅ Good: Use semantic tokens when available
className="bg-primary text-primary-foreground"

// ❌ Avoid: Generic colors that don't match Fleet
className="bg-blue-500" // Use Fleet Blue_90 (#0870E4) instead
```

### 3. Component Creation Pattern
```tsx
// 1. Install shadcn foundation first
// npx shadcn@latest add input

"use client"
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Import shadcn foundation
import { Input as ShadcnInput } from "./input"

// Extend with Fleet variants
const fleetInputVariants = cva(
  "text-default leading-default font-body-regular tracking-default", // Base typography
  {
    variants: {
      variant: {
        default: "border-[var(--fleet-input-border-default)]",
        error: "border-[var(--fleet-input-border-error)]",
      }
    },
    defaultVariants: { variant: "default" }
  }
)

export interface FleetInputProps 
  extends React.ComponentProps<typeof ShadcnInput>,
    VariantProps<typeof fleetInputVariants> {}

export const FleetInput = React.forwardRef<HTMLInputElement, FleetInputProps>(
  ({ className, variant, ...props }, ref) => (
    <ShadcnInput
      className={cn(fleetInputVariants({ variant }), className)}
      ref={ref}
      {...props}
    />
  )
)
```

## Component Systems

### Completed Components
- **Typography**: 20+ variants, Fleet-accurate sizing
- **Button**: All Fleet variants (primary, secondary, dangerous, positive, warning, ghost, link)
- **Icon**: Unified system with 200+ Fleet icons + 5000+ Lucide icons
- **TextInput**: Complete input system with variants, prefix/suffix, multiline
- **List**: Fleet list component with keyboard navigation and selection
- **Tabs**: Complete Fleet tab system with all variants, states, and pixel-perfect spacing

### Component Examples
Access comprehensive examples at:
- Colors: `http://localhost:3000/examples/colors`
- Buttons: `http://localhost:3000/examples/buttons`
- Typography: `http://localhost:3000/examples/typography`
- Icons: `http://localhost:3000/examples/icons`
- Text Inputs: `http://localhost:3000/examples/text-inputs`
- Tabs: `http://localhost:3000/examples/tabs`

## Fleet Tabs Implementation

### Overview
The Fleet Tabs component is a pixel-perfect implementation based on the Fleet Compose tabs, using shadcn/ui Radix primitives with Fleet design system overlay. It includes all Fleet Gallery variants with proper states, spacing, and interactions.

### Architecture
```tsx
// Core Components
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Basic Tab</TabsTrigger>
    <FileTab value="file" filename="App.tsx" fileIcon={icon} onClose={handler} />
    <CounterTab value="counter" count={5}>Issues</CounterTab>
    <IconTab value="icon" icon={icon}>Files</IconTab>
  </TabsList>
  <TabsContent value="tab1">Content</TabsContent>
</Tabs>
```

### Pixel-Perfect Specifications
Based on Fleet Compose `Tabs.kt` analysis:

**Container & Layout:**
- Tab height: `28px` (`h-7`) - matches Fleet's `28.dp`
- Container height: `40px` (`h-10`) - matches Fleet's `Modifier.height(40.dp)`
- Border radius: `4px` (`rounded`) - matches Fleet's `RoundedCornerShape(4.dp)`
- Tab spacing: `4px` (`gap-1`) - matches Fleet's `Arrangement.spacedBy(4.dp)`
- Horizontal padding: `8px` (`px-2`) - matches Fleet's `padding(start = 8.dp, end = 8.dp)`

**Typography:**
- Base: `text-default leading-default font-body-regular tracking-normal`
- Active/Selected: Add `font-semibold` for emphasis
- Letter spacing: `tracking-normal` (zero) for proper readability

### Tab States & Colors
All states use Fleet semantic color tokens:

**Default State:**
```tsx
bg-[var(--fleet-tab-background-default)]
border-[var(--fleet-tab-border-default)]
text-[var(--fleet-tab-text-default)]
```

**Hover State (Inactive Only):**
```tsx
data-[state=inactive]:hover:bg-[var(--fleet-tab-background-selected)]
data-[state=inactive]:hover:text-[var(--fleet-tab-text-selected)]
data-[state=inactive]:hover:font-semibold
// Note: No border change on hover, no focus ring
```

**Active/Selected State:**
```tsx
data-[state=active]:bg-[var(--fleet-tab-background-selected)]
data-[state=active]:border-[var(--fleet-tab-border-selected)]
data-[state=active]:text-[var(--fleet-tab-text-selected)]
data-[state=active]:font-semibold
```

**Focus State:**
```tsx
focus-visible:ring-[var(--fleet-tab-focusOutline-dragAndDrop)]
// Applied only when keyboard focused
```

### Tab Variants

**1. Basic Tabs**
```tsx
<TabsTrigger value="tab">Label</TabsTrigger>
```

**2. Icon Tabs**
```tsx
<IconTab value="files" icon={<Icon fleet="file-types-text" size="sm" />}>
  Files
</IconTab>
```

**3. File Tabs**
```tsx
<FileTab
  value="app.tsx"
  filename="App.tsx"
  fileIcon={<Icon fleet="file-types-typescript" size="sm" />}
  isModified={true}
  onClose={() => handleClose()}
/>
```

**4. Counter Tabs**
```tsx
<CounterTab value="issues" count={5}>Issues</CounterTab>
```

**5. Vertical Tabs**
```tsx
<VerticalTabs defaultValue="general">
  <TabsList orientation="vertical">
    <TabsTrigger value="general">General</TabsTrigger>
  </TabsList>
</VerticalTabs>
```

### Internal Element Specifications

**Element Spacing:**
- All internal elements use consistent `gap-1` (4px) spacing
- Applied via flexbox gap, not manual margins
- Ensures pixel-perfect spacing across all variants

**Close Button:**
- Uses Fleet `Button` component with `variant="ghost" size="sm"`
- Exact dimensions: `16x16px` (`h-4 w-4 p-0 min-w-4 min-h-4`)
- Fleet icon: `close-small` at `size="sm"`
- Proper event handling: `stopPropagation()` to prevent tab activation

**Counter Styling:**
- Height: `18px` (`h-[18px]`)
- Border radius: `30px` (`rounded-[15px]` = 15px radius)
- Horizontal padding: `4px` (`px-1`)
- Text color: `text-[var(--fleet-tab-text-selected)]`
- Background: `bg-[var(--fleet-search-counter-background)]`
- Minimum width: `18px` (`min-w-[18px]`) for circular shape

**Modified Indicator:**
- Size: `6x6px` (`w-1.5 h-1.5`)
- Color: `bg-[var(--fleet-tab-text-default)]`
- Shape: `rounded-full`
- Position: Inline with text, `gap-1` spacing

### Component Structure Pattern
```tsx
const fleetTabsTriggerVariants = cva(
  // Base classes - typography and layout
  "text-default leading-default font-body-regular tracking-normal inline-flex items-center justify-center whitespace-nowrap rounded transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 h-7",
  {
    variants: {
      variant: {
        default: ["px-2 gap-1", /* Fleet colors */],
        file: ["px-2 gap-1", /* Fleet colors */],
      },
      size: {
        default: "text-sm",
        sm: "h-6 text-xs px-1.5",
        lg: "h-8 text-sm px-3",
      },
      state: {
        default: "",
        selected: [/* Fleet selected colors */, "font-semibold"],
        selectedFocused: [/* Fleet focused colors */, "font-semibold"],
        deselected: [/* Fleet default colors */, "opacity-70"],
      },
    },
    defaultVariants: { variant: "default", size: "default", state: "default" },
  }
)
```

### Key Implementation Learnings

**1. Hover State Implementation:**
- Must use `data-[state=inactive]:hover:` for proper specificity
- Remove hover styles from CVA variants to avoid conflicts
- Same as selected state but without border changes or focus ring

**2. Typography Consistency:**
- Always use `tracking-normal` (zero letter spacing) for readability
- Apply `font-semibold` only for active/selected states
- Use Fleet typography utility classes: `text-default leading-default font-body-regular`

**3. Element Spacing:**
- Use flexbox `gap-1` instead of manual margins (`ml-1`, etc.)
- Apply gap at container level for consistent 4px spacing
- Avoid mixing gap and margin approaches

**4. Close Button Implementation:**
- Must use existing Fleet `Button` component with `variant="ghost"`
- Exact 16x16px dimensions with Fleet `close-small` icon
- Proper event handling to prevent tab activation

**5. Fleet Color Integration:**
- All colors use Fleet semantic tokens via CSS variables
- Proper theme-aware switching between light/dark modes
- Counter uses `search.counter.background` semantic token

**6. Radix Integration:**
- Leverage Radix `data-[state]` attributes for state management
- Use `data-[state=active]` and `data-[state=inactive]` for styling
- Maintain Radix accessibility features and keyboard navigation

### Export Pattern
```tsx
// components/ui/index.ts
export { 
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  DefaultTabs,
  VerticalTabs,
  FileTab,
  CounterTab,
  IconTab,
  fleetTabsVariants,
  fleetTabsListVariants,
  fleetTabsTriggerVariants,
  fleetTabsContentVariants,
  type FleetTabsProps,
  type FleetTabsListProps,
  type FleetTabsTriggerProps,
  type FleetTabsContentProps,
  type FileTabProps,
  type CounterTabProps,
  type IconTabProps,
} from "./tabs"
```

## Development Guidelines

### Color System
- Always use `var(--fleet-*)` CSS variables for theme support
- Reference available tokens in `src/lib/fleet-semantic-colors.json`
- Test components in both light and dark themes
- Use Fleet color palette instead of generic Tailwind colors

### Typography
- Import Typography component: `import { Typography } from "@/components/ui/typography"`
- Use Fleet variants: `header-1-semibold`, `default`, `code`, etc.
- Apply consistent CSS classes: `text-default leading-default font-body-regular tracking-default`

### Icons
```tsx
import { Icon, FleetIcon, LucideIcon } from "@/components/ui/icon"

// Fleet icons (theme-aware, fixed colors)
<Icon fleet="ai-chat" size="md" />
<FleetIcon fleet="file-types-typescript" size="lg" />

// Lucide icons (customizable)
<Icon lucide="Settings" size="md" strokeWidth={1} />
<LucideIcon lucide="Star" size="lg" strokeWidth={2} />
```

### Export Management
```tsx
// ✅ CORRECT: Specific named exports in index.ts
export { Button, buttonVariants } from "./button-shadcn"
export { Typography, typographyVariants } from "./typography"

// ❌ WRONG: Mixing specific and wildcard exports
export { Button } from "./button"
export * from "./button"  // Creates duplicates
```

## Common Issues and Solutions

### Focus Ring Color Issues
```tsx
// ✅ CORRECT: Use ring-offset-0
"focus-visible:ring-2 focus-visible:ring-[var(--fleet-focusOutline)] focus-visible:ring-offset-0"

// ❌ WRONG: Can cause black rings
"focus-visible:ring-opacity-100"
```

### CVA Class Order
```tsx
// ✅ CORRECT: Typography in base, colors in variants
const componentVariants = cva(
  "text-default leading-default font-body-regular tracking-default", // Base
  {
    variants: {
      variant: {
        primary: "bg-[var(--fleet-button-primary-background-default)]", // Colors after
      }
    }
  }
)
```

## Implementation References

### Component Implementation Guides
- **Tabs**: Complete Fleet tab system with pixel-perfect specifications (documented above)
- **Buttons**: All Fleet variants (primary, secondary, dangerous, positive, warning, ghost, link)
- **Typography**: 20+ variants with Fleet-accurate sizing and letter spacing
- **Icons**: Unified system with 200+ Fleet icons + 5000+ Lucide icons
- **TextInput**: Complete input system with variants, prefix/suffix, multiline
- **List**: Fleet list component with keyboard navigation and selection

### Fleet Design System Integration
- **Color System**: 200+ Fleet colors with semantic token mapping
- **Typography System**: Fleet-accurate font weights, sizes, and line heights
- **Icon System**: Complete Fleet icon registry with fallback to Lucide
- **Spacing System**: Consistent 4px grid system matching Fleet specifications
- **State Management**: Proper hover, focus, active, and disabled states

## Critical Implementation Patterns

### Radix + Fleet Integration
When using Radix primitives with Fleet design system:

**State Management:**
```tsx
// ✅ CORRECT: Use Radix data attributes for state-specific styling
"data-[state=active]:bg-[var(--fleet-tab-background-selected)]"
"data-[state=inactive]:hover:bg-[var(--fleet-tab-background-selected)]"

// ❌ WRONG: Generic hover classes get overridden
"hover:bg-[var(--fleet-tab-background-selected)]" // Lower specificity
```

**Typography Integration:**
```tsx
// ✅ CORRECT: Use Fleet typography utilities consistently
"text-default leading-default font-body-regular tracking-normal"

// ❌ WRONG: Custom typography that doesn't match Fleet
"text-sm leading-5 font-medium tracking-wide"
```

### Spacing Consistency
```tsx
// ✅ CORRECT: Use flexbox gap for consistent 4px spacing
className="flex items-center gap-1" // 4px between all elements

// ❌ WRONG: Manual margins create inconsistent spacing
className="flex items-center"
// Individual elements with ml-1, mr-1, etc.
```

### Component Reuse Patterns
```tsx
// ✅ CORRECT: Use existing Fleet components
<Button variant="ghost" size="sm">
  <Icon fleet="close-small" size="sm" />
</Button>

// ❌ WRONG: Custom buttons that don't match Fleet system
<button className="custom-close-button">×</button>
```

### Fleet Color Token Usage
```tsx
// ✅ CORRECT: Use semantic Fleet color tokens
"bg-[var(--fleet-search-counter-background)]"
"text-[var(--fleet-tab-text-selected)]"

// ❌ WRONG: Generic Tailwind colors
"bg-gray-200 text-gray-800"
```

### CSS Variable Naming Convention
Fleet semantic colors follow the pattern: `--fleet-[component]-[property]-[state]`

Examples:
- `--fleet-tab-background-default`
- `--fleet-tab-background-selected`
- `--fleet-tab-background-hovered`
- `--fleet-tab-text-selected`
- `--fleet-tab-border-selectedFocused`
- `--fleet-search-counter-background`

### Example Page Patterns
All example pages should follow consistent structure:

```tsx
export default function ComponentPage() {
  return (
    <>
      <div className="mb-8">
        <Typography variant="header-1-semibold" as="h1">
          Component Name
        </Typography>
        <Typography variant="default" className="text-muted-foreground mt-2">
          Component description
        </Typography>
      </div>

      <div className="space-y-12">
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Section Title</Typography>
          <div className="space-y-4">
            <div className="p-6 border border-border rounded-lg">
              {/* Component examples */}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
```

## Testing

- Visual testing: Compare with Fleet Gallery at `/ultimate/fleet/gallery/`
- Accessibility: Test with screen readers and keyboard navigation
- Theme testing: Verify components work in both light and dark themes
- Color accuracy: Use color examples page to verify exact Fleet colors

## Linting and Type Checking

Run these commands before committing:
```bash
npm run lint        # Fix code style and catch errors
npm run build       # Verify TypeScript compilation
```

## Key Files to Understand

- `tailwind.config.js`: Fleet color integration with Tailwind
- `src/app/globals.css`: Typography utilities and CSS variables
- `src/lib/fleet-semantic-colors.json`: Semantic color token mappings
- `src/components/ui/index.ts`: Component exports registry
- `components.json`: shadcn/ui configuration

This project prioritizes design fidelity to Fleet, accessibility via shadcn/ui, and developer experience through consistent patterns and comprehensive documentation.