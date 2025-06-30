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