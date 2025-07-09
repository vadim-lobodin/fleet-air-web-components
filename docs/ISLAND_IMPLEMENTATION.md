# Island Implementation

Complete Fleet Island system with 6px padding, borderless design, proper Fleet background colors, and drag-and-drop tab functionality.

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

### DroppableTabIsland
Advanced tabbed island with drag-and-drop functionality for reorderable tabs.

```tsx
import { DroppableTabIsland } from "@/components/ui/island"
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"

// Define your tabs with content
const [tabs, setTabs] = useState<DraggableTab[]>([
  { id: "1", title: "App.tsx", icon: "file-types-typescript", content: <div>App content</div> },
  { id: "2", title: "styles.css", icon: "file-types-css", content: <div>CSS content</div> }
])

const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event
  if (over && active.id !== over.id) {
    setTabs((items) => {
      const oldIndex = items.findIndex(item => item.id === active.id)
      const newIndex = items.findIndex(item => item.id === over.id)
      return arrayMove(items, oldIndex, newIndex)
    })
  }
}

// Wrap in DndContext for drag-and-drop
<DndContext onDragEnd={handleDragEnd}>
  <DroppableTabIsland
    tabs={tabs}
    activeTab="1"
    onTabClick={(id) => setActiveTab(id)}
    onTabClose={(id) => setTabs(tabs => tabs.filter(tab => tab.id !== id))}
  />
</DndContext>
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
  ConversationIsland,
  FileTreeIsland,
  ChatIsland
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
- **Background**: `bg-[var(--fleet-island-background)]` (Fleet-specific island background)
- **Borders**: None (Fleet islands have no borders)
- **Typography**: Fleet-standard text colors (`text-foreground`, `text-muted-foreground`)

**Fleet Background Colors:**
- **Light Theme**: `--fleet-island-background: #FFFFFF` (pure white)
- **Dark Theme**: `--fleet-island-background: #18191B` (dark surface)
- **Semantic Usage**: All islands use `bg-[var(--fleet-island-background)]` for consistency

**Tab Integration:**
- **Seamless Background**: Tab bar uses same `bg-[var(--fleet-island-background)]` as island
- **No Separation**: No border between tab bar and content
- **Consistent Padding**: 6px padding for tab bar (`px-1.5 py-1`) and content (`p-1.5`)

### Typography Integration

All text elements use the Fleet typography system:

```tsx
// ✅ Correct: Typography component with Fleet variants
<Island>
  <Typography variant="default-semibold" className="mb-2">
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
// ✅ Island background uses Fleet-specific variable
className="bg-[var(--fleet-island-background)] text-foreground rounded-lg"

// ✅ Tab bar uses same background for seamless integration
<div className="bg-[var(--fleet-island-background)] px-1.5 py-1">
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

### DroppableTabIsland Props

```tsx
interface DroppableTabIslandProps extends IslandProps {
  tabs?: DraggableTab[]         // Array of tab objects
  activeTab?: string            // ID of currently active tab
  onTabClick?: (id: string) => void     // Tab click handler
  onTabClose?: (id: string) => void     // Tab close handler
}

interface DraggableTab {
  id: string
  title: string
  icon?: string                 // Fleet icon name
  content: React.ReactNode      // Tab content
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
      <Typography variant="default-semibold" className="mb-2">
        Basic Island
      </Typography>
      <Typography variant="default" className="text-muted-foreground">
        Content with 6px padding and proper Fleet background colors.
      </Typography>
    </Island>
  )
}
```

### Drag-and-Drop Tab Island

```tsx
import { Island, DroppableTabIsland } from "@/components/ui/island"
import { DndContext, DragEndEvent, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { Typography } from "@/components/ui/typography"

function TabIslandExample() {
  const [tabs, setTabs] = useState<DraggableTab[]>([
    { 
      id: "1", 
      title: "App.tsx", 
      icon: "file-types-typescript", 
      content: (
        <div className="p-4">
          <Typography variant="default-semibold">App.tsx</Typography>
          <Typography variant="default" className="text-muted-foreground">
            Main application component
          </Typography>
        </div>
      )
    },
    { 
      id: "2", 
      title: "styles.css", 
      icon: "file-types-css", 
      content: (
        <div className="p-4">
          <Typography variant="default-semibold">styles.css</Typography>
          <Typography variant="default" className="text-muted-foreground">
            Application styles
          </Typography>
        </div>
      )
    }
  ])

  const [activeTab, setActiveTab] = useState("1")

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setTabs((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id)
        const newIndex = items.findIndex(item => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className="h-64">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <DroppableTabIsland
          tabs={tabs}
          activeTab={activeTab}
          onTabClick={(id) => setActiveTab(id)}
          onTabClose={(id) => {
            setTabs(tabs => tabs.filter(tab => tab.id !== id))
          }}
          className="h-full"
        />
      </DndContext>
    </div>
  )
}
```

### Fleet Window Layout

```tsx
import { 
  Island,
  DroppableTabIsland,
  FileTreeIsland 
} from "@/components/ui/island"
import { DndContext } from "@dnd-kit/core"
import { Typography } from "@/components/ui/typography"

function FleetWindowExample() {
  return (
    <div className="h-screen flex gap-2 p-2">
      {/* Left Panel */}
      <div className="w-64 flex flex-col gap-2">
        <FileTreeIsland
          onFileClick={(file) => console.log('File clicked:', file.name)}
          onFolderToggle={(folder, isExpanded) => console.log('Folder toggled:', folder.name, isExpanded)}
          tabTitle="Files"
          className="flex-1"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-2">
        <DndContext onDragEnd={handleFileTabDragEnd}>
          <DroppableTabIsland
            tabs={fileTabs}
            activeTab={activeFileTab}
            onTabClick={setActiveFileTab}
            onTabClose={handleFileTabClose}
            className="flex-1"
          />
        </DndContext>
      </div>

      {/* Right Panel */}
      <div className="w-64 flex flex-col gap-2">
        <Island className="flex-1">
          <Typography variant="default-semibold" className="mb-2">
            Inspector
          </Typography>
          <Typography variant="default" className="text-muted-foreground">
            Properties and documentation
          </Typography>
        </Island>
      </div>
    </div>
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
        <div className="bg-[var(--fleet-island-background)] px-1.5 py-1">
          <TabsList className="h-auto bg-transparent gap-1 p-0">
            <TabsTrigger value="tab1" className="h-6">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" className="h-6">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3" className="h-6">Tab 3</TabsTrigger>
          </TabsList>
        </div>
        
        {/* Content - 6px padding */}
        <div className="p-1.5">
          <TabsContent value="tab1" className="mt-0">
            <Typography variant="default-semibold" className="mb-2">
              Tab 1 Content
            </Typography>
            <Typography variant="default" className="text-muted-foreground">
              Content with Fleet-standard 6px padding and proper background colors.
            </Typography>
          </TabsContent>
          <TabsContent value="tab2" className="mt-0">
            <Typography variant="default-semibold" className="mb-2">
              Tab 2 Content
            </Typography>
            <Typography variant="default" className="text-muted-foreground">
              Seamless background integration with Fleet colors.
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
            <Typography variant="default-semibold">
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
            <Typography variant="default-semibold">
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
          <Typography variant="default-semibold" className="mb-2">
            First Island
          </Typography>
          <Typography variant="small" className="text-muted-foreground">
            Resizable content area with proper Fleet background
          </Typography>
        </Island>
        
        <IslandSplitter direction="horizontal" />
        
        <Island className="flex-1 min-h-0">
          <Typography variant="default-semibold" className="mb-2">
            Second Island
          </Typography>
          <Typography variant="small" className="text-muted-foreground">
            Another resizable area with Fleet styling
          </Typography>
        </Island>
      </IslandContainer>
    </div>
  )
}
```

## Critical Implementation Details

### Fleet Design Compliance

**✅ Correct Approach:**
```tsx
// Borderless design with 8px corners and proper Fleet background
<Island className="bg-[var(--fleet-island-background)] text-foreground rounded-lg">

// Seamless tab integration with Fleet colors
<div className="bg-[var(--fleet-island-background)] px-1.5 py-1">
  <TabsList className="h-auto bg-transparent gap-1 p-0">
    {/* tabs */}
  </TabsList>
</div>
```

**❌ Previous Issues:**
```tsx
// Had borders (not Fleet-accurate)
<Island className="bg-card text-card-foreground rounded-lg border">

// Used generic card background instead of Fleet island background
<Island className="bg-card">

// Had separating line between tabs and content
<div className="bg-muted/30 border-b border-border">
```

### Fleet Background Colors

**✅ Fleet Standard:**
```tsx
// Use Fleet-specific island background
className="bg-[var(--fleet-island-background)]"

// CSS variables defined in globals.css
:root {
  --fleet-island-background: #FFFFFF;  /* Light theme */
}

[data-theme="dark"] {
  --fleet-island-background: #18191B;  /* Dark theme */
}
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
<div className="bg-[var(--fleet-island-background)] px-1.5 py-1">

// Content padding  
<div className="p-1.5">
```

### Typography Integration

**✅ All text uses Typography component:**
```tsx
<Typography variant="default-semibold">
  Island Title
</Typography>
<Typography variant="small" className="text-muted-foreground">
  Secondary text
</Typography>
```

### Drag-and-Drop Integration

**✅ DroppableTabIsland with @dnd-kit:**
```tsx
// Required setup
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"

// DraggableTab type
interface DraggableTab {
  id: string
  title: string
  icon?: string         // Fleet icon name
  content: React.ReactNode
}

// Usage pattern
<DndContext onDragEnd={handleDragEnd}>
  <DroppableTabIsland
    tabs={tabs}
    activeTab={activeTab}
    onTabClick={setActiveTab}
    onTabClose={handleTabClose}
  />
</DndContext>
```

## Latest Updates

### Recent Changes (Current Version)

1. **DroppableTabIsland Integration**: Moved from separate `draggable-tabs.tsx` to `island.tsx` for better organization
2. **Fleet Background Colors**: Updated to use `--fleet-island-background` instead of generic `bg-card`
3. **Proper Type Definitions**: All drag-and-drop types are now part of the main island component
4. **Enhanced Examples**: Updated examples page with comprehensive Fleet window layout demonstration
5. **Improved Documentation**: Complete coverage of all island variants and usage patterns

### Component Location

All island components are now located in:
- **Main File**: `src/components/ui/island.tsx`
- **Exports**: Available through `src/components/ui/index.ts`
- **Examples**: `src/app/examples/islands/page.tsx`

### Performance Considerations

#### Layout Optimization

- Islands use CSS Grid and Flexbox for efficient layouts
- Minimal DOM nesting for better rendering performance
- Fleet-specific CSS variables prevent style recalculation

#### Memory Efficiency

- Specialized island components share base implementation
- Consistent class patterns enable CSS optimization
- Drag-and-drop state management optimized for performance

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
    <div className="bg-[var(--fleet-island-background)] px-1.5 py-1">
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

### Drag-and-Drop Tab Pattern

```tsx
// Islands with draggable tabs
<DndContext onDragEnd={handleDragEnd}>
  <DroppableTabIsland
    tabs={tabs}
    activeTab={activeTab}
    onTabClick={setActiveTab}
    onTabClose={handleTabClose}
  />
</DndContext>
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
- `bg-[var(--fleet-island-background)]` for island background
- `text-foreground` for primary text color
- `text-muted-foreground` for secondary text
- Theme-aware semantic colors for consistency

### Fleet Typography

All text uses Fleet typography variants:
```tsx
<Typography variant="default" />         // Fleet Default (13px)
<Typography variant="small" />           // Fleet Small (11px)
<Typography variant="default-semibold" /> // Fleet semibold
```

### Fleet Icon System

All icons use the Fleet icon system:
```tsx
<Icon fleet="folder" size="sm" />              // Fleet folder icon
<Icon fleet="file-types-typescript" />         // Fleet file type icon
<Icon fleet="ai-chat" size="sm" />             // Fleet AI icon
```

This implementation provides a complete, Fleet-faithful Island system that can be used across web applications requiring Fleet-style content containers with proper spacing, borderless design, accurate background colors, and advanced drag-and-drop functionality for tabbed interfaces.