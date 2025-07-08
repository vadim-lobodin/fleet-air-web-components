# Example Page Templates

This document outlines the standardized template system for example pages in the Fleet Air Web Components project.

## Overview

All example pages should follow a consistent structure using the provided template components to ensure:
- **Visual consistency** across all examples
- **Proper Typography usage** following Fleet design system
- **Fleet CSS variables** instead of Tailwind color classes
- **Standardized section organization**
- **Consistent documentation depth**

## Core Template Components

### 1. ExamplePageTemplate

The main wrapper for all example pages.

```tsx
import { ExamplePageTemplate } from "@/components/ui"

export default function MyExamplePage() {
  return (
    <ExamplePageTemplate
      title="Component Name"
      description="Brief description of what this component does and how it mirrors Fleet design patterns."
      showBackToTop={false} // Optional, for longer pages
    >
      {/* Page content goes here */}
    </ExamplePageTemplate>
  )
}
```

**Features:**
- Automatic H1 heading with proper Fleet typography
- Leading description text (follows H1 typography hierarchy rule)
- Consistent spacing and layout
- Optional back-to-top functionality

### 2. ExampleSectionCard

Standardized section wrapper for organizing content.

```tsx
import { ExampleSectionCard } from "@/components/ui"

<ExampleSectionCard 
  title="Section Title"
  description="Optional description explaining this section"
>
  {/* Section content */}
</ExampleSectionCard>
```

**Features:**
- Consistent H2 headings with Fleet typography
- Optional descriptions (follows H2+ typography hierarchy rule)
- Card-based visual organization
- Proper Fleet CSS variables

## Typography Hierarchy Rules

### After H1 (Page Title)
- Use `default-multiline` variant for leading descriptions
- This provides proper line-height for longer explanatory text

### After H2+ (Section Titles)
- Use `default` variant for standard descriptions
- This provides standard line-height for shorter explanations

### Code Examples
- Use `Typography variant="code"` for inline code
- Use proper Typography component instead of raw HTML

## Example Structure Pattern

```tsx
"use client"

import { ExamplePageTemplate, ExampleSectionCard } from "@/components/ui"
import { Typography } from "@/components/ui/typography"
import { YourComponent } from "@/components/ui/your-component"

export default function YourComponentPage() {
  return (
    <ExamplePageTemplate
      title="Your Component Name"
      description="Component description following Fleet design patterns. This uses default-multiline for proper leading after H1."
    >
      {/* Basic Usage */}
      <ExampleSectionCard 
        title="Basic Usage"
        description="Simple example showing the component in action."
      >
        <YourComponent />
      </ExampleSectionCard>

      {/* Variants */}
      <ExampleSectionCard 
        title="Variants"
        description="Different visual and functional variants of the component."
      >
        <div className="flex gap-4">
          <YourComponent variant="primary" />
          <YourComponent variant="secondary" />
        </div>
      </ExampleSectionCard>

      {/* States */}
      <ExampleSectionCard 
        title="States"
        description="Interactive states and behaviors."
      >
        <YourComponent disabled />
        <YourComponent loading />
      </ExampleSectionCard>

      {/* Advanced Usage */}
      <ExampleSectionCard 
        title="Advanced Usage"
        description="Complex scenarios and customization options."
      >
        <YourComponent 
          customProp="value"
          onAction={() => console.log("Action triggered")}
        />
      </ExampleSectionCard>

      {/* Features Reference */}
      <ExampleSectionCard title="Features">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Typography variant="header-3-semibold" className="mb-2" style={{ color: 'var(--fleet-text-primary)' }}>
              Key Features
            </Typography>
            <ul className="space-y-1">
              <li>
                <Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
                  • Feature description
                </Typography>
              </li>
            </ul>
          </div>
        </div>
      </ExampleSectionCard>
    </ExamplePageTemplate>
  )
}
```

## Design System Integration

### Fleet CSS Variables

⚠️ **CRITICAL**: CSS variable syntax in className interferes with CVA class generation, causing font-size classes to be stripped from Typography components.

```tsx
// ❌ WRONG - Causes missing font-size classes in Typography
<Typography variant="default" className="text-[var(--fleet-text-secondary)]">

// ✅ CORRECT - Use style prop for CSS variables with Typography
<Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>

// ✅ CORRECT - For non-Typography elements, CSS variables in className are fine
<div className="bg-[var(--fleet-background-hover)]">

// ❌ Always avoid shadcn color classes
className="text-muted-foreground"
className="bg-muted"
```

### Typography Component
Always use the Typography component instead of raw HTML:

```tsx
// ✅ Correct - Use style prop for Fleet colors
<Typography variant="header-3-semibold" style={{ color: 'var(--fleet-text-primary)' }}>
  Section Title
</Typography>

// ❌ Incorrect - Raw HTML
<h3 className="text-lg font-semibold">Section Title</h3>

// ❌ Incorrect - CSS variables in className with Typography
<Typography variant="header-3-semibold" className="text-[var(--fleet-text-primary)]">
  Section Title
</Typography>
```

## Migration Guide

To migrate an existing example page:

1. **Import the template components**:
   ```tsx
   import { ExamplePageTemplate, ExampleSectionCard } from "@/components/ui"
   ```

2. **Wrap content in ExamplePageTemplate**:
   - Move page title and description to template props
   - Remove manual page header structure

3. **Replace sections with ExampleSectionCard**:
   - Convert `<section>` or `<div>` wrappers to `ExampleSectionCard`
   - Move section titles to `title` prop
   - Move descriptions to `description` prop

4. **Update Typography usage**:
   - Replace raw HTML headers with Typography components
   - Use style prop for Fleet CSS variables (NOT className)
   - Follow typography hierarchy rules

5. **Test the changes**:
   - Ensure visual consistency
   - Verify proper spacing and layout
   - Check responsive behavior

## Benefits

This standardization provides:
- **Consistency**: All example pages follow the same structure
- **Maintainability**: Easier to update styling across all examples
- **Accessibility**: Proper semantic HTML structure
- **Fleet Integration**: Full Fleet design system compliance
- **Developer Experience**: Clear patterns for adding new examples