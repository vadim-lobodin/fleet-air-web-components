# MainToolbar Implementation

Complete Fleet MainToolbar system with intelligent layout algorithm, context menus, and pixel-perfect Fleet design implementation.

## Overview

The MainToolbar component is a sophisticated toolbar implementation that mirrors Fleet's main application toolbar with intelligent workspace centering, progressive collapse, and interactive context menus. Based directly on Fleet's `MainToolbar.kt` implementation.

## Core Components

### MainToolbar
The main container component that implements Fleet's intelligent layout algorithm.

```tsx
import { MainToolbar, LeftToolbarSection, RightToolbarSection, WorkspaceWidget, ProgressWidget } from "@/components/ui/main-toolbar"

<MainToolbar
  leftButtons={<LeftToolbarSection>...</LeftToolbarSection>}
  workspace={<WorkspaceWidget projectName="Fleet" branchName="main" />}
  rightButtons={<RightToolbarSection>...</RightToolbarSection>}
/>
```

### ToolbarButton
Fleet-style toolbar buttons that use the existing Button component with proper sizing.

```tsx
<ToolbarButton 
  icon="panel-left-open" 
  tooltip="Toggle left panel"
  onClick={() => setLeftPanelOpen(!leftPanelOpen)}
/>
```

### WorkspaceWidget
Interactive project name and branch name with context menus.

```tsx
<WorkspaceWidget 
  projectName="air-web-components"
  branchName="main"
  projectMenu={<ContextMenu items={projectMenuItems} trigger={<ToolbarButton>...</ToolbarButton>} />}
  branchMenu={<ContextMenu items={branchMenuItems} trigger={<ToolbarButton>...</ToolbarButton>} />}
/>
```

### ProgressWidget
Collapsible progress indicator that automatically collapses when space is limited.

```tsx
<ProgressWidget
  visible={true}
  progress={65}
  text="Building project..."
  collapsed={false} // Automatically managed by MainToolbar
/>
```

## Design System Adherence

### Fleet MainToolbar.kt Implementation Fidelity

The React implementation precisely matches Fleet's Compose implementation:

**Original Fleet Implementation:**
- `toolbarWithCenteredWorkspace()` algorithm
- `HeaderActionIconButton` with `Box(height=36dp, requiredWidthIn(min=32dp))`
- `ActionLargeGhostButton` with 16px icons
- `WindowHeaderHeight` constant (36dp)
- Progress collapse: 32dp collapsed, 360dp max, 150dp minimum width

**React Implementation:**
- `MainToolbar` component with identical layout algorithm
- `ToolbarButton` using existing Button component with `size="toolbar"`
- `h-6 w-6 rounded-[4px] p-1` (24px container, 16px icons)
- `h-9` (36px) consistent height
- Identical progress collapse dimensions in pixels

### Typography Integration

All text elements use the consistent typography system:

```tsx
// ✅ Correct: Consistent typography utilities
<Typography variant="default-semibold" className="truncate">
  {projectName}
</Typography>

// ✅ Button component handles typography automatically
<ToolbarButton tooltip="Toggle panel">
  {children}
</ToolbarButton>
```

### Color System Integration

Uses Fleet semantic CSS variables for theme-aware styling:

```tsx
// ✅ MainToolbar background
className="flex items-center w-full bg-background"

// ✅ ToolbarButton uses Button component which handles Fleet colors
<Button variant="ghost" size="toolbar" />

// ✅ No custom background for active state (Fleet-style)
// Removed: active && "bg-muted"
```

## Layout Algorithm

### Intelligent Workspace Centering

The MainToolbar implements Fleet's exact layout algorithm:

1. **Calculate Available Space**: Container width minus left and right sections
2. **Determine Progress Collapse**: If workspace would overlap with progress area
3. **Position Workspace**: Try to center, fall back to right-aligned when space is limited
4. **Position Progress**: Always right-aligned, collapses to 32px when needed

```tsx
// Fleet's intelligent layout algorithm (converted from Kotlin)
const workspaceIdealCenter = toolbarWidth / 2
const progressCollapsed = workspaceIdealEnd > toolbarWidth - rightWidth - progressMinWidth
const workspaceX = (toolbarWidth - rightWidth - progressWidth < whereWorkspaceEndShouldBe)
  ? whereWorkspaceStartShouldBeWhenNotEnoughSpace
  : Math.max(leftWidth, whereWorkspaceStartShouldBeDefault)
```

### Progressive Collapse

**Progress Widget Behavior:**
- **Default**: 360px maximum width with full text and progress bar
- **Collapsed**: 32px width with minimal progress indicator only
- **Automatic**: Collapses when workspace would overlap

**Workspace Behavior:**
- **Centered**: When sufficient space available
- **Right-aligned**: When space is limited, pushes against progress widget

## Context Menu Integration

### Fleet-Style Context Menus

The workspace project name and branch name are interactive buttons that show Fleet-style context menus:

```tsx
// Project context menu
const projectMenuItems = [
  {
    type: 'action',
    name: 'Open...',
    icon: 'folder',
    shortcutText: '⌘O',
    callback: () => console.log('Open project')
  },
  {
    type: 'action',
    name: 'Clone from Git...',
    icon: 'vcs-git',
    callback: () => console.log('Clone from Git')
  },
  { type: 'separator' },
  {
    type: 'action',
    name: 'Connect To',
    rightIcon: 'chevron-right',
    callback: () => console.log('Connect To')
  }
]

// Branch context menu
const branchMenuItems = [
  {
    type: 'action',
    name: 'Switch Branch...',
    icon: 'vcs-branch',
    callback: () => console.log('Switch branch')
  },
  {
    type: 'action',
    name: 'New Branch...',
    icon: 'add',
    callback: () => console.log('New branch')
  }
]
```

### Context Menu Structure

Uses the Fleet ContextMenu component with proper action items:

```tsx
<ContextMenu
  items={menuItems}
  trigger={
    <ToolbarButton
      tooltip="Project actions"
      className="h-auto w-auto px-1 py-0.5 min-w-0"
    >
      <Typography variant="default-semibold" className="truncate">
        {projectName}
      </Typography>
    </ToolbarButton>
  }
/>
```

## Component Architecture

### MainToolbar Props

```tsx
interface MainToolbarProps {
  leftButtons?: React.ReactNode    // Left toolbar section
  workspace?: React.ReactNode      // Workspace widget
  progress?: React.ReactNode       // Progress widget  
  rightButtons?: React.ReactNode   // Right toolbar section
  platform?: "default" | "mac" | "windows" | "linux"
  focused?: boolean
}
```

### ToolbarButton Props

```tsx
interface ToolbarButtonProps extends React.ComponentProps<typeof Button> {
  icon?: string        // Fleet icon name
  tooltip?: string     // Tooltip text
  active?: boolean     // Active state (removed background styling)
}
```

### WorkspaceWidget Props

```tsx
interface WorkspaceWidgetProps {
  projectName?: string
  branchName?: string
  className?: string
  projectMenu?: React.ReactNode    // Context menu for project name
  branchMenu?: React.ReactNode     // Context menu for branch name
}
```

### ProgressWidget Props

```tsx
interface ProgressWidgetProps {
  visible?: boolean
  progress?: number      // 0-100
  text?: string         // Progress text
  collapsed?: boolean   // Managed by MainToolbar
  className?: string
}
```

## Platform Variants

### Platform-Specific Spacing

The MainToolbar supports platform-specific spacing for window controls:

```tsx
const mainToolbarVariants = cva(
  "flex items-center w-full bg-background",
  {
    variants: {
      platform: {
        default: "h-9 px-2",           // Standard spacing
        mac: "h-9 pl-20 pr-2",        // Space for traffic lights
        windows: "h-9 pl-2 pr-8",     // Space for window controls  
        linux: "h-9 px-2",            // Standard spacing
      }
    }
  }
)
```

## Critical Implementation Details

### Button Component Reuse

**✅ Correct Approach:**
```tsx
// ToolbarButton leverages existing Button component
<Button
  variant="ghost"
  size="toolbar"
  className={cn(className)}
  iconLeft={icon}
  {...props}
>
  {children}
</Button>
```

**❌ Previous Issues:**
- Custom button implementation instead of reusing Button component
- Inconsistent sizing between toolbar buttons and regular buttons
- Manual icon rendering instead of using Button's icon props

### Active State Styling

**✅ Current Implementation:**
```tsx
// No custom background for active state (Fleet-style)
className={cn(className)}
```

**❌ Previous Implementation:**
```tsx
// Custom background that doesn't match Fleet
className={cn(
  active && "bg-muted",
  className
)}
```

### Typography Consistency

**✅ All text uses Typography component:**
```tsx
<Typography variant="default-semibold" className="truncate">
  {projectName}
</Typography>
```

**✅ Button component handles typography automatically**

### Spacing Consistency

**✅ Consistent spacing between workspace elements:**
```tsx
// Project button
<ToolbarButton className="h-auto w-auto px-1 py-0.5 min-w-0">
// Branch icon (separator)
<Icon fleet="vcs-branch" size="sm" className="flex-shrink-0 mx-1" />
// Branch button  
<ToolbarButton className="h-auto w-auto px-1 py-0.5 min-w-0">
```

## Usage Examples

### Basic MainToolbar

```tsx
import { 
  MainToolbar, 
  ToolbarButton, 
  ToolbarSeparator,
  WorkspaceWidget,
  LeftToolbarSection,
  RightToolbarSection 
} from "@/components/ui/main-toolbar"

function AppHeader() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(false)
  const [rightPanelOpen, setRightPanelOpen] = useState(false)

  return (
    <MainToolbar
      leftButtons={
        <LeftToolbarSection>
          <ToolbarButton 
            icon={leftPanelOpen ? "panel-left-open" : "panel-left-closed"} 
            tooltip="Toggle left panel"
            onClick={() => setLeftPanelOpen(!leftPanelOpen)}
          />
          <ToolbarButton 
            icon={rightPanelOpen ? "panel-right-open" : "panel-right-closed"} 
            tooltip="Toggle right panel"
            onClick={() => setRightPanelOpen(!rightPanelOpen)}
          />
          <ToolbarSeparator />
          <ToolbarButton icon="tools" tooltip="Tools" />
        </LeftToolbarSection>
      }
      workspace={
        <WorkspaceWidget 
          projectName="air-web-components"
          branchName="main"
        />
      }
      rightButtons={
        <RightToolbarSection>
          <ToolbarButton icon="ai-chat" tooltip="Chat history" />
          <ToolbarButton icon="run" tooltip="Run" />
          <ToolbarButton icon="search" tooltip="Search everywhere" />
          <ToolbarButton icon="notifications" tooltip="Notifications" />
          <ToolbarButton icon="settings" tooltip="Settings" />
        </RightToolbarSection>
      }
    />
  )
}
```

### With Context Menus

```tsx
function MainToolbarWithMenus() {
  const projectMenuItems = [
    {
      type: 'action',
      name: 'Open...',
      icon: 'folder',
      shortcutText: '⌘O',
      callback: () => handleOpenProject()
    },
    { type: 'separator' },
    {
      type: 'action',
      name: 'Clone from Git...',
      icon: 'vcs-git',
      callback: () => handleCloneFromGit()
    }
  ]

  const branchMenuItems = [
    {
      type: 'action',
      name: 'Switch Branch...',
      icon: 'vcs-branch',
      callback: () => handleSwitchBranch()
    },
    {
      type: 'action',
      name: 'New Branch...',
      icon: 'add',
      callback: () => handleNewBranch()
    }
  ]

  return (
    <MainToolbar
      workspace={
        <WorkspaceWidget 
          projectName="air-web-components"
          branchName="main"
          projectMenu={
            <ContextMenu
              items={projectMenuItems}
              trigger={
                <ToolbarButton
                  tooltip="Project actions"
                  className="h-auto w-auto px-1 py-0.5 min-w-0"
                >
                  <Typography variant="default-semibold" className="truncate">
                    air-web-components
                  </Typography>
                </ToolbarButton>
              }
            />
          }
          branchMenu={
            <ContextMenu
              items={branchMenuItems}
              trigger={
                <ToolbarButton
                  tooltip="Branch actions"
                  className="h-auto w-auto px-1 py-0.5 min-w-0"
                >
                  <Typography variant="default-semibold" className="truncate">
                    main
                  </Typography>
                </ToolbarButton>
              }
            />
          }
        />
      }
    />
  )
}
```

### With Progress Widget

```tsx
function MainToolbarWithProgress() {
  const [showProgress, setShowProgress] = useState(true)
  const [progress, setProgress] = useState(65)

  return (
    <>
      <MainToolbar
        rightButtons={
          <RightToolbarSection>
            {showProgress && (
              <>
                <ProgressWidget
                  visible={true}
                  progress={progress}
                  text="Building project..."
                />
                <ToolbarSeparator />
              </>
            )}
            <ToolbarButton icon="settings" tooltip="Settings" />
          </RightToolbarSection>
        }
      />
      
      {/* Progress controls */}
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setShowProgress(!showProgress)}
      >
        {showProgress ? "Hide" : "Show"} Progress
      </Button>
    </>
  )
}
```

## Testing and Validation

### Layout Algorithm Testing

Test the intelligent layout algorithm across different viewport sizes:

1. **Wide Viewport**: Workspace should be centered
2. **Medium Viewport**: Workspace moves right as space decreases
3. **Narrow Viewport**: Progress collapses to 32px, workspace right-aligned
4. **Very Narrow**: All elements maintain minimum sizes

### Context Menu Testing

Verify context menu functionality:

1. **Project Menu**: Click project name shows project actions
2. **Branch Menu**: Click branch name shows branch actions  
3. **Keyboard Navigation**: Tab through toolbar buttons
4. **Accessibility**: Screen reader announcements

### Platform Testing

Test platform-specific spacing:

1. **macOS**: Extra left padding for traffic lights
2. **Windows**: Extra right padding for window controls
3. **Linux**: Standard padding
4. **Default**: Standard padding for web

## Performance Considerations

### Layout Calculation

The layout algorithm runs on every resize and prop change. Optimizations:

- Uses `React.useLayoutEffect` for synchronous layout calculations
- Memoizes layout state to prevent unnecessary re-renders
- Debounces resize events in production usage

### Context Menu Performance

- Context menus are rendered on-demand
- Menu items are memoized to prevent recreation
- Proper cleanup of event listeners

## Common Issues and Solutions

### Issue: Buttons Don't Fit Content

**Problem**: ToolbarButton with text content overflows or gets cut off

**Solution**: Use flexible sizing classes:
```tsx
<ToolbarButton className="h-auto w-auto px-1 py-0.5 min-w-0">
  <Typography variant="default-semibold" className="truncate">
    {content}
  </Typography>
</ToolbarButton>
```

### Issue: Context Menus Don't Show

**Problem**: Context menu trigger not working

**Solution**: Ensure proper ContextMenu structure:
```tsx
<ContextMenu
  items={menuItems}
  trigger={<ToolbarButton>...</ToolbarButton>}
/>
```

### Issue: Layout Jumping

**Problem**: Toolbar layout shifts during initialization

**Solution**: Provide default dimensions and use `useLayoutEffect`:
```tsx
React.useLayoutEffect(() => {
  // Layout calculations happen synchronously
}, [dependencies])
```

## Integration with Fleet Design System

### Fleet CSS Variables

Uses semantic Fleet colors throughout:
- `bg-background` for toolbar background
- Button component handles all Fleet button colors
- Typography component handles Fleet text colors

### Fleet Icon System

All icons use the Fleet icon system:
```tsx
<ToolbarButton icon="panel-left-open" /> // Fleet icon
<Icon fleet="vcs-branch" size="sm" />    // Fleet VCS icon
```

### Fleet Typography

All text uses Fleet typography variants:
```tsx
<Typography variant="default-semibold" /> // Fleet typography
```

This implementation provides a complete, Fleet-faithful MainToolbar system that can be used across web applications requiring Fleet-style toolbars with intelligent layout and interactive context menus.