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

### Typography
Complete Fleet typography system with 20+ variants covering headers, body text, and code text.

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
Fleet-inspired button component with all Fleet button variants and proper sizing.

**Variants:**
- `primary` - Fleet Blue (#0870E4) for primary actions
- `secondary` - Neutral with border for secondary actions  
- `dangerous` - Fleet Red (#D73251) for destructive actions
- `positive` - Fleet Green (#14835E) for positive actions
- `warning` - Fleet Yellow (#9F680C) for warning actions
- `ghost` - Transparent with hover for subtle actions
- `link` - Text link styling

**Sizes:**
- `sm` - 20px height (Fleet small button)
- `default` - 24px height (Fleet default button)
- `lg` - 28px height (Fleet large button)
- `icon` - Square icon-only button

**Usage:**
```tsx
import { Button } from "@/components/ui/button"

// Basic usage
<Button variant="primary">Save Changes</Button>
<Button variant="secondary" size="sm">Cancel</Button>
<Button variant="dangerous" disabled>Delete</Button>

// With click handler
<Button 
  variant="primary" 
  onClick={() => handleSave()}
>
  Save Changes
</Button>

// As child component (using asChild prop)
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

### Colors
Complete Fleet color palette with 200+ colors organized in 12 categories plus 80+ semantic tokens.

**Color Categories:**
- **Neutral Colors**: 18 shades from White to Black
- **Blue Colors (Accent)**: 16 shades of Fleet's primary blue
- **Semantic Colors**: 80+ tokens for buttons, text, backgrounds, etc.

## 🎨 Design System

### Color System
The color system is based on Fleet's complete palette:

```tsx
// Semantic colors map to palette colors, then to hex values
"text.primary" → "Neutral_140" → "#E0E1E4"
"button.primary.background.default" → "Blue_90" → "#0870E4"
```

### Typography System
Fleet-inspired typography with proper font weights, sizes, and line heights:

```tsx
// Typography follows Fleet's type scale
"header-1-semibold": 24px / 32px / 600 weight
"default": 13px / 20px / 400 weight  
"code": 12px / 16px / JetBrains Mono
```

## 🛠 Technologies

- **React 19** - Latest React with modern features
- **TypeScript** - Full type safety
- **Next.js 15** - App Router and modern features
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui** - Accessible component foundation
- **Radix UI** - Unstyled, accessible primitives
- **Class Variance Authority (CVA)** - Type-safe component variants

## 📁 Project Structure

```
fleet/air-web-components/
├── src/
│   ├── app/                        # Next.js App Router pages & examples site
│   │   ├── page.tsx               # Landing page
│   │   ├── layout.tsx             # Root layout
│   │   ├── globals.css            # Global styles
│   │   └── examples/              # All examples and documentation pages
│   │       ├── colors/page.tsx    # Colors showcase
│   │       ├── buttons/page.tsx   # Buttons showcase
│   │       ├── typography/page.tsx# Typography showcase
│   │       ├── icons/page.tsx     # Icons showcase
│   │       └── ...                # More examples
│   ├── components/
│   │   ├── ui/                    # Core UI components
│   │   │   ├── typography.tsx     # Typography component
│   │   │   ├── button-shadcn.tsx  # Button component
│   │   │   ├── icon.tsx           # Icon component
│   │   │   └── index.ts           # Component exports
│   │   ├── app-layout.tsx         # Shared layout
│   │   └── theme-provider.tsx     # Theme context
│   └── lib/
│       └── utils.ts               # Utility functions
├── components.json                # shadcn/ui configuration
├── tailwind.config.js             # Tailwind configuration
└── package.json
```

## 🎯 Goals

1. **Mirror Fleet Air components** - Recreate Compose UI in React with exact color and typography matching
2. **Accessibility first** - Built on Radix UI primitives via shadcn/ui
3. **Type safety** - Full TypeScript support with strict mode
4. **Developer experience** - Easy to use, extend, and maintain
5. **Prototyping ready** - Drop into any React app for Fleet-like UI

## 🚧 Development

### Adding New Components

1. **Create component** in `src/components/ui/`
2. **Use Fleet colors** from the color system
3. **Use Typography component** for text elements
4. **Follow Fleet patterns** for behavior and styling
5. **Export from index** files
6. **Create example page** in `src/app/examples/`

### Color Usage

```tsx
// ✅ Preferred: Use Fleet color hex values
className="bg-[#0870E4] text-white hover:bg-[#1868CB]"

// ✅ Good: Use semantic color variables when available
className="bg-primary text-primary-foreground"

// ❌ Avoid: Generic colors that don't match Fleet
className="bg-blue-500" // Use Fleet Blue_90 (#0870E4) instead
```

## 📝 License

This project is for internal JetBrains use, mirroring Fleet's design system for web prototyping.

## 📚 Implementation Documentation

Detailed implementation guides for core systems are now located in the [`docs/`](./docs/) folder:

- [Button Implementation](./docs/BUTTON_IMPLEMENTATION.md): All Fleet button variants, sizes, states, and advanced features. Theme-aware, accessible, and fully type-safe.
- [Color System Implementation](./docs/COLOR_IMPLEMENTATION.md): Complete, theme-aware Fleet color system with semantic tokens, palette, and Tailwind integration.
- [Icon System Implementation](./docs/ICON_IMPLEMENTATION.md): Unified Fleet + Lucide icon system, theme support, dynamic loading, and usage patterns.

**Recent Changes:**
- All implementation documentation moved to [`docs/`](./docs/)
- Theme-aware color system with semantic tokens and palette ([details](./docs/COLOR_IMPLEMENTATION.md))
- Unified icon system supporting Fleet and Lucide icons ([details](./docs/ICON_IMPLEMENTATION.md))
- Fleet-style button system with all variants and advanced features ([details](./docs/BUTTON_IMPLEMENTATION.md))
