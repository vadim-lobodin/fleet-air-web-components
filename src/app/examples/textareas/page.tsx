"use client"

import { useState } from "react"
import { Typography } from "@/components/ui/typography"
import { 
  Textarea,
  DefaultTextarea,
  ErrorTextarea,
  LargeTextarea,
  LargeErrorTextarea,
  InnerTextarea,
  InnerErrorTextarea,
  BorderlessTextarea,
  BorderlessTransparentTextarea,
  ShadcnTextarea,
  type TextareaProps 
} from "@/components/ui/textarea"
import { Button } from "@/components/ui/button-shadcn"
import { Search, Send, FileText, AlertCircle } from "lucide-react"

export default function TextareaExamples() {
  const [message, setMessage] = useState("")
  const [code, setCode] = useState(`function greet(name: string) {
  console.log(\`Hello, \${name}!\`)
}

greet("World")`)

  return (
    <div className="container mx-auto p-6 space-y-12">
      <div className="space-y-4">
        <Typography variant="header-1-semibold">Fleet Textarea Components</Typography>
        <Typography variant="default" className="text-[var(--fleet-text-secondary)]">
          Multiline text input components that exactly mirror Fleet Air TextInput variants.
          Built on top of TextInput with multiline-specific defaults.
        </Typography>
      </div>

      {/* Fleet Basic Variants */}
      <section className="space-y-6">
        <Typography variant="header-2-semibold">Fleet TextInput Variants</Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Typography variant="default-semibold">Default Textarea</Typography>
            <DefaultTextarea 
              placeholder="Fleet defaultTextInputStyle()..."
              rows={4}
            />
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              Mirrors Fleet's defaultTextInputStyle() - 24px height, 6dp padding
            </Typography>
          </div>

          <div className="space-y-3">
            <Typography variant="default-semibold">Error Textarea</Typography>
            <ErrorTextarea 
              placeholder="Fleet errorTextInputStyle()..."
              rows={4}
            />
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              Mirrors Fleet's errorTextInputStyle() - red borders and focus ring
            </Typography>
          </div>
        </div>
      </section>

      {/* Fleet Large Variants */}
      <section className="space-y-6">
        <Typography variant="header-2-semibold">Fleet Large Variants</Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Typography variant="default-semibold">Large Textarea</Typography>
            <LargeTextarea 
              placeholder="Fleet largeTextInputStyle()..."
              rows={3}
            />
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              Mirrors Fleet's largeTextInputStyle() - 28px height, 8dp padding
            </Typography>
          </div>

          <div className="space-y-3">
            <Typography variant="default-semibold">Large Error Textarea</Typography>
            <LargeErrorTextarea 
              placeholder="Fleet largeErrorTextInputStyle()..."
              rows={3}
            />
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              Mirrors Fleet's largeErrorTextInputStyle() - large size with error state
            </Typography>
          </div>
        </div>
      </section>

      {/* Fleet Inner Variants */}
      <section className="space-y-6">
        <Typography variant="header-2-semibold">Fleet Inner Variants</Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Typography variant="default-semibold">Inner Textarea</Typography>
            <div className="border border-[var(--fleet-inputField-border-default)] rounded-md p-3 bg-[var(--fleet-inputField-background-default)]">
              <Typography variant="small" className="text-[var(--fleet-text-secondary)] mb-2">
                Inline editing context:
              </Typography>
              <InnerTextarea 
                placeholder="Fleet innerTextInputStyle()..."
                rows={2}
              />
            </div>
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              Mirrors Fleet's innerTextInputStyle() - transparent borders, no focus ring
            </Typography>
          </div>

          <div className="space-y-3">
            <Typography variant="default-semibold">Inner Error Textarea</Typography>
            <div className="border border-[var(--fleet-inputField-border-default)] rounded-md p-3 bg-[var(--fleet-inputField-background-default)]">
              <Typography variant="small" className="text-[var(--fleet-text-secondary)] mb-2">
                Inline editing with error:
              </Typography>
              <InnerErrorTextarea 
                placeholder="Fleet innerErrorTextInputStyle()..."
                rows={2}
              />
            </div>
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              Mirrors Fleet's innerErrorTextInputStyle() - inner style with error colors
            </Typography>
          </div>
        </div>
      </section>

      {/* Fleet Borderless Variants */}
      <section className="space-y-6">
        <Typography variant="header-2-semibold">Fleet Borderless Variants</Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Typography variant="default-semibold">Borderless Textarea</Typography>
            <div className="bg-[var(--fleet-background-secondary)] p-4 rounded-md">
              <BorderlessTextarea 
                placeholder="Fleet borderlessTextInputStyle()..."
                rows={3}
              />
            </div>
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              Mirrors Fleet's borderlessTextInputStyle() - transparent borders, keeps background
            </Typography>
          </div>

          <div className="space-y-3">
            <Typography variant="default-semibold">Borderless Transparent Textarea</Typography>
            <div className="bg-[var(--fleet-background-secondary)] p-4 rounded-md">
              <BorderlessTransparentTextarea 
                placeholder="Fleet borderlessTransparentTextInputStyle()..."
                rows={3}
              />
            </div>
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              Mirrors Fleet's borderlessTransparentTextInputStyle() - fully transparent
            </Typography>
          </div>
        </div>
      </section>

      {/* Text Style Variants */}
      <section className="space-y-6">
        <Typography variant="header-2-semibold">Fleet Text Styles</Typography>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <Typography variant="default-semibold">Default Text Style</Typography>
                         <Textarea 
               placeholder="Fleet TextInputTextStyle.Default..."
               textStyle="default"
               rows={4}
             />
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              13px size, 16px line height
            </Typography>
          </div>

          <div className="space-y-3">
            <Typography variant="default-semibold">Multiline Text Style</Typography>
            <Textarea 
              placeholder="Fleet TextInputTextStyle.DefaultMultiline..."
              textStyle="multiline"
              rows={4}
            />
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              13px size, 18px line height (default for multiline)
            </Typography>
          </div>

          <div className="space-y-3">
            <Typography variant="default-semibold">Chat Multiline Style</Typography>
            <Textarea 
              placeholder="Fleet TextInputTextStyle.DefaultChatMultiline..."
              textStyle="chatMultiline"
              rows={4}
            />
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              13px size, 20px line height (for chat interfaces)
            </Typography>
          </div>

          <div className="space-y-3">
            <Typography variant="default-semibold">Code Text Style</Typography>
            <Textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Fleet TextInputTextStyle.Code..."
              textStyle="code"
              rows={6}
            />
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              JetBrains Mono font for code editing
            </Typography>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="space-y-6">
        <Typography variant="header-2-semibold">Advanced Features</Typography>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Typography variant="default-semibold">Auto-Growing Textarea</Typography>
            <Textarea 
              placeholder="Grows with content (2-6 lines)..."
              minRows={2}
              maxRows={6}
              autoGrow
            />
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              Dynamic height adjustment based on content
            </Typography>
          </div>

          <div className="space-y-3">
            <Typography variant="default-semibold">With Prefix & Suffix</Typography>
            <Textarea 
              placeholder="Textarea with decorations..."
              rows={3}
              prefix={<Search className="h-4 w-4" />}
              suffix={
                <div className="flex flex-col gap-1">
                  <Button size="sm" variant="ghost">
                    <AlertCircle className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <FileText className="h-3 w-3" />
                  </Button>
                </div>
              }
            />
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              Supports prefix icons and suffix action buttons (via TextInput)
            </Typography>
          </div>
        </div>
      </section>

      {/* Resize Controls */}
      <section className="space-y-6">
        <Typography variant="header-2-semibold">Resize Options</Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <Typography variant="default-semibold">No Resize</Typography>
            <Textarea 
              placeholder="Cannot be resized..."
              rows={3}
              resize="none"
            />
          </div>
          
          <div className="space-y-3">
            <Typography variant="default-semibold">Vertical Only</Typography>
            <Textarea 
              placeholder="Resize vertically..."
              rows={3}
              resize="vertical"
            />
          </div>
          
          <div className="space-y-3">
            <Typography variant="default-semibold">Horizontal Only</Typography>
            <Textarea 
              placeholder="Resize horizontally..."
              rows={3}
              resize="horizontal"
            />
          </div>
          
          <div className="space-y-3">
            <Typography variant="default-semibold">Both Directions</Typography>
            <Textarea 
              placeholder="Resize in both directions..."
              rows={3}
              resize="both"
            />
          </div>
        </div>
      </section>

      {/* Compatibility */}
      <section className="space-y-6">
        <Typography variant="header-2-semibold">shadcn/ui Compatibility</Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Typography variant="default-semibold">Fleet Textarea</Typography>
            <Textarea 
              placeholder="Fleet-styled textarea with semantic colors..."
              rows={3}
            />
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              Uses Fleet color system and TextInput foundation
            </Typography>
          </div>

          <div className="space-y-3">
            <Typography variant="default-semibold">Original shadcn/ui Textarea</Typography>
            <ShadcnTextarea 
              placeholder="Original shadcn/ui textarea for compatibility..."
              rows={3}
            />
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              Original shadcn/ui component for direct compatibility
            </Typography>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="space-y-6">
        <Typography variant="header-2-semibold">Fleet Component Variants</Typography>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-[var(--fleet-inputField-border-default)]">
            <thead>
              <tr className="bg-[var(--fleet-background-secondary)]">
                <th className="border border-[var(--fleet-inputField-border-default)] px-4 py-2 text-left">
                  <Typography variant="default-semibold">React Component</Typography>
                </th>
                <th className="border border-[var(--fleet-inputField-border-default)] px-4 py-2 text-left">
                  <Typography variant="default-semibold">Fleet Equivalent</Typography>
                </th>
                <th className="border border-[var(--fleet-inputField-border-default)] px-4 py-2 text-left">
                  <Typography variant="default-semibold">Description</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="code">DefaultTextarea</Typography>
                </td>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="code">defaultTextInputStyle()</Typography>
                </td>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="default">Standard multiline input (24px height)</Typography>
                </td>
              </tr>
              <tr>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="code">ErrorTextarea</Typography>
                </td>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="code">errorTextInputStyle()</Typography>
                </td>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="default">Error state with red borders</Typography>
                </td>
              </tr>
              <tr>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="code">LargeTextarea</Typography>
                </td>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="code">largeTextInputStyle()</Typography>
                </td>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="default">Large multiline input (28px height)</Typography>
                </td>
              </tr>
              <tr>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="code">InnerTextarea</Typography>
                </td>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="code">innerTextInputStyle()</Typography>
                </td>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="default">Inline editing (transparent borders, no focus ring)</Typography>
                </td>
              </tr>
              <tr>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="code">BorderlessTextarea</Typography>
                </td>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="code">borderlessTextInputStyle()</Typography>
                </td>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="default">No borders, keeps background</Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
} 