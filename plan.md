# Air Web Components - Project Plan

## 🎯 Project Overview

**Goal**: Create a React/Storybook-based web component library that mirrors the Fleet Air (Compose) component system for rapid prototyping and design iteration.

**Repository Location**: `fleet/air-web-components/` (Inside Fleet for development, excluded from git)
**Final Destination**: Separate repository for team distribution

**Target Audience**: Design and development teams at JetBrains for prototyping and cross-platform design consistency.

## 📋 Analysis of Fleet Air Components

### Source Location (Relative to Fleet Directory)
- **Primary Components**: `compose/theme/src/fleet/compose/theme/components/`
- **Typography System**: `compose/theme/src/fleet/compose/theme/text/Typography.kt`
- **Theme System**: `compose/theme/src/fleet/compose/theme/Theme.kt`
- **Gallery Examples**: `gallery/src/main/kotlin/noria/gallery/`

### Key Architectural Insights

#### 1. Typography System
- **Font Family**: Inter Variable with optical sizing
- **Font Weights**: 400 (Regular), 500 (Medium), 600 (Semibold)
- **Precise Metrics**: Line height, letter spacing, font size tokens
- **Responsive Typography**: Different scales for different contexts

#### 2. Component Variants
- **Button**: Primary, Secondary, Tertiary, Destructive
- **Sizes**: Small, Medium, Large
- **States**: Default, Hover, Focus, Disabled, Loading
- **Icons**: Leading/trailing icon support

#### 3. Theme Architecture
- **Color System**: Semantic color tokens (primary, secondary, accent, destructive)
- **Dark/Light Mode**: Comprehensive theme switching
- **Spacing System**: Consistent spacing tokens
- **Border Radius**: Consistent radius tokens

## 🛠 Technology Stack

### Core Technologies
- **React 18**: Component framework
- **TypeScript**: Type safety and developer experience
- **Radix UI**: Accessible component primitives
- **Storybook 8**: Component documentation and testing
- **Vite**: Build tool and development server

### Styling & Design
- **CSS-in-JS**: Styled-components or Emotion
- **Design Tokens**: JSON-based token system
- **Class Variance Authority (CVA)**: Variant management
- **Tailwind CSS**: Utility-first styling (optional)

### Development Tools
- **ESLint**: Code quality
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **Chromatic**: Visual regression testing

## 📅 Implementation Phases

### Phase 1: Foundation (Week 1)
**Objective**: Set up development environment and design system foundation

#### 1.1 Project Setup ✅
- [x] Create folder inside Fleet directory
- [x] Add to .gitignore to prevent commits
- [ ] Initialize React + TypeScript project with Vite
- [ ] Configure Storybook 8 with proper addons
- [ ] Set up ESLint, Prettier, Husky

#### 1.2 Component Analysis
- [ ] **Inventory Fleet Air Components**
  - [ ] Analyze `compose/theme/src/fleet/compose/theme/components/`
  - [ ] Document component variants and props
  - [ ] Extract design tokens from Kotlin code
  - [ ] Map component hierarchy and relationships

#### 1.3 Design System Foundation
- [ ] **Typography System**
  - [ ] Import Inter Variable font
  - [ ] Create typography tokens (sizes, weights, line-heights)
  - [ ] Build Typography component with variants
  - [ ] Document typography scale in Storybook

- [ ] **Color System**
  - [ ] Extract color tokens from Fleet Air theme
  - [ ] Create semantic color system (primary, secondary, etc.)
  - [ ] Implement dark/light mode switching
  - [ ] Create color palette documentation

- [ ] **Spacing & Layout**
  - [ ] Define spacing tokens (4px, 8px, 12px, 16px, 24px, 32px, 48px)
  - [ ] Create layout utilities
  - [ ] Border radius tokens
  - [ ] Shadow/elevation system

#### 1.4 Component Infrastructure
- [ ] **Base Component Architecture**
  - [ ] Create component base classes with CVA
  - [ ] Implement variant system
  - [ ] Set up component prop types
  - [ ] Create component factory patterns

### Phase 2: Core Components (Week 2-3)
**Objective**: Implement essential UI components

#### 2.1 Button Component
- [ ] **Button Variants**
  - [ ] Primary button (filled, high emphasis)
  - [ ] Secondary button (outlined, medium emphasis)  
  - [ ] Tertiary button (text, low emphasis)
  - [ ] Destructive button (error states)

- [ ] **Button Sizes**
  - [ ] Small (24px height)
  - [ ] Medium (32px height)
  - [ ] Large (40px height)

- [ ] **Button States**
  - [ ] Default, hover, focus, active
  - [ ] Disabled state
  - [ ] Loading state with spinner
  - [ ] Icon support (leading/trailing)

#### 2.2 Input Components
- [ ] **Text Input**
  - [ ] Base input with variants
  - [ ] Label, placeholder, helper text
  - [ ] Error states and validation
  - [ ] Prefix/suffix support

- [ ] **Select Component**
  - [ ] Dropdown with search
  - [ ] Multi-select support
  - [ ] Custom option rendering
  - [ ] Accessibility compliance

#### 2.3 Navigation Components
- [ ] **Tab Component**
  - [ ] Horizontal tabs
  - [ ] Vertical tabs
  - [ ] Tab indicators and animations
  - [ ] Disabled tabs

- [ ] **Navigation Menu**
  - [ ] Hierarchical menu structure
  - [ ] Active states
  - [ ] Icons and badges
  - [ ] Collapsible sections

### Phase 3: Advanced Components (Week 4-5)
**Objective**: Implement complex interactive components

#### 3.1 Overlay Components
- [ ] **Modal/Dialog**
  - [ ] Modal sizes (small, medium, large, fullscreen)
  - [ ] Modal variants (confirmation, form, content)
  - [ ] Backdrop and focus management
  - [ ] Animation and transitions

- [ ] **Popover/Tooltip**
  - [ ] Positioning system
  - [ ] Trigger variants (hover, click, focus)
  - [ ] Arrow positioning
  - [ ] Delay and timing controls

#### 3.2 Data Display Components
- [ ] **Table Component**
  - [ ] Sortable columns
  - [ ] Row selection
  - [ ] Pagination integration
  - [ ] Responsive table patterns

- [ ] **List Component**
  - [ ] Virtual scrolling
  - [ ] Item selection
  - [ ] Drag and drop
  - [ ] Loading states

#### 3.3 Form Components
- [ ] **Checkbox/Radio**
  - [ ] Custom styling
  - [ ] Indeterminate states
  - [ ] Group management
  - [ ] Validation integration

- [ ] **Slider/Range**
  - [ ] Single and dual handle
  - [ ] Step values
  - [ ] Marks and labels
  - [ ] Vertical orientation

### Phase 4: Layout & Utilities (Week 6)
**Objective**: Implement layout systems and utility components

#### 4.1 Layout Components
- [ ] **Grid System**
  - [ ] CSS Grid wrapper
  - [ ] Responsive breakpoints
  - [ ] Gap management
  - [ ] Auto-placement

- [ ] **Flex Utilities**
  - [ ] Direction, alignment, justification
  - [ ] Wrap and gap utilities
  - [ ] Responsive flex properties

#### 4.2 Feedback Components
- [ ] **Loading States**
  - [ ] Spinner variations
  - [ ] Skeleton screens
  - [ ] Progress indicators
  - [ ] Loading overlays

- [ ] **Toast/Notification**
  - [ ] Toast variants (success, error, warning, info)
  - [ ] Positioning system
  - [ ] Auto-dismiss timing
  - [ ] Action buttons

### Phase 5: Documentation & Testing (Week 7)
**Objective**: Comprehensive documentation and quality assurance

#### 5.1 Storybook Documentation
- [ ] **Component Stories**
  - [ ] All variants and states
  - [ ] Interactive controls
  - [ ] Usage examples
  - [ ] Accessibility notes

- [ ] **Design System Documentation**
  - [ ] Color palette showcase
  - [ ] Typography specimen
  - [ ] Spacing and layout guides
  - [ ] Component composition patterns

#### 5.2 Testing Strategy
- [ ] **Unit Tests**
  - [ ] Component behavior testing
  - [ ] Accessibility testing
  - [ ] Prop validation
  - [ ] Event handling

- [ ] **Visual Regression Testing**
  - [ ] Chromatic integration
  - [ ] Cross-browser testing
  - [ ] Theme switching tests
  - [ ] Responsive design validation

### Phase 6: Deployment & Distribution (Week 8)
**Objective**: Package and distribute the component library

#### 6.1 Build & Package
- [ ] **Library Build**
  - [ ] ES modules and CommonJS builds
  - [ ] TypeScript declarations
  - [ ] Tree-shaking optimization
  - [ ] Bundle size analysis

- [ ] **NPM Package**
  - [ ] Package.json configuration
  - [ ] Semantic versioning
  - [ ] Changelog generation
  - [ ] Installation documentation

#### 6.2 Repository Setup
- [ ] **Git Repository**
  - [ ] Cut folder from Fleet directory
  - [ ] Initialize new repository
  - [ ] Branching strategy
  - [ ] Commit conventions
  - [ ] Issue templates

- [ ] **CI/CD Pipeline**
  - [ ] GitHub Actions setup
  - [ ] Automated testing
  - [ ] Storybook deployment
  - [ ] NPM publishing

## 🎨 Design Principles

### 1. Accessibility First
- WCAG 2.1 AA compliance
- Screen reader support
- Keyboard navigation
- Focus management
- Color contrast ratios

### 2. Performance Optimized
- Tree-shaking support
- Lazy loading
- Bundle size optimization
- Runtime performance monitoring

### 3. Developer Experience
- TypeScript support
- Comprehensive documentation
- Clear API design
- Consistent naming conventions
- Helpful error messages

### 4. Design Consistency
- Exact visual parity with Fleet Air
- Consistent spacing and sizing
- Unified color system
- Typography hierarchy
- Interaction patterns

## 📊 Success Metrics

### Development Metrics
- [ ] Component coverage: 100% of Fleet Air components
- [ ] Storybook stories: 100% component coverage
- [ ] Test coverage: >90%
- [ ] Bundle size: <100KB gzipped
- [ ] Accessibility score: 100% (Lighthouse)

### Adoption Metrics
- [ ] Team onboarding time: <2 hours
- [ ] Documentation completeness: 100%
- [ ] Bug reports: <5 per month
- [ ] Developer satisfaction: >4.5/5

## 🚀 Next Steps

1. **Immediate Actions**
   - [x] Set up development environment
   - [ ] Create component inventory from Fleet Air
   - [ ] Design token extraction
   - [ ] Storybook configuration

2. **Week 1 Deliverables**
   - [ ] Working Storybook environment
   - [ ] Typography system implemented
   - [ ] Color system with theme switching
   - [ ] First component (Button) completed

3. **Communication Plan**
   - [ ] Weekly progress updates
   - [ ] Component demo sessions
   - [ ] Feedback collection process
   - [ ] Design review checkpoints

## 📞 Stakeholder Alignment

### Primary Stakeholders
- **Design Team**: Visual consistency and design system adherence
- **Development Team**: API usability and integration ease
- **Product Team**: Prototyping speed and iteration capability

### Success Criteria
- **Design**: 100% visual parity with Fleet Air components
- **Development**: <30 minutes to integrate any component
- **Product**: 50% faster prototyping cycle time

## 🔄 Development Workflow

### While in Fleet Directory
1. **Easy Component Analysis**: Direct access to `../compose/theme/src/`
2. **Token Extraction**: Copy values from Kotlin files
3. **Visual Comparison**: Use `../gallery/` for reference
4. **Iterative Development**: Quick comparison and validation

### Migration to Separate Repository
1. **Cut & Copy**: Move entire folder out of Fleet
2. **Clean History**: Remove Fleet-specific references
3. **Package Setup**: Prepare for npm distribution
4. **Team Distribution**: Share with development teams

---

*This project is temporarily housed within the Fleet directory for easy component analysis and development, but will be moved to a separate repository for distribution.* 