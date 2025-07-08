# Component State Management Pattern

## Overview

All Fleet Air Web Components follow the **Self-Managing with Optional External Control** pattern. This approach prioritizes rapid prototyping while maintaining flexibility for complex implementations.

## Design Philosophy

### Prototyping-First
Components should work immediately without any required props or setup, enabling:
- Rapid UI experimentation
- Quick component integration
- Minimal boilerplate code
- Instant functionality demonstration

### Progressive Enhancement
Components should support optional external control for:
- Complex state management
- Cross-component data sharing
- Advanced customization
- Production implementations

## Implementation Pattern

### 1. Interface Design
Make all data and handler props optional:

```typescript
interface ComponentProps {
  // Optional data - component has internal defaults
  data?: DataType
  
  // Optional handlers - component has internal implementations
  onAction?: (item: ItemType) => void
  onUpdate?: (newData: DataType) => void
  
  // Other standard props (className, etc.)
  className?: string
}
```

### 2. Internal State Setup
Provide sensible defaults for prototyping:

```typescript
const Component = ({ 
  data: externalData, 
  onAction: externalOnAction,
  onUpdate: externalOnUpdate,
  ...props 
}) => {
  // Internal state with meaningful defaults
  const [internalData, setInternalData] = useState<DataType>({
    id: "default-id",
    items: [
      { id: "1", name: "Sample Item 1", active: true },
      { id: "2", name: "Sample Item 2", active: false }
    ]
  })
  
  // Use external data if provided, otherwise internal
  const data = externalData || internalData
  
  // ... rest of component
}
```

### 3. Handler Implementation
Support both external and internal control:

```typescript
const handleAction = (item: ItemType) => {
  if (externalOnAction) {
    // External control mode - parent handles the action
    externalOnAction(item)
  } else {
    // Self-managing mode - handle internally
    setInternalData(prev => ({
      ...prev,
      items: prev.items.map(i => 
        i.id === item.id ? { ...i, active: !i.active } : i
      )
    }))
  }
}

const handleUpdate = (newData: DataType) => {
  if (externalOnUpdate) {
    // External control mode
    externalOnUpdate(newData)
  } else {
    // Self-managing mode
    setInternalData(newData)
  }
}
```

### 4. Component Usage

#### Prototyping Mode (Zero Setup)
```typescript
// Works immediately - no props required
<Component />

// With basic styling only
<Component className="w-full h-64" />
```

#### Advanced Mode (External Control)
```typescript
// Full external control
const [myData, setMyData] = useState(customData)

<Component 
  data={myData}
  onAction={(item) => {
    // Custom logic
    console.log('Action on:', item)
  }}
  onUpdate={setMyData}
/>
```

## Real-World Example: AiChatContextPreview

### Interface
```typescript
export interface AiChatContextPreviewProps {
  context?: AiChatContext              // Optional - has defaults
  onRemoveEntry?: (id: string) => void // Optional - has internal handler
  onTogglePinEntry?: (id: string) => void // Optional - has internal handler
  // ... other props
}
```

### Implementation
```typescript
const AiChatContextPreview = ({ 
  context: externalContext,
  onRemoveEntry: externalOnRemoveEntry,
  onTogglePinEntry: externalOnTogglePinEntry,
  ...props 
}) => {
  // Internal state with sample data
  const [internalContext, setInternalContext] = useState({
    id: "default-context",
    contextEntries: [
      { id: "1", name: "component.tsx", type: "file", isPinned: true },
      { id: "2", name: "main", type: "branch", isPinned: false }
    ]
  })
  
  // Use external if provided, otherwise internal
  const context = externalContext || internalContext
  
  // Dual-mode handlers
  const handleRemoveEntry = (entryId: string) => {
    if (externalOnRemoveEntry) {
      externalOnRemoveEntry(entryId)
    } else {
      setInternalContext(prev => ({
        ...prev,
        contextEntries: prev.contextEntries.filter(e => e.id !== entryId)
      }))
    }
  }
  
  // ... rest of implementation
}
```

### Usage Examples
```typescript
// ✅ Prototyping - works immediately
<AiChatContextPreview />

// ✅ Production - full control
<AiChatContextPreview 
  context={projectContext}
  onRemoveEntry={handleRemove}
  onTogglePinEntry={handleTogglePin}
/>
```

## Benefits

### For Prototyping
- **Zero setup required** - Components work out of the box
- **Realistic demos** - Components show actual functionality
- **Fast iteration** - No boilerplate state management
- **Self-contained** - Each component demonstrates its full capability

### For Production
- **Flexible architecture** - External control when needed
- **Backward compatible** - Same API works in both modes
- **Scalable** - Can share state across multiple components
- **Maintainable** - Clear separation of concerns

## Guidelines

### Do ✅
- Make all data props optional with sensible defaults
- Provide meaningful sample data for demonstrations
- Support both internal and external state management
- Include realistic interactions in default mode
- Test both prototyping and production usage patterns

### Don't ❌
- Require props for basic functionality
- Use empty arrays/objects as defaults
- Force external state management
- Break backward compatibility
- Ignore internal state management needs

## Migration Strategy

For existing components that don't follow this pattern:

1. **Make props optional** - Add `?` to data and handler props
2. **Add internal state** - Create useState with meaningful defaults
3. **Implement dual handlers** - Check for external handlers first
4. **Update examples** - Show both usage modes
5. **Test thoroughly** - Ensure both modes work correctly

This pattern ensures the Fleet Air Web Components library serves both rapid prototyping and production use cases effectively.