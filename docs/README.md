# Fleet Air Web Components

A React component library that mirrors Fleet Air (Compose) components for web prototyping. This project recreates JetBrains Fleet's Compose-based UI components in React to enable rapid web prototyping using familiar Fleet design patterns.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Visit `http://localhost:3000` to see the component examples and documentation site.

## 📦 Components

### TextInput
Comprehensive Fleet-inspired input component that mirrors Fleet Air TextInput with all variants, states, and advanced features. **Includes prefix/suffix support, multiline capability, and proper focus handling.**

**Variants:**
- `default` - Standard input with Fleet's default styling
- `error` - Red border and focus ring for validation errors  
- `inner` - Transparent borders, minimal padding (for inline editing)
- `borderless` - Transparent borders but keeps background
- `borderlessTransparent` - Completely transparent

**Sizes:**
- `default` - 24px height (Fleet standard)
- `large` - 28px height (Fleet large) 
- `inner` - 18px height (Fleet inner/inline)

**Text Styles:**
- `default` - Fleet Default text (13px, regular weight)
- `multiline` - Fleet DefaultMultiline (18px line height)
- `chatMultiline` - Fleet DefaultChat (20px line height)
- `code` - Fleet Code text (JetBrains Mono)

**Advanced Features:**
- Prefix/suffix elements (icons, buttons, text)
- Multiline textarea support with line limits
- Growing inputs that expand with content
- Error state with proper ARIA attributes
- Theme-aware using Fleet CSS variables
- Full TypeScript support with strict typing

**Usage:**
```tsx
import { 
  TextInput, Input, DefaultTextInput, ErrorTextInput,
  LargeTextInput, InnerTextInput, CodeTextInput 
} from "@/components/ui/input"

// Basic usage (TextInput is the main component)
<TextInput placeholder="Enter text..." />
<Input placeholder="shadcn/ui compatibility alias" />

// Fleet-specific variants
<DefaultTextInput placeholder="Fleet default style" />
<ErrorTextInput placeholder="Error state" />
<LargeTextInput placeholder="Large input (28px)" />
<InnerTextInput placeholder="Inline editing" />

// With prefix/suffix
<TextInput 
  prefix={<Search className="h-4 w-4" />}
  suffix={<Button size="sm">Send</Button>}
  placeholder="Search..."
/>

// Multiline
<TextInput 
  multiline
  minLines={3}
  maxLines={8}
  placeholder="Enter multiple lines..."
/>

// Code input
<CodeTextInput 
  placeholder="Enter code..."
  textStyle="code"
/>
```

### Typography
Complete Fleet typography system with 20+ variants covering headers, body text, and code text. **All typography uses consistent CSS utility classes: `text-default leading-default font-body-regular tracking-default`**

**Variants:**
- Headers: `header-1-semibold`, `header-2-semibold`, `header-3-semibold`, etc.
- Body: `default`, `medium`, `small`, `default-semibold`
- Code: `code`, `code-bold`, `code-italic`

**Usage:**
```tsx
import { Typography } from "@/components/ui/typography"

<Typography variant="header-2-semibold">Fleet Component</Typography>
<Typography variant="default" className="text-muted-foreground">
  Description text
</Typography>
<Typography variant="code">const example = "code";</Typography>
```

### Button
Fleet-inspired button component with all Fleet button variants, advanced features, and proper sizing. **Based on shadcn/ui Button, extended for Fleet Air design and color system. Uses consistent typography system: `text-default leading-default font-body-regular tracking-default`**

**Variants:**
- `primary` - Uses `button.primary.background.default` for primary actions
- `secondary` - Uses `button.secondary.border.default` with transparent background for secondary actions  
- `dangerous` - Uses `button.dangerous.background.default` for destructive actions
- `positive` - Uses `button.positive.background.default` for positive actions
- `warning` - Uses `button.warning.background.default` for warning actions
- `ghost` - Transparent with hover for subtle actions
- `link` - Text link styling

**Sizes:**
- `sm` - 20px height (Fleet small button)
- `default` - 24px height (Fleet default button)
- `lg` - 28px height (Fleet large button)
- `icon` - Square icon-only button

**Advanced Features:**
- Loading state with spinner
- Left/right icons and custom icon support
- Toggle, Split, and Menu button variants
- Hint text and accessibility features
- Theme-aware using Fleet CSS variables

**Usage:**
```tsx
import { Button, ToggleButton, SplitButton, MenuButton } from "@/components/ui/button"

// Basic usage
<Button variant="primary">Save Changes</Button>
<Button variant="secondary" size="sm">Cancel</Button>
<Button variant="dangerous" disabled>Delete</Button>

// Advanced features
<Button variant="primary" iconLeft="settings" isLoading>
  Save Changes
</Button>
<ToggleButton selected={isOn}>Toggle</ToggleButton>
<SplitButton onMenuClick={openMenu}>Split Action</SplitButton>
<MenuButton menuOpen={open}>Menu</MenuButton>

// As child component (using asChild prop)
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

### Tabs
Complete Fleet tabs system with pixel-perfect implementation based on Fleet Compose specifications. **Includes all Fleet Gallery variants with proper states, spacing, and interactions.**

**Variants:**
- `basic` - Standard tabs with Fleet styling
- `icon` - Tabs with Fleet icons for better visual hierarchy
- `file` - File tabs with close buttons, modification indicators, and file type icons
- `counter` - Tabs with numerical badges for counts and notifications
- `vertical` - Vertical orientation for settings and navigation layouts

**Features:**
- **Pixel-Perfect**: Exact Fleet Compose specifications (28px height, 4px spacing, 4px border radius)
- **States**: Proper default, hover, active, and focus states with Fleet colors
- **Element Spacing**: Consistent 4px gap between all internal elements (icons, text, counters, close buttons)
- **Close Buttons**: Fleet ghost buttons with proper 16x16px close-small icons
- **Counters**: 18px height with 30px rounded corners and Fleet search counter background
- **Typography**: Fleet typography with zero letter spacing for proper readability

**Usage:**
```tsx
import { 
  Tabs, TabsList, TabsTrigger, TabsContent,
  FileTab, CounterTab, IconTab, VerticalTabs
} from "@/components/ui/tabs"

// Basic tabs
<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings...</TabsContent>
</Tabs>

// File tabs with close buttons
<FileTab
  value="app.tsx"
  filename="App.tsx"
  fileIcon={<Icon fleet="file-types-typescript" size="sm" />}
  isModified={true}
  onClose={() => handleClose()}
/>

// Counter tabs
<CounterTab value="issues" count={5}>Issues</CounterTab>

// Icon tabs  
<IconTab value="files" icon={<Icon fleet="file-types-text" size="sm" />}>
  Files
</IconTab>

// Vertical tabs
<VerticalTabs defaultValue="general">
  <TabsList orientation="vertical">
    <TabsTrigger value="general">General</TabsTrigger>
  </TabsList>
</VerticalTabs>
```

### Island
Fleet container components for organizing and grouping content with consistent spacing and visual hierarchy. **Based on Fleet's SplitPanelView.kt and AirWindowView.kt with exact 6px padding and borderless design.**

**Features:**
- **Fleet-Standard Design**: 8px corner radius, 6px padding, no borders
- **Seamless Tab Integration**: Tab bar uses same background as island with no separation lines
- **Specialized Variants**: Pre-configured islands for panels, main content, and conversations
- **Resizable Layouts**: Container and splitter components for complex layouts
- **Theme-Aware**: Uses Fleet semantic colors for consistent theming

**Components:**
- `Island` - Basic container with Fleet specifications
- `IslandWithTabs` - Integrated tab support with seamless backgrounds
- `LeftPanelIsland` / `RightPanelIsland` / `BottomPanelIsland` - Panel-specific containers
- `MainContentIsland` - Primary content area container
- `ConversationIsland` - Chat and conversation interface container
- `IslandContainer` / `IslandSplitter` - Resizable layout system

**Usage:**
```tsx
import { 
  Island, IslandWithTabs, 
  LeftPanelIsland, MainContentIsland,
  IslandContainer, IslandSplitter 
} from "@/components/ui/island"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// Basic island
<Island>
  <Typography variant="default">Content with 6px padding</Typography>
</Island>

// Island with Fleet tabs (seamless integration)
<Island className="overflow-hidden" padding="none">
  <Tabs defaultValue="tab1">
    <div className="bg-card px-1.5 py-1">
      <TabsList className="h-auto bg-transparent gap-1 p-0">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
    </div>
    <div className="p-1.5">
      <TabsContent value="tab1">Content</TabsContent>
      <TabsContent value="tab2">More content</TabsContent>
    </div>
  </Tabs>
</Island>

// Specialized panel layout
<div className="flex gap-2">
  <LeftPanelIsland className="w-64">
    {/* File tree, navigation */}
  </LeftPanelIsland>
  <MainContentIsland className="flex-1">
    {/* Editor, main content */}
  </MainContentIsland>
  <RightPanelIsland className="w-64">
    {/* Inspector, properties */}
  </RightPanelIsland>
</div>

// Resizable layout
<IslandContainer direction="horizontal">
  <Island className="flex-1" />
  <IslandSplitter direction="horizontal" />
  <Island className="flex-1" />
</IslandContainer>
```

### MainToolbar
Complete Fleet main toolbar system with intelligent layout algorithm, context menus, and pixel-perfect Fleet design implementation. **Based on Fleet's MainToolbar.kt with exact layout algorithm and progressive collapse.**

**Features:**
- **Intelligent Layout**: Workspace centering with fallback to right-aligned when space is limited
- **Progressive Collapse**: Progress widget collapses from 360px to 32px when workspace needs space
- **Context Menus**: Interactive project name and branch name with Fleet-style context menus
- **Platform Support**: Specific spacing for macOS, Windows, Linux window controls
- **Component Reuse**: ToolbarButton uses existing Button component for consistency

**Components:**
- `MainToolbar` - Main container with intelligent layout algorithm
- `ToolbarButton` - Fleet-style toolbar buttons with proper 16px icon sizing
- `WorkspaceWidget` - Interactive project/branch with context menus
- `ProgressWidget` - Collapsible progress indicator
- `LeftToolbarSection` / `RightToolbarSection` - Toolbar sections

**Usage:**
```tsx
import { 
  MainToolbar, ToolbarButton, ToolbarSeparator,
  WorkspaceWidget, ProgressWidget,
  LeftToolbarSection, RightToolbarSection 
} from "@/components/ui/main-toolbar"
import { ContextMenu } from "@/components/ui/context-menu"

<MainToolbar
  leftButtons={
    <LeftToolbarSection>
      <ToolbarButton 
        icon="panel-left-open" 
        tooltip="Toggle left panel"
        onClick={() => setLeftPanelOpen(!leftPanelOpen)}
      />
      <ToolbarSeparator />
      <ToolbarButton icon="tools" tooltip="Tools" />
    </LeftToolbarSection>
  }
  workspace={
    <WorkspaceWidget 
      projectName="air-web-components"
      branchName="main"
      projectMenu={
        <ContextMenu
          items={projectMenuItems}
          trigger={<ToolbarButton>Project Name</ToolbarButton>}
        />
      }
      branchMenu={
        <ContextMenu
          items={branchMenuItems}
          trigger={<ToolbarButton>Branch Name</ToolbarButton>}
        />
      }
    />
  }
  rightButtons={
    <RightToolbarSection>
      <ProgressWidget
        visible={showProgress}
        progress={65}
        text="Building project..."
      />
      <ToolbarSeparator />
      <ToolbarButton icon="ai-chat" tooltip="Chat history" />
      <ToolbarButton icon="settings" tooltip="Settings" />
    </RightToolbarSection>
  }
/>
```

### Icons
Comprehensive icon system supporting both Fleet icons (200+ icons) and Lucide icons (5000+ icons) with unified API.

**Fleet Icons:**
- **200+ Fleet Design System Icons**: AI, development, file types, navigation
- **Theme-Aware**: Automatic light/dark theme switching
- **Fixed Colors**: Maintain original Fleet colors, don't inherit text color

**Lucide Icons:**
- **5000+ Modern Icons**: For rapid prototyping and general use
- **Customizable**: Inherit text color, custom stroke widths (default: 1px)
- **Type-Safe**: Full TypeScript support with auto-completion

**Sizes:** `xs` (12px), `sm` (16px), `md` (20px), `lg` (24px), `xl` (32px), `2xl` (40px)

**Usage:**
```tsx
import { Icon, FleetIcon, LucideIcon } from "@/components/ui/icon"

// Unified component
<Icon fleet="terminal" size="md" />
<Icon lucide="Terminal" size="md" />

// Fleet-specific (theme-aware, fixed colors)
<FleetIcon fleet="ai-chat" size="md" />
<FleetIcon fleet="file-types-typescript" size="lg" />

// Lucide-specific (customizable stroke width)
<LucideIcon lucide="Settings" size="md" strokeWidth={1} />
<LucideIcon lucide="Star" size="lg" strokeWidth={2} />
```

### Colors
Complete Fleet color palette with 200+ colors organized in 12 categories plus 80+ semantic tokens. **Fully theme-aware with CSS variables.**

**Color Categories:**
- **Neutral Colors**: 18 shades from White to Black
- **Blue Colors (Accent)**: 16 shades of Fleet's primary blue
- **Semantic Colors**: 80+ tokens for buttons, text, backgrounds, etc.
- **File Type Colors**: Specialized colors for syntax highlighting
- **AI Colors**: Specific colors for AI features and chat

**Theme System:**
- **JSON-Based**: Colors defined in `Light-Blue.json` and `Dark-Blue.json`
- **CSS Variables**: All semantic tokens available as CSS variables
- **Automatic Theme Switching**: Components adapt to light/dark mode
- **Tailwind Integration**: All Fleet colors available as Tailwind utilities

## 🎨 Design System

### Color System Architecture

```mermaid
graph TD;
  A[Light-Blue.json / Dark-Blue.json] --> B[fleet-semantic-colors.json]
  B --> C[CSS Variables Generation]
  C --> D[Tailwind Config]
  C --> E[Component Styles]
```

**Color Resolution:**
```tsx
// Semantic colors map to palette colors, then to hex values
"text.primary" → "Neutral_140" → "#E0E1E4"
"button.primary.background.default" → "Blue_90" → "#0870E4"
```

**Usage in Components:**
```tsx
// ✅ Preferred: Use Fleet CSS variables
className="bg-[var(--fleet-button-primary-background-default)] text-[var(--fleet-button-primary-text-default)]"

// ✅ Good: Use semantic color variables when available
className="bg-primary text-primary-foreground"

// ❌ Avoid: Generic colors that don't match Fleet
className="bg-blue-500" // Use Fleet Blue_90 (#0870E4) instead
```

### Typography System
Fleet-inspired typography with proper font weights, sizes, and line heights. **All components use consistent CSS utility classes for typography.**

```tsx
// Typography follows Fleet's type scale
"header-1-semibold": 24px / 32px / 600 weight
"default": 13px / 16px / 520 weight (light) / 480 weight (dark)
"code": 13px / 22px / JetBrains Mono

// Consistent CSS classes across all components
"text-default leading-default font-body-regular tracking-default"
```

## 🛠 Technologies

- **React 19** - Latest React with modern features
- **TypeScript** - Full type safety
- **Next.js 15** - App Router and modern features
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui** - Accessible component foundation
- **Radix UI** - Unstyled, accessible primitives
- **Class Variance Authority (CVA)** - Type-safe component variants
- **Lucide React** - Modern icon library

## 📁 Project Structure

```
fleet/air-web-components/
├── src/
│   ├── app/                        # Next.js App Router pages & examples site
│   │   ├── page.tsx               # Landing page
│   │   ├── layout.tsx             # Root layout with theme provider
│   │   ├── globals.css            # Global styles + CSS variable imports
│   │   └── examples/              # All examples and documentation pages
│   │       ├── colors/page.tsx    # Colors showcase (200+ colors, 80+ tokens)
│   │       ├── buttons/page.tsx   # Buttons showcase (all variants & features)
│   │       ├── text-inputs/page.tsx# TextInput showcase (all variants & features)
│   │       ├── typography/page.tsx# Typography showcase
│   │       ├── icons/page.tsx     # Icons showcase (Fleet + Lucide)
│   │       └── test-icons/page.tsx# Icon debugging page
│   ├── components/
│   │   ├── ui/                    # Core UI components
│   │   │   ├── typography.tsx     # Typography component
│   │   │   ├── button-shadcn.tsx  # Button system (all variants)
│   │   │   ├── input.tsx          # TextInput system (all variants)
│   │   │   ├── icon.tsx           # Unified icon system
│   │   │   └── index.ts           # Component exports (cleaned up duplicates)
│   │   ├── app-layout.tsx         # Shared layout with navigation
│   │   └── theme-provider.tsx     # Theme context provider
│   ├── lib/
│   │   ├── utils.ts               # cn() utility and helpers
│   │   ├── fleet-icons.ts         # Fleet icon registry (200+ icons)
│   │   ├── fleet-semantic-colors.json # Semantic color mappings
│   │   └── fleet-palette.json     # Color palette definitions
│   └── scripts/                   # Color system generation scripts
├── public/
│   └── icons/                     # Fleet icon assets
│       ├── light/                 # Light theme icons (flat structure)
│       └── dark/                  # Dark theme icons (flat structure)
├── docs/                          # Implementation documentation
│   ├── BUTTON_IMPLEMENTATION.md   # Button system details
│   ├── TEXT_INPUT_IMPLEMENTATION.md # TextInput system details
│   ├── COLOR_IMPLEMENTATION.md    # Color system architecture
│   ├── ICON_IMPLEMENTATION.md     # Icon system details
│   └── COMPONENT_CONVERSION_PIPELINE.md # Component development pipeline
├── fleet-semantic-vars-light.css  # Generated CSS variables (light theme)
├── fleet-semantic-vars-dark.css   # Generated CSS variables (dark theme)
├── components.json                # shadcn/ui configuration
├── tailwind.config.js             # Tailwind + Fleet color integration
└── package.json
```

## 🎯 Goals

1. **Mirror Fleet Air components** - Recreate Compose UI in React with exact color and typography matching
2. **Accessibility first** - Built on Radix UI primitives via shadcn/ui
3. **Type safety** - Full TypeScript support with strict mode
4. **Developer experience** - Easy to use, extend, and maintain
5. **Prototyping ready** - Drop into any React app for Fleet-like UI
6. **Theme-aware** - Automatic light/dark mode support
7. **Design fidelity** - Pixel-perfect Fleet design system implementation

## 🚧 Development

### Adding New Components

1. **Create component** in `src/components/ui/`
2. **Use Fleet CSS variables** for all colors (`var(--fleet-*)`)
3. **Use Typography component** for all text elements
4. **Follow Fleet patterns** for behavior and styling
5. **Export from index** files
6. **Create example page** in `src/app/examples/`
7. **Add documentation** in `docs/` if complex

### Color System Usage

```tsx
// ✅ Preferred: Use Fleet semantic CSS variables
className="bg-[var(--fleet-button-primary-background-default)] hover:bg-[var(--fleet-button-primary-background-hover)]"

// ✅ Good: Use resolved Fleet colors for complex scenarios
const fleetColor = "#0870E4" // Blue_90 from palette

// ❌ Avoid: Generic colors that don't match Fleet
className="bg-blue-500" // Use Fleet Blue_90 (#0870E4) instead
```

### Icon System Usage

```tsx
// ✅ Fleet icons for Fleet-specific UI
<Icon fleet="ai-chat" size="md" />
<Icon fleet="file-types-typescript" size="lg" />

// ✅ Lucide icons for general prototyping
<Icon lucide="Settings" size="md" strokeWidth={1} />
<Icon lucide="Star" size="lg" />

// ✅ Unified component for flexibility
<Icon fleet="run" size="md" />
<Icon lucide="Play" size="md" />
```

### Typography Usage

```tsx
// ✅ Preferred: Use Typography component with Fleet variants
<Typography variant="header-2-semibold">Component Title</Typography>
<Typography variant="default" className="text-[var(--fleet-text-secondary)]">
  Description text
</Typography>

// ✅ Good: Combine with Fleet semantic colors
<Typography variant="code" className="text-[var(--fleet-text-accent)]">
  Code snippet
</Typography>

// ❌ Avoid: Raw HTML elements without Typography wrapper
<h2>Title</h2> // Should use Typography with header variant
<p>Text</p>   // Should use Typography with body variant
```

## 📝 License

This project is for internal JetBrains use, mirroring Fleet's design system for web prototyping.

## 📚 Implementation Documentation

Detailed implementation guides for core systems are located in the [`docs/`](./docs/) folder:

- **[Island Implementation](./ISLAND_IMPLEMENTATION.md)**: Complete Fleet Island system with 6px padding, borderless design, seamless tab integration, and specialized panel variants based on SplitPanelView.kt.
- **[MainToolbar Implementation](./MAIN_TOOLBAR_IMPLEMENTATION.md)**: Complete Fleet main toolbar system with intelligent layout algorithm, context menus, and pixel-perfect Fleet design implementation based on MainToolbar.kt.
- **[Tabs Implementation](./TABS_IMPLEMENTATION.md)**: Complete Fleet tabs system with pixel-perfect specifications, all variants, states, and critical implementation learnings for Radix integration.
- **[Button Implementation](./BUTTON_IMPLEMENTATION.md)**: Complete Fleet button system with all variants, sizes, states, and advanced features. Theme-aware, accessible, and fully type-safe.
- **[TextInput Implementation](./TEXT_INPUT_IMPLEMENTATION.md)**: Comprehensive Fleet TextInput system with all variants, sizes, prefix/suffix support, multiline capability, and proper focus handling. Consistent typography integration.
- **[Color System Implementation](./COLOR_IMPLEMENTATION.md)**: Comprehensive, theme-aware Fleet color system with semantic tokens, palette, CSS variables, and Tailwind integration.
- **[Icon System Implementation](./ICON_IMPLEMENTATION.md)**: Unified Fleet + Lucide icon system with 200+ Fleet icons, 5000+ Lucide icons, theme support, and dynamic loading.
- **[Component Conversion Pipeline](./COMPONENT_CONVERSION_PIPELINE.md)**: Step-by-step guide for converting Fleet Air Compose components to React with consistent styling and behavior.

## 🔗 Key Pages

- **Landing Page**: `/` - Project overview and quick start
- **Colors**: `/examples/colors` - Complete color palette and semantic tokens explorer
- **Buttons**: `/examples/buttons` - All button variants, sizes, and features
- **Text Inputs**: `/examples/text-inputs` - All TextInput variants, sizes, and features
- **Tabs**: `/examples/tabs` - All tab variants, states, and Fleet Gallery implementations
- **Islands**: `/examples/islands` - Fleet container components with 6px padding and seamless tab integration
- **MainToolbar**: `/examples/main-toolbar` - Fleet main toolbar with intelligent layout and context menus
- **Typography**: `/examples/typography` - Typography system showcase
- **Icons**: `/examples/icons` - Fleet and Lucide icon galleries
- **Icon Debug**: `/examples/test-icons` - Icon debugging and theme testing

## 🎨 Design System Features

### Theme System
- **Automatic Detection**: Detects system theme and manual theme changes
- **CSS Variables**: All colors available as theme-aware CSS variables
- **Component Integration**: All components automatically adapt to theme changes
- **Debug Tools**: Theme debugging page for troubleshooting

### Color System
- **200+ Colors**: Complete Fleet palette in 12 categories
- **80+ Semantic Tokens**: Button, text, background, and UI element colors
- **JSON-Based**: Easy to update and maintain color definitions
- **Validation**: Scripts ensure color consistency and prevent missing references

### Icon System
- **Dual Source**: Fleet design system icons + Lucide prototyping icons
- **Performance**: Lazy loading, caching, and optimized SVG rendering
- **Accessibility**: Proper ARIA labels and screen reader support
- **Debug Tools**: Comprehensive debugging page for icon testing

### Typography System
- **Fleet Fidelity**: Matches Fleet's exact typography scale and weights
- **Semantic Variants**: Headers, body text, and code text with proper hierarchy
- **Accessibility**: Proper heading structure and readable line heights

**Recent Major Updates:**
- **Complete Fleet Tabs System**: Pixel-perfect tabs implementation with all Fleet Gallery variants, proper states, and Radix integration
- **Comprehensive TextInput System**: Complete Fleet TextInput component with all variants, prefix/suffix support, multiline capability, and proper focus handling
- **Typography Consistency**: Standardized all components (Button, TextInput, Tabs, Typography) to use consistent CSS utility classes: `text-default leading-default font-body-regular tracking-normal`
- **Critical Implementation Patterns**: Documented Radix + Fleet integration patterns, hover state specificity, and element spacing consistency
- **Clean Export Structure**: Removed duplicate exports from index.ts for better maintainability
- **Theme-Aware Color System**: Complete CSS variable-based color system with automatic theme switching
- **Unified Icon System**: Support for both Fleet design system icons and Lucide prototyping icons
- **Advanced Button System**: All Fleet button variants with loading states, icons, and advanced features
- **Comprehensive Documentation**: Implementation guides with critical learnings and common pitfalls in [`docs/`](./docs/) folder
