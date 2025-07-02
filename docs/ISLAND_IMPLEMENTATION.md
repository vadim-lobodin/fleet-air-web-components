# Island Implementation

Complete Fleet Island system with 6px padding, borderless design, and seamless tab integration.

## Overview

The Island component is a fundamental container component in Fleet's design system. Islands provide visual grouping and content organization with consistent spacing, rounded corners, and theme-aware backgrounds. Based on Fleet's Kotlin implementation in `SplitPanelView.kt` and `AirWindowView.kt`.

## Core Components

### Island
The main container component with Fleet-standard specifications.

```tsx
import { Island } from "@/components/ui/island"

<Island>
  <Typography variant="default">Content goes here</Typography>
</Island>
```

### IslandWithTabs
Island container with integrated tab support for tabbed content areas.

```tsx
import { IslandWithTabs } from "@/components/ui/island"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

<IslandWithTabs
  tabs={
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
      </TabsList>
    </Tabs>
  }
  content={
    <Tabs defaultValue="overview">
      <TabsContent value="overview">Overview content</TabsContent>
      <TabsContent value="details">Details content</TabsContent>
    </Tabs>
  }
/>
```

### Specialized Islands
Pre-configured islands for common Fleet layout patterns.

```tsx
import { 
  LeftPanelIsland, 
  RightPanelIsland, 
  BottomPanelIsland, 
  MainContentIsland,
  ConversationIsland 
} from "@/components/ui/island"

<LeftPanelIsland className="h-full">
  {/* File tree, project explorer */}
</LeftPanelIsland>

<MainContentIsland className="flex-1">
  {/* Editor, main content */}
</MainContentIsland>

<RightPanelIsland className="h-full">
  {/* Inspector, documentation */}
</RightPanelIsland>
```

## Design System Adherence

### Fleet Specifications

The Island implementation follows Fleet's exact design specifications:

**Visual Design:**
- **Corner Radius**: 8px (`rounded-lg`)
- **Padding**: 6px (`p-1.5`) for content areas
- **Background**: `bg-card` (theme-aware card background)
- **Borders**: None (Fleet islands have no borders)
- **Typography**: Fleet-standard text colors (`text-card-foreground`)

**Tab Integration:**
- **Seamless Background**: Tab bar uses same `bg-card` as island
- **No Separation**: No border between tab bar and content
- **Consistent Padding**: 6px padding for tab bar (`px-1.5 py-1`) and content (`p-1.5`)

### Typography Integration

All text elements use the Fleet typography system:

```tsx
// ✅ Correct: Typography component with Fleet variants
<Island>
  <Typography variant="default" className="font-semibold mb-2">
    Island Title
  </Typography>
  <Typography variant="default" className="text-muted-foreground">
    Island description text
  </Typography>
</Island>
```

### Color System Integration

Uses Fleet semantic CSS variables for theme-aware styling:

```tsx
// ✅ Island background uses card semantic color
className="bg-card text-card-foreground rounded-lg"

// ✅ Tab bar uses same background for seamless integration
<div className="bg-card px-1.5 py-1">
```

## Component Architecture

### Island Props

```tsx
interface IslandProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "panel" | "conversation" | "main"
  padding?: "none" | "default"  // none=p-0, default=p-1.5 (6px)
  shadow?: "none" | "sm" | "default" | "lg"
  asChild?: boolean
}
```

### IslandWithTabs Props

```tsx
interface IslandWithTabsProps extends IslandProps {
  tabs?: React.ReactNode     // Tab list component
  content?: React.ReactNode  // Tab content component
}
```

### Island Container Props

```tsx
interface IslandContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical"
  gap?: number  // Gap between islands in pixels (default 8px)
}
```

## Usage Examples

### Basic Island

```tsx
import { Island } from "@/components/ui/island"
import { Typography } from "@/components/ui/typography"

function BasicExample() {
  return (
    <Island>
      <Typography variant="default" className="font-semibold mb-2">
        Basic Island
      </Typography>
      <Typography variant="default" className="text-muted-foreground">
        Content with 6px padding and no borders.
      </Typography>
    </Island>
  )
}
```

### Island with Fleet Tabs

```tsx
import { Island } from "@/components/ui/island"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Typography } from "@/components/ui/typography"

function TabIslandExample() {
  return (
    <Island className="overflow-hidden" padding="none">
      <Tabs defaultValue="tab1" className="w-full">
        {/* Tab Bar - same background as island */}
        <div className="bg-card px-1.5 py-1">
          <TabsList className="h-auto bg-transparent gap-1 p-0">
            <TabsTrigger value="tab1" className="h-6">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" className="h-6">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3" className="h-6">Tab 3</TabsTrigger>
          </TabsList>
        </div>
        
        {/* Content - 6px padding */}
        <div className="p-1.5">
          <TabsContent value="tab1" className="mt-0">
            <Typography variant="default" className="font-semibold mb-2">
              Tab 1 Content
            </Typography>
            <Typography variant="default" className="text-muted-foreground">
              Content with Fleet-standard 6px padding.
            </Typography>
          </TabsContent>
          <TabsContent value="tab2" className="mt-0">
            <Typography variant="default" className="font-semibold mb-2">
              Tab 2 Content
            </Typography>
            <Typography variant="default" className="text-muted-foreground">
              Seamless background integration.
            </Typography>
          </TabsContent>
        </div>
      </Tabs>
    </Island>
  )
}
```

### Specialized Panel Islands

```tsx
import { 
  LeftPanelIsland, 
  MainContentIsland, 
  RightPanelIsland 
} from "@/components/ui/island"
import { Icon } from "@/components/ui/icon"
import { Typography } from "@/components/ui/typography"

function PanelLayoutExample() {
  return (
    <div className="flex h-screen gap-2 p-2">
      {/* Left Panel */}
      <LeftPanelIsland className="w-64">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <Icon fleet="folder" size="sm" />
            <Typography variant="default" className="font-semibold">
              File Explorer
            </Typography>
          </div>
          <div className="flex items-center gap-2 p-2 hover:bg-muted rounded cursor-pointer">
            <Icon fleet="file-types-typescript" size="sm" />
            <Typography variant="small">component.tsx</Typography>
          </div>
        </div>
      </LeftPanelIsland>
      
      {/* Main Content */}
      <MainContentIsland className="flex-1">
        <div className="h-full flex items-center justify-center">
          <Typography variant="default" className="text-muted-foreground">
            Main editor area
          </Typography>
        </div>
      </MainContentIsland>
      
      {/* Right Panel */}
      <RightPanelIsland className="w-64">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Icon fleet="debugger" size="sm" />
            <Typography variant="default" className="font-semibold">
              Inspector
            </Typography>
          </div>
          <div className="space-y-3">
            <div>
              <Typography variant="small" className="font-medium">
                Properties
              </Typography>
              <Typography variant="small" className="text-muted-foreground">
                Type: Component
              </Typography>
            </div>
          </div>
        </div>
      </RightPanelIsland>
    </div>
  )
}
```

### Island Container with Splitters

```tsx
import { Island, IslandContainer, IslandSplitter } from "@/components/ui/island"
import { Typography } from "@/components/ui/typography"

function SplitterExample() {
  return (
    <div className="h-64">
      <IslandContainer direction="horizontal" className="h-full">
        <Island className="flex-1 min-h-0">
          <Typography variant="default" className="font-semibold mb-2">
            First Island
          </Typography>
          <Typography variant="small" className="text-muted-foreground">
            Resizable content area
          </Typography>
        </Island>
        
        <IslandSplitter direction="horizontal" />
        
        <Island className="flex-1 min-h-0">
          <Typography variant="default" className="font-semibold mb-2">
            Second Island
          </Typography>
          <Typography variant="small" className="text-muted-foreground">
            Another resizable area
          </Typography>
        </Island>
      </IslandContainer>
    </div>
  )
}
```

### Conversation Island

```tsx
import { ConversationIsland } from "@/components/ui/island"
import { Icon } from "@/components/ui/icon"
import { Typography } from "@/components/ui/typography"
import { Button } from "@/components/ui/button-shadcn"

function ConversationExample() {
  return (
    <ConversationIsland className="h-80">
      <div className="h-full flex flex-col">
        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-auto">
          <div className="flex gap-3">
            <Icon fleet="user" size="sm" className="mt-1" />
            <div>
              <Typography variant="small" className="font-semibold mb-1">
                You
              </Typography>
              <Typography variant="small">
                How do I use island components?
              </Typography>
            </div>
          </div>
          <div className="flex gap-3">
            <Icon fleet="ai-chat" size="sm" className="mt-1" />
            <div>
              <Typography variant="small" className="font-semibold mb-1">
                Assistant
              </Typography>
              <Typography variant="small">
                Islands provide consistent spacing and visual grouping with 6px padding and no borders.
              </Typography>
            </div>
          </div>
        </div>
        
        {/* Input */}
        <div className="border-t border-border pt-4 mt-4">
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Ask a question..."
              className="flex-1 px-3 py-2 bg-background border border-input rounded text-sm"
            />
            <Button size="sm">
              <Icon fleet="ai-send" size="sm" />
            </Button>
          </div>
        </div>
      </div>
    </ConversationIsland>
  )
}
```

## Critical Implementation Details

### Fleet Design Compliance

**✅ Correct Approach:**
```tsx
// Borderless design with 8px corners
<Island className="bg-card text-card-foreground rounded-lg">

// Seamless tab integration
<div className="bg-card px-1.5 py-1">
  <TabsList className="h-auto bg-transparent gap-1 p-0">
    {/* tabs */}
  </TabsList>
</div>
```

**❌ Previous Issues:**
```tsx
// Had borders (not Fleet-accurate)
<Island className="bg-card text-card-foreground rounded-lg border">

// Had separating line between tabs and content
<div className="bg-muted/30 border-b border-border">
```

### Padding Consistency

**✅ Fleet Standard:**
```tsx
// 6px padding throughout
padding: {
  none: "p-0",
  default: "p-1.5", // 6px Fleet padding
}

// Tab bar padding
<div className="bg-card px-1.5 py-1">

// Content padding  
<div className="p-1.5">
```

### Typography Integration

**✅ All text uses Typography component:**
```tsx
<Typography variant="default" className="font-semibold">
  Island Title
</Typography>
<Typography variant="small" className="text-muted-foreground">
  Secondary text
</Typography>
```

## Variant Usage Guide

### Default Variant
General-purpose islands for most content:
```tsx
<Island>
  {/* General content */}
</Island>
```

### Panel Variant
For side panels and dedicated sections:
```tsx
<Island variant="panel">
  {/* Panel content like file trees, inspectors */}
</Island>
```

### Main Variant
For primary content areas:
```tsx
<Island variant="main" shadow="lg">
  {/* Main editor or content area */}
</Island>
```

### Conversation Variant
For chat and conversation interfaces:
```tsx
<Island variant="conversation">
  {/* Chat messages and input */}
</Island>
```

## Performance Considerations

### Layout Optimization

- Islands use CSS Grid and Flexbox for efficient layouts
- Minimal DOM nesting for better rendering performance
- Theme-aware CSS variables prevent style recalculation

### Memory Efficiency

- Specialized island components share base implementation
- Consistent class patterns enable CSS optimization
- No JavaScript state unless specifically needed

## Common Patterns

### Island Layout Pattern

```tsx
// Common Fleet layout with islands
<div className="flex h-screen gap-2 p-2">
  <LeftPanelIsland className="w-64" />
  <div className="flex-1 flex flex-col gap-2">
    <MainContentIsland className="flex-1" />
    <BottomPanelIsland className="h-32" />
  </div>
  <RightPanelIsland className="w-64" />
</div>
```

### Tabbed Content Pattern

```tsx
// Islands with integrated tabs
<Island padding="none" className="overflow-hidden">
  <Tabs defaultValue="overview">
    <div className="bg-card px-1.5 py-1">
      <TabsList className="h-auto bg-transparent gap-1 p-0">
        {/* tabs */}
      </TabsList>
    </div>
    <div className="p-1.5">
      {/* content */}
    </div>
  </Tabs>
</Island>
```

### Resizable Layout Pattern

```tsx
// Islands with splitters for resizable layouts
<IslandContainer direction="horizontal">
  <Island className="flex-1" />
  <IslandSplitter direction="horizontal" />
  <Island className="flex-1" />
</IslandContainer>
```

## Integration with Fleet Design System

### Fleet CSS Variables

Uses semantic Fleet colors throughout:
- `bg-card` for island background
- `text-card-foreground` for text color
- Theme-aware semantic colors for consistency

### Fleet Typography

All text uses Fleet typography variants:
```tsx
<Typography variant="default" />     // Fleet Default (13px)
<Typography variant="small" />       // Fleet Small (11px)
<Typography variant="default" className="font-semibold" /> // Fleet semibold
```

### Fleet Icon System

All icons use the Fleet icon system:
```tsx
<Icon fleet="folder" size="sm" />        // Fleet folder icon
<Icon fleet="file-types-typescript" />   // Fleet file type icon
<Icon fleet="ai-chat" size="sm" />       // Fleet AI icon
```

This implementation provides a complete, Fleet-faithful Island system that can be used across web applications requiring Fleet-style content containers with proper spacing, borderless design, and seamless tab integration.