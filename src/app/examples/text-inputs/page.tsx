"use client"

import React, { useState } from "react"
import { TextInput } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Icon } from "@/components/ui/icon"
import { Typography } from "@/components/ui/typography"
import { Button } from "@/components/ui/button-shadcn"
import { ExampleSectionCard, ExamplePageTemplate } from "@/components/ui"

// Fleet's example constants - matching the original gallery
const exampleInputDefaultWidth = "w-64" // 256px
const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

export default function TextInputsPage() {
  const [isEnabled, setIsEnabled] = useState(true)

  return (
    <ExamplePageTemplate
      title="Fleet TextInput Gallery"
      description="React TextInput and Textarea components that exactly mirror Fleet Air (Compose) styling and behavior. These examples match the original Fleet gallery exactly. This uses default-multiline for proper leading after H1."
    >
        {/* One-Line TextInput */}
        <ExampleSectionCard title="One-Line TextInput">
          
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
                prefix="search"
                placeholder="Input with icon" 
                className={exampleInputDefaultWidth} 
              />
              <TextInput 
                type="password"
                placeholder="Password input" 
                className={exampleInputDefaultWidth} 
              />
              <TextInput 
                textStyle="code"
                placeholder="Code input" 
                className={exampleInputDefaultWidth} 
              />
              <TextInput 
                disabled
                prefix="search"
                placeholder="Disabled input with icon" 
                className={exampleInputDefaultWidth} 
              />
            </div>
          </div>
        </ExampleSectionCard>

        {/* Large TextInput */}
        <ExampleSectionCard title="Large TextInput">
          
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <TextInput 
                defaultValue={loremIpsum} 
                size="large"
                className={exampleInputDefaultWidth} 
              />
              <TextInput 
                size="large"
                placeholder="Large input with placeholder" 
                className={exampleInputDefaultWidth} 
              />
              <TextInput 
                size="large"
                disabled 
                placeholder="Disabled large input with placeholder" 
                className={exampleInputDefaultWidth} 
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <TextInput 
                size="large"
                prefix="search"
                placeholder="Input with icon" 
                className={exampleInputDefaultWidth} 
              />
              <TextInput 
                size="large"
                type="password"
                placeholder="Password input" 
                className={exampleInputDefaultWidth} 
              />
              <TextInput 
                size="large"
                disabled
                prefix="search"
                placeholder="Disabled large input with icon" 
                className={exampleInputDefaultWidth} 
              />
            </div>
          </div>
        </ExampleSectionCard>

        {/* Multiline TextInput with prefix and suffix */}
        <ExampleSectionCard title="Multiline TextInput with prefix and suffix">
          
          <div className="space-y-4">
            <Textarea
              rows={3}
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
        </ExampleSectionCard>

        {/* TextInput with Error */}
        <ExampleSectionCard title="TextInput with Error">
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <TextInput 
                error
                defaultValue={loremIpsum} 
                className={exampleInputDefaultWidth} 
              />
              <TextInput 
                error
                size="large"
                defaultValue={loremIpsum} 
                className={exampleInputDefaultWidth} 
              />
            </div>
          </div>
        </ExampleSectionCard>

        {/* Inner TextInput */}
        <ExampleSectionCard title="Inner TextInput">
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className={`${exampleInputDefaultWidth} px-1 py-0.5 flex items-center`}>
                <span className="pl-1"><Icon fleet="chevron-right" size="sm" /></span>
                <div className="w-1"></div>
                <TextInput 
                  variant="inner"
                  size="inner"
                  defaultValue={loremIpsum} 
                  className="flex-1" 
                />
              </div>

              <div className={`${exampleInputDefaultWidth} px-1 py-0.5 flex items-center`}>
                <span className="pl-1"><Icon fleet="chevron-right" size="sm" /></span>
                <div className="w-1"></div>
                <TextInput 
                  variant="inner"
                  size="inner"
                  disabled
                  placeholder="Disabled inner input" 
                  className="flex-1" 
                />
              </div>
            </div>
          </div>
        </ExampleSectionCard>

        {/* Borderless TextInput */}
        <ExampleSectionCard title="Borderless TextInput">
          
          <div className="space-y-4">
            <div className={`${exampleInputDefaultWidth} px-0 py-0 pb-0.5 flex items-center bg-[var(--fleet-background-secondary)] border border-[var(--fleet-inputField-border-default)] rounded`}>
              <button className="p-1 hover:bg-transparent focus:bg-transparent border-none bg-transparent text-[var(--fleet-text-secondary)]">
                <Icon fleet="chevron-left" size="sm" />
              </button>
              <div className="w-1"></div>
              <TextInput 
                variant="borderless"
                defaultValue={loremIpsum} 
                className="flex-1" 
              />
            </div>
          </div>
        </ExampleSectionCard>

        {/* Multiline TextInput with Scroll */}
        <ExampleSectionCard title="Multiline TextInput with Scroll">
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Textarea
                defaultValue={loremIpsum}
                rows={3}
                className={exampleInputDefaultWidth}
              />
              <Textarea
                placeholder="MultiLine&#10;Placeholder"
                rows={3}
                className={exampleInputDefaultWidth}
              />
            </div>
          </div>
        </ExampleSectionCard>

        {/* Multiline TextInput with Wrap */}
        <ExampleSectionCard title="Multiline TextInput with Wrap">
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Textarea
                defaultValue={loremIpsum}
                rows={3}
                className={exampleInputDefaultWidth}
              />
              <Textarea
                placeholder={"Placeholder that wraps! ".repeat(20)}
                rows={3}
                className={exampleInputDefaultWidth}
              />
            </div>
          </div>
        </ExampleSectionCard>

        {/* TextInput with Fixed Number of Lines */}
        <ExampleSectionCard title="TextInput with Fixed Number of Lines">
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Textarea
                defaultValue={loremIpsum}
                rows={3}
                resize="none"
                className={exampleInputDefaultWidth}
              />
              <Textarea
                placeholder={"Placeholder that wraps and scrolls! ".repeat(20)}
                rows={3}
                resize="none"
                className={exampleInputDefaultWidth}
              />
            </div>
          </div>
        </ExampleSectionCard>


        {/* Enabling and disabling TextInput */}
        <ExampleSectionCard title="Enabling and disabling TextInput">
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <TextInput
                defaultValue="Toggle enabled state"
                disabled={!isEnabled}
                placeholder="Type something here..."
                className={exampleInputDefaultWidth}
              />
<Button 
                onClick={() => setIsEnabled(!isEnabled)}
                variant="primary"
              >
                {isEnabled ? "Disable" : "Enable"}
              </Button>
            </div>
          </div>
        </ExampleSectionCard>

        {/* Fleet Component Reference */}
        <ExampleSectionCard title="Fleet Component Reference" description="These examples mirror the exact examples from Fleet&apos;s TextInput.kt gallery file.">
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border px-4 py-2 text-left">
                    <Typography variant="default-semibold">Example Name</Typography>
                  </th>
                  <th className="border border-border px-4 py-2 text-left">
                    <Typography variant="default-semibold">React Implementation</Typography>
                  </th>
                  <th className="border border-border px-4 py-2 text-left">
                    <Typography variant="default-semibold">Fleet Original</Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-2">
                    <Typography variant="default">One-Line TextInput</Typography>
                  </td>
                  <td className="border border-border px-4 py-2">
                    <Typography variant="code">&lt;TextInput /&gt;</Typography>
                  </td>
                  <td className="border border-border px-4 py-2">
                    <Typography variant="code">TextInput(textInputModel())</Typography>
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    <Typography variant="default">Large TextInput</Typography>
                  </td>
                  <td className="border border-border px-4 py-2">
                    <Typography variant="code">&lt;TextInput size=&quot;large&quot; /&gt;</Typography>
                  </td>
                  <td className="border border-border px-4 py-2">
                    <Typography variant="code">TextInput(..., style = largeTextInputStyle())</Typography>
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    <Typography variant="default">TextInput with Error</Typography>
                  </td>
                  <td className="border border-border px-4 py-2">
                    <Typography variant="code">&lt;TextInput error /&gt;</Typography>
                  </td>
                  <td className="border border-border px-4 py-2">
                    <Typography variant="code">TextInput(..., style = errorTextInputStyle())</Typography>
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    <Typography variant="default">Inner TextInput</Typography>
                  </td>
                  <td className="border border-border px-4 py-2">
                    <Typography variant="code">&lt;TextInput variant=&quot;inner&quot; size=&quot;inner&quot; /&gt;</Typography>
                  </td>
                  <td className="border border-border px-4 py-2">
                    <Typography variant="code">TextInput(..., style = innerTextInputStyle())</Typography>
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    <Typography variant="default">Borderless TextInput</Typography>
                  </td>
                  <td className="border border-border px-4 py-2">
                    <Typography variant="code">&lt;TextInput variant=&quot;borderless&quot; /&gt;</Typography>
                  </td>
                  <td className="border border-border px-4 py-2">
                    <Typography variant="code">TextInput(..., style = borderlessTextInputStyle())</Typography>
                  </td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">
                    <Typography variant="default">Multiline with prefix/suffix</Typography>
                  </td>
                  <td className="border border-border px-4 py-2">
                    <Typography variant="code">&lt;Textarea prefix=... suffix=... /&gt;</Typography>
                  </td>
                  <td className="border border-border px-4 py-2">
                    <Typography variant="code">TextInput(..., prefixBuilder = ..., suffixBuilder = ...)</Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ExampleSectionCard>
    </ExamplePageTemplate>
  ) 