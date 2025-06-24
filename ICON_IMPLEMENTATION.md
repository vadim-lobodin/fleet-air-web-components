# Fleet Air Icon System Implementation

## Overview

The Fleet Air Web Components now include a comprehensive icon system that supports both Fleet icons (from the original Fleet design system) and Lucide icons (for rapid prototyping). This implementation provides a unified interface for using icons across your React applications.

## Features

- **Fleet Icons**: Complete set of 200+ icons from Fleet's design system
- **Lucide Icons**: 5000+ modern icons for prototyping and general use
- **Unified API**: Single component interface for both icon systems
- **Type Safety**: Full TypeScript support with auto-completion
- **Multiple Sizes**: Six size variants (xs, sm, md, lg, xl, 2xl)
- **Theme Support**: Automatic light/dark theme switching for Fleet icons
- **Customizable Stroke Width**: Lucide icons support custom stroke widths (default: 1px)
- **Performance**: Lazy loading and optimized SVG rendering
- **Debug Tools**: Comprehensive debugging page for testing icon behavior

## Icon Theming Rules

### Fleet Icons
- **Fixed Colors**: Fleet icons maintain their original colors and are NOT recolored
- **Theme Variants**: Automatically loads light/dark SVG variants based on current theme
- **Fallback**: Falls back to light variant if dark variant doesn't exist

### Lucide Icons
- **Inherit Color**: Use `currentColor` and inherit text color from parent element
- **CSS Styleable**: Can be styled with any CSS color properties
- **Default Stroke**: 1px stroke width for clean, thin lines (customizable)

## Components

### 1. Icon (Unified Component)

The main component that can handle both Fleet and Lucide icons:

```tsx
import { Icon } from "@/components/ui/icon"

// Fleet icon
<Icon fleet="terminal" size="md" />

// Lucide icon
<Icon lucide="Terminal" size="md" />
```

### 2. FleetIcon (Fleet-specific)

Direct access to Fleet icons:

```tsx
import { FleetIcon } from "@/components/ui/icon"

<FleetIcon fleet="run" size="sm" />
<FleetIcon fleet="ai/chat" size="md" />
<FleetIcon fleet="vcs/commit" size="lg" />
<FleetIcon fleet="file-types/typescript" size="md" />
```

### 3. LucideIcon (Lucide-specific)

Direct access to Lucide icons with stroke width control:

```tsx
import { LucideIcon } from "@/components/ui/icon"

<LucideIcon lucide="Home" size="sm" />
<LucideIcon lucide="Settings" size="md" />
<LucideIcon lucide="Star" size="lg" />

// Custom stroke widths
<LucideIcon lucide="Settings" strokeWidth={1} />   {/* 1px (default) */}
<LucideIcon lucide="Settings" strokeWidth={2} />   {/* 2px (thicker) */}
<LucideIcon lucide="Settings" strokeWidth={0.5} /> {/* 0.5px (ultra-thin) */}
```

## Icon Categories

### Fleet Icons (200+ icons)

#### Core UI Icons
- Navigation: `chevron-down`, `chevron-up`, `chevron-left`, `chevron-right`
- Actions: `close`, `add`, `delete`, `edit`, `search`
- Status: `success`, `warning`, `error`, `info`
- File operations: `folder`, `new-file`

#### AI Icons
- Chat: `ai/chat`, `ai/assistant`, `ai/mention`
- Files: `ai/file`, `ai/file-attachment`
- Actions: `ai/send`, `ai/like`, `ai/dislike`
- Status: `ai/file-status-accepted`, `ai/file-status-rejected`

#### Development Icons
- Execution: `run`, `stop`, `pause`, `debugger`
- Tools: `terminal`, `settings`, `configure`
- Version Control: `vcs/commit`, `vcs/branch`, `vcs/modified`, `vcs/added`

#### File Type Icons (50+ file types)
- Languages: `file-types/typescript`, `file-types/javascript`, `file-types/python`, `file-types/rust`
- Frameworks: `file-types/react`, `file-types/vue`, `file-types/svelte`
- Tools: `file-types/docker`, `file-types/gradle`, `file-types/webpack`

### Lucide Icons (50+ common icons)

Pre-selected set of the most commonly used Lucide icons for prototyping:
- Navigation: `Home`, `ChevronDown`, `ChevronUp`, `Menu`
- Actions: `Plus`, `Minus`, `X`, `Check`, `Edit`, `Trash2`
- Files: `File`, `Folder`, `Save`, `Download`, `Upload`
- Communication: `Mail`, `Phone`, `MessageCircle`, `Bell`
- Status: `AlertTriangle`, `CheckCircle`, `XCircle`, `Info`

## Icon Sizes

Six size variants available:

```tsx
<Icon fleet="run" size="xs" />   {/* 12x12px */}
<Icon fleet="run" size="sm" />   {/* 16x16px */}
<Icon fleet="run" size="md" />   {/* 20x20px - default */}
<Icon fleet="run" size="lg" />   {/* 24x24px */}
<Icon fleet="run" size="xl" />   {/* 32x32px */}
<Icon fleet="run" size="2xl" />  {/* 40x40px */}
```

## Stroke Width Control (Lucide Icons Only)

Lucide icons support customizable stroke widths for fine-tuning visual weight:

```tsx
// Default 1px stroke width (thin, clean lines)
<LucideIcon lucide="Settings" />
<LucideIcon lucide="Settings" strokeWidth={1} />

// Thicker strokes
<LucideIcon lucide="Settings" strokeWidth={2} />
<LucideIcon lucide="Settings" strokeWidth={3} />

// Ultra-thin strokes
<LucideIcon lucide="Settings" strokeWidth={0.5} />

// Works with unified Icon component
<Icon lucide="Settings" strokeWidth={1} />
```

## Usage Examples

### Basic Usage

```tsx
import { Icon, FleetIcon, LucideIcon } from "@/components/ui/icon"

function MyComponent() {
  return (
    <div className="flex items-center space-x-2">
      {/* Fleet icons */}
      <FleetIcon fleet="run" size="md" />
      <FleetIcon fleet="ai/chat" size="md" />
      
      {/* Lucide icons */}
      <LucideIcon lucide="Settings" size="md" />
      <LucideIcon lucide="Star" size="md" />
      
      {/* Unified component */}
      <Icon fleet="terminal" size="md" />
      <Icon lucide="Terminal" size="md" />
    </div>
  )
}
```

### With Button Components

```tsx
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

function ActionButtons() {
  return (
    <div className="flex space-x-2">
      <Button variant="primary">
        <Icon fleet="run" size="sm" />
        Run
      </Button>
      
      <Button variant="secondary">
        <Icon lucide="Settings" size="sm" strokeWidth={1} />
        Settings
      </Button>
    </div>
  )
}
```

### Stroke Width Customization

```tsx
import { LucideIcon } from "@/components/ui/icon"

function IconShowcase() {
  return (
    <div className="flex items-center space-x-4">
      {/* Ultra-thin for minimal UI */}
      <LucideIcon lucide="Search" strokeWidth={0.5} />
      
      {/* Default thin lines */}
      <LucideIcon lucide="Settings" strokeWidth={1} />
      
      {/* Standard weight */}
      <LucideIcon lucide="Home" strokeWidth={2} />
      
      {/* Bold emphasis */}
      <LucideIcon lucide="Star" strokeWidth={3} />
    </div>
  )
}
```

### Dynamic Icon Selection

```tsx
import { Icon } from "@/components/ui/icon"
import { CommonFleetIcons } from "@/lib/fleet-icons"

function StatusIcon({ status }: { status: 'success' | 'warning' | 'error' }) {
  const iconMap = {
    success: CommonFleetIcons.success,
    warning: CommonFleetIcons.warning,
    error: CommonFleetIcons.error,
  }
  
  return <Icon fleet={iconMap[status]} size="md" />
}
```

## Fleet Icon Registry

The Fleet icon system includes a comprehensive registry that maps icon keys to their file paths:

```tsx
import { 
  FleetIcons, 
  CommonFleetIcons, 
  getFleetIconPath, 
  getAllFleetIcons 
} from "@/lib/fleet-icons"

// Get all available Fleet icons
const allIcons = getAllFleetIcons()

// Get path for a specific icon
const iconPath = getFleetIconPath("ai.chat") // Returns "ai/chat"

// Use common icons
<Icon fleet={CommonFleetIcons.aiChat} />     // "ai/chat"
<Icon fleet={CommonFleetIcons.vcsCommit} />  // "vcs/commit"
```

## File Structure

```
src/
├── components/ui/
│   └── icon.tsx                    # Main icon components
├── lib/
│   └── fleet-icons.ts             # Fleet icon registry
└── app/
    ├── icons/
    │   └── page.tsx               # Icon showcase page
    └── test-icons/
        └── page.tsx               # Icon debugging page

public/
└── icons/
    ├── light/                     # Light theme Fleet icons
    │   ├── *.svg                  # Root level icons
    │   ├── ai/                    # AI category icons
    │   ├── vcs/                   # Version control icons
    │   ├── file-types/            # File type icons
    │   └── breakpoints/           # Debugging icons
    └── dark/                      # Dark theme Fleet icons
        └── [same structure]
```

## Implementation Details

### Fleet Icon Loading

Fleet icons are loaded dynamically from the public directory with automatic theme detection:

```typescript
// Automatic theme detection
const getCurrentTheme = () => {
  if (document.documentElement.classList.contains('dark')) return 'dark'
  if (document.documentElement.classList.contains('light')) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Loads appropriate theme variant
const theme = getCurrentTheme()
const response = await fetch(`/icons/${theme}/${fleet}.svg`)

// Falls back to light theme if dark variant doesn't exist
if (!response.ok && theme === 'dark') {
  response = await fetch(`/icons/light/${fleet}.svg`)
}
```

### Theme Support

Fleet icons now include full automatic theme switching:

- **Automatic Detection**: Detects current theme from DOM classes and system preferences
- **Dynamic Switching**: Icons reload when theme changes via theme provider or system
- **Fallback Handling**: Falls back to light theme if dark variant doesn't exist
- **Performance**: Uses MutationObserver for efficient theme change detection

### Error Handling

Both components include comprehensive error handling:

- Loading states with skeleton placeholders
- Error states with fallback indicators
- Console warnings for missing icons
- TypeScript validation for icon names

## Performance Considerations

- **Lazy Loading**: Icons are loaded on-demand when components mount
- **Caching**: Browser automatically caches SVG files
- **Bundle Size**: Only Lucide icons used in code are included in bundle
- **SVG Optimization**: Fleet icons are pre-optimized SVG files

## Browser Support

- Modern browsers with ES2020+ support
- SVG support (all modern browsers)
- Fetch API support (all modern browsers)

## Testing and Debugging

### Icon Debug Page

Access the comprehensive debugging page at `/test-icons`:

- **Theme State Display**: Shows current theme provider state and resolved theme
- **Live Theme Switching**: Test icons with real-time theme changes
- **Stroke Width Examples**: Visual comparison of different stroke widths
- **Error Debugging**: Console logging for troubleshooting icon loading issues

### Available Test Pages

1. **`/icons`**: Main icon showcase with searchable icon galleries
2. **`/test-icons`**: Comprehensive debugging page with theme and stroke width testing

## Future Enhancements

1. ✅ **Automatic Theme Detection**: ~~Load appropriate theme based on current theme~~ (Completed)
2. **Icon Preloading**: Preload commonly used icons
3. **Custom Icon Support**: Allow registration of custom SVG icons
4. **Icon Search**: Advanced search and filtering capabilities
5. **Bundle Optimization**: Tree-shake unused Fleet icons
6. **Icon Animation**: Support for animated icon states
7. **Accessibility**: Enhanced ARIA labels and screen reader support

## Migration Guide

### From Lucide React

```tsx
// Before
import { Home, Settings, Star } from "lucide-react"
<Home size={20} />
<Settings size={20} strokeWidth={2} />

// After
import { LucideIcon } from "@/components/ui/icon"
<LucideIcon lucide="Home" size="md" />
<LucideIcon lucide="Settings" size="md" strokeWidth={1} /> {/* Default is now 1px */}
```

### Adding New Fleet Icons

1. Add SVG file to `public/icons/light/` and `public/icons/dark/`
2. Update `FleetIcons` registry in `src/lib/fleet-icons.ts`
3. Icon becomes available as `<FleetIcon fleet="new-icon" />`

## Troubleshooting

### Icon Not Loading

1. Check if icon exists in `public/icons/light/` (and `public/icons/dark/` for dark theme)
2. Verify icon path in Fleet registry
3. Check browser console for 404 errors and debug messages
4. Ensure SVG file is valid
5. Use `/test-icons` page to debug theme detection issues

### Theme Issues

1. Verify theme provider is properly configured
2. Check document classes using the debug page (`/test-icons`)
3. Ensure both light and dark variants exist for Fleet icons
4. Check browser console for theme change debug messages

### TypeScript Errors

1. Verify Lucide icon name exists in lucide-react
2. Check Fleet icon path in registry
3. Ensure correct import statements
4. Verify `strokeWidth` prop is number or string

### Styling Issues

1. Use `className` prop for custom styling
2. Icons inherit text color by default (Lucide only)
3. Use size prop instead of manual width/height
4. Use `strokeWidth` prop for Lucide icon thickness
5. Fleet icons maintain their original colors and don't inherit text color 

## Fleet Color System Integration (2024)

- The icon system is now fully theme-aware and integrates with the Fleet color system.
- Icon backgrounds and color highlights can use Fleet CSS variables (e.g., `bg-[var(--fleet-button-primary-background-default)]`).
- This ensures icons and buttons are visually consistent and theme-adaptive.
- For custom icon backgrounds or color accents, use the same Fleet semantic tokens as for buttons.
- See `COLOR_IMPLEMENTATION.md` for the color system details. 