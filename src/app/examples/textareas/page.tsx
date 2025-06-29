"use client"

import { useState } from "react"
import { Typography } from "@/components/ui/typography"
import { 
  Textarea,
  DefaultTextarea,
  ErrorTextarea,
  CodeTextarea,
  ChatTextarea,
  InnerTextarea,
  ShadcnTextarea,
  type TextareaProps 
} from "@/components/ui/textarea"
import { Button } from "@/components/ui/button-shadcn"
import { Search, Send, Code, MessageSquare, FileText, AlertCircle } from "lucide-react"

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
          Comprehensive multiline text input components that integrate with Fleet's design system.
          Built on top of TextInput with multiline-specific defaults and features.
        </Typography>
      </div>

      {/* Basic Variants */}
      <section className="space-y-6">
        <Typography variant="header-2-semibold">Basic Variants</Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Typography variant="default-semibold">Default Textarea</Typography>
            <DefaultTextarea 
              placeholder="Enter your message here..."
              rows={4}
            />
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              Standard multiline input with Fleet's default styling (24px line height)
            </Typography>
          </div>

          <div className="space-y-3">
            <Typography variant="default-semibold">Error Textarea</Typography>
            <ErrorTextarea 
              placeholder="This field has an error..."
              rows={4}
            />
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              Error state with red border and focus ring for validation
            </Typography>
          </div>
        </div>
      </section>

      {/* Specialized Variants */}
      <section className="space-y-6">
        <Typography variant="header-2-semibold">Specialized Variants</Typography>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <Typography variant="default-semibold">Code Textarea</Typography>
            </div>
            <CodeTextarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code here..."
              rows={8}
            />
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              Monospace font for code editing with resize capability
            </Typography>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <Typography variant="default-semibold">Chat Textarea</Typography>
            </div>
            <div className="space-y-2">
              <ChatTextarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                suffix={
                  <Button size="sm" onClick={() => setMessage("")}>
                    <Send className="h-3 w-3" />
                  </Button>
                }
              />
              <Button size="sm" className="w-full">Send Message</Button>
            </div>
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              Auto-growing (1-8 lines) with chat-optimized line height
            </Typography>
          </div>

          <div className="space-y-3">
            <Typography variant="default-semibold">Inner Textarea</Typography>
            <div className="border border-[var(--fleet-inputField-border-default)] rounded-md p-3 bg-[var(--fleet-inputField-background-default)]">
              <Typography variant="small" className="text-[var(--fleet-text-secondary)] mb-2">
                Inline editing context:
              </Typography>
              <InnerTextarea 
                placeholder="Edit inline..."
                rows={2}
              />
            </div>
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              Transparent borders for inline/embedded editing
            </Typography>
          </div>
        </div>
      </section>

      {/* Size Variants */}
      <section className="space-y-6">
        <Typography variant="header-2-semibold">Size Variants</Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <Typography variant="default-semibold">Compact (2 rows)</Typography>
            <Textarea 
              placeholder="Compact textarea..."
              rows={2}
            />
          </div>
          
          <div className="space-y-3">
            <Typography variant="default-semibold">Standard (3 rows)</Typography>
            <Textarea 
              placeholder="Standard textarea..."
              rows={3}
            />
          </div>
          
          <div className="space-y-3">
            <Typography variant="default-semibold">Large (6 rows)</Typography>
            <Textarea 
              placeholder="Large textarea..."
              rows={6}
            />
          </div>
        </div>
      </section>

      {/* Resize Options */}
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

      {/* Advanced Features */}
      <section className="space-y-6">
        <Typography variant="header-2-semibold">Advanced Features</Typography>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Typography variant="default-semibold">Auto-Growing Textarea</Typography>
            <Textarea 
              placeholder="This textarea grows with content (max 6 lines)..."
              minRows={2}
              maxRows={6}
              autoGrow
            />
            <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
              Automatically adjusts height based on content
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
              Supports prefix icons and suffix action buttons
            </Typography>
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

      {/* Usage Patterns */}
      <section className="space-y-6">
        <Typography variant="header-2-semibold">Common Usage Patterns</Typography>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <Typography variant="default-semibold">Form Integration</Typography>
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <DefaultTextarea 
                  placeholder="Enter a description..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Comments</label>
                <ErrorTextarea 
                  placeholder="This field is required..."
                  rows={2}
                />
                <Typography variant="small" className="text-[var(--fleet-text-error)]">
                  Please provide comments
                </Typography>
              </div>
              <Button>Submit Form</Button>
            </div>
          </div>

          <div className="space-y-3">
            <Typography variant="default-semibold">Live Code Editor</Typography>
            <div className="border border-[var(--fleet-inputField-border-default)] rounded-lg overflow-hidden">
              <div className="bg-[var(--fleet-background-secondary)] px-3 py-2 border-b border-[var(--fleet-inputField-border-default)]">
                <Typography variant="small" className="text-[var(--fleet-text-secondary)]">
                  main.ts
                </Typography>
              </div>
              <CodeTextarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={10}
                resize="vertical"
                className="border-0 rounded-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="space-y-6">
        <Typography variant="header-2-semibold">Component Variants</Typography>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-[var(--fleet-inputField-border-default)]">
            <thead>
              <tr className="bg-[var(--fleet-background-secondary)]">
                <th className="border border-[var(--fleet-inputField-border-default)] px-4 py-2 text-left">
                  <Typography variant="default-semibold">Component</Typography>
                </th>
                <th className="border border-[var(--fleet-inputField-border-default)] px-4 py-2 text-left">
                  <Typography variant="default-semibold">Use Case</Typography>
                </th>
                <th className="border border-[var(--fleet-inputField-border-default)] px-4 py-2 text-left">
                  <Typography variant="default-semibold">Default Features</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="code">Textarea</Typography>
                </td>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="default">General multiline input</Typography>
                </td>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="default">3 rows, vertical resize, multiline text</Typography>
                </td>
              </tr>
              <tr>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="code">CodeTextarea</Typography>
                </td>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="default">Code editing</Typography>
                </td>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="default">Monospace font, both resize, code text style</Typography>
                </td>
              </tr>
              <tr>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="code">ChatTextarea</Typography>
                </td>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="default">Chat messages</Typography>
                </td>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="default">Auto-grow 1-8 lines, chat multiline text</Typography>
                </td>
              </tr>
              <tr>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="code">InnerTextarea</Typography>
                </td>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="default">Inline editing</Typography>
                </td>
                <td className="border border-[var(--fleet-inputField-border-default)] px-4 py-2">
                  <Typography variant="default">No resize, transparent borders</Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
} 