# Novel Editor Implementation

## Overview
A Rich Text Editor (RTE) component built with Novel.js and TipTap, featuring Fleet's syntax highlighting theme for code blocks. The implementation provides a complete WYSIWYG editing experience with specialized syntax highlighting that matches Fleet's color scheme.

## Component Structure

### Core Files
- `src/components/ui/novel-editor.tsx` - Main Novel Editor component
- `src/components/ui/novel-extensions.ts` - TipTap extensions with Fleet theme
- `src/components/ui/novel-node-selector.tsx` - Node selection UI
- `src/components/ui/novel-selectors.tsx` - Selector utilities
- `src/components/ui/novel-text-buttons.tsx` - Text formatting buttons
- `src/components/ui/image-upload.ts` - Image upload functionality
- `src/app/examples/novel-editor/page.tsx` - Example page

### Key Features
- **Fleet Syntax Highlighting**: Custom theme matching Fleet's editor colors
- **Light/Dark Theme Support**: Automatic theme switching
- **Code Block Support**: 10+ programming languages (JavaScript, TypeScript, Python, Java, Kotlin, etc.)
- **Rich Text Editing**: Bold, italic, lists, blockquotes, images, links
- **Image Upload**: Drag & drop image support
- **Keyboard Shortcuts**: Standard editing shortcuts
- **Responsive Design**: Works on mobile and desktop

## Fleet Syntax Highlighting Theme

### Color Mapping
The syntax highlighting uses Fleet's semantic color palette:

**Light Theme:**
- **Keywords**: Cyan Dark (#779E9E) - `keyword`, `type`, `built_in`
- **Strings**: Purple_110 (#B174D9) - `string`, `template-string`
- **Numbers**: Yellow_100 (#B07203) - `number`, `literal`, `regexp`
- **Functions**: Yellow_100 (#B07203) - `function` (with semibold weight)
- **Types**: Blue_100 (#2A7DEB) - `class`, `interface`, `enum`
- **Variables**: Violet_90 (#685AFB) - `variable`, `property`, `attribute`
- **Comments**: Neutral_110 (#898E94) - `comment` (italic)
- **Metadata**: Green_100 (#169068) - `meta`, `doctag`, `tag`

**Dark Theme:**
- **Keywords**: Cyan (#82D2CE)
- **Strings**: Pink (#E394DC)
- **Numbers**: Yellow (#EBC88D)
- **Functions**: Yellow (#EBC88D)
- **Types**: Blue (#87C3FF)
- **Variables**: Violet (#AF9CFF)
- **Comments**: LightTint_52 (#FFFFFF85)
- **Metadata**: Lime (#A8CC7C)

### Implementation Details
- Uses CSS variables for theme switching (`--fleet-syntax-*`)
- Supports 10+ programming languages via lowlight/highlight.js
- Language-specific overrides for HTML, CSS, JavaScript, JSON, Markdown
- Proper contrast ratios for accessibility in both themes

## Usage

### Basic Usage
```tsx
import { NovelEditor } from "@/components/ui/novel-editor"

export default function MyEditor() {
  return (
    <NovelEditor 
      className="min-h-96"
      placeholder="Start typing..."
    />
  )
}
```

### With External State
```tsx
import { NovelEditor } from "@/components/ui/novel-editor"
import { useState } from "react"

export default function ControlledEditor() {
  const [content, setContent] = useState("")
  
  return (
    <NovelEditor 
      initialContent={content}
      onUpdate={(editor) => setContent(editor.getHTML())}
      className="min-h-96"
    />
  )
}
```

## Configuration

### Code Block Languages
The editor supports syntax highlighting for:
- JavaScript/TypeScript
- Python
- Java/Kotlin
- CSS/HTML
- JSON
- Bash/Shell
- SQL
- And more...

### Customization
To modify syntax highlighting colors, update the CSS variables in `globals.css`:

```css
:root {
  --fleet-syntax-keyword: #779E9E;
  --fleet-syntax-string: #B174D9;
  --fleet-syntax-number: #B07203;
  /* ... other colors */
}
```

## Development Notes

### Dependencies
- `novel` - Core rich text editor
- `@tiptap/extension-code-block-lowlight` - Code block syntax highlighting
- `lowlight` - Syntax highlighting engine
- `highlight.js` - Language definitions

### State Management Pattern
The component follows the "self-managing with optional external control" pattern:
- Works immediately without props (prototyping mode)
- Accepts optional props for external control (advanced mode)
- Maintains backward compatibility

### Performance Considerations
- Uses lowlight for efficient syntax highlighting
- Lazy loads language definitions
- Optimized for both light and dark themes
- Responsive design with mobile optimizations

## Testing
Visit `/examples/novel-editor` to test the editor with different:
- Code blocks in various languages
- Light/dark theme switching
- Rich text formatting
- Image uploads
- Keyboard shortcuts

## Future Enhancements
- Additional language support
- Custom theme variants
- Collaborative editing
- Export functionality
- Enhanced mobile experience