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

## Development Guidelines

### New Component Development
- When designing a new component, after adding an example page, add link to the example to the left menu

## Icon and Name Resources
- All proper icons and names can be found here `/Users/Vadim.Lobodin/IdeaProjects/ultimate/fleet/air-web-components/public/icons`