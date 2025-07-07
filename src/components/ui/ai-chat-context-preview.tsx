"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button-shadcn"
import { Icon } from "./icon"
import { List, FleetListCell } from "./list"
import { ScrollArea } from "./scroll-area"
import { Typography } from "./typography"
import { Toolbar, ToolbarButton } from "./toolbar"
import { ContextMenu, type ActionMenuItem } from "./context-menu"

export interface AiContextEntry {
  id: string
  name: string
  description?: string
  iconKey?: string
  tooltipText?: string
  isPinned?: boolean
  type: 'file' | 'branch' | 'commit' | 'custom'
}

export interface AiTool {
  id: string
  name: string
  description?: string
  iconKey?: string
}

export interface AiChatContext {
  id: string
  contextEntries: AiContextEntry[]
  tools?: AiTool[]
}

export interface AiChatContextPreviewProps {
  context: AiChatContext
  className?: string
  onRemoveEntry?: (entryId: string) => void
  onTogglePinEntry?: (entryId: string) => void
  onNavigateToEntry?: (entryId: string) => void
  onAddFiles?: () => void
  onAddBranches?: () => void
  onAddCommits?: () => void
  onUploadFile?: () => void
  disabled?: boolean
  maxWidth?: string
}

type PreviewState = 'hidden' | 'collapsed' | 'expanded'

// Helper function to get the right icon for each entry type
const getEntryIcon = (entry: AiContextEntry): string => {
  switch (entry.type) {
    case 'file':
      if (entry.name.endsWith('.kt')) return 'file-types-kotlin'
      if (entry.name.endsWith('.java')) return 'file-types-java'
      if (entry.name.endsWith('.ts')) return 'file-types-typescript'
      if (entry.name.endsWith('.js')) return 'file-types-javascript'
      if (entry.name.endsWith('.py')) return 'file-types-python'
      if (entry.name.endsWith('.yaml') || entry.name.endsWith('.yml')) return 'file-types-yml'
      return 'file-types-text'
    case 'branch':
      return 'vcs-branch'
    case 'commit':
      return 'vcs-commit'
    default:
      return entry.iconKey || 'file-types-text'
  }
}

const AiChatContextPreview = React.forwardRef<HTMLDivElement, AiChatContextPreviewProps>(
  ({
    context,
    className,
    onRemoveEntry,
    onTogglePinEntry,
    onNavigateToEntry,
    onAddFiles,
    onAddBranches,
    onAddCommits,
    onUploadFile,
    disabled = false,
    maxWidth = "400px",
    ...props
  }, ref) => {
    const [previewState, setPreviewState] = React.useState<PreviewState>('hidden')
    const [isHovered, setIsHovered] = React.useState(false)
    
    // Create unified list items combining context entries and tools
    const allItems = React.useMemo(() => {
      const items: Array<{type: 'context', data: AiContextEntry} | {type: 'tools-header'} | {type: 'tool', data: AiTool}> = []
      
      // Separate pinned and unpinned entries
      const pinnedEntries = context.contextEntries.filter(entry => entry.isPinned)
      const unpinnedEntries = context.contextEntries.filter(entry => !entry.isPinned).sort((a, b) => a.name.localeCompare(b.name))
      
      console.log('Pinned entries:', pinnedEntries.map(e => e.name))
      console.log('Unpinned entries:', unpinnedEntries.map(e => e.name))
      
      // Add pinned entries first, then unpinned
      pinnedEntries.forEach(entry => {
        items.push({type: 'context', data: entry})
      })
      unpinnedEntries.forEach(entry => {
        items.push({type: 'context', data: entry})
      })
      
      // Tools removed for now
      
      return items
    }, [context.contextEntries, context.tools])
    
    const entryCount = context.contextEntries.length
    const toolCount = context.tools?.length || 0
    
    const togglePreviewState = () => {
      if (previewState === 'hidden') {
        setPreviewState('collapsed')
      } else {
        setPreviewState('hidden')
      }
    }

    const toggleExpandCollapse = () => {
      if (previewState === 'expanded') {
        setPreviewState('collapsed')
      } else {
        setPreviewState('expanded')
      }
    }
    
    const handleEntryClick = (entryId: string) => {
      if (onNavigateToEntry) {
        onNavigateToEntry(entryId)
      }
    }
    
    const handleRemoveEntry = (entryId: string, event: React.MouseEvent) => {
      event.stopPropagation()
      if (onRemoveEntry) {
        onRemoveEntry(entryId)
      }
    }
    
    const handleTogglePin = (entryId: string, event: React.MouseEvent) => {
      event.stopPropagation()
      console.log('Toggle pin for entry:', entryId)
      if (onTogglePinEntry) {
        onTogglePinEntry(entryId)
      }
    }
    
    const getBackgroundColor = () => {
      if (previewState === 'hidden' && isHovered) {
        return 'var(--fleet-button-tertiary-background-hovered)'
      }
      return 'var(--fleet-button-tertiary-background-default)'
    }
    
    const getContentBackground = () => {
      if (previewState === 'hidden') {
        return 'transparent'
      }
      return 'var(--fleet-snippet-content-background)'
    }
    
    const getContentBorder = () => {
      if (previewState === 'hidden') {
        return 'transparent'
      }
      return 'var(--fleet-snippet-content-border)'
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "ai-chat-context-preview",
          "transition-all duration-200 ease-in-out",
          previewState === 'hidden' ? "border-transparent" : "border-[var(--fleet-chat-widget-border-default)]",
          "rounded-lg",
          "p-1",
          previewState === 'hidden' && "cursor-pointer",
          className
        )}
        style={{
          backgroundColor: getBackgroundColor(),
          maxWidth,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={previewState === 'hidden' ? togglePreviewState : undefined}
        {...props}
      >
        <div
          className={cn(
            "rounded-md transition-all duration-200 ease-in-out",
            "border",
            "w-full",
            "p-1"
          )}
          style={{
            backgroundColor: getContentBackground(),
            borderColor: getContentBorder(),
          }}
        >
          {previewState === 'hidden' ? (
            /* Hidden State - Simple Header */
            <div className="flex items-center justify-between px-2 py-1">
              <div className="flex items-center gap-2">
                <Icon 
                  fleet="chevron-right" 
                  className="text-[var(--fleet-icon-secondary)] transition-transform duration-200 flex-shrink-0"
                />
                <div className="flex items-center gap-1">
                  <Typography 
                    variant="header-5-semibold" 
                    className="text-[var(--fleet-text-secondary)]" 
                    style={{ fontSize: 'var(--text-header-5)' }}
                  >
                    CONTEXT
                  </Typography>
                  <Typography 
                    variant="header-5-semibold" 
                    className="text-[var(--fleet-text-primary)]"
                    style={{ fontSize: 'var(--text-header-5)' }}
                  >
                    {entryCount}
                  </Typography>
                </div>
              </div>
              
              <Toolbar variant="regular" size="default">
                <AttachFileButton
                  onAddFiles={onAddFiles}
                  onAddBranches={onAddBranches}
                  onAddCommits={onAddCommits}
                  onUploadFile={onUploadFile}
                  disabled={disabled}
                />
              </Toolbar>
            </div>
          ) : (
            /* Visible State - Custom Header + Content */
            <div className="w-full">
              {/* Custom Header Row */}
              <div className="flex items-center justify-between px-2 py-1">
                <button
                  className="flex items-center gap-2 flex-1 text-left"
                  onClick={togglePreviewState}
                >
                  <Icon 
                    fleet={previewState !== 'hidden' ? "chevron-down" : "chevron-right"} 
                    className="text-[var(--fleet-icon-secondary)] transition-transform duration-200 flex-shrink-0"
                  />
                  <div className="flex items-center gap-1">
                    <Typography 
                      variant="header-5-semibold" 
                      className="text-[var(--fleet-text-secondary)]" 
                      style={{ fontSize: 'var(--text-header-5)' }}
                    >
                      CONTEXT
                    </Typography>
                    <Typography 
                      variant="header-5-semibold" 
                      className="text-[var(--fleet-text-primary)]"
                      style={{ fontSize: 'var(--text-header-5)' }}
                    >
                      {entryCount}
                    </Typography>
                  </div>
                </button>
                
                <Toolbar variant="regular" size="default">
                  <AttachFileButton
                    onAddFiles={onAddFiles}
                    onAddBranches={onAddBranches}
                    onAddCommits={onAddCommits}
                    onUploadFile={onUploadFile}
                    disabled={disabled}
                  />
                  {previewState !== 'hidden' && (
                    <ToolbarButton
                      icon={previewState === 'expanded' ? "collapse" : "expand"}
                      tooltip={previewState === 'expanded' ? 'Collapse' : 'Expand'}
                      onClick={toggleExpandCollapse}
                      disabled={disabled}
                    />
                  )}
                </Toolbar>
              </div>
            </div>
          )}

          {/* Content Area - Always rendered for smooth transitions */}
          <div>
            <ScrollArea 
              className={cn(
                "transition-all duration-200",
                previewState === 'hidden' && "h-0",
                previewState === 'collapsed' && "h-[120px]",
                previewState === 'expanded' && "h-[400px]"
              )}
            >
              <List
                items={allItems}
                keyFn={(item, index) => {
                  if (item.type === 'context') return item.data.id
                  if (item.type === 'tools-header') return 'tools-header'
                  if (item.type === 'tool') return `tool-${item.data.id}`
                  return `item-${index}`
                }}
                renderItem={(item, opts) => {
                  if (item.type === 'context') {
                    const entry = item.data
                    return (
                      <FleetListCell
                        variant="buttons"
                        text={entry.name}
                        hint={entry.description}
                        icon={<Icon fleet={getEntryIcon(entry)} />}
                        rightIcon={
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onMouseDown={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                handleRemoveEntry(entry.id, e)
                              }}
                              className={cn(!opts.isHovered && "invisible")}
                            >
                              <Icon fleet="close" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onMouseDown={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                handleTogglePin(entry.id, e)
                              }}
                              className={cn(
                                entry.isPinned ? "text-[var(--fleet-icon-primary)]" : !opts.isHovered && "invisible"
                              )}
                            >
                              <Icon fleet="pin" />
                            </Button>
                          </div>
                        }
                      />
                    )
                  }
                  return null
                }}
                onConfirm={(items) => {
                  const item = items[0]
                  if (item && item.type === 'context') {
                    handleEntryClick(item.data.id)
                  }
                }}
                options={{
                  updateCursorOnHover: true,
                  resetCursorOnMouseLeave: true,
                  selectFirstItemOnFocus: false,
                  confirmOnClick: false,
                  spacing: 2
                }}
                height="auto"
              />
            </ScrollArea>
          </div>
        </div>
      </div>
    )
  }
)
AiChatContextPreview.displayName = "AiChatContextPreview"


// Attach File Button Component
interface AttachFileButtonProps {
  onAddFiles?: () => void
  onAddBranches?: () => void
  onAddCommits?: () => void
  onUploadFile?: () => void
  disabled?: boolean
}

const AttachFileButton = React.forwardRef<HTMLButtonElement, AttachFileButtonProps>(
  ({ onAddFiles, onAddBranches, onAddCommits, onUploadFile, disabled }, ref) => {
    const menuItems: ActionMenuItem[] = [
      {
        type: 'action',
        name: 'Files',
        icon: 'new-file',
        enabled: !disabled,
        callback: () => onAddFiles?.()
      },
      {
        type: 'action', 
        name: 'Branches',
        icon: 'vcs-branch',
        enabled: !disabled,
        callback: () => onAddBranches?.()
      },
      {
        type: 'action',
        name: 'Commits', 
        icon: 'vcs-commit',
        enabled: !disabled,
        callback: () => onAddCommits?.()
      },
      {
        type: 'separator'
      } as any,
      {
        type: 'action',
        name: 'Upload From Computer...',
        icon: 'add',
        enabled: !disabled,
        callback: () => onUploadFile?.()
      }
    ]

    return (
      <ContextMenu
        items={menuItems}
        trigger={
          <ToolbarButton
            ref={ref}
            icon="add"
            tooltip="Add to Chat Context"
            disabled={disabled}
          />
        }
      />
    )
  }
)
AttachFileButton.displayName = "AttachFileButton"

export {
  AiChatContextPreview,
  type AiChatContextPreviewProps,
  type AiContextEntry,
  type AiTool,
  type AiChatContext
}