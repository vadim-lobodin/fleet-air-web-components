"use client"

import React, { useState } from "react"
import { Typography } from "@/components/ui/typography"
import { Toolbar, ToolbarButton, ToolbarSeparator } from "@/components/ui/toolbar"
import { ExampleSectionCard, ExamplePageTemplate } from "@/components/ui"

export default function ToolbarPage() {
  // State for demonstrating selected buttons
  const [selectedButtons, setSelectedButtons] = useState({
    run: false,
    debug: false,
    pause: false,
    stop: false,
    settings: false,
    search: false,
    view1: true,
    view2: false,
    tool1: false,
    tool2: true,
    tool3: false,
  })

  const toggleButton = (key: keyof typeof selectedButtons) => {
    setSelectedButtons(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <ExamplePageTemplate
      title="Fleet Toolbar"
      description="Toolbar component based on Figma design specifications with exact Fleet styling. This uses default-multiline for proper leading after H1."
    >

      {/* Regular Toolbar - Default Size (20x20 buttons) */}
      <ExampleSectionCard title="Regular Toolbar - Default Size">
        <div className="space-y-4">
          <Typography variant="default" className="text-muted-foreground">
            Default size toolbar with 20x20 icon buttons
          </Typography>
          <Toolbar variant="regular" size="default">
            <ToolbarButton 
              icon="run" 
              tooltip="Run"
              selected={selectedButtons.run}
              onClick={() => toggleButton('run')}
            />
            <ToolbarButton 
              icon="debugger" 
              tooltip="Debug"
              selected={selectedButtons.debug}
              onClick={() => toggleButton('debug')}
            />
            <ToolbarButton 
              icon="pause" 
              tooltip="Pause"
              selected={selectedButtons.pause}
              onClick={() => toggleButton('pause')}
            />
            <ToolbarButton 
              icon="stop" 
              tooltip="Stop"
              selected={selectedButtons.stop}
              onClick={() => toggleButton('stop')}
            />
            <ToolbarSeparator />
            <ToolbarButton 
              icon="settings" 
              tooltip="Settings"
              selected={selectedButtons.settings}
              onClick={() => toggleButton('settings')}
            />
            <ToolbarButton 
              icon="search" 
              tooltip="Search"
              selected={selectedButtons.search}
              onClick={() => toggleButton('search')}
            />
          </Toolbar>
        </div>
      </ExampleSectionCard>

      {/* Regular Toolbar - Large Size (28x28 buttons) */}
      <ExampleSectionCard title="Regular Toolbar - Large Size">
        <div className="space-y-4">
          <Typography variant="default" className="text-muted-foreground">
            Large size toolbar with 28x28 icon buttons
          </Typography>
          <Toolbar variant="regular" size="large">
            <ToolbarButton 
              icon="run" 
              tooltip="Run"
              selected={selectedButtons.run}
              onClick={() => toggleButton('run')}
            />
            <ToolbarButton 
              icon="debugger" 
              tooltip="Debug"
              selected={selectedButtons.debug}
              onClick={() => toggleButton('debug')}
            />
            <ToolbarButton 
              icon="pause" 
              tooltip="Pause"
              selected={selectedButtons.pause}
              onClick={() => toggleButton('pause')}
            />
            <ToolbarButton 
              icon="stop" 
              tooltip="Stop"
              selected={selectedButtons.stop}
              onClick={() => toggleButton('stop')}
            />
            <ToolbarSeparator />
            <ToolbarButton 
              icon="settings" 
              tooltip="Settings"
              selected={selectedButtons.settings}
              onClick={() => toggleButton('settings')}
            />
            <ToolbarButton 
              icon="search" 
              tooltip="Search"
              selected={selectedButtons.search}
              onClick={() => toggleButton('search')}
            />
          </Toolbar>
        </div>
      </ExampleSectionCard>

      {/* Floating Toolbar - Default Size */}
      <ExampleSectionCard title="Floating Toolbar - Default Size">
        <div className="space-y-4">
          <Typography variant="default" className="text-muted-foreground">
            Floating toolbar with rounded corners, border, and shadow (20x20 buttons)
          </Typography>
          <div className="flex justify-center p-8">
            <Toolbar variant="floating" size="default">
              <ToolbarButton 
                icon="chevron-down" 
                tooltip="Download"
                selected={selectedButtons.view1}
                onClick={() => toggleButton('view1')}
              />
              <ToolbarButton 
                icon="chevron-up" 
                tooltip="Upload"
                selected={selectedButtons.view2}
                onClick={() => toggleButton('view2')}
              />
              <ToolbarSeparator />
              <ToolbarButton 
                icon="vcs-diff" 
                tooltip="Diff"
                selected={selectedButtons.tool1}
                onClick={() => toggleButton('tool1')}
              />
              <ToolbarButton 
                icon="undo" 
                tooltip="Undo"
                selected={selectedButtons.tool2}
                onClick={() => toggleButton('tool2')}
              />
              <ToolbarButton 
                icon="vcs-added" 
                tooltip="Add to VCS"
                selected={selectedButtons.tool3}
                onClick={() => toggleButton('tool3')}
              />
            </Toolbar>
          </div>
        </div>
      </ExampleSectionCard>

      {/* Floating Toolbar - Large Size */}
      <ExampleSectionCard title="Floating Toolbar - Large Size">
        <div className="space-y-4">
          <Typography variant="default" className="text-muted-foreground">
            Large floating toolbar with rounded corners, border, and shadow (28x28 buttons)
          </Typography>
          <div className="flex justify-center p-8">
            <Toolbar variant="floating" size="large">
              <ToolbarButton 
                icon="chevron-down" 
                tooltip="Download"
                selected={selectedButtons.view1}
                onClick={() => toggleButton('view1')}
              />
              <ToolbarButton 
                icon="chevron-up" 
                tooltip="Upload"
                selected={selectedButtons.view2}
                onClick={() => toggleButton('view2')}
              />
              <ToolbarSeparator />
              <ToolbarButton 
                icon="vcs-diff" 
                tooltip="Diff"
                selected={selectedButtons.tool1}
                onClick={() => toggleButton('tool1')}
              />
              <ToolbarButton 
                icon="undo" 
                tooltip="Undo"
                selected={selectedButtons.tool2}
                onClick={() => toggleButton('tool2')}
              />
              <ToolbarButton 
                icon="vcs-added" 
                tooltip="Add to VCS"
                selected={selectedButtons.tool3}
                onClick={() => toggleButton('tool3')}
              />
            </Toolbar>
          </div>
        </div>
      </ExampleSectionCard>

      {/* Design Specifications */}
      <ExampleSectionCard title="Design Specifications">
        <div className="space-y-4">
          <Typography variant="header-3-semibold">Figma Design Variables Used:</Typography>
          <div className="space-y-2 text-sm font-mono">
            <div>• <span className="text-blue-600">ghostButton/off/background/default</span> → <code>--fleet-ghostButton-off-background-default</code></div>
            <div>• <span className="text-blue-600">ghostButton/off/background/hovered</span> → <code>--fleet-ghostButton-off-background-hovered</code></div>
            <div>• <span className="text-blue-600">ghostButton/on/background/default</span> → <code>--fleet-ghostButton-on-background-default</code></div>
            <div>• <span className="text-blue-600">popup/background/default</span> → <code>--fleet-popup-background</code></div>
            <div>• <span className="text-blue-600">popup/border/default</span> → <code>--fleet-popup-border</code></div>
            <div>• <span className="text-blue-600">separator/default</span> → <code>--fleet-separator-default</code></div>
          </div>
          
          <Typography variant="header-3-semibold" className="mt-4">Button Sizes:</Typography>
          <div className="space-y-2 text-sm">
            <div>• <strong>Default:</strong> 20x20px buttons (icon size)</div>
            <div>• <strong>Large:</strong> 28x28px buttons (toolbarLg size)</div>
          </div>
          
          <Typography variant="header-3-semibold" className="mt-4">Toolbar Variants:</Typography>
          <div className="space-y-2 text-sm">
            <div>• <strong>Regular:</strong> Inline toolbar for permanent placement</div>
            <div>• <strong>Floating:</strong> Elevated toolbar with 6px border radius and shadow</div>
          </div>
        </div>
      </ExampleSectionCard>
    </ExamplePageTemplate>
  );