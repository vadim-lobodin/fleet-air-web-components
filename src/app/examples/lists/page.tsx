"use client"

import React, { useState } from "react"
import { Typography } from "@/components/ui/typography"
import { List, FleetListCell } from "@/components/ui"
import { Icon } from "@/components/ui/icon"
import { Button } from "@/components/ui/button-shadcn"

interface FleetListItemVariant {
  id: string
  name: string
  variant: 'default' | 'hint' | 'chevron' | 'icon' | 'iconOverlay' | 'iconRight' | 'counter' | 'checkbox' | 'buttons' | 'rightHint'
  props?: Record<string, unknown>
}

const fleetVariants: FleetListItemVariant[] = [
  {
    id: '1',
    name: 'Default',
    variant: 'default'
  },
  {
    id: '2', 
    name: 'Default',
    variant: 'hint',
    props: { hint: 'Hint' }
  },
  {
    id: '3',
    name: 'Chevron',
    variant: 'chevron'
  },
  {
    id: '4',
    name: 'Icon (with Overlay)',
    variant: 'iconOverlay',
    props: { 
      icon: <Icon fleet="ai-file" size="sm" />, 
      hasOverlay: true 
    }
  },
  {
    id: '5',
    name: 'Icon (without Overlay)',
    variant: 'icon',
    props: { icon: <Icon fleet="ai-file" size="sm" /> }
  },
  {
    id: '6',
    name: 'Icon Right',
    variant: 'iconRight',
    props: { rightIcon: <Icon fleet="external-link" size="sm" /> }
  },
  {
    id: '7',
    name: 'Counter',
    variant: 'counter',
    props: { counter: '3' }
  },
  {
    id: '8',
    name: 'Controls (Checkbox)',
    variant: 'checkbox',
    props: { checked: false }
  },
  {
    id: '9',
    name: 'Controls (Buttons)',
    variant: 'buttons',
    props: { 
      buttons: [
        { label: 'Cancel', onClick: () => alert('Cancel clicked'), variant: 'secondary' as const }
      ],
rightIcon: <Button size="icon" variant="ghost" onClick={() => alert('Icon clicked')}><Icon fleet="more-horizontal" size="sm" /></Button>
    }
  },
  {
    id: '10',
    name: 'Controls (Right Hint)',
    variant: 'rightHint',
    props: { rightHint: 'Hint' }
  }
]

export default function ListsPage() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())
  const [cursorKey, setCursorKey] = useState<string | null>(null)
  const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>({})

  const handleSelectionChange = (keys: Set<string | number>) => {
    const stringKeys = new Set(Array.from(keys).map(k => String(k)))
    setSelectedKeys(stringKeys)
    console.log('Selection changed:', Array.from(stringKeys).map(key => 
      fleetVariants.find(item => item.id === key)?.name
    ))
  }

  const handleCursorChange = (key: string | number | null, item: FleetListItemVariant | null) => {
    setCursorKey(key ? String(key) : null)
    console.log('Cursor changed:', item?.name || 'none')
  }

  const handleConfirm = () => {
    const selectedItems = Array.from(selectedKeys).map(key => 
      fleetVariants.find(item => item.id === key)
    ).filter(Boolean)
    console.log('Confirmed:', selectedItems.map(item => item?.name))
  }

  const handleCheckboxChange = (itemId: string, checked: boolean) => {
    setCheckedStates(prev => ({ ...prev, [itemId]: checked }))
  }

  const renderFleetListItem = (item: FleetListItemVariant) => {
    const props = {
      ...item.props,
      ...(item.variant === 'checkbox' && {
        checked: checkedStates[item.id] || false,
        onCheckedChange: (checked: boolean) => handleCheckboxChange(item.id, checked)
      })
    }

    return (
      <FleetListCell
        text={item.name}
        variant={item.variant}
        {...props}
      />
    )
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <Typography variant="header-1-semibold" className="mb-4">
          Fleet List Component
        </Typography>
        <Typography variant="default" className="text-muted-foreground mb-8">
          Complete implementation of Fleet Air list component with all variants from the Properties panel.
        </Typography>
      </div>

      <div className="space-y-6">
        <div>
          <Typography variant="header-2-semibold" className="mb-2">
            Fleet List Cell Variants
          </Typography>
          <Typography variant="default" className="text-muted-foreground mb-4">
            All the list item variants available in Fleet Air, matching the Properties panel design.
          </Typography>
          
          <div className="w-[300px]">
            <List
              items={fleetVariants}
              keyFn={(item) => item.id}
              renderItem={renderFleetListItem}
              selectedKeys={selectedKeys}
              cursorKey={cursorKey || undefined}
              onSelectionChange={handleSelectionChange}
              onCursorChange={handleCursorChange}
              onConfirm={handleConfirm}
              options={{
                multiSelectionEnabled: true,
                confirmOnClick: false,
                selectFirstItemOnFocus: true
              }}
              height="400px"
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Typography variant="header-3-semibold" className="mb-2">
              Text Variants
            </Typography>
            <div className="w-[300px]">
                          <List
              items={[
                { id: 'default', name: 'Default', variant: 'default' as const },
                { id: 'hint', name: 'Default', variant: 'hint' as const, props: { hint: 'Hint' } },
                { id: 'rightHint', name: 'Controls (Right Hint)', variant: 'rightHint' as const, props: { rightHint: 'Hint' } }
              ]}
                keyFn={(item) => item.id}
                renderItem={renderFleetListItem}
                height="120px"
              />
            </div>
          </div>

          <div>
            <Typography variant="header-3-semibold" className="mb-2">
              Icon Variants
            </Typography>
            <div className="w-[300px]">
                          <List
              items={[
                { id: 'chevron', name: 'Chevron', variant: 'chevron' as const },
                { id: 'icon', name: 'Icon (without Overlay)', variant: 'icon' as const, props: { icon: <Icon fleet="ai-file" size="sm" /> } },
                { id: 'iconRight', name: 'Icon Right', variant: 'iconRight' as const, props: { rightIcon: <Icon fleet="external-link" size="sm" /> } }
              ]}
                keyFn={(item) => item.id}
                renderItem={renderFleetListItem}
                height="120px"
              />
            </div>
          </div>

          <div>
            <Typography variant="header-3-semibold" className="mb-2">
              Data Display
            </Typography>
            <div className="w-[300px]">
                          <List
              items={[
                { id: 'counter1', name: 'Counter', variant: 'counter' as const, props: { counter: '3' } },
                { id: 'counter2', name: 'Counter', variant: 'counter' as const, props: { counter: '3' } },
                { id: 'overlay', name: 'Icon (with Overlay)', variant: 'iconOverlay' as const, props: { icon: <Icon fleet="ai-file" size="sm" />, hasOverlay: true } }
              ]}
                keyFn={(item) => item.id}
                renderItem={renderFleetListItem}
                height="120px"
              />
            </div>
          </div>

          <div>
            <Typography variant="header-3-semibold" className="mb-2">
              Interactive Controls
            </Typography>
            <div className="w-[300px]">
                          <List
              items={[
                { id: 'checkbox1', name: 'Controls (Checkbox)', variant: 'checkbox' as const, props: { checked: true } },
                { id: 'checkbox2', name: 'Controls (Checkbox)', variant: 'checkbox' as const, props: { checked: false } },
                { id: 'buttons1', name: 'Controls (Buttons)', variant: 'buttons' as const, props: { 
                  buttons: [
                    { label: 'Cancel', onClick: () => alert('Cancel clicked'), variant: 'secondary' as const }
                  ],
                  rightIcon: <Button size="icon" variant="ghost" onClick={() => alert('Icon clicked')}><Icon fleet="more-horizontal" size="sm" /></Button>
                } }
              ]}
                keyFn={(item) => item.id}
                renderItem={renderFleetListItem}
                height="120px"
              />
            </div>
          </div>
        </div>

        <div>
          <Typography variant="header-2-semibold" className="mb-2">
            Implementation Details
          </Typography>
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <Typography variant="small" className="font-mono">
              • Keyboard Navigation: Arrow keys, Home/End, Enter/Space, Escape
            </Typography>
            <Typography variant="small" className="font-mono">
              • Multi-Selection: Ctrl+Click, Shift+Click (when enabled)
            </Typography>
            <Typography variant="small" className="font-mono">
              • Fleet Colors: Uses semantic color tokens from Fleet design system
            </Typography>
            <Typography variant="small" className="font-mono">
              • Accessibility: ARIA roles, keyboard focus management, screen reader support
            </Typography>
            <Typography variant="small" className="font-mono">
              • Variants: 10 different cell types matching Fleet Properties panel
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
} 