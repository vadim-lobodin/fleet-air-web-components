"use client"

import React, { useState } from "react"
import { Typography } from "@/components/ui/typography"
import {
  Button,
  ToggleButton,
  GhostToggleButton,
  SplitButton,
  MenuButton
} from "@/components/ui/button-shadcn"
import {
  ExampleSectionCard
} from "@/components/ui"

function ButtonsPage() {
  // Regular toggle buttons - each has its own state
  const [toggle1, setToggle1] = useState(false)
  const [toggle2, setToggle2] = useState(true)
  
  // Ghost toggle buttons - each has its own state
  const [ghostToggle1, setGhostToggle1] = useState(false)
  const [ghostToggle2, setGhostToggle2] = useState(true)
  
  // Menu states
  const [menuOpen1, setMenuOpen1] = useState(false)
  const [menuOpen2, setMenuOpen2] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <Typography variant="header-1-semibold">Fleet Air Buttons</Typography>
        <Typography variant="default" className="text-muted-foreground mt-2">
          React components that mirror Fleet Air (Compose) button styling
        </Typography>
      </div>

      {/* Basic Button Variants */}
      <ExampleSectionCard title="Button Variants">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="dangerous">Dangerous</Button>
            <Button variant="positive">Positive</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </ExampleSectionCard>

      {/* Button Sizes */}
      <ExampleSectionCard title="Button Sizes">
          <div className="flex items-center gap-4">
            <Button variant="secondary" size="sm">Small</Button>
            <Button variant="secondary" size="default">Default</Button>
            <Button variant="secondary" size="lg">Large</Button>
            <Button variant="ghost" size="icon" iconLeft="settings" />
            <Button variant="ghost" size="toolbar" iconLeft="run" />
          </div>
        </ExampleSectionCard>

      {/* Toolbar Icons */}
      <ExampleSectionCard title="Toolbar Icons">
          <div>
            <Typography variant="default" className="mb-2 font-medium">Icon-only toolbar buttons (16px icons):</Typography>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="toolbar" iconLeft="run" />
              <Button variant="ghost" size="toolbar" iconLeft="pause" />
              <Button variant="ghost" size="toolbar" iconLeft="stop" />
              <Button variant="ghost" size="toolbar" iconLeft="reload" />
              <Button variant="ghost" size="toolbar" iconLeft="settings" />
              <Button variant="ghost" size="toolbar" iconLeft="search" />
              <Button variant="ghost" size="toolbar" iconLeft="menu" />
              <Button variant="ghost" size="toolbar" iconLeft="user" />
            </div>
          </div>
        </ExampleSectionCard>

      {/* Button States */}
      <ExampleSectionCard title="Button States">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button variant="primary">Normal</Button>
              <Button variant="primary" disabled>Disabled</Button>
              <Button variant="primary" isLoading>Loading</Button>
              <Button variant="primary" isLoading loadingText="Processing...">Loading with Text</Button>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="secondary">Normal</Button>
              <Button variant="secondary" disabled>Disabled</Button>
              <Button variant="secondary" isLoading>Loading</Button>
            </div>
          </div>
        </ExampleSectionCard>

      {/* Toggle Buttons - The Main Focus */}
      <ExampleSectionCard title="Toggle Buttons (Fleet Style)">
          <div className="space-y-6">
            <div>
              <Typography variant="header-3-semibold" className="mb-3">Regular Toggle Buttons</Typography>
              <div className="flex items-center gap-4">
                <ToggleButton 
                  selected={toggle1} 
                  onClick={() => setToggle1(!toggle1)}
                >
                  {toggle1 ? 'Toggle On' : 'Toggle Off'}
                </ToggleButton>
                <ToggleButton 
                  selected={toggle2} 
                  onClick={() => setToggle2(!toggle2)}
                >
                  {toggle2 ? 'Toggle On' : 'Toggle Off'}
                </ToggleButton>
                <ToggleButton 
                  selected={false} 
                  disabled
                >
                  Disabled Off
                </ToggleButton>
                <ToggleButton 
                  selected={true} 
                  disabled
                >
                  Disabled On
                </ToggleButton>
              </div>
            </div>
            
            <div>
              <Typography variant="header-3-semibold" className="mb-3">Ghost Toggle Buttons</Typography>
              <div className="flex items-center gap-4">
                <GhostToggleButton 
                  selected={ghostToggle1} 
                  onClick={() => setGhostToggle1(!ghostToggle1)}
                  iconLeft="show"
                >
                  {ghostToggle1 ? 'Visible' : 'Hidden'}
                </GhostToggleButton>
                <GhostToggleButton 
                  selected={ghostToggle2} 
                  onClick={() => setGhostToggle2(!ghostToggle2)}
                  iconLeft="pin"
                >
                  {ghostToggle2 ? 'Pinned' : 'Unpinned'}
                </GhostToggleButton>
                <GhostToggleButton 
                  selected={false} 
                  disabled
                  iconLeft="locked"
                >
                  Disabled Off
                </GhostToggleButton>
                <GhostToggleButton 
                  selected={true} 
                  disabled
                  iconLeft="locked"
                >
                  Disabled On
                </GhostToggleButton>
              </div>
            </div>
          </div>
        </ExampleSectionCard>

      {/* Buttons with Icons */}
      <ExampleSectionCard title="Buttons with Icons">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button variant="primary" iconLeft="add">Add Item</Button>
              <Button variant="secondary" iconRight="external-link">Open External</Button>
              <Button variant="dangerous" iconLeft="delete">Delete</Button>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" iconLeft="settings" />
              <Button variant="ghost" size="icon" iconLeft="search" />
              <Button variant="ghost" size="icon" iconLeft="more-horizontal" />
            </div>
          </div>
        </ExampleSectionCard>

      {/* Split and Menu Buttons */}
      <ExampleSectionCard title="Split and Menu Buttons">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <SplitButton 
                variant="primary"
                onClick={() => console.log('Primary action')}
                onMenuClick={() => setMenuOpen1(!menuOpen1)}
                menuOpen={menuOpen1}
              >
                Deploy
              </SplitButton>
              
              <SplitButton 
                variant="secondary"
                onClick={() => console.log('Secondary action')}
                onMenuClick={() => setMenuOpen2(!menuOpen2)}
                menuOpen={menuOpen2}
              >
                More Actions
              </SplitButton>
            </div>
            
            <div className="flex items-center gap-4">
              <MenuButton variant="secondary">
                Options
              </MenuButton>
              
              <MenuButton variant="ghost" size="icon" />
            </div>
          </div>
        </ExampleSectionCard>

      {/* Button with Hints */}
      <ExampleSectionCard title="Buttons with Keyboard Hints">
          <div className="flex items-center gap-4">
            <Button variant="primary" hintText="⌘+S">Save</Button>
            <Button variant="secondary" hintText="⌘+O">Open</Button>
            <Button variant="ghost" iconLeft="search" hintText="⌘+K">Search</Button>
          </div>
        </ExampleSectionCard>

      {/* Disabled States */}
      <ExampleSectionCard title="Disabled States">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" disabled>Primary</Button>
            <Button variant="secondary" disabled>Secondary</Button>
            <Button variant="dangerous" disabled>Dangerous</Button>
            <Button variant="positive" disabled>Positive</Button>
            <Button variant="warning" disabled>Warning</Button>
            <Button variant="ghost" disabled>Ghost</Button>
            <Button variant="link" disabled>Link</Button>
          </div>
      </ExampleSectionCard>
    </div>
  )
}

export default ButtonsPage
