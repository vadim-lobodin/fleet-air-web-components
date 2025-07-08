"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Typography } from "@/components/ui/typography"
import { List, FleetListCell } from "@/components/ui"
import { ExampleSectionCard } from "@/components/ui"
import { Icon } from "@/components/ui/icon"
import { Button } from "@/components/ui/button-shadcn"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FleetListItemVariant {
  id: string
  name: string
  variant: 'default' | 'hint' | 'chevron' | 'icon' | 'iconOverlay' | 'iconRight' | 'counter' | 'checkbox' | 'buttons' | 'rightHint' | 'changes' | 'header'
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
  },
  {
    id: '11',
    name: 'UserService.kt',
    variant: 'buttons',
    props: { 
      hint: 'Authentication service implementation',
      icon: <Icon fleet="file-types-kotlin" />,
      rightIcon: (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation()
              alert('Remove clicked')
            }}
          >
            <Icon fleet="close" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation()
              alert('Pin clicked')
            }}
          >
            <Icon fleet="pin" />
          </Button>
        </div>
      )
    }
  },
  {
    id: '12',
    name: 'App.js',
    variant: 'changes',
    props: { 
      hint: 'frontend/src/components',
      icon: <Icon fleet="file-types-javascript" />,
      additions: 3,
      deletions: 23
    }
  },
  {
    id: '13',
    name: 'TOOLS',
    variant: 'header'
  }
]

interface FileTreeItem {
  id: string
  name: string
  type: 'folder' | 'file'
  extension?: string
  level: number
  isExpanded?: boolean
  parentId?: string
}

const fileTreeData: FileTreeItem[] = [
  { id: '1', name: '.next', type: 'folder', level: 0, isExpanded: false },
  { id: '1-1', name: 'cache', type: 'folder', level: 1, parentId: '1' },
  { id: '1-2', name: 'static', type: 'folder', level: 1, parentId: '1' },
  { id: '1-3', name: 'build-manifest.json', type: 'file', extension: 'json', level: 1, parentId: '1' },
  { id: '2', name: 'app', type: 'folder', level: 0, isExpanded: true },
  { id: '3', name: 'globals.css', type: 'file', extension: 'css', level: 1, parentId: '2' },
  { id: '4', name: 'layout.tsx', type: 'file', extension: 'tsx', level: 1, parentId: '2' },
  { id: '5', name: 'page.module.css', type: 'file', extension: 'css', level: 1, parentId: '2' },
  { id: '6', name: 'page.tsx', type: 'file', extension: 'tsx', level: 1, parentId: '2' },
  { id: '7', name: 'node_modules', type: 'folder', level: 0, isExpanded: false },
  { id: '7-1', name: 'react', type: 'folder', level: 1, parentId: '7' },
  { id: '7-2', name: 'next', type: 'folder', level: 1, parentId: '7' },
  { id: '7-3', name: '.package-lock.json', type: 'file', extension: 'json', level: 1, parentId: '7' },
  { id: '8', name: '.gitignore', type: 'file', extension: 'gitignore', level: 0 },
  { id: '9', name: 'Dockerfile', type: 'file', extension: 'docker', level: 0 },
  { id: '10', name: 'next-env.d.ts', type: 'file', extension: 'ts', level: 0 },
  { id: '11', name: 'next.config.js', type: 'file', extension: 'js', level: 0 },
  { id: '12', name: 'package-lock.json', type: 'file', extension: 'json', level: 0 },
  { id: '13', name: 'package.json', type: 'file', extension: 'json', level: 0 },
  { id: '14', name: 'test', type: 'folder', level: 0, isExpanded: false },
  { id: '14-1', name: 'setup.ts', type: 'file', extension: 'ts', level: 1, parentId: '14' },
  { id: '14-2', name: 'utils.test.ts', type: 'file', extension: 'ts', level: 1, parentId: '14' },
  { id: '15', name: 'tsconfig.json', type: 'file', extension: 'json', level: 0 }
]

export default function ListsPage() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())
  const [cursorKey, setCursorKey] = useState<string | null>(null)
  const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>({})
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['2'])) // app folder expanded by default

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

  // File tree functionality
  const toggleFolder = React.useCallback((folderId: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev)
      if (newSet.has(folderId)) {
        newSet.delete(folderId)
      } else {
        newSet.add(folderId)
      }
      return newSet
    })
  }, [])

  const getFileIcon = (extension?: string) => {
    switch (extension) {
      case 'css':
        return '/icons/dark/file-types-css.svg'
      case 'tsx':
      case 'ts':
        return '/icons/dark/file-types-typescript.svg'
      case 'js':
        return '/icons/dark/file-types-javascript.svg'
      case 'json':
        return '/icons/dark/file-types-json.svg'
      case 'docker':
        return '/icons/dark/file-types-docker.svg'
      case 'gitignore':
        return '/icons/dark/file-types-gitignore.svg'
      default:
        return '/icons/dark/ai-file.svg'
    }
  }

  const getVisibleTreeItems = React.useMemo(() => {
    const isItemVisible = (item: FileTreeItem): boolean => {
      if (item.level === 0) return true
      
      // Check if all parent folders are expanded
      let currentItem = item
      while (currentItem.parentId) {
        const parent = fileTreeData.find(f => f.id === currentItem.parentId)
        if (!parent || !expandedFolders.has(parent.id)) {
          return false
        }
        currentItem = parent
      }
      return true
    }
    
    return fileTreeData.filter(isItemVisible)
  }, [expandedFolders])

  const renderFileTreeItem = React.useCallback((item: FileTreeItem) => {
    const isExpanded = expandedFolders.has(item.id)
    // Correct spacing formula: Distance to chevron/icon = 8+(level*16)
    const iconPaddingLeft = 8 + (item.level * 16)
    
    if (item.type === 'folder') {
      return (
        <div 
          className="flex items-center gap-1 w-full min-w-0 cursor-pointer hover:bg-[var(--fleet-listItem-background-hovered)] px-3 py-1 mx-1.5 rounded-[4px] transition-colors duration-75" 
          style={{ paddingLeft: `${iconPaddingLeft}px` }}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleFolder(item.id)
          }}
        >
          <Icon 
            fleet={isExpanded ? "chevron-down" : "chevron-right"} 
            size="sm" 
            className="flex-shrink-0" 
          />
          <Typography className="truncate">{item.name}</Typography>
        </div>
      )
    } else {
      return (
        <div 
          className="flex items-center gap-1 w-full min-w-0 px-3 py-1 mx-1.5 rounded-[4px] hover:bg-[var(--fleet-listItem-background-hovered)] transition-colors duration-75" 
          style={{ paddingLeft: `${iconPaddingLeft}px` }}
        >
          <Image 
            src={getFileIcon(item.extension)} 
            alt={item.extension || 'file'} 
            width={16}
            height={16}
            className="w-4 h-4 flex-shrink-0" 
          />
          <Typography className="truncate">{item.name}</Typography>
        </div>
      )
    }
  }, [expandedFolders, toggleFolder])

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
    <>
      <div>
        <Typography variant="header-1-semibold" className="mb-4">
          Fleet List Component
        </Typography>
        <Typography variant="default" className="text-muted-foreground mb-8">
          Complete implementation of Fleet Air list component with all variants from the Properties panel.
        </Typography>
      </div>

      <div className="space-y-6">
        <ExampleSectionCard
          title="Fleet List Cell Variants"
          description="All the list item variants available in Fleet Air, matching the Properties panel design."
        >
          <div className="w-[600px]">
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
                selectFirstItemOnFocus: true,
                spacing: 0.5 // 2px gap between items
              }}
              height="280px"
              className="w-full"
            />
          </div>
        </ExampleSectionCard>


        <ExampleSectionCard
          title="Interactive File Tree"
          description="Example file tree implementation using the List component with Fleet icons. Click folders to expand/collapse."
        >
          <div className="w-[600px] h-[300px]">
            <ScrollArea className="h-full">
              <div className="flex flex-col gap-0.5 p-2">
                {getVisibleTreeItems.map((item) => (
                  <div key={item.id}>
                    {renderFileTreeItem(item)}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </ExampleSectionCard>

      </div>
    </>
  )
} 