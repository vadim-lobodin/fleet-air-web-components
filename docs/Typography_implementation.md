# Typography Implementation Guide

## Overview

Fleet Air Web Components uses a comprehensive typography system that mirrors JetBrains Fleet's design patterns. This guide covers implementation details, best practices, and troubleshooting for the Typography component.

## Core Typography Component

### Basic Usage

```typescript
import { Typography } from "@/components/ui/typography"

// Most common usage
<Typography variant="default">Body text content</Typography>
<Typography variant="header-1-semibold">Page Title</Typography>
<Typography variant="header-2-semibold">Section Heading</Typography>
```

### Available Variants

#### Headers
- `header-0-semibold` - Largest heading (26px)
- `header-1-semibold` - Page titles (23px)
- `header-1` - Light page titles (23px)
- `header-2-semibold` - Section headings (19px)
- `header-2` - Light section headings (19px)
- `header-3-semibold` - Subsection headings (15px)
- `header-3` - Light subsection headings (15px)
- `header-4-semibold` - Small headings (13px)
- `header-5-semibold` - Micro headings (10px, uppercase)

#### Body Text
- `default` - **Primary choice** for most content (13px)
- `default-italic` - Italicized body text (13px)
- `default-semibold` - Emphasized body text (13px)
- `default-semibold-italic` - Bold italic body text (13px)
- `default-multiline` - Multi-line body text with optimized line-height (13px)
- `default-chat` - Chat-optimized body text (13px)

#### Supplementary
- `medium` - Slightly smaller than default (12px)
- `medium-semibold` - Emphasized medium text (12px)
- `small` - Captions, labels, metadata (10px)

#### Code
- `code` - Code snippets (13px, monospace)
- `code-italic` - Italicized code (13px, monospace)
- `code-bold` - Bold code (13px, monospace)

## Typography with Fleet Colors

### ⚠️ CRITICAL: CSS Variable Conflict Resolution

**Problem**: CSS variable syntax in className interferes with CVA class generation, causing font-size classes to be stripped.

**❌ WRONG - Causes missing font-size classes:**
```typescript
<Typography variant="default" className="text-[var(--fleet-text-secondary)]">
  Text content
</Typography>
```

**✅ CORRECT - Use style prop for CSS variables:**
```typescript
<Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
  Text content
</Typography>
```

### Fleet Color Integration

```typescript
// Primary text
<Typography variant="default" style={{ color: 'var(--fleet-text-primary)' }}>
  Primary text content
</Typography>

// Secondary text
<Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
  Secondary text content
</Typography>

// Disabled text
<Typography variant="default" style={{ color: 'var(--fleet-text-disabled)' }}>
  Disabled text content
</Typography>

// Error text
<Typography variant="default" style={{ color: 'var(--fleet-text-error)' }}>
  Error message
</Typography>
```

### Combining Colors and Additional Classes

```typescript
// Correct approach - separate concerns
<Typography 
  variant="default" 
  className="mt-4 mb-2" 
  style={{ color: 'var(--fleet-text-secondary)' }}
>
  Content with spacing and Fleet color
</Typography>
```

## Typography Hierarchy Rules

### Page Structure Guidelines

1. **H1 Page Title**: Use `header-1-semibold`
2. **H1 Description**: Use `default-multiline` (optimized line-height for longer text)
3. **H2+ Section Titles**: Use `header-2-semibold`, `header-3-semibold`, etc.
4. **H2+ Descriptions**: Use `default` (standard line-height for shorter text)
5. **Body Content**: Use `default` for 90% of text content

### Example Structure

```typescript
// Page header
<Typography variant="header-1-semibold" style={{ color: 'var(--fleet-text-primary)' }}>
  Component Name
</Typography>
<Typography variant="default-multiline" className="mt-2" style={{ color: 'var(--fleet-text-secondary)' }}>
  Detailed description of the component and its purpose. This longer text benefits from the optimized line-height of default-multiline.
</Typography>

// Section
<Typography variant="header-2-semibold" style={{ color: 'var(--fleet-text-primary)' }}>
  Section Title
</Typography>
<Typography variant="default" className="mt-2" style={{ color: 'var(--fleet-text-secondary)' }}>
  Short section description using default variant.
</Typography>
```

## Fleet Typography System Architecture

### CSS Variables and Classes

The typography system uses CSS variables defined in `globals.css`:

```css
/* Font Sizes */
--text-default: 0.8125rem;     /* 13px */
--text-header-1: 1.4375rem;    /* 23px */
--text-header-2: 1.1875rem;    /* 19px */
/* ... */

/* Line Heights */
--leading-default: 1.231;      /* 16px / 13px */
--leading-default-multiline: 1.385; /* 18px / 13px */
/* ... */

/* Font Weights */
--font-weight-regular: 480;
--font-weight-semibold: 640;
/* ... */
```

### Generated CSS Classes

Each variant generates specific CSS classes:

```css
.text-default { font-size: var(--text-default); }
.leading-default { line-height: var(--leading-default); }
.font-body-regular { font-weight: var(--font-weight-regular); }
.tracking-default { letter-spacing: var(--tracking-default); }
```

### CVA Implementation

The Typography component uses CVA (Class Variance Authority) for variant management:

```typescript
const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      "default": [
        "text-default",           // Font size
        "leading-default",        // Line height
        "font-sans",             // Font family
        "font-body-regular",     // Font weight
        "tracking-default",      // Letter spacing
      ],
      // ... other variants
    },
  },
  defaultVariants: {
    variant: "default",
  },
})
```

## Common Usage Patterns

### Component Development

When creating new components, use Typography as the foundation:

```typescript
const Button = ({ children, ...props }) => (
  <button {...props}>
    <Typography variant="default-semibold">
      {children}
    </Typography>
  </button>
)
```

### Lists and Content

```typescript
// Feature lists
<ul className="space-y-2">
  <li>
    <Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
      • Feature description
    </Typography>
  </li>
</ul>

// Content cards
<div className="space-y-3">
  <Typography variant="header-3-semibold" style={{ color: 'var(--fleet-text-primary)' }}>
    Card Title
  </Typography>
  <Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
    Card description and content.
  </Typography>
</div>
```

### Forms and Interactive Elements

```typescript
// Form labels
<Typography variant="default-semibold" style={{ color: 'var(--fleet-text-primary)' }}>
  Field Label
</Typography>

// Helper text
<Typography variant="small" style={{ color: 'var(--fleet-text-secondary)' }}>
  Helper text or validation message
</Typography>

// Button text
<Typography variant="default-semibold">
  Button Label
</Typography>
```

## Best Practices

### 1. Variant Selection
- **Start with `default`** - Use for 90% of content
- **Use semantic hierarchy** - Follow H1 → H2 → H3 → body pattern
- **Avoid custom font styles** - Stick to Fleet variants

### 2. Color Integration
- **Always use style prop** for CSS variables
- **Never use arbitrary values** in className with CSS variables
- **Prefer Fleet semantic colors** over custom colors

### 3. Component Architecture
- **Typography as foundation** - Build components on Typography
- **Consistent spacing** - Use Tailwind spacing utilities
- **Semantic HTML** - Use appropriate HTML elements with Typography

### 4. Performance Considerations
- **CVA optimization** - Variants are pre-computed and cached
- **CSS variable efficiency** - Fleet colors change efficiently with theme switching
- **Font loading** - Inter Variable font provides optimal loading

## Troubleshooting

### Missing Font-Size Classes

**Problem**: Font-size classes (`text-default`, `text-header-1`, etc.) missing from rendered HTML.

**Cause**: CSS variable syntax in className interferes with CVA class generation.

**Solution**: Use `style` prop for CSS variables:

```typescript
// ❌ Wrong - causes missing classes
<Typography variant="default" className="text-[var(--fleet-text-secondary)]">

// ✅ Correct - preserves all classes
<Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
```

### Inconsistent Font Weights

**Problem**: Font weights not matching Fleet design.

**Cause**: Using standard Tailwind font weights instead of Fleet-specific weights.

**Solution**: Use Fleet font weight classes:

```typescript
// ❌ Wrong
<Typography variant="default" className="font-medium">

// ✅ Correct - use Fleet variants
<Typography variant="default-semibold">
```

### Typography Hierarchy Issues

**Problem**: Inconsistent text sizing and spacing.

**Cause**: Not following Fleet typography hierarchy rules.

**Solution**: Follow established patterns:

```typescript
// ✅ Correct hierarchy
<Typography variant="header-1-semibold">Title</Typography>
<Typography variant="default-multiline">Description</Typography>
<Typography variant="header-2-semibold">Section</Typography>
<Typography variant="default">Content</Typography>
```

## Advanced Usage

### Custom Element Types

```typescript
// Use as different HTML elements
<Typography variant="header-1-semibold" as="h1">Page Title</Typography>
<Typography variant="default" as="p">Paragraph content</Typography>
<Typography variant="code" as="code">Code snippet</Typography>
```

### Forwarding Refs

```typescript
const CustomText = React.forwardRef<HTMLElement, TypographyProps>(
  (props, ref) => (
    <Typography ref={ref} variant="default" {...props} />
  )
)
```

### Conditional Styling

```typescript
<Typography 
  variant="default"
  className={cn(
    "transition-colors",
    isActive && "font-body-semibold"
  )}
  style={{ 
    color: isActive 
      ? 'var(--fleet-text-primary)' 
      : 'var(--fleet-text-secondary)' 
  }}
>
  Interactive text
</Typography>
```

## Migration Guidelines

### From Raw HTML to Typography

```typescript
// ❌ Before
<h1 className="text-xl font-semibold">Title</h1>
<p className="text-sm text-gray-600">Description</p>

// ✅ After
<Typography variant="header-1-semibold">Title</Typography>
<Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
  Description
</Typography>
```

### From Legacy Typography Components

```typescript
// ❌ Before
<H1>Title</H1>
<Body>Content</Body>
<Caption>Small text</Caption>

// ✅ After
<Typography variant="header-1-semibold">Title</Typography>
<Typography variant="default">Content</Typography>
<Typography variant="small">Small text</Typography>
```

## Integration with Example Pages

The Typography system integrates with standardized example page templates:

```typescript
import { ExamplePageTemplate, ExampleSectionCard } from "@/components/ui"

// Templates automatically handle Typography hierarchy
<ExamplePageTemplate
  title="Component Name"
  description="Uses default-multiline variant automatically"
>
  <ExampleSectionCard 
    title="Section Title"
    description="Uses default variant automatically"
  >
    <Typography variant="default">Custom content</Typography>
  </ExampleSectionCard>
</ExamplePageTemplate>
```

## Summary

The Fleet Air Typography system provides:

1. **Comprehensive variant system** mirroring Fleet design patterns
2. **CSS variable integration** with proper conflict resolution
3. **Semantic hierarchy** for consistent content structure
4. **Performance optimization** through CVA and CSS variables
5. **Developer experience** with clear usage patterns and troubleshooting

Always use the Typography component with Fleet variants and follow the CSS variable guidelines to ensure consistent, accessible, and maintainable typography throughout the application.