# Fleet Tabs Implementation Guide

## Overview

The Fleet Tabs component is a pixel-perfect implementation based on the Fleet Compose tabs (`Tabs.kt`), using shadcn/ui Radix primitives with Fleet design system overlay. It includes all Fleet Gallery variants with proper states, spacing, and interactions.

## Architecture

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

## Pixel-Perfect Specifications

Based on Fleet Compose `Tabs.kt` analysis at `/Users/Vadim.Lobodin/IdeaProjects/ultimate/fleet/compose/theme/src/noria/ui/components/tabs/Tabs.kt`:

### Container & Layout
- **Tab height**: `28px` (`h-7`) - matches Fleet's `28.dp`
- **Container height**: `40px` (`h-10`) - matches Fleet's `Modifier.height(40.dp)`
- **Border radius**: `4px` (`rounded`) - matches Fleet's `RoundedCornerShape(4.dp)`
- **Tab spacing**: `4px` (`gap-1`) - matches Fleet's `Arrangement.spacedBy(4.dp)`
- **Horizontal padding**: `8px` (`px-2`) - matches Fleet's `padding(start = 8.dp, end = 8.dp)`

### Typography
- **Base**: `text-default leading-default font-body-regular tracking-normal`
- **Active/Selected**: Add `font-semibold` for emphasis
- **Letter spacing**: `tracking-normal` (zero) for proper readability

## Tab States & Colors

All states use Fleet semantic color tokens from `fleet-semantic-colors.json`:

### Default State
```tsx
bg-[var(--fleet-tab-background-default)]
border-[var(--fleet-tab-border-default)]
text-[var(--fleet-tab-text-default)]
```

### Hover State (Inactive Only)
```tsx
data-[state=inactive]:hover:bg-[var(--fleet-tab-background-selected)]
data-[state=inactive]:hover:text-[var(--fleet-tab-text-selected)]
data-[state=inactive]:hover:font-semibold
// Note: No border change on hover, no focus ring
```

### Active/Selected State
```tsx
data-[state=active]:bg-[var(--fleet-tab-background-selected)]
data-[state=active]:border-[var(--fleet-tab-border-selected)]
data-[state=active]:text-[var(--fleet-tab-text-selected)]
data-[state=active]:font-semibold
```

### Focus State
```tsx
focus-visible:ring-[var(--fleet-tab-focusOutline-dragAndDrop)]
// Applied only when keyboard focused
```

## Tab Variants

### 1. Basic Tabs
```tsx
<TabsTrigger value="tab">Label</TabsTrigger>
```

### 2. Icon Tabs
```tsx
<IconTab value="files" icon={<Icon fleet="file-types-text" size="sm" />}>
  Files
</IconTab>
```

### 3. File Tabs
```tsx
<FileTab
  value="app.tsx"
  filename="App.tsx"
  fileIcon={<Icon fleet="file-types-typescript" size="sm" />}
  isModified={true}
  onClose={() => handleClose()}
/>
```

### 4. Counter Tabs
```tsx
<CounterTab value="issues" count={5}>Issues</CounterTab>
```

### 5. Vertical Tabs
```tsx
<VerticalTabs defaultValue="general">
  <TabsList orientation="vertical">
    <TabsTrigger value="general">General</TabsTrigger>
  </TabsList>
</VerticalTabs>
```

## Internal Element Specifications

### Element Spacing
- All internal elements use consistent `gap-1` (4px) spacing
- Applied via flexbox gap, not manual margins
- Ensures pixel-perfect spacing across all variants

### Close Button
- Uses Fleet `Button` component with `variant="ghost" size="sm"`
- Exact dimensions: `16x16px` (`h-4 w-4 p-0 min-w-4 min-h-4`)
- Fleet icon: `close-small` at `size="sm"`
- Proper event handling: `stopPropagation()` to prevent tab activation

### Counter Styling
- **Height**: `18px` (`h-[18px]`)
- **Border radius**: `30px` (`rounded-[15px]` = 15px radius)
- **Horizontal padding**: `4px` (`px-1`)
- **Text color**: `text-[var(--fleet-tab-text-selected)]`
- **Background**: `bg-[var(--fleet-search-counter-background)]`
- **Minimum width**: `18px` (`min-w-[18px]`) for circular shape

### Modified Indicator
- **Size**: `6x6px` (`w-1.5 h-1.5`)
- **Color**: `bg-[var(--fleet-tab-text-default)]`
- **Shape**: `rounded-full`
- **Position**: Inline with text, `gap-1` spacing

## Component Structure Pattern

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

## Key Implementation Learnings

### 1. Hover State Implementation
**Critical Fix**: Must use `data-[state=inactive]:hover:` for proper specificity

```tsx
// ✅ CORRECT: High specificity, only applies to inactive tabs
"data-[state=inactive]:hover:bg-[var(--fleet-tab-background-selected)]"

// ❌ WRONG: Gets overridden by Radix data attributes
"hover:bg-[var(--fleet-tab-background-selected)]"
```

**Why**: Radix `data-[state]` attributes have higher CSS specificity than generic `hover:` classes. CVA variant hover styles must be removed to avoid conflicts.

### 2. Typography Consistency
**Critical Pattern**: Always use Fleet typography utilities

```tsx
// ✅ CORRECT: Fleet typography system
"text-default leading-default font-body-regular tracking-normal"

// ❌ WRONG: Custom typography
"text-sm leading-5 font-medium tracking-wide"
```

**Letter Spacing**: Always use `tracking-normal` (zero) for readability. Custom letter spacing (`tracking-[0.02em]`) was removed per Fleet specifications.

### 3. Element Spacing
**Critical Pattern**: Use flexbox gap for consistent 4px spacing

```tsx
// ✅ CORRECT: Consistent 4px between all elements
className="flex items-center gap-1"

// ❌ WRONG: Inconsistent manual margins
className="flex items-center"
// With individual ml-1, mr-1 on child elements
```

**Why**: Flexbox gap ensures consistent spacing regardless of element presence (conditional icons, counters, close buttons).

### 4. Close Button Implementation
**Critical Requirement**: Must use existing Fleet Button component

```tsx
// ✅ CORRECT: Reuses Fleet Button system
<Button
  variant="ghost"
  size="sm"
  onClick={(e) => {
    e.stopPropagation()
    onClose?.(e)
  }}
  className="h-4 w-4 p-0 min-w-4 min-h-4"
>
  <Icon fleet="close-small" size="sm" />
</Button>

// ❌ WRONG: Custom button implementation
<button onClick={onClose}>×</button>
```

**Why**: Ensures consistency with Fleet design system, proper theming, and accessibility.

### 5. Fleet Color Integration
**Critical Pattern**: Use semantic Fleet color tokens

```tsx
// ✅ CORRECT: Semantic Fleet colors
"bg-[var(--fleet-search-counter-background)]"
"text-[var(--fleet-tab-text-selected)]"

// ❌ WRONG: Generic colors
"bg-gray-200 text-gray-800"
```

**Color Token Naming**: `--fleet-[component]-[property]-[state]`
- `--fleet-tab-background-default`
- `--fleet-tab-background-selected`
- `--fleet-tab-text-selected`
- `--fleet-search-counter-background`

### 6. Radix Integration
**Critical Patterns**: Leverage Radix data attributes for state management

```tsx
// ✅ CORRECT: Use Radix state attributes
"data-[state=active]:bg-[var(--fleet-tab-background-selected)]"
"data-[state=inactive]:hover:bg-[var(--fleet-tab-background-selected)]"

// ❌ WRONG: Manual state management
{isActive ? "bg-selected" : "bg-default"}
```

**Benefits**: Maintains Radix accessibility features, keyboard navigation, and proper state transitions.

## Component Exports

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

## Usage Examples

See comprehensive examples at `http://localhost:3000/examples/tabs` including:
- Basic tabs with content switching
- Icon tabs with Fleet icons
- File tabs with close buttons and modified indicators
- Counter tabs with proper Fleet styling
- Vertical tabs for settings layouts
- Different sizes (sm, default, lg)

## Common Pitfalls

### 1. Hover State Not Working
**Problem**: Generic hover classes get overridden by Radix
**Solution**: Use `data-[state=inactive]:hover:` with higher specificity

### 2. Inconsistent Element Spacing
**Problem**: Mix of gap and margin approaches
**Solution**: Use flexbox `gap-1` consistently at container level

### 3. Custom Close Buttons
**Problem**: Custom buttons don't match Fleet system
**Solution**: Always use Fleet `Button` component with ghost variant

### 4. Wrong Counter Colors
**Problem**: Using generic colors instead of Fleet tokens
**Solution**: Use `--fleet-search-counter-background` and `--fleet-tab-text-selected`

### 5. Letter Spacing Issues
**Problem**: Custom letter spacing affects readability
**Solution**: Always use `tracking-normal` (zero letter spacing)

## Testing Checklist

- [ ] All tab states work (default, hover, active, focus)
- [ ] Hover only applies to inactive tabs
- [ ] Counter has correct 18px height and 30px rounded corners
- [ ] Close button is exactly 16x16px
- [ ] Consistent 4px spacing between all elements
- [ ] Typography matches Fleet specifications
- [ ] All variants work with proper Fleet colors
- [ ] Keyboard navigation works (Arrow keys, Tab, Space, Enter)
- [ ] Theme switching works between light/dark modes
- [ ] Component integrates properly with existing Fleet design system

## Related Documentation

- [Component Conversion Pipeline](./COMPONENT_CONVERSION_PIPELINE.md)
- [Color Implementation](./COLOR_IMPLEMENTATION.md)
- [Icon Implementation](./ICON_IMPLEMENTATION.md)
- [Button Implementation](./BUTTON_IMPLEMENTATION.md)