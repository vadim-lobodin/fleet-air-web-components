"use client"

import React, { useState } from "react"
import { 
  Button,
  ToggleButton,
  GhostToggleButton,
  SplitButton,
  MenuButton
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
          Button
        </Typography>
        <Typography variant="default" className="text-muted-foreground mt-2">
          Fleet Air button components with pixel-perfect Fleet styling
        </Typography>
      </div>

      {/* Basic Variants */}
      <section className="space-y-6">
        <Typography variant="header-2-semibold">Basic Variants</Typography>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Typography variant="header-3-semibold">Fleet Button Variants</Typography>
            <div className="flex flex-wrap gap-3 p-6 border border-border rounded-lg">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="dangerous">Dangerous</Button>
              <Button variant="positive">Positive</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
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
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" iconLeft="settings" />
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
              <Button 
                variant="primary"
                isLoading={loadingStates.primary}
                loadingText="Saving..."
                onClick={() => toggleLoading('primary')}
              >
                {loadingStates.primary ? 'Loading...' : 'Click to Load'}
              </Button>
              <Button 
                variant="secondary"
                isLoading={loadingStates.secondary}
                onClick={() => toggleLoading('secondary')}
              >
                {loadingStates.secondary ? 'Processing...' : 'Process'}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Typography variant="header-3-semibold">Disabled States</Typography>
            <div className="flex flex-wrap gap-3 p-6 border border-border rounded-lg">
              <Button variant="primary" disabled>Primary Disabled</Button>
              <Button variant="secondary" disabled>Secondary Disabled</Button>
              <Button variant="dangerous" disabled>Dangerous Disabled</Button>
              <Button variant="ghost" disabled>Ghost Disabled</Button>
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
                <Button variant="primary" iconLeft="run">Run</Button>
                <Button variant="secondary" iconRight="arrow-right">Next</Button>
                <Button variant="dangerous" iconLeft="delete">Delete</Button>
                <Button variant="positive" iconLeft="checkmark">Approve</Button>
                <Button variant="ghost" iconLeft="settings" iconRight="chevron-down">
                  Settings
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Typography variant="header-3-semibold">Icon Only Buttons</Typography>
              <div className="flex flex-wrap gap-3 p-6 border border-border rounded-lg">
                <Button variant="ghost" size="icon" iconLeft="settings" />
                <Button variant="secondary" size="icon" iconLeft="search" />
                <Button variant="primary" size="icon" iconLeft="run" />
                <Button variant="dangerous" size="icon" iconLeft="delete" />
                <Button variant="positive" size="icon" iconLeft="checkmark" />
              </div>
            </div>

            <div className="space-y-2">
              <Typography variant="header-3-semibold">Hint Text</Typography>
              <div className="flex flex-wrap gap-3 p-6 border border-border rounded-lg">
                <Button variant="primary" hintText="⌘R">Run</Button>
                <Button variant="secondary" hintText="⌘S">Save</Button>
                <Button variant="ghost" hintText="⌘K" iconLeft="search">Search</Button>
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
                <ToggleButton
                  selected={selectedStates.toggle1}
                  onClick={() => toggleSelected('toggle1')}
                >
                  Toggle Me
                </ToggleButton>
                <ToggleButton
                  variant="primary"
                  selected={selectedStates.toggle2}
                  onClick={() => toggleSelected('toggle2')}
                >
                  Primary Toggle
                </ToggleButton>
                <ToggleButton
                  variant="dangerous"
                  selected={selectedStates.toggle3}
                  onClick={() => toggleSelected('toggle3')}
                  iconLeft="error"
                >
                  Favorite
                </ToggleButton>
              </div>
            </div>

            <div className="space-y-2">
              <Typography variant="header-3-semibold">Ghost Toggle Buttons</Typography>
              <div className="flex flex-wrap gap-3 p-6 border border-border rounded-lg">
                <GhostToggleButton
                  selected={selectedStates.ghost1}
                  onClick={() => toggleSelected('ghost1')}
                >
                  Ghost Toggle
                </GhostToggleButton>
                <GhostToggleButton
                  selected={selectedStates.ghost2}
                  onClick={() => toggleSelected('ghost2')}
                  iconLeft="search"
                >
                  View
                </GhostToggleButton>
                <GhostToggleButton
                  selected={selectedStates.ghost3}
                  onClick={() => toggleSelected('ghost3')}
                  size="icon"
                  iconLeft="add"
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
              <div className="space-y-3 p-6 border border-border rounded-lg">
                <div className="flex flex-wrap gap-2">
                  <SplitButton
                    variant="primary"
                    menuOpen={menuStates.splitPrimary}
                    onMenuClick={() => toggleMenu('splitPrimary')}
                  >
                    Action 1
                  </SplitButton>
                  <SplitButton
                    variant="primary"
                    disabled
                    menuOpen={menuStates.splitPrimaryDisabled}
                    onMenuClick={() => toggleMenu('splitPrimaryDisabled')}
                  >
                    Action 1
                  </SplitButton>
                </div>
                <div className="flex flex-wrap gap-2">
                  <SplitButton
                    variant="secondary"
                    menuOpen={menuStates.splitSecondary}
                    onMenuClick={() => toggleMenu('splitSecondary')}
                  >
                    Action 1
                  </SplitButton>
                  <SplitButton
                    variant="secondary"
                    disabled
                    menuOpen={menuStates.splitSecondaryDisabled}
                    onMenuClick={() => toggleMenu('splitSecondaryDisabled')}
                  >
                    Action 1
                  </SplitButton>
                </div>
                <div className="flex flex-wrap gap-2">
                  <SplitButton
                    variant="dangerous"
                    menuOpen={menuStates.splitDangerous}
                    onMenuClick={() => toggleMenu('splitDangerous')}
                  >
                    Action 1
                  </SplitButton>
                  <SplitButton
                    variant="dangerous"
                    disabled
                    menuOpen={menuStates.splitDangerousDisabled}
                    onMenuClick={() => toggleMenu('splitDangerousDisabled')}
                  >
                    Action 1
                  </SplitButton>
                </div>
                <div className="flex flex-wrap gap-2">
                  <SplitButton
                    variant="warning"
                    menuOpen={menuStates.splitWarning}
                    onMenuClick={() => toggleMenu('splitWarning')}
                  >
                    Action 1
                  </SplitButton>
                  <SplitButton
                    variant="warning"
                    disabled
                    menuOpen={menuStates.splitWarningDisabled}
                    onMenuClick={() => toggleMenu('splitWarningDisabled')}
                  >
                    Action 1
                  </SplitButton>
                </div>
                <div className="flex flex-wrap gap-2">
                  <SplitButton
                    variant="positive"
                    menuOpen={menuStates.splitPositive}
                    onMenuClick={() => toggleMenu('splitPositive')}
                  >
                    Action 1
                  </SplitButton>
                  <SplitButton
                    variant="positive"
                    disabled
                    menuOpen={menuStates.splitPositiveDisabled}
                    onMenuClick={() => toggleMenu('splitPositiveDisabled')}
                  >
                    Action 1
                  </SplitButton>
                </div>
                <div className="flex flex-wrap gap-2">
                  <SplitButton
                    variant="primary"
                    menuOpen={menuStates.splitLong}
                    onMenuClick={() => toggleMenu('splitLong')}
                  >
                    Long long long button text
                  </SplitButton>
                  <SplitButton
                    variant="secondary"
                    disabled
                    menuOpen={menuStates.splitLongDisabled}
                    onMenuClick={() => toggleMenu('splitLongDisabled')}
                  >
                    Long long long button text
                  </SplitButton>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Typography variant="header-3-semibold">Menu Buttons</Typography>
              <div className="flex flex-wrap gap-2 p-6 border border-border rounded-lg">
                <MenuButton
                  variant="secondary"
                  menuOpen={menuStates.menu1}
                  onMenuClick={() => toggleMenu('menu1')}
                >
                  Action 1
                </MenuButton>
                <MenuButton
                  variant="secondary"
                  disabled
                  menuOpen={menuStates.menu1Disabled}
                  onMenuClick={() => toggleMenu('menu1Disabled')}
                >
                  Action 1
                </MenuButton>
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
                  <Button variant="ghost" size="icon" iconLeft="settings" />
                  <Button variant="ghost" size="icon" iconLeft="settings" disabled />
                  <Button variant="ghost" iconLeft="settings">Label</Button>
                  <Button variant="ghost" iconLeft="settings" disabled>Label</Button>
                  <Button variant="ghost">Label</Button>
                  <Button variant="ghost" disabled>Label</Button>
                </div>
                <div className="flex items-center gap-4">
                  <Typography variant="small" className="w-16">Large:</Typography>
                  <Button variant="ghost" size="lg" iconLeft="settings" />
                  <Button variant="ghost" size="lg" iconLeft="settings" disabled />
                  <Button variant="ghost" size="lg" iconLeft="settings">Label</Button>
                  <Button variant="ghost" size="lg" iconLeft="settings" disabled>Label</Button>
                  <Button variant="ghost" size="lg">Label</Button>
                  <Button variant="ghost" size="lg" disabled>Label</Button>
                </div>
                <div className="flex items-center gap-4">
                  <Typography variant="small" className="w-16">Small:</Typography>
                  <Button variant="ghost" size="sm" iconLeft="settings" />
                  <Button variant="ghost" size="sm" iconLeft="settings" disabled />
                  <Button variant="ghost" size="sm" iconLeft="settings">Label</Button>
                  <Button variant="ghost" size="sm" iconLeft="settings" disabled>Label</Button>
                  <Button variant="ghost" size="sm">Label</Button>
                  <Button variant="ghost" size="sm" disabled>Label</Button>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* asChild Pattern */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">asChild Pattern</Typography>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Typography variant="header-3-semibold">Button as Link</Typography>
              <div className="flex flex-wrap gap-3 p-6 border border-border rounded-lg">
                <Button asChild variant="primary">
                  <a href="/typography">Typography Page</a>
                </Button>
                <Button asChild variant="secondary">
                  <a href="/colors">Colors Page</a>
                </Button>
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
                    <li><Typography variant="small">• All core Fleet button variants (Primary, Secondary, Dangerous, etc.)</Typography></li>
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
