"use client"

import React, { useState } from "react"
import { 
  ShadcnButton,
  ShadcnToggleButton,
  ShadcnGhostToggleButton,
  ShadcnSplitButton,
  ShadcnMenuButton
} from "@/components/ui/button-shadcn"
import { Typography } from "@/components/ui/typography"

export default function ShadcnButtonsPage() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})
  const [selectedStates, setSelectedStates] = useState<Record<string, boolean>>({})
  const [menuStates, setMenuStates] = useState<Record<string, boolean>>({})

  const toggleLoading = (key: string) => {
    setLoadingStates(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleSelected = (key: string) => {
    setSelectedStates(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleMenu = (key: string) => {
    setMenuStates(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-12">
      <div className="mb-8">
        <Typography variant="header-1-semibold" as="h1">
          shadcn/ui Foundation Buttons
        </Typography>
        <Typography variant="default" className="text-muted-foreground mt-2">
          Fleet Air button components built on shadcn/ui foundation with pixel-perfect Fleet styling
        </Typography>
      </div>

      {/* Basic Variants */}
      <section className="space-y-6">
        <Typography variant="header-2-semibold">Basic Variants</Typography>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Typography variant="header-3-semibold">Fleet Button Variants</Typography>
            <div className="flex flex-wrap gap-3 p-6 border border-border rounded-lg">
              <ShadcnButton variant="primary">Primary</ShadcnButton>
              <ShadcnButton variant="secondary">Secondary</ShadcnButton>
              <ShadcnButton variant="dangerous">Dangerous</ShadcnButton>
              <ShadcnButton variant="positive">Positive</ShadcnButton>
              <ShadcnButton variant="warning">Warning</ShadcnButton>
              <ShadcnButton variant="ghost">Ghost</ShadcnButton>
              <ShadcnButton variant="link">Link</ShadcnButton>
            </div>
          </div>

          <div className="space-y-2">
            <Typography variant="header-3-semibold">Special Button Types</Typography>
            <div className="flex flex-wrap gap-3 p-6 border border-border rounded-lg">
              <ShadcnButton variant="ai">AI</ShadcnButton>
              <ShadcnButton variant="pill">Pill</ShadcnButton>
              <ShadcnButton variant="tile">Tile</ShadcnButton>
            </div>
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-6">
        <Typography variant="header-2-semibold">Sizes</Typography>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Typography variant="header-3-semibold">All Available Sizes</Typography>
            <div className="flex flex-wrap items-center gap-3 p-6 border border-border rounded-lg">
              
              <ShadcnButton size="sm">Small</ShadcnButton>
              <ShadcnButton size="default">Default</ShadcnButton>
              <ShadcnButton size="lg">Large</ShadcnButton>
              <ShadcnButton size="icon" iconLeft="settings" />
                              <ShadcnButton variant="pill">Pill Variant</ShadcnButton>
            </div>
          </div>
        </div>
      </section>

      {/* States */}
      <section className="space-y-6">
        <Typography variant="header-2-semibold">Interactive States</Typography>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Typography variant="header-3-semibold">Loading States</Typography>
            <div className="flex flex-wrap gap-3 p-6 border border-border rounded-lg">
              <ShadcnButton 
                variant="primary"
                isLoading={loadingStates.primary}
                loadingText="Saving..."
                onClick={() => toggleLoading('primary')}
              >
                {loadingStates.primary ? 'Loading...' : 'Click to Load'}
              </ShadcnButton>
              <ShadcnButton 
                variant="secondary"
                isLoading={loadingStates.secondary}
                onClick={() => toggleLoading('secondary')}
              >
                {loadingStates.secondary ? 'Processing...' : 'Process'}
              </ShadcnButton>
            </div>
          </div>

          <div className="space-y-2">
            <Typography variant="header-3-semibold">Disabled States</Typography>
            <div className="flex flex-wrap gap-3 p-6 border border-border rounded-lg">
              <ShadcnButton variant="primary" disabled>Primary Disabled</ShadcnButton>
              <ShadcnButton variant="secondary" disabled>Secondary Disabled</ShadcnButton>
              <ShadcnButton variant="dangerous" disabled>Dangerous Disabled</ShadcnButton>
              <ShadcnButton variant="ghost" disabled>Ghost Disabled</ShadcnButton>
            </div>
          </div>
        </div>
      </section>

              {/* Icons & Content */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Icons & Content</Typography>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Typography variant="header-3-semibold">Fleet Icons Integration</Typography>
              <div className="flex flex-wrap gap-3 p-6 border border-border rounded-lg">
                <ShadcnButton variant="primary" iconLeft="run">Run</ShadcnButton>
                <ShadcnButton variant="secondary" iconRight="arrow-right">Next</ShadcnButton>
                <ShadcnButton variant="dangerous" iconLeft="trash">Delete</ShadcnButton>
                <ShadcnButton variant="positive" iconLeft="check">Approve</ShadcnButton>
                <ShadcnButton variant="ghost" iconLeft="settings" iconRight="chevron-down">
                  Settings
                </ShadcnButton>
              </div>
            </div>

            <div className="space-y-2">
              <Typography variant="header-3-semibold">Icon Only Buttons</Typography>
              <div className="flex flex-wrap gap-3 p-6 border border-border rounded-lg">
                <ShadcnButton variant="ghost" size="icon" iconLeft="settings" />
                <ShadcnButton variant="secondary" size="icon" iconLeft="search" />
                <ShadcnButton variant="primary" size="icon" iconLeft="run" />
                <ShadcnButton variant="dangerous" size="icon" iconLeft="trash" />
                <ShadcnButton variant="positive" size="icon" iconLeft="check" />
              </div>
            </div>

            <div className="space-y-2">
              <Typography variant="header-3-semibold">Hint Text</Typography>
              <div className="flex flex-wrap gap-3 p-6 border border-border rounded-lg">
                <ShadcnButton variant="primary" hintText="⌘R">Run</ShadcnButton>
                <ShadcnButton variant="secondary" hintText="⌘S">Save</ShadcnButton>
                <ShadcnButton variant="ghost" hintText="⌘K" iconLeft="search">Search</ShadcnButton>
              </div>
            </div>
          </div>
        </section>

        {/* Toggle Buttons */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Toggle Buttons</Typography>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Typography variant="header-3-semibold">Standard Toggle Buttons</Typography>
              <div className="flex flex-wrap gap-3 p-6 border border-border rounded-lg">
                <ShadcnToggleButton
                  selected={selectedStates.toggle1}
                  onClick={() => toggleSelected('toggle1')}
                >
                  Toggle Me
                </ShadcnToggleButton>
                <ShadcnToggleButton
                  variant="primary"
                  selected={selectedStates.toggle2}
                  onClick={() => toggleSelected('toggle2')}
                >
                  Primary Toggle
                </ShadcnToggleButton>
                <ShadcnToggleButton
                  variant="dangerous"
                  selected={selectedStates.toggle3}
                  onClick={() => toggleSelected('toggle3')}
                  iconLeft="star"
                >
                  Favorite
                </ShadcnToggleButton>
              </div>
            </div>

            <div className="space-y-2">
              <Typography variant="header-3-semibold">Ghost Toggle Buttons</Typography>
              <div className="flex flex-wrap gap-3 p-6 border border-border rounded-lg">
                <ShadcnGhostToggleButton
                  selected={selectedStates.ghost1}
                  onClick={() => toggleSelected('ghost1')}
                >
                  Ghost Toggle
                </ShadcnGhostToggleButton>
                <ShadcnGhostToggleButton
                  selected={selectedStates.ghost2}
                  onClick={() => toggleSelected('ghost2')}
                  iconLeft="view"
                >
                  View
                </ShadcnGhostToggleButton>
                <ShadcnGhostToggleButton
                  selected={selectedStates.ghost3}
                  onClick={() => toggleSelected('ghost3')}
                  size="icon"
                  iconLeft="bookmark"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Complex Buttons */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Complex Button Types</Typography>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Typography variant="header-3-semibold">Split Buttons</Typography>
              <div className="flex flex-wrap gap-3 p-6 border border-border rounded-lg">
                <ShadcnSplitButton
                  variant="primary"
                  menuOpen={menuStates.split1}
                  onMenuClick={() => toggleMenu('split1')}
                >
                  Deploy
                </ShadcnSplitButton>
                <ShadcnSplitButton
                  variant="secondary"
                  menuOpen={menuStates.split2}
                  onMenuClick={() => toggleMenu('split2')}
                  iconLeft="run"
                >
                  Run
                </ShadcnSplitButton>
                <ShadcnSplitButton
                  variant="dangerous"
                  menuOpen={menuStates.split3}
                  onMenuClick={() => toggleMenu('split3')}
                >
                  Delete
                </ShadcnSplitButton>
                <ShadcnSplitButton
                  variant="ai"
                  menuOpen={menuStates.split4}
                  onMenuClick={() => toggleMenu('split4')}
                >
                  AI Action
                </ShadcnSplitButton>
              </div>
            </div>

            <div className="space-y-2">
              <Typography variant="header-3-semibold">Menu Buttons</Typography>
              <div className="flex flex-wrap gap-3 p-6 border border-border rounded-lg">
                <ShadcnMenuButton
                  variant="secondary"
                  menuOpen={menuStates.menu1}
                  onMenuClick={() => toggleMenu('menu1')}
                >
                  Options
                </ShadcnMenuButton>
                <ShadcnMenuButton
                  variant="ghost"
                  menuOpen={menuStates.menu2}
                  onMenuClick={() => toggleMenu('menu2')}
                  iconLeft="settings"
                >
                  Settings
                </ShadcnMenuButton>
                <ShadcnMenuButton
                  variant="primary"
                  menuOpen={menuStates.menu3}
                  onMenuClick={() => toggleMenu('menu3')}
                >
                  More Actions
                </ShadcnMenuButton>
              </div>
            </div>
          </div>
        </section>

        {/* Ghost Button Variants */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Ghost Button Variants</Typography>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Typography variant="header-3-semibold">Ghost Button Sizes</Typography>
              <div className="space-y-3 p-6 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <Typography variant="small" className="w-16">Default:</Typography>
                  <ShadcnButton variant="ghost" size="icon" iconLeft="settings" />
                  <ShadcnButton variant="ghost" size="icon" iconLeft="settings" disabled />
                  <ShadcnButton variant="ghost" iconLeft="settings">Label</ShadcnButton>
                  <ShadcnButton variant="ghost" iconLeft="settings" disabled>Label</ShadcnButton>
                  <ShadcnButton variant="ghost">Label</ShadcnButton>
                  <ShadcnButton variant="ghost" disabled>Label</ShadcnButton>
                </div>
                <div className="flex items-center gap-4">
                  <Typography variant="small" className="w-16">Large:</Typography>
                  <ShadcnButton variant="ghost" size="lg" iconLeft="settings" />
                  <ShadcnButton variant="ghost" size="lg" iconLeft="settings" disabled />
                  <ShadcnButton variant="ghost" size="lg" iconLeft="settings">Label</ShadcnButton>
                  <ShadcnButton variant="ghost" size="lg" iconLeft="settings" disabled>Label</ShadcnButton>
                  <ShadcnButton variant="ghost" size="lg">Label</ShadcnButton>
                  <ShadcnButton variant="ghost" size="lg" disabled>Label</ShadcnButton>
                </div>
                <div className="flex items-center gap-4">
                  <Typography variant="small" className="w-16">Small:</Typography>
                  <ShadcnButton variant="ghost" size="sm" iconLeft="settings" />
                  <ShadcnButton variant="ghost" size="sm" iconLeft="settings" disabled />
                  <ShadcnButton variant="ghost" size="sm" iconLeft="settings">Label</ShadcnButton>
                  <ShadcnButton variant="ghost" size="sm" iconLeft="settings" disabled>Label</ShadcnButton>
                  <ShadcnButton variant="ghost" size="sm">Label</ShadcnButton>
                  <ShadcnButton variant="ghost" size="sm" disabled>Label</ShadcnButton>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* asChild Pattern */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">shadcn/ui asChild Pattern</Typography>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Typography variant="header-3-semibold">Button as Link</Typography>
              <div className="flex flex-wrap gap-3 p-6 border border-border rounded-lg">
                <ShadcnButton asChild variant="primary">
                  <a href="/typography">Typography Page</a>
                </ShadcnButton>
                <ShadcnButton asChild variant="secondary">
                  <a href="/colors">Colors Page</a>
                </ShadcnButton>
              </div>
              <Typography variant="small" className="text-muted-foreground">
                These buttons use the asChild prop to render as anchor tags while maintaining button styling.
              </Typography>
            </div>
          </div>
        </section>

        {/* Complete Fleet Gallery Compliance */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Fleet Gallery Compliance</Typography>
          
          <div className="space-y-4">
            <div className="p-6 border border-border rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Typography variant="header-4-semibold" className="mb-3">✅ Complete Fleet Button System</Typography>
                  <ul className="space-y-2">
                    <li><Typography variant="small">• All 10 Fleet button variants (Primary, Secondary, Dangerous, etc.)</Typography></li>
                    <li><Typography variant="small">• All 4 Fleet button sizes (sm, default, lg, icon)</Typography></li>
                    <li><Typography variant="small">• Toggle button functionality with selection states</Typography></li>
                    <li><Typography variant="small">• Split button implementation with dropdown indicators</Typography></li>
                    <li><Typography variant="small">• Menu button implementation with chevron animation</Typography></li>
                    <li><Typography variant="small">• Ghost button variants (Default, Large, Small, Tiny)</Typography></li>
                  </ul>
                </div>
                <div>
                  <Typography variant="header-4-semibold" className="mb-3">🎯 Advanced Features</Typography>
                  <ul className="space-y-2">
                    <li><Typography variant="small">• Loading states with spinners and custom text</Typography></li>
                    <li><Typography variant="small">• Fleet icon integration (Left, Right, Icon-only)</Typography></li>
                    <li><Typography variant="small">• Hint text support for keyboard shortcuts</Typography></li>
                    <li><Typography variant="small">• Exact Fleet color specifications and states</Typography></li>
                    <li><Typography variant="small">• Precise dimensions matching Fleet Compose</Typography></li>
                    <li><Typography variant="small">• Complete interaction states (hover, active, focus, disabled)</Typography></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}
