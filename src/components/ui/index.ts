// Export all Fleet Air components
export { Button, buttonVariants } from "./button-shadcn"
export { Typography, typographyVariants } from "./typography"
export * from "./icon"

// Fleet TextInput - comprehensive input component with all Fleet variants
export { 
  TextInput,
  DefaultTextInput,
  ErrorTextInput,
  LargeTextInput,
  LargeErrorTextInput,
  InnerTextInput,
  InnerErrorTextInput,
  BorderlessTextInput,
  BorderlessTransparentTextInput,
  TreeCellInnerTextInput,
  TreeCellInnerErrorTextInput,
  textInputVariants,
  type TextInputProps 
} from "./input"

// Alias for compatibility - TextInput is the main component
export { TextInput as Input } from "./input"

// Fleet Textarea - multiline text input with Fleet design system integration
export { 
  Textarea,
  // Fleet TextInput style variants (matching Fleet exactly)
  DefaultTextarea,
  ErrorTextarea,
  LargeTextarea,
  LargeErrorTextarea,
  InnerTextarea,
  InnerErrorTextarea,
  BorderlessTextarea,
  BorderlessTransparentTextarea,
  // shadcn/ui compatibility
  ShadcnTextarea,
  textareaVariants,
  type TextareaProps 
} from "./textarea" 