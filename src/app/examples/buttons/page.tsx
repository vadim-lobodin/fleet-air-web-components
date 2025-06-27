"use client"

import React, { useState } from "react"
import {
  Button,
  ToggleButton,
  GhostToggleButton,
  SplitButton,
  MenuButton
} from "@/components/ui/button-shadcn"
export default function ButtonsPage() {
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
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">Fleet Air Buttons</h1>
          <p className="text-muted-foreground">
            React components that mirror Fleet Air (Compose) button styling
          </p>
        </div>

        {/* Basic Button Variants */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Button Variants</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="dangerous">Dangerous</Button>
            <Button variant="positive">Positive</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        {/* Button Sizes */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Button Sizes</h2>
          <div className="flex items-center gap-4">
            <Button variant="secondary" size="sm">Small</Button>
            <Button variant="secondary" size="default">Default</Button>
            <Button variant="secondary" size="lg">Large</Button>
            <Button variant="ghost" size="icon" iconLeft="settings" />
          </div>
        </section>

        {/* Button States */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Button States</h2>
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
        </section>

        {/* Toggle Buttons - The Main Focus */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Toggle Buttons (Fleet Style)</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Regular Toggle Buttons</h3>
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
              <h3 className="text-lg font-medium mb-3">Ghost Toggle Buttons</h3>
              <div className="flex items-center gap-4">
                <GhostToggleButton 
                  selected={ghostToggle1} 
                  onClick={() => setGhostToggle1(!ghostToggle1)}
                  iconLeft="Eye"
                >
                  {ghostToggle1 ? 'Visible' : 'Hidden'}
                </GhostToggleButton>
                <GhostToggleButton 
                  selected={ghostToggle2} 
                  onClick={() => setGhostToggle2(!ghostToggle2)}
                  iconLeft="Star"
                >
                  {ghostToggle2 ? 'Starred' : 'Unstarred'}
                </GhostToggleButton>
                <GhostToggleButton 
                  selected={false} 
                  disabled
                  iconLeft="Lock"
                >
                  Disabled Off
                </GhostToggleButton>
                <GhostToggleButton 
                  selected={true} 
                  disabled
                  iconLeft="Lock"
                >
                  Disabled On
                </GhostToggleButton>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons with Icons */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Buttons with Icons</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button variant="primary" iconLeft="add">Add Item</Button>
              <Button variant="secondary" iconRight="external-link">Open External</Button>
              <Button variant="dangerous" iconLeft="close">Delete</Button>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" iconLeft="settings" />
              <Button variant="ghost" size="icon" iconLeft="search" />
              <Button variant="ghost" size="icon" iconLeft="more-horizontal" />
            </div>
          </div>
        </section>

        {/* Split and Menu Buttons */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Split and Menu Buttons</h2>
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
        </section>

        {/* Button with Hints */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Buttons with Keyboard Hints</h2>
          <div className="flex items-center gap-4">
            <Button variant="primary" hintText="⌘+S">Save</Button>
            <Button variant="secondary" hintText="⌘+O">Open</Button>
            <Button variant="ghost" iconLeft="search" hintText="⌘+K">Search</Button>
          </div>
        </section>

        {/* Disabled States */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Disabled States</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" disabled>Primary</Button>
            <Button variant="secondary" disabled>Secondary</Button>
            <Button variant="dangerous" disabled>Dangerous</Button>
            <Button variant="positive" disabled>Positive</Button>
            <Button variant="warning" disabled>Warning</Button>
            <Button variant="ghost" disabled>Ghost</Button>
            <Button variant="link" disabled>Link</Button>
          </div>
        </section>
      </div>
    </div>
  )
}
