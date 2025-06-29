"use client"

import React, { useState } from "react"
import { 
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
  CodeTextInput,
  LargeCodeTextInput,
  PasswordTextInput,
  LargePasswordTextInput,
  GrowingTextInput,
  MultilineTextInput,
  MultilineCodeTextInput,
} from "@/components/ui/input"
import { Search, User, Mail, Lock, Eye, EyeOff, Settings, ChevronRight, ArrowLeft } from "lucide-react"

// Fleet's example constants
const exampleInputDefaultWidth = "w-64" // 256px
const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

export default function TextInputsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isEnabled, setIsEnabled] = useState(true)
  const [enabledInputValue, setEnabledInputValue] = useState("Toggle enabled state")

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">Fleet Air TextInput Gallery</h1>
          <p className="text-muted-foreground">
            React TextInput components that exactly mirror Fleet Air (Compose) styling and behavior
          </p>
        </div>

        {/* One-Line TextInput */}
        <section>
          <h2 className="text-xl font-semibold mb-4">One-Line TextInput</h2>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <TextInput 
                defaultValue={loremIpsum} 
                className={exampleInputDefaultWidth} 
              />
              <TextInput 
                placeholder="Some placeholder" 
                className={exampleInputDefaultWidth} 
              />
              <TextInput 
                disabled 
                placeholder="Disabled input with placeholder" 
                className={exampleInputDefaultWidth} 
              />
              <TextInput 
                disabled 
                defaultValue="Disabled input with text" 
                className={exampleInputDefaultWidth} 
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <TextInput 
                prefix={<Search className="h-4 w-4" />}
                placeholder="Input with icon" 
                className={exampleInputDefaultWidth} 
              />
              <PasswordTextInput 
                placeholder="Password input" 
                className={exampleInputDefaultWidth} 
              />
              <CodeTextInput 
                placeholder="Code input" 
                className={exampleInputDefaultWidth} 
              />
              <TextInput 
                disabled
                prefix={<Search className="h-4 w-4" />}
                placeholder="Disabled input with icon" 
                className={exampleInputDefaultWidth} 
              />
            </div>
          </div>
        </section>

        {/* Large TextInput */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Large TextInput</h2>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <LargeTextInput 
                defaultValue={loremIpsum} 
                className={exampleInputDefaultWidth} 
              />
              <LargeTextInput 
                placeholder="Large input with placeholder" 
                className={exampleInputDefaultWidth} 
              />
              <LargeTextInput 
                disabled 
                placeholder="Disabled large input with placeholder" 
                className={exampleInputDefaultWidth} 
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <LargeTextInput 
                prefix={<Search className="h-4 w-4" />}
                placeholder="Input with icon" 
                className={exampleInputDefaultWidth} 
              />
              <LargePasswordTextInput 
                placeholder="Password input" 
                className={exampleInputDefaultWidth} 
              />
              <LargeTextInput 
                disabled
                prefix={<Search className="h-4 w-4" />}
                placeholder="Disabled large input with icon" 
                className={exampleInputDefaultWidth} 
              />
            </div>
          </div>
        </section>

        {/* Multiline TextInput with prefix and suffix */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Multiline TextInput with prefix and suffix</h2>
          <div className="space-y-4">
            <MultilineTextInput
              minLines={3}
              placeholder="with placeholder"
              className={exampleInputDefaultWidth}
              prefix={
                <div className="border border-border p-1">
                  <span className="text-xs">With prefix on top,</span>
                </div>
              }
              prefixAlignment="top"
              suffix={
                <div className="border border-border p-1">
                  <span className="text-xs">and suffix at the bottom!</span>
                </div>
              }
              suffixAlignment="bottom"
            />
          </div>
        </section>

        {/* TextInput with Error */}
        <section>
          <h2 className="text-xl font-semibold mb-4">TextInput with Error</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <ErrorTextInput 
                defaultValue={loremIpsum} 
                className={exampleInputDefaultWidth} 
              />
              <LargeErrorTextInput 
                defaultValue={loremIpsum} 
                className={exampleInputDefaultWidth} 
              />
            </div>
          </div>
        </section>

        {/* Inner TextInput */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Inner TextInput</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className={`${exampleInputDefaultWidth} px-1 py-0.5 flex items-center`}>
                <ChevronRight className="h-4 w-4" />
                <div className="w-1"></div>
                <InnerTextInput 
                  defaultValue={loremIpsum} 
                  className="flex-1" 
                />
              </div>

              <div className={`${exampleInputDefaultWidth} px-1 py-0.5 flex items-center`}>
                <ChevronRight className="h-4 w-4" />
                <div className="w-1"></div>
                <InnerTextInput 
                  disabled
                  placeholder="Disabled inner input" 
                  className="flex-1" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Borderless TextInput */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Borderless TextInput</h2>
          <div className="space-y-4">
            <div className={`${exampleInputDefaultWidth} px-0 py-0 pb-0.5 flex items-center bg-muted border border-border rounded`}>
              <button className="p-1 hover:bg-muted-foreground/10 rounded">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div className="w-1"></div>
              <BorderlessTextInput 
                defaultValue={loremIpsum} 
                className="flex-1" 
              />
            </div>
          </div>
        </section>

        {/* Multiline TextInput with Scroll */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Multiline TextInput with Scroll</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <MultilineTextInput
                defaultValue={loremIpsum}
                minLines={3}
                className={exampleInputDefaultWidth}
              />
              <MultilineTextInput
                placeholder="MultiLine\nPlaceholder"
                minLines={3}
                className={exampleInputDefaultWidth}
              />
            </div>
          </div>
        </section>

        {/* Multiline TextInput with Wrap */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Multiline TextInput with Wrap</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <MultilineTextInput
                defaultValue={loremIpsum}
                minLines={3}
                softWrap={true}
                className={exampleInputDefaultWidth}
              />
              <MultilineTextInput
                placeholder={"Placeholder that wraps! ".repeat(20)}
                minLines={3}
                softWrap={true}
                className={exampleInputDefaultWidth}
              />
            </div>
          </div>
        </section>

        {/* TextInput with Fixed Number of Lines */}
        <section>
          <h2 className="text-xl font-semibold mb-4">TextInput with Fixed Number of Lines</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <MultilineTextInput
                defaultValue={loremIpsum}
                minLines={3}
                maxLines={3}
                softWrap={true}
                className={exampleInputDefaultWidth}
              />
              <MultilineTextInput
                placeholder={"Placeholder that wraps and scrolls! ".repeat(20)}
                minLines={3}
                maxLines={3}
                softWrap={true}
                className={exampleInputDefaultWidth}
              />
            </div>
          </div>
        </section>

        {/* Growing TextInput */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Growing TextInput</h2>
          <div className="space-y-4">
            <div className="flex justify-start">
              <GrowingTextInput 
                placeholder="Type here…" 
              />
            </div>
          </div>
        </section>

        {/* Enabling and disabling TextInput */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Enabling and disabling TextInput</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <TextInput
                value={enabledInputValue}
                onChange={(e) => setEnabledInputValue(e.target.value)}
                disabled={!isEnabled}
                placeholder="Type something here..."
                className={exampleInputDefaultWidth}
              />
              <button 
                onClick={() => setIsEnabled(!isEnabled)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
              >
                {isEnabled ? "Disable" : "Enable"}
              </button>
            </div>
          </div>
        </section>

        {/* Fleet Component Variants */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Fleet Component Variants</h2>
          <p className="text-muted-foreground mb-4">
            These components match Fleet&apos;s exact styling and dimensions from the Compose implementation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">DefaultTextInput (24px height, 6px padding)</label>
                <DefaultTextInput placeholder="Fleet default style" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">LargeTextInput (28px height, 8px padding)</label>
                <LargeTextInput placeholder="Fleet large style" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">InnerTextInput (18px height, minimal padding)</label>
                <InnerTextInput placeholder="Fleet inner style" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">BorderlessTextInput (no borders)</label>
                <BorderlessTextInput placeholder="Fleet borderless style" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">CodeTextInput (monospace font)</label>
                <CodeTextInput placeholder="const example = 'code';" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">ErrorTextInput (red borders and focus)</label>
                <ErrorTextInput placeholder="Fleet error style" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">LargeErrorTextInput (large + error)</label>
                <LargeErrorTextInput placeholder="Fleet large error style" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">InnerErrorTextInput (inner + error)</label>
                <InnerErrorTextInput placeholder="Fleet inner error style" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">BorderlessTransparentTextInput (fully transparent)</label>
                <BorderlessTransparentTextInput placeholder="Fleet borderless transparent" />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">LargeCodeTextInput (large + monospace)</label>
                <LargeCodeTextInput placeholder="const largeCode = true;" />
              </div>
            </div>
          </div>
        </section>

        {/* Tree Cell Variants */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Tree Cell Variants</h2>
          <p className="text-muted-foreground mb-4">
            Special variants used in Fleet&apos;s tree components for inline editing.
          </p>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="text-sm font-medium mb-2 block">TreeCellInnerTextInput</label>
              <TreeCellInnerTextInput placeholder="Tree cell input" />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">TreeCellInnerErrorTextInput</label>
              <TreeCellInnerErrorTextInput placeholder="Tree cell error input" />
            </div>
          </div>
        </section>

        {/* Advanced Examples */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Advanced Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search with Icon</label>
                <TextInput 
                  prefix={<Search className="h-4 w-4" />}
                  placeholder="Search files..."
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Password with Toggle</label>
                <TextInput 
                  type={showPassword ? "text" : "password"}
                  prefix={<Lock className="h-4 w-4" />}
                  suffix={
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 hover:bg-muted rounded"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                  placeholder="Enter password"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Multiline Code</label>
                <MultilineCodeTextInput
                  minLines={4}
                  placeholder="function example() {&#10;  return 'Hello World';&#10;}"
                  className="font-mono"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">User Input</label>
                <TextInput 
                  prefix={<User className="h-4 w-4" />}
                  placeholder="Enter username"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Email with Validation</label>
                <TextInput 
                  type="email"
                  prefix={<Mail className="h-4 w-4" />}
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Settings Input</label>
                <TextInput 
                  prefix={<Settings className="h-4 w-4" />}
                  suffix={
                    <button className="p-1 hover:bg-muted rounded">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  }
                  placeholder="Configuration value"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 