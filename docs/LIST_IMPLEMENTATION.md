# Fleet List Component Implementation

## Overview

The Fleet Air List system provides a complete implementation of Fleet's list component with all variants, keyboard navigation, selection modes, and visual states. **The List component is built from scratch to exactly match Fleet Compose's ListView and ListItem behavior.** It features comprehensive keyboard navigation, multi-selection support, Fleet color system integration, and 10 different list cell variants that mirror Fleet's Properties panel.

- **Core Component**: `List<T>` - Generic list with full keyboard navigation and selection
- **List Cells**: `FleetListCell` - 10 variants matching Fleet Properties panel
- **Features**: Multi-selection, keyboard navigation, hover states, cursor tracking, Fleet color integration
- **Accessibility**: Full ARIA support, screen reader compatibility, keyboard-only operation
- **Demo**: See the canonical List gallery at `/examples/lists` (labeled "Lists" in the sidebar)

## Architecture

### Core Components

**List (`src/components/ui/list.tsx`)**:
- Generic list component `List<T>` for any data type
- Full keyboard navigation (arrows, home/end, enter/space, escape)
- Controlled and uncontrolled state management
- Multi-selection with Ctrl+Click and Shift+Click
- Auto-scroll to focused items
- Built on shadcn ScrollArea for smooth scrolling

**FleetListCell (`src/components/ui/list.tsx`)**:
- 10 variants matching Fleet Properties panel exactly
- Fleet icon system integration
- Support for checkboxes, buttons, counters, hints
- Overlay indicators and status icons
- Type-safe props for each variant

**ListItem (`src/components/ui/list.tsx`)**:
- Individual list item wrapper with Fleet styling
- State management (default, selected, cursor, selectedCursor)
- Hover tracking and focus management
- Fleet color system integration

### Fleet Integration

1. **Exact Color Matching**: Uses Fleet semantic color tokens via CSS variables
2. **Typography Consistency**: Fleet font specifications (13px/16px, weight 520/480)
3. **Visual States**: Matches Fleet's exact highlight colors and behaviors
4. **Icon System**: Fleet icon integration with proper sizing
5. **Keyboard Behavior**: Identical to Fleet Compose ListView navigation

## Features

### Core List Features
- **Generic Type Support**: `List<T>` works with any data type
- **Keyboard Navigation**: Arrow keys, Home/End, Enter/Space, Escape
- **Multi-Selection**: Ctrl+Click toggle, Shift+Click range selection
- **State Management**: Controlled (external state) or uncontrolled (internal state)
- **Auto-Scroll**: Automatically scrolls to keep cursor item visible
- **Theme Awareness**: Full light/dark theme support

### FleetListCell Variants
1. **Default**: Basic text display
2. **Hint**: Text with hint information next to label
3. **Chevron**: Expandable/collapsible indicator
4. **Icon**: File/item icons without overlay
5. **Icon Overlay**: Icons with status overlay indicators
6. **Icon Right**: Icons positioned on the right side
7. **Counter**: Badge counters for numeric information
8. **Checkbox**: Interactive checkbox controls
9. **Buttons**: Action buttons with menu indicators
10. **Right Hint**: Hint text positioned on the right

### Selection and Navigation
- **Single Selection**: Click to select
- **Multi-Selection**: Ctrl+Click to toggle, Shift+Click for range
- **Keyboard Navigation**: Full arrow key support with cursor tracking
- **Focus Management**: Only cursor item receives focus, no visual artifacts
- **Auto-Selection**: Optional auto-select first item on focus

## Usage

### Basic List Usage

```tsx
import { List, FleetListCell, type ListItemOpts } from "@/components/ui"

// Simple string list
const items = ["Item 1", "Item 2", "Item 3"]

<List
  items={items}
  keyFn={(item) => item}
  renderItem={(item, opts) => (
    <FleetListCell text={item} variant="default" />
  )}
  height="200px"
/>
```

### Advanced List with State Management

```tsx
const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())
const [cursorKey, setCursorKey] = useState<string | null>(null)

<List
  items={items}
  keyFn={(item) => item.id}
  renderItem={(item, opts) => (
    <FleetListCell 
      text={item.name}
      variant="icon"
      icon={<Icon fleet="ai-file" size="sm" />}
    />
  )}
  selectedKeys={selectedKeys}
  cursorKey={cursorKey}
  onSelectionChange={(keys, items) => setSelectedKeys(keys)}
  onCursorChange={(key, item) => setCursorKey(key)}
  onConfirm={(items) => console.log('Confirmed:', items)}
  options={{
    multiSelectionEnabled: true,
    selectFirstItemOnFocus: true
  }}
  height="400px"
/>
```

### FleetListCell Variants

```tsx
// All 10 Fleet variants from Properties panel
<FleetListCell text="Default" variant="default" />
<FleetListCell text="Default" variant="hint" hint="Hint" />
<FleetListCell text="Chevron" variant="chevron" />
<FleetListCell text="Icon (with Overlay)" variant="iconOverlay" 
  icon={<Icon fleet="ai-file" size="sm" />} hasOverlay={true} />
<FleetListCell text="Icon (without Overlay)" variant="icon" 
  icon={<Icon fleet="ai-file" size="sm" />} />
<FleetListCell text="Icon Right" variant="iconRight" 
  rightIcon={<Icon fleet="external-link" size="sm" />} />
<FleetListCell text="Counter" variant="counter" counter="3" />
<FleetListCell text="Controls (Checkbox)" variant="checkbox" checked={false} />
<FleetListCell text="Controls (Buttons)" variant="buttons" 
  buttons={[{ label: 'Cancel', onClick: () => {}, variant: 'secondary' }]}
  rightIcon={<Icon fleet="more-horizontal" size="sm" />} />
<FleetListCell text="Controls (Right Hint)" variant="rightHint" rightHint="Hint" />
```

### List Options

```tsx
const options = {
  confirmOnClick: true,                    // Confirm selection on single click
  selectFirstItemOnFocus: true,           // Auto-select first item when focused
  updateCursorOnHover: false,             // Move cursor on mouse hover
  resetCursorOnMouseLeave: false,         // Clear cursor when mouse leaves
  resetCursorOnCancel: false,             // Clear cursor on Escape key
  updateSelectionWithCursor: true,        // Selection follows cursor movement
  homeEndActionsEnabled: true,            // Enable Home/End key navigation
  keyboardSelectActionEnabled: true,      // Enable Enter/Space selection
  multiSelectionEnabled: false,           // Enable multi-selection mode
  contextActionsEnabled: true,            // Enable context menu support
  spacing: 0,                            // Gap between items (0 = no gap)
}
```

## Fleet Component Mapping

### React to Fleet Compose Mapping

| React Component | Fleet Compose Equivalent | Description |
|----------------|-------------------------|-------------|
| `List<T>` | `ListView<T>` | Main list component with navigation |
| `ListItem` | `ListItem` | Individual list item wrapper |
| `FleetListCell` | Properties panel variants | 10 cell types from Fleet Properties |

### List Cell Variants Mapping

| React Variant | Fleet Properties Panel | Features |
|--------------|----------------------|----------|
| `default` | "Default" | Basic text display |
| `hint` | "Default" with hint | Text + hint information |
| `chevron` | "Chevron" | Expandable indicator |
| `icon` | "Icon (without Overlay)" | File/item icons |
| `iconOverlay` | "Icon (with Overlay)" | Icons + status overlay |
| `iconRight` | "Icon Right" | Right-positioned icons |
| `counter` | "Counter" | Numeric badge display |
| `checkbox` | "Controls (Checkbox)" | Interactive checkboxes |
| `buttons` | "Controls (Buttons)" | Action buttons + menu |
| `rightHint` | "Controls (Right Hint)" | Right-positioned hints |

### Keyboard Navigation Mapping

| Key Combination | Fleet Behavior | React Implementation |
|----------------|----------------|---------------------|
| Arrow Up/Down | Move cursor | `moveCursor()` |
| Home/End | Jump to first/last | `findNextSelectableIndex()` |
| Enter/Space | Confirm selection | `onConfirm()` callback |
| Escape | Clear selection | Reset state |
| Ctrl+Click | Toggle selection | Multi-selection mode |
| Shift+Click | Range selection | Range selection mode |

## Color System Integration

### Fleet Color Variables

The List component uses Fleet semantic color tokens for all visual states:

```css
/* List Item Background Colors */
--fleet-listItem-background-default: transparent
--fleet-listItem-background-hovered: #FFFFFF0F    /* Dark theme */
--fleet-listItem-background-focused: #0870E4      /* Fleet blue */

/* List Item Text Colors */
--fleet-listItem-text-default: #E0E1E4           /* Dark theme */
--fleet-listItem-text-focused: #FFFFFF           /* White on blue */
```

### State Color Mapping

```tsx
// Default state - transparent background
"bg-[var(--fleet-listItem-background-default)] text-[var(--fleet-listItem-text-default)]"

// Hover state - subtle highlight
"hover:bg-[var(--fleet-listItem-background-hovered)]"

// Selected/Cursor state - Fleet blue
"bg-[var(--fleet-listItem-background-focused)] text-[var(--fleet-listItem-text-focused)]"
```

### Theme Awareness

All colors automatically adapt between light and dark themes:
- **Light Theme**: Darker text on lighter backgrounds
- **Dark Theme**: Lighter text on darker backgrounds
- **Selection**: Consistent Fleet blue (#0870E4) across themes

## Typography System

### Consistent Typography Classes

All list components use standardized Fleet typography:

```css
text-default leading-default font-body-regular tracking-default
```

**Font Specifications (matching Fleet exactly):**
- **Size**: 13px (`text-default`)
- **Line Height**: 16px (`leading-default`)  
- **Weight**: 520 (light theme) / 480 (dark theme) (`font-body-regular`)
- **Letter Spacing**: 0% (light) / 0.4% (dark) (`tracking-default`)

### Text Variants by Component

```tsx
// List items - standard Fleet text
FleetListCell: "text-default leading-default font-body-regular tracking-default"

// Hint text - muted variant
Hint text: "text-muted-foreground"

// Counter badges - smaller text
Counter: "text-xs"
```

## Implementation Details

### Focus Management

**Problem Solved**: Browser focus outlines interfering with Fleet styling
```tsx
// Remove all browser focus artifacts
"outline-none focus:outline-none focus-visible:outline-none"
"ring-0 focus:ring-0 focus-visible:ring-0"
```

**Result**: Clean Fleet-style highlighting without unwanted focus borders

### Multi-Selection Logic

```tsx
// Ctrl+Click toggle selection
if (event.ctrlKey || event.metaKey) {
  const newSelection = new Set(state.selection)
  if (newSelection.has(itemKey)) {
    newSelection.delete(itemKey)
  } else {
    newSelection.add(itemKey)
  }
}

// Shift+Click range selection
else if (event.shiftKey && state.multiSelectionAnchorKey) {
  const start = Math.min(anchorIndex, targetIndex)
  const end = Math.max(anchorIndex, targetIndex)
  // Select all items in range
}
```

### State Management Patterns

**Controlled Mode** (external state):
```tsx
<List
  selectedKeys={selectedKeys}
  cursorKey={cursorKey}
  onSelectionChange={setSelectedKeys}
  onCursorChange={setCursorKey}
/>
```

**Uncontrolled Mode** (internal state):
```tsx
<List
  // No state props - component manages its own state
  onSelectionChange={(keys, items) => console.log(keys)}
/>
```

### Performance Optimizations

1. **Virtualization Ready**: Uses index-based key mapping for efficient lookups
2. **Minimal Re-renders**: Optimized callback dependencies
3. **Smooth Scrolling**: Built on shadcn ScrollArea
4. **Event Delegation**: Efficient keyboard and mouse event handling

## Layout and Measurements

### List Item Dimensions

```css
/* Exact Fleet measurements */
height: 24px;                    /* h-6 - Exactly 24px height */
padding: 0 12px;                 /* px-3 - 12px horizontal padding */
margin: 0 6px;                   /* mx-1.5 - 6px outer margin */
border-radius: 4px;              /* rounded-[4px] - 4px radius */
```

### Spacing

```css
/* No gaps between items (Fleet style) */
gap: 0;                          /* spacing: 0 option */

/* Alternative spacing options available */
gap: 2px;                        /* spacing: sm */
gap: 4px;                        /* spacing: md */
gap: 6px;                        /* spacing: lg */
```

## Best Practices

### Component Selection

```tsx
// ✅ Use List<T> for data lists with navigation
<List items={data} renderItem={renderCell} />

// ✅ Use FleetListCell for Fleet-style list items
<FleetListCell text="Item" variant="icon" icon={<Icon />} />

// ✅ Use appropriate variant for content type
<FleetListCell variant="counter" counter="5" />     // For counts
<FleetListCell variant="checkbox" checked={true} /> // For selections
<FleetListCell variant="buttons" buttons={actions} /> // For actions
```

### State Management

```tsx
// ✅ Use controlled state for integration with forms/stores
const [selection, setSelection] = useState<Set<string>>(new Set())

// ✅ Use uncontrolled for simple lists
<List items={items} onSelectionChange={handleChange} />

// ✅ Provide stable key functions
keyFn={(item) => item.id} // ✅ Stable ID
keyFn={(item) => item)    // ❌ Object reference changes
```

### Performance

```tsx
// ✅ Memoize complex render functions
const renderItem = useCallback((item, opts) => (
  <FleetListCell text={item.name} variant="icon" />
), [])

// ✅ Use stable option objects
const options = useMemo(() => ({
  multiSelectionEnabled: true,
  selectFirstItemOnFocus: true
}), [])
```

## Testing

```tsx
import { List, FleetListCell } from "@/components/ui"
import { render, screen, fireEvent } from "@testing-library/react"

describe('Fleet List Components', () => {
  const items = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' }
  ]

  it('renders list items correctly', () => {
    render(
      <List
        items={items}
        keyFn={(item) => item.id}
        renderItem={(item) => <FleetListCell text={item.name} />}
      />
    )
    
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('handles keyboard navigation', () => {
    const onCursorChange = jest.fn()
    render(
      <List
        items={items}
        keyFn={(item) => item.id}
        renderItem={(item) => <FleetListCell text={item.name} />}
        onCursorChange={onCursorChange}
      />
    )
    
    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' })
    expect(onCursorChange).toHaveBeenCalledWith('1', items[0])
  })

  it('supports multi-selection', () => {
    const onSelectionChange = jest.fn()
    render(
      <List
        items={items}
        keyFn={(item) => item.id}
        renderItem={(item) => <FleetListCell text={item.name} />}
        onSelectionChange={onSelectionChange}
        options={{ multiSelectionEnabled: true }}
      />
    )
    
    fireEvent.click(screen.getByText('Item 1'), { ctrlKey: true })
    fireEvent.click(screen.getByText('Item 2'), { ctrlKey: true })
    
    expect(onSelectionChange).toHaveBeenCalledWith(
      new Set(['1', '2']),
      [items[0], items[1]]
    )
  })

  it('renders all FleetListCell variants', () => {
    const variants = [
      'default', 'hint', 'chevron', 'icon', 'iconOverlay',
      'iconRight', 'counter', 'checkbox', 'buttons', 'rightHint'
    ]
    
    variants.forEach(variant => {
      render(<FleetListCell text="Test" variant={variant as any} />)
      expect(screen.getByText('Test')).toBeInTheDocument()
    })
  })
})
```

## File Structure

```
src/components/ui/
├── list.tsx                   # Complete List implementation
│   ├── List<T>               # Generic list component
│   ├── ListItem              # Individual item wrapper
│   ├── FleetListCell         # 10 Fleet variants
│   └── DefaultListItem       # Legacy compatibility
├── index.ts                  # Exports all list components
└── scroll-area.tsx           # shadcn ScrollArea dependency
```

## Migration Guide

### From Basic HTML Lists

```tsx
// ❌ Before (HTML list)
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

// ✅ After (Fleet List)
<List
  items={['Item 1', 'Item 2']}
  renderItem={(item) => <FleetListCell text={item} />}
/>
```

### From Other List Libraries

```tsx
// ❌ Before (other library)
<SomeList 
  data={items}
  onSelect={handleSelect}
  multiSelect={true}
/>

// ✅ After (Fleet List)
<List
  items={items}
  renderItem={(item) => <FleetListCell text={item.name} />}
  onSelectionChange={handleSelectionChange}
  options={{ multiSelectionEnabled: true }}
/>
```

## Conclusion

The Fleet Air List system provides:

- **Complete Fleet Fidelity**: Exact matching to Fleet Compose ListView behavior
- **Type Safety**: Full TypeScript support with generic `List<T>`
- **Accessibility**: ARIA compliance and keyboard-only operation
- **Performance**: Optimized for large lists with efficient state management
- **Flexibility**: 10 cell variants covering all Fleet use cases
- **Integration**: Seamless Fleet color system and typography integration

This implementation eliminates the need for custom list solutions while providing comprehensive Fleet design system integration for all list-based UI patterns. 