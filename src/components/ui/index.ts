// Export all Fleet Air components
export { Button, buttonVariants } from "./button-shadcn"
export { Typography, typographyVariants } from "./typography"
export * from "./icon"

// Fleet TextInput - single-line input component with all Fleet variants controlled by props
export { 
  TextInput,
  textInputVariants,
  type TextInputProps 
} from "./input"

// Alias for compatibility - TextInput is the main component
export { TextInput as Input } from "./input"

// Fleet Textarea - multiline text input with Fleet design system integration
export { 
  Textarea,
  ShadcnTextarea,
  textareaVariants,
  type TextareaProps 
} from "./textarea"

// Fleet List - List component with Fleet styling, keyboard navigation, and selection
export { 
  List,
  ListItem,
  DefaultListItem,
  FleetListCell,
  listVariants,
  listItemVariants,
  type ListProps,
  type ListItemProps,
  type ListItemOpts,
  type ListState,
  type ListOptions,
  type DefaultListItemProps,
  type FleetListCellProps,
  type Matcher
} from "./list"

export { Checkbox } from "./checkbox" 

export { Editor } from "./editor"

// Fleet Tabs - Tab component with Fleet styling, keyboard navigation, and all Fleet states
export { 
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  DefaultTabs,
  VerticalTabs,
  FileTab,
  CounterTab,
  IconTab,
  fleetTabsVariants,
  fleetTabsListVariants,
  fleetTabsTriggerVariants,
  fleetTabsContentVariants,
  type FleetTabsProps,
  type FleetTabsListProps,
  type FleetTabsTriggerProps,
  type FileTabProps,
  type CounterTabProps,
  type IconTabProps,
} from "./tabs"

// Fleet ContextMenu - Context menu component with Fleet styling, search, and submenu support
export {
  ContextMenu,
  RightClickContextMenu,
  buildMenu,
  useContextMenu,
  contextMenuContentVariants,
  contextMenuItemVariants,
  contextMenuHeaderVariants,
  contextMenuSeparatorVariants,
  type FleetMenuItem,
  type ActionMenuItem,
  type CheckboxMenuItem,
  type GroupMenuItem,
  type HeaderMenuItem,
  type SeparatorMenuItem,
  type TextMenuItem,
  type MenuSearchOptions,
} from "./context-menu"

// Fleet Window Layout - Complete window layout system with panels, splitters, and toolbars
export {
  WindowLayout,
  WindowHeader,
  Toolbar,
  PanelContainer,
  Panel,
  Splitter,
  FleetWindowLayout,
  FleetAirWindowLayout,
  StandardWindowLayout,
  AirWindowLayout,
  windowLayoutVariants,
  windowHeaderVariants,
  toolbarVariants,
  panelContainerVariants,
  panelVariants,
  splitterVariants,
  type WindowLayoutProps,
  type WindowHeaderProps,
  type ToolbarProps,
  type PanelContainerProps,
  type PanelProps,
  type SplitterProps,
} from "./window-layout"

// Fleet File Tree - File tree component using Fleet design patterns
export {
  FileTree,
  defaultProjectTree,
  type FileTreeItem,
  type FileTreeProps,
} from "./file-tree"

// Fleet File Tree Island - File tree island panel variant with tabs
export {
  FileTreeIsland,
  type FileTreeIslandProps,
} from "./file-tree-island"

// Fleet Main Toolbar - Precise implementation of Fleet's main toolbar with intelligent layout
export {
  MainToolbar,
  ToolbarButton,
  ToolbarSeparator,
  WorkspaceWidget,
  ProgressWidget,
  LeftToolbarSection,
  RightToolbarSection,
  mainToolbarVariants,
  separatorVariants,
  type MainToolbarProps,
  type ToolbarButtonProps,
  type ToolbarSeparatorProps,
  type WorkspaceWidgetProps,
  type ProgressWidgetProps,
} from "./main-toolbar"

// Islands Theme Components
export {
  Island,
  IslandSplitter,
  IslandContainer,
  IslandWithTabs,
  TabBar,
  TabContentArea,
  ChatIsland,
  islandVariants,
  islandSplitterVariants,
  type IslandProps,
  type IslandSplitterProps,
} from "./island"

export { ExampleSectionCard } from "./example-section-card"

// Fleet Draggable Tabs - Draggable tabs system for cross-island tab management
export {
  DraggableTabsProvider,
  DraggableTab,
  DroppableTabIsland,
  useDraggableTabs,
  type DraggableTab as DraggableTabType,
  type TabIsland,
} from "./draggable-tabs"

// Fleet AI Chat Input - Fleet-style AI chat input component with attachments and features
export {
  AiChatInput,
  type AiChatInputProps,
} from "./ai-chat-input"

// Fleet AI Chat Context Preview - Context preview component for AI chat interfaces
export {
  AiChatContextPreview,
  type AiChatContextPreviewProps,
  type AiContextEntry,
  type AiTool,
  type AiChatContext,
} from "./ai-chat-context-preview"
   