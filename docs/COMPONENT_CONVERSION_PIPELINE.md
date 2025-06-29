# Fleet Air Component Conversion Pipeline

## Overview

This document provides a comprehensive, step-by-step pipeline for converting Fleet Air components from Kotlin/Compose (`/ultimate/fleet/compose/theme/`) to React web components (`/ultimate/fleet/air-web-components/`). This pipeline ensures consistency, maintainability, and fidelity to Fleet's design system.

## Prerequisites

Before starting any component conversion, ensure you have:

1. **Development Environment Ready**
   ```bash
   cd /ultimate/fleet/air-web-components
   npm install
   npm run dev  # Start development server at localhost:3000
   ```

2. **Understanding of Fleet Design System**
   - Review existing documentation in `/ultimate/fleet/air-web-components/docs/`
   - Familiarize yourself with Fleet color system (`http://localhost:3000/examples/colors`)
   - Study existing components (`http://localhost:3000/examples/buttons`, `http://localhost:3000/examples/typography`, `http://localhost:3000/examples/icons`)

3. **Reference Materials**
   - Fleet Compose source: `/ultimate/fleet/compose/theme/src/fleet/compose/theme/components/`
   - Fleet Gallery app: `/ultimate/fleet/gallery/` (for visual reference)
   - Existing web implementations: `/ultimate/fleet/air-web-components/src/components/ui/`

4. **shadcn/ui Foundation**
   - All components MUST be based on existing shadcn/ui components
   - Install required shadcn components before starting conversion
   - Use shadcn as the accessible, unstyled foundation and extend with Fleet styling

## Phase 1: Analysis and Planning

### Step 1.1: Analyze the Compose Component

**Location:** `/ultimate/fleet/compose/theme/src/fleet/compose/theme/components/[component]/`

**Tasks:**
1. **Read the main component file** (e.g., `Button.kt`, `Checkbox.kt`)
   - Identify component variants and states
   - Note all props and configuration options
   - Document default values and behaviors
   - Map out component composition and hierarchy

2. **Analyze supporting files** (e.g., `ButtonDefaults.kt`, `CheckboxState.kt`)
   - Extract color mappings and semantic tokens
   - Identify animation and interaction patterns
   - Note accessibility features and ARIA attributes
   - Document size variants and measurements

3. **Study usage patterns**
   - Check `/ultimate/fleet/gallery/` for visual examples
   - Look for usage in Fleet codebase
   - Identify common use cases and edge cases

**Deliverable:** Component analysis document with:
- Variants list (primary, secondary, etc.)
- States list (default, hover, pressed, disabled, etc.)
- Props inventory with types and defaults
- Color token mappings
- Size specifications
- Interaction behaviors

### Step 1.2: Design Web Component API

**Tasks:**
1. **Map Compose props to React props**
   ```kotlin
   // Compose
   fun Button(
       onClick: () -> Unit,
       modifier: Modifier = Modifier,
       enabled: Boolean = true,
       variant: ButtonVariant = ButtonVariant.Primary,
       size: ButtonSize = ButtonSize.Default,
       content: @Composable () -> Unit
   )
   ```
   
   ```tsx
   // React
   interface ButtonProps {
     onClick?: () => void
     className?: string
     disabled?: boolean
     variant?: 'primary' | 'secondary' | 'dangerous' | 'positive' | 'warning' | 'ghost' | 'link'
     size?: 'sm' | 'default' | 'lg' | 'icon'
     children: React.ReactNode
   }
   ```

2. **Design variant system using CVA (Class Variance Authority)**
   - Map all Compose variants to CVA variants
   - Ensure type safety with TypeScript
   - Plan for extensibility

3. **Plan accessibility features**
   - Map Compose accessibility to React/ARIA
   - Ensure keyboard navigation support
   - Plan focus management

**Deliverable:** Component API specification with TypeScript interfaces

### Step 1.3: Color System Mapping

**Tasks:**
1. **Extract color tokens from Compose component**
   - Find all color references in the Compose code
   - Map to existing Fleet semantic tokens in `fleet-semantic-colors.json`
   - Identify any missing tokens that need to be added

2. **Verify color tokens exist in web system**
   - Check `/ultimate/fleet/air-web-components/src/lib/fleet-semantic-colors.json`
   - Check `/ultimate/fleet/air-web-components/fleet-semantic-vars-light.css` and `/ultimate/fleet/air-web-components/fleet-semantic-vars-dark.css`
   - Add missing tokens if necessary

3. **Plan CSS variable usage**
   ```css
   /* Example mapping */
   background-color: var(--fleet-button-primary-background-default);
   color: var(--fleet-button-primary-text-default);
   border-color: var(--fleet-button-primary-border-default);
   ```

**Deliverable:** Color mapping document with all required CSS variables

### Step 1.4: Typography System Planning

**Tasks:**
1. **Use consistent typography classes across ALL components**
   - **Standard classes**: `text-default leading-default font-body-regular tracking-default`
   - **Code text**: `text-code leading-code font-code tracking-code`
   - **Avoid arbitrary values**: Never use `text-[13px] leading-[16px]` - always use CSS utility classes

2. **Map Fleet typography to CSS utility classes**
   ```tsx
   // ✅ CORRECT: Use CSS utility classes (theme-aware)
   "text-default leading-default font-body-regular tracking-default"
   
   // ❌ WRONG: Arbitrary values (not theme-aware)
   "text-[13px] leading-[16px] font-medium"
   ```

3. **Verify typography classes exist in globals.css**
   - Check `/ultimate/fleet/air-web-components/src/app/globals.css`
   - All typography utilities should be defined with CSS variables
   - Font weights should adapt to theme (520 light / 480 dark)

**Typography Consistency Benefits:**
- **Theme-aware font weights**: Automatically adapts between light/dark themes
- **Maintainability**: Single source of truth in `globals.css`
- **Consistency**: All components look identical
- **Fleet accuracy**: Matches exact specifications

**Deliverable:** Typography mapping document with consistent CSS utility classes

## Phase 2: Implementation

### Step 2.1: Create Base Component Structure

**Location:** `/ultimate/fleet/air-web-components/src/components/ui/[component-name].tsx`

**Tasks:**
1. **Install shadcn/ui base component FIRST**
   ```bash
   cd /ultimate/fleet/air-web-components
   npx shadcn@latest add [component-name]
   # For example:
   # npx shadcn@latest add input     # For text input conversion
   # npx shadcn@latest add checkbox  # For checkbox conversion
   # npx shadcn@latest add select    # For select/combobox conversion
   # npx shadcn@latest add switch    # For switch/toggle conversion
   ```

2. **Extend the installed shadcn component**
   ```tsx
   "use client"
   
   import * as React from "react"
   import { Slot } from "@radix-ui/react-slot"
   import { cva, type VariantProps } from "class-variance-authority"
   import { cn } from "@/lib/utils"
   
   // Import the shadcn component as foundation
   import { Input as ShadcnInput } from "./input" // or whatever shadcn component
   
   // Extend with Fleet-specific variants and styling
   
   export { ComponentName, type ComponentProps }
   ```

3. **Set up file structure based on shadcn foundation**
   - Start with the generated shadcn component
   - Extend the existing CVA variants with Fleet-specific ones
   - Add Fleet color system integration
   - Preserve all shadcn accessibility and behavior

2. **Define variants with CVA**
   ```tsx
   const componentVariants = cva(
     "base-classes-here",
     {
       variants: {
         variant: {
           primary: "variant-specific-classes",
           secondary: "variant-specific-classes",
         },
         size: {
           sm: "size-specific-classes",
           default: "size-specific-classes",
           lg: "size-specific-classes",
         },
       },
       defaultVariants: {
         variant: "primary",
         size: "default",
       },
     }
   )
   ```

3. **Create TypeScript interfaces**
   ```tsx
   export interface ComponentProps
     extends React.HTMLAttributes<HTMLElement>,
       VariantProps<typeof componentVariants> {
     asChild?: boolean
     // Additional component-specific props
   }
   ```

**Deliverable:** Basic component structure with CVA variants

### Step 2.2: Implement Core Functionality

**Tasks:**
1. **Implement main component logic**
   - Handle all props and variants
   - Implement state management if needed
   - Add event handlers and callbacks
   - Support `asChild` pattern for composition

2. **Add Fleet color system integration**
   ```tsx
   const componentVariants = cva(
     "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
     {
       variants: {
         variant: {
           primary: "bg-[var(--fleet-button-primary-background-default)] text-[var(--fleet-button-primary-text-default)] hover:bg-[var(--fleet-button-primary-background-hover)]",
           secondary: "border border-[var(--fleet-button-secondary-border-default)] bg-transparent text-[var(--fleet-button-secondary-text-default)] hover:bg-[var(--fleet-button-secondary-background-hover)]",
         },
         size: {
           sm: "h-5 px-2 text-xs",
           default: "h-6 px-3 text-sm",
           lg: "h-7 px-4 text-sm",
         },
       },
     }
   )
   ```

3. **Handle edge cases and error states**
   - Disabled states
   - Loading states (if applicable)
   - Error states (if applicable)

**Deliverable:** Functional component with all variants and states

### Step 2.3: Add Advanced Features

**Tasks:**
1. **Implement component-specific features**
   - Icons (for buttons, inputs, etc.)
   - Loading states with spinners
   - Complex interactions (toggle, split, menu)
   - Keyboard navigation

2. **Add accessibility features**
   - ARIA attributes
   - Keyboard event handlers
   - Focus management
   - Screen reader support

3. **Implement animations and transitions**
   - Use CSS transitions for smooth state changes
   - Match Fleet's animation timing and easing
   - Ensure performance optimization

**Deliverable:** Feature-complete component with accessibility and animations

### Step 2.4: Create Supporting Components

**Tasks:**
1. **Create variant-specific components** (if needed)
   ```tsx
   // Example for Button system
   export const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
     ({ className, ...props }, ref) => (
       <Button ref={ref} variant="primary" className={className} {...props} />
     )
   )
   ```

2. **Create compound components** (if needed)
   ```tsx
   // Example for complex components
   export const ComponentGroup = {
     Root: ComponentRoot,
     Item: ComponentItem,
     Trigger: ComponentTrigger,
   }
   ```

3. **Export all components**
   ```tsx
   export {
     Component,
     ComponentVariant1,
     ComponentVariant2,
     type ComponentProps,
   }
   ```

**Deliverable:** Complete component system with all variants and supporting components

## Phase 3: Integration and Documentation

### Step 3.1: Update Component Registry

**Tasks:**
1. **Add to component exports**
   ```tsx
   // /ultimate/fleet/air-web-components/src/components/ui/index.ts
   export * from "./new-component"
   ```

2. **Add to main exports**
   ```tsx
   // /ultimate/fleet/air-web-components/src/components/index.ts
   export * from "./ui"
   ```

3. **Update package exports** (if needed)

**Best Practices for Exports:**
- **Avoid duplicate exports**: Use specific named exports rather than wildcard exports to prevent conflicts
- **Clean index files**: Remove redundant exports and organize systematically
- **Consistent naming**: Use clear, descriptive names for component variants

**Deliverable:** Component properly exported and accessible

### Step 3.2: Create Storybook Stories (Future)

**Note:** Currently using Next.js examples, but prepare for Storybook migration

**Tasks:**
1. **Create example page**
   ```tsx
   // /ultimate/fleet/air-web-components/src/app/examples/[component]/page.tsx
   export default function ComponentExamples() {
     return (
       <div className="space-y-8">
         <ComponentShowcase />
         <ComponentVariants />
         <ComponentStates />
       </div>
     )
   }
   ```

2. **Add navigation entry**
   - Update navigation in `/ultimate/fleet/air-web-components/src/components/app-layout.tsx`
   - Add route to examples

**Deliverable:** Interactive examples page

### Step 3.3: Write Documentation

**Tasks:**
1. **Create implementation guide**
   ```markdown
   # Component Implementation Guide
   
   ## Overview
   Brief description of the component and its purpose.
   
   ## Usage
   Basic usage examples
   
   ## Variants
   All available variants with examples.
   
   ## Examples
   Link to examples page.
   ```

2. **Update main README**
   - Add component to components list
   - Include usage example
   - Update table of contents

3. **Add inline documentation**
   - JSDoc comments for all props
   - Usage examples in comments
   - Type documentation

**Deliverable:** Complete documentation for the component

## Phase 4: Testing and Validation

### Step 4.1: Visual Testing

**Tasks:**
1. **Compare with Fleet Gallery**
   - Find components in: `/ultimate/fleet/gallery/`
   - Compare visual appearance pixel by pixel
   - Test all variants and states
   - Verify color accuracy in both themes

2. **Test responsive behavior**
   - Test component at different screen sizes
   - Verify text wrapping and layout
   - Check touch targets on mobile

3. **Cross-browser testing**
   - Verify CSS variable support
   - Test theme switching

**Deliverable:** Validation report

### Step 4.2: Functional Testing

**Tasks:**
1. **Test all interactions**
   - Click/tap events
   - Keyboard navigation
   - Focus management
   - State changes

2. **Test edge cases**
   - Long text content
   - Missing props
   - Invalid prop values
   - Error conditions


**Deliverable:** Functional testing report


## Phase 5: Refinement and Optimization

### Step 5.1: Code Review and Optimization

**Tasks:**
1. **Code quality review**
   - Follow React best practices
   - Ensure TypeScript strict mode compliance
   - Check for code duplication
   - Verify error handling

2. **Performance optimization**
   - Optimize re-renders with React.memo if needed
   - Use useCallback/useMemo where appropriate
   - Minimize bundle size

3. **Accessibility audit**
   - Run automated accessibility tests
   - Manual screen reader testing
   - Keyboard navigation testing
   - Color contrast validation

**Deliverable:** Optimized, production-ready component

### Step 5.2: Integration Testing

**Tasks:**
1. **Test with other components**
   - Verify component works in forms
   - Test in complex layouts
   - Check theme consistency across components

2. **Test in real applications**
   - Create realistic usage scenarios
   - Test with different data types
   - Verify component composability

3. **Performance in context**
   - Test with many component instances
   - Check performance in complex UIs
   - Verify memory usage patterns

**Deliverable:** Integration validation report

## Common Pitfalls and Solutions

### Typography Inconsistencies

**Problem:** Components using different typography approaches leading to visual inconsistencies.

**Solution:** 
```tsx
// ✅ ALWAYS use consistent CSS utility classes
"text-default leading-default font-body-regular tracking-default"

// ❌ NEVER use arbitrary values
"text-[13px] leading-[16px] font-medium"
```

**Why this matters:**
- Arbitrary values override CSS utilities and break theme consistency
- Font weights won't adapt properly between light (520) and dark (480) themes
- Components will look different even when they should be identical

### Focus Ring Color Issues

**Problem:** Focus rings appearing black instead of Fleet colors.

**Solution:**
```tsx
// ✅ CORRECT: Use ring-offset-0
"focus-visible:ring-2 focus-visible:ring-[var(--fleet-component-focusOutline-default)] focus-visible:ring-offset-0"

// ❌ WRONG: ring-opacity-100 can cause issues
"focus-visible:ring-opacity-100"
```

### Export Management

**Problem:** Duplicate exports causing conflicts and confusion.

**Solution:**
```tsx
// ✅ CORRECT: Specific named exports
export { Button, buttonVariants } from "./button"
export { TextInput, textInputVariants } from "./input"

// ❌ WRONG: Mixing specific and wildcard exports
export { Button } from "./button"
export * from "./button"  // Creates duplicates
```

### CSS Class Application Order

**Problem:** CVA variant classes applied in wrong order causing style overrides.

**Solution:**
```tsx
// ✅ CORRECT: Typography in base, colors in variants
const componentVariants = cva(
  "text-default leading-default font-body-regular tracking-default", // Base typography
  {
    variants: {
      variant: {
        primary: "bg-[var(--fleet-button-primary-background-default)]", // Colors applied after
      }
    }
  }
)

// ❌ WRONG: Typography in size variants overrides colors
const componentVariants = cva(
  "base-styles",
  {
    variants: {
      variant: { primary: "bg-primary text-white" },
      size: { default: "text-default" } // This can override text color!
    }
  }
)
```

**Key Lesson:** CVA applies classes in order: `base → variants → compoundVariants`. Typography should go in base to avoid overriding variant-specific colors.

## Component-Specific Guidelines

### Button Components
- **Reference:** `/ultimate/fleet/air-web-components/docs/BUTTON_IMPLEMENTATION.md`
- **shadcn Foundation:** `npx shadcn@latest add button`
- **Key Features:** All Fleet variants, loading states, icons, advanced button types
- **Special Considerations:** Split buttons, menu buttons, toggle states

### Form Components (Checkbox, Input, Select, etc.)
- **shadcn Foundations:** 
  - Input: `npx shadcn@latest add input`
  - Checkbox: `npx shadcn@latest add checkbox`
  - Select: `npx shadcn@latest add select`
  - Switch: `npx shadcn@latest add switch`
  - Radio Group: `npx shadcn@latest add radio-group`
  - Textarea: `npx shadcn@latest add textarea`
  - Label: `npx shadcn@latest add label`
- **Key Features:** Validation states, labels, help text, error messages
- **Special Considerations:** Form integration, controlled/uncontrolled patterns

### Layout Components (Card, Panel, Toolbar, etc.)
- **shadcn Foundations:**
  - Card: `npx shadcn@latest add card`
  - Separator: `npx shadcn@latest add separator`
  - Sheet: `npx shadcn@latest add sheet`
  - Collapsible: `npx shadcn@latest add collapsible`
- **Key Features:** Responsive design, nested layouts, spacing system
- **Special Considerations:** CSS Grid/Flexbox usage, responsive breakpoints

### Navigation Components (Tabs, Menu, Breadcrumb, etc.)
- **shadcn Foundations:**
  - Tabs: `npx shadcn@latest add tabs`
  - Navigation Menu: `npx shadcn@latest add navigation-menu`
  - Breadcrumb: `npx shadcn@latest add breadcrumb`
  - Dropdown Menu: `npx shadcn@latest add dropdown-menu`
  - Context Menu: `npx shadcn@latest add context-menu`
- **Key Features:** Active states, keyboard navigation, accessibility
- **Special Considerations:** Focus management, ARIA navigation patterns

### Feedback Components (Alert, Toast, Modal, etc.)
- **shadcn Foundations:**
  - Alert: `npx shadcn@latest add alert`
  - Toast: `npx shadcn@latest add toast`
  - Dialog: `npx shadcn@latest add dialog`
  - Alert Dialog: `npx shadcn@latest add alert-dialog`
  - Popover: `npx shadcn@latest add popover`
  - Tooltip: `npx shadcn@latest add tooltip`
- **Key Features:** Auto-dismiss, animations, portal rendering
- **Special Considerations:** Z-index management, focus trapping, escape handling

### Data Display Components (Table, List, Tree, etc.)
- **shadcn Foundations:**
  - Table: `npx shadcn@latest add table`
  - Badge: `npx shadcn@latest add badge`
  - Avatar: `npx shadcn@latest add avatar`
  - Progress: `npx shadcn@latest add progress`
  - Accordion: `npx shadcn@latest add accordion`
- **Key Features:** Sorting, filtering, virtualization, selection
- **Special Considerations:** Performance with large datasets, accessibility for screen readers

## Quality Standards

### Code Quality
- **TypeScript:** Strict mode, no `any` types, complete type coverage
- **React:** Modern patterns, hooks, functional components
- **Accessibility:** WCAG 2.1 AA compliance
- **Performance:** < 100ms interaction response, smooth 60fps animations

### Design Fidelity
- **Colors:** Exact match to Fleet semantic tokens
- **Typography:** Match Fleet font sizes, weights, line heights
- **Spacing:** Use Fleet spacing scale
- **Animations:** Match Fleet timing and easing curves

### Documentation
- **API Documentation:** Complete prop documentation with examples
- **Usage Examples:** Real-world usage scenarios
- **Implementation Notes:** Architecture decisions and trade-offs
- **Accessibility:** Screen reader instructions and keyboard shortcuts

## Tools and Resources

### Development Tools
- **Next.js Dev Server:** `npm run dev` for hot reloading
- **TypeScript:** Type checking and IntelliSense
- **ESLint:** Code quality and consistency
- **Prettier:** Code formatting

### Design Tools
- **Fleet Gallery:** `/ultimate/fleet/gallery/` for visual reference
- **Color Explorer:** `http://localhost:3000/examples/colors` for color token lookup
- **Component Examples:** `http://localhost:3000/examples/*` for existing patterns

### Testing Tools
- **Browser DevTools:** Visual debugging and performance profiling
- **Accessibility Tools:** Screen readers, axe-core, WAVE
- **Cross-browser Testing:** BrowserStack or similar service

### Documentation Tools
- **Markdown:** For implementation guides
- **JSDoc:** For inline code documentation
- **Examples Pages:** For interactive documentation

## Common Pitfalls and Solutions

### Color System Issues
- **Problem:** Using hardcoded colors instead of CSS variables
- **Solution:** Always use `var(--fleet-*)` CSS variables for theme support

### TypeScript Issues
- **Problem:** Loose typing with `any` or missing prop types
- **Solution:** Use strict TypeScript, define complete interfaces

### Accessibility Issues
- **Problem:** Missing ARIA attributes or keyboard support
- **Solution:** Follow ARIA patterns, test with screen readers

### Performance Issues
- **Problem:** Unnecessary re-renders or large bundle sizes
- **Solution:** Use React.memo, optimize imports, lazy load when appropriate

### Design Consistency Issues
- **Problem:** Components that don't match Fleet's visual design
- **Solution:** Pixel-perfect comparison with Fleet Gallery, use exact color tokens

## Success Criteria

A component conversion is considered complete when:

1. **Visual Fidelity:** Matches Fleet Gallery appearance exactly
2. **Functional Completeness:** All variants, states, and interactions work
3. **Accessibility:** Meets WCAG 2.1 AA standards
4. **Performance:** Meets performance benchmarks
5. **Documentation:** Complete API docs and usage examples
6. **Testing:** Passes all visual, functional, and accessibility tests
7. **Integration:** Works seamlessly with other components
8. **Type Safety:** Full TypeScript coverage with no `any` types

## Next Steps After Conversion

1. **Monitor Usage:** Track component adoption and usage patterns
2. **Gather Feedback:** Collect developer feedback for improvements
3. **Iterate:** Refine based on real-world usage
4. **Maintain:** Keep in sync with Fleet design system updates
5. **Extend:** Add new variants or features as needed

## Component Priority List

Based on Fleet Gallery and common UI patterns, suggested conversion order:

### High Priority (Core UI)
1. **Typography** ✅ (Complete)
2. **Button** ✅ (Complete)
3. **Icon** ✅ (Complete)
4. **Input/TextField** (`npx shadcn@latest add input`)
5. **Checkbox** (`npx shadcn@latest add checkbox`)
6. **Radio Button** (`npx shadcn@latest add radio-group`)
7. **Select/Combobox** (`npx shadcn@latest add select`)
8. **Switch/Toggle** (`npx shadcn@latest add switch`)

### Medium Priority (Common Components)
9. **Card/Panel** (`npx shadcn@latest add card`)
10. **Tabs** (`npx shadcn@latest add tabs`)
11. **Tooltip** (`npx shadcn@latest add tooltip`)
12. **Alert/Banner** (`npx shadcn@latest add alert`)
13. **Progress Indicator** (`npx shadcn@latest add progress`)
14. **Badge/Counter** (`npx shadcn@latest add badge`)
15. **Separator** (`npx shadcn@latest add separator`)

### Lower Priority (Advanced Components)
16. **Table/DataGrid** (`npx shadcn@latest add table`)
17. **Tree View** (Custom, use Accordion as base: `npx shadcn@latest add accordion`)
18. **Context Menu** (`npx shadcn@latest add context-menu`)
19. **Modal/Dialog** (`npx shadcn@latest add dialog`)
20. **Toolbar** (Custom, use Button as base)
21. **Segmented Control** (Custom, use Toggle Group: `npx shadcn@latest add toggle-group`)
22. **Date Picker** (`npx shadcn@latest add calendar` + `npx shadcn@latest add popover`)
23. **File Upload** (Custom, use Input as base)

## Key Principles

### shadcn/ui Foundation Strategy
**CRITICAL:** Every component conversion MUST start with installing the corresponding shadcn/ui component as the foundation:

1. **Always Install shadcn First:** Before any custom code, run `npx shadcn@latest add [component]`
2. **Extend, Don't Replace:** Build on top of shadcn's accessibility and behavior
3. **Preserve shadcn Features:** Keep all existing props, variants, and functionality
4. **Add Fleet Styling:** Layer Fleet colors, typography, and spacing on top
5. **Maintain Compatibility:** Ensure the component still works as a drop-in shadcn replacement

### Component Architecture Pattern
```tsx
// 1. Install: npx shadcn@latest add input
// 2. Extend the generated component:

import { Input as ShadcnInput } from "./input" // shadcn foundation
import { cva } from "class-variance-authority"

// Extend shadcn variants with Fleet-specific ones
const fleetInputVariants = cva(
  // Keep shadcn base classes
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      // Add Fleet-specific variants
      fleetVariant: {
        default: "border-[var(--fleet-input-border-default)] bg-[var(--fleet-input-background-default)]",
        error: "border-[var(--fleet-input-border-error)] bg-[var(--fleet-input-background-error)]",
        success: "border-[var(--fleet-input-border-success)] bg-[var(--fleet-input-background-success)]",
      }
    }
  }
)

// Extend the original component
export interface FleetInputProps extends ComponentProps<typeof ShadcnInput> {
  fleetVariant?: "default" | "error" | "success"
}

export const FleetInput = React.forwardRef<HTMLInputElement, FleetInputProps>(
  ({ className, fleetVariant = "default", ...props }, ref) => {
    return (
      <ShadcnInput
        className={cn(fleetInputVariants({ fleetVariant }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
```

This pipeline ensures systematic, high-quality conversion of Fleet Air components while maintaining design fidelity, accessibility, and performance standards. **All components must be built on shadcn/ui foundations to ensure consistency, accessibility, and maintainability.** 