"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Icon } from "./icon"
import { cn } from "@/lib/utils"
import { Command, CommandInput } from "./command"

// Fleet ContextMenu types based on Fleet Compose implementation
export interface MenuItem {
  type: 'action' | 'checkbox' | 'group' | 'header' | 'separator' | 'text'
}

export interface ActionMenuItem extends MenuItem {
  type: 'action'
  name: string
  enabled?: boolean
  description?: string
  shortcutText?: string
  tooltip?: string
  descriptionTooltip?: string
  secondaryText?: string
  textColor?: string
  icon?: string
  rightIcon?: string
  indentItemsWithoutIcon?: boolean
  closePopup?: boolean
  searchHint?: string
  multiline?: boolean // For paragraph style support
  customRightContent?: React.ReactNode // For paintOnTheRight equivalent
  variant?: 'default' | 'destructive' | 'toggle-on' | 'toggle-off'
  callback: (context?: unknown) => void
}

export interface CheckboxMenuItem extends MenuItem {
  type: 'checkbox'
  name: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export interface GroupMenuItem extends MenuItem {
  type: 'group'
  name: string
  enabled?: boolean
  icon?: string
  rightIcon?: string
  indentItemsWithoutIcon?: boolean
  searchable?: boolean
  dynamicWidth?: boolean
  submenuDelayMs?: number
  children: MenuItem[]
}

export interface HeaderMenuItem extends MenuItem {
  type: 'header'
  name: string
  tooltip?: string
  rightIcon?: string
  tailText?: string
}

export interface SeparatorMenuItem extends MenuItem {
  type: 'separator'
}

export interface TextMenuItem extends MenuItem {
  type: 'text'
  name: string
  text: string
}

export type FleetMenuItem = ActionMenuItem | CheckboxMenuItem | GroupMenuItem | HeaderMenuItem | SeparatorMenuItem | TextMenuItem

// Fleet ContextMenu search options
export interface MenuSearchOptions {
  placeholderText?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
}

// CVA variants for Fleet styling
const contextMenuContentVariants = cva(
  "text-default leading-default font-body-regular tracking-default",
  {
    variants: {
      variant: {
        default: [
          "min-w-[140px] max-w-[400px]",
          "bg-[var(--fleet-popup-background)]",
          "border-[var(--fleet-popup-border)]",
          "shadow-lg rounded-[4px]",
          "p-1.5",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const contextMenuItemVariants = cva([
  "text-default leading-default font-body-regular tracking-default",
  "relative flex cursor-default items-center",
  "rounded-[4px] px-2 py-1.5",
  "select-none outline-none transition-colors",
  "min-h-6",
], {
  variants: {
    variant: {
      default: [
        "text-[var(--fleet-listItem-text-default)]",
        "hover:bg-[var(--fleet-listItem-background-hovered)]",
        "focus:bg-[var(--fleet-listItem-background-focused)]",
        "focus:text-[var(--fleet-listItem-text-focused)]",
        "data-[highlighted]:bg-[var(--fleet-listItem-background-focused)]",
        "data-[highlighted]:text-[var(--fleet-listItem-text-focused)]",
      ],
      destructive: [
        "text-destructive hover:bg-destructive/10 focus:bg-destructive/10",
        "data-[highlighted]:bg-destructive/10 data-[highlighted]:text-destructive",
      ],
      "toggle-on": [
        "text-[var(--fleet-listItem-text-default)]",
        "hover:bg-[var(--fleet-listItem-background-hovered)]",
        "focus:bg-[var(--fleet-listItem-background-focused)]",
        "focus:text-[var(--fleet-listItem-text-focused)]",
        "data-[highlighted]:bg-[var(--fleet-listItem-background-focused)]",
        "data-[highlighted]:text-[var(--fleet-listItem-text-focused)]",
      ],
      "toggle-off": [
        "text-[var(--fleet-listItem-text-default)]",
        "hover:bg-[var(--fleet-listItem-background-hovered)]",
        "focus:bg-[var(--fleet-listItem-background-focused)]",
        "focus:text-[var(--fleet-listItem-text-focused)]",
        "data-[highlighted]:bg-[var(--fleet-listItem-background-focused)]",
        "data-[highlighted]:text-[var(--fleet-listItem-text-focused)]",
      ],
      disabled: [
        "text-[var(--fleet-text-disabled)]",
        "pointer-events-none opacity-50",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const contextMenuHeaderVariants = cva([
  "text-default leading-default font-body-regular tracking-default",
  "px-2 py-1.5 text-[var(--fleet-text-secondary)]",
  "select-none",
])

const contextMenuSeparatorVariants = cva([
  "bg-[var(--fleet-border)] h-px mx-2 my-1",
])

// Helper function to build menu items with separator cleanup
export function buildMenu(...items: (FleetMenuItem | null | undefined)[]): FleetMenuItem[] {
  const cleanItems = items.filter((item): item is FleetMenuItem => item != null)
  const result: FleetMenuItem[] = []
  
  for (const item of cleanItems) {
    if (item.type !== 'separator' || result[result.length - 1]?.type !== 'separator') {
      result.push(item)
    }
  }
  
  // Remove leading and trailing separators
  while (result.length > 0 && result[0].type === 'separator') {
    result.shift()
  }
  while (result.length > 0 && result[result.length - 1].type === 'separator') {
    result.pop()
  }
  
  return result
}

// Main ContextMenu component
export interface ContextMenuProps {
  items: FleetMenuItem[]
  searchOptions?: MenuSearchOptions
  trigger?: React.ReactNode
  onOpenChange?: (open: boolean) => void
  className?: string
}

export const ContextMenu = React.forwardRef<
  React.ElementRef<typeof DropdownMenuContent>,
  ContextMenuProps
>(({ items, searchOptions, trigger, onOpenChange, className, ...props }, ref) => {
  const [searchValue, setSearchValue] = React.useState("")
  const cleanedItems = React.useMemo(() => buildMenu(...items), [items])
  
  const filteredItems = React.useMemo(() => {
    if (!searchValue) return cleanedItems
    
    return cleanedItems.filter(item => {
      switch (item.type) {
        case 'action':
          return item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                 item.searchHint?.toLowerCase().includes(searchValue.toLowerCase())
        case 'checkbox':
          return item.name.toLowerCase().includes(searchValue.toLowerCase())
        case 'group':
          return item.name.toLowerCase().includes(searchValue.toLowerCase())
        case 'header':
        case 'text':
          return item.name.toLowerCase().includes(searchValue.toLowerCase())
        default:
          return false
      }
    })
  }, [cleanedItems, searchValue])

  const renderMenuItem = (item: FleetMenuItem, index: number) => {
    switch (item.type) {
      case 'action':
        return (
          <ContextMenuItem
            key={index}
            item={item}
            onSelect={() => {
              if (item.enabled !== false) {
                item.callback()
              }
            }}
          />
        )
      
      case 'checkbox':
        return (
          <ContextMenuCheckboxItem
            key={index}
            item={item}
            onCheckedChange={item.onChange}
          />
        )
      
      case 'group':
        return (
          <ContextMenuGroup key={index} item={item} />
        )
      
      case 'header':
        return (
          <ContextMenuHeader key={index} item={item} />
        )
      
      case 'separator':
        return <ContextMenuSeparator key={index} />
      
      case 'text':
        return (
          <ContextMenuText key={index} item={item} />
        )
      
      default:
        return null
    }
  }

  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      {trigger && <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>}
      <DropdownMenuContent
        ref={ref}
        className={cn(contextMenuContentVariants({ variant: "default" }), className)}
        onContextMenu={(e) => e.preventDefault()}
        {...props}
      >
        {searchOptions && (
          <>
            <div className="p-1">
              <Command>
                <CommandInput
                  placeholder={searchOptions.placeholderText || "Search"}
                  value={searchValue}
                  onValueChange={setSearchValue}
                  className="text-default leading-default font-body-regular"
                />
              </Command>
            </div>
            <ContextMenuSeparator />
            {filteredItems.length === 0 && searchValue && (
              <div className="p-2 text-center text-[var(--fleet-text-secondary)] text-default">
                Nothing found
              </div>
            )}
          </>
        )}
        
        {(searchOptions ? filteredItems : cleanedItems).map(renderMenuItem)}
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

ContextMenu.displayName = "ContextMenu"

// Individual menu item components
const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuItem>,
  {
    item: ActionMenuItem
    onSelect: () => void
  }
>(({ item, onSelect }, ref) => {
  const getVariant = () => {
    if (item.enabled === false) return "disabled"
    if (item.variant === 'destructive') return "destructive"
    if (item.variant === 'toggle-on') return "toggle-on"
    if (item.variant === 'toggle-off') return "toggle-off"
    return "default"
  }

  const getToggleIcon = () => {
    if (item.variant === 'toggle-on') return 'checkmark'
    if (item.variant === 'toggle-off') return null
    return item.icon
  }

  return (
    <DropdownMenuItem
      ref={ref}
      className={cn(
        contextMenuItemVariants({ variant: getVariant() }),
        item.multiline && "items-start py-2",
        item.textColor && `text-[${item.textColor}]`
      )}
      onSelect={onSelect}
      disabled={item.enabled === false}
    >
      <div className={cn(
        "flex gap-1 flex-1 min-w-0",
        item.multiline ? "flex-col" : "items-center"
      )}>
        <div className="flex items-center gap-1 flex-1 min-w-0">
          {(getToggleIcon() || item.variant === 'toggle-off') && (
            <div className="w-4 shrink-0 flex items-center justify-center">
              {getToggleIcon() && (
                <Icon fleet={getToggleIcon()!} size="sm" />
              )}
            </div>
          )}
          {item.indentItemsWithoutIcon && !getToggleIcon() && item.variant !== 'toggle-off' && (
            <div className="w-4 shrink-0" />
          )}
          
          <div className={cn(
            "flex-1 min-w-0",
            item.multiline ? "space-y-1" : "flex items-center gap-2"
          )}>
            <span className={cn(
              item.multiline ? "block" : "truncate"
            )}>
              {item.name}
            </span>
            
            {item.description && (
              <span className={cn(
                "text-[var(--fleet-text-secondary)]",
                item.multiline ? "block text-default" : "truncate text-default"
              )}>
                {item.description}
              </span>
            )}
          </div>
        </div>
        
        {item.secondaryText && (
          <div className="text-default text-[var(--fleet-text-secondary)] mt-1">
            {item.secondaryText}
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-1 ml-auto pl-8">
        {item.customRightContent && (
          <div className="shrink-0">{item.customRightContent}</div>
        )}
        {item.shortcutText && (
          <DropdownMenuShortcut className="text-default leading-default font-body-regular tracking-default text-[var(--fleet-text-secondary)] ml-auto">
            {item.shortcutText}
          </DropdownMenuShortcut>
        )}
        {item.rightIcon && (
          <Icon fleet={item.rightIcon} size="sm" className="shrink-0" />
        )}
      </div>
    </DropdownMenuItem>
  )
})

ContextMenuItem.displayName = "ContextMenuItem"

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuItem>,
  {
    item: CheckboxMenuItem
    onCheckedChange: (checked: boolean) => void
  }
>(({ item, onCheckedChange }, ref) => {
  return (
    <DropdownMenuItem
      ref={ref}
      className={contextMenuItemVariants({ variant: "default" })}
      onSelect={() => onCheckedChange(!item.checked)}
    >
      <div className="flex items-center gap-1 flex-1">
        <div className="w-4 shrink-0 flex items-center justify-center">
          {item.checked && (
            <Icon fleet="checkmark" size="sm" />
          )}
        </div>
        <span className="flex-1 truncate">{item.name}</span>
      </div>
    </DropdownMenuItem>
  )
})

ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem"

const ContextMenuGroup = React.forwardRef<
  React.ElementRef<typeof DropdownMenuSub>,
  {
    item: GroupMenuItem
  }
>(({ item }, ref) => {
  if (item.children.length === 0) {
    return (
      <DropdownMenuItem
        className={contextMenuItemVariants({ 
          variant: item.enabled === false ? "disabled" : "default" 
        })}
        disabled={true}
      >
        <div className="flex items-center gap-1 flex-1">
          {item.icon && (
            <Icon fleet={item.icon} size="sm" className="shrink-0" />
          )}
          {item.indentItemsWithoutIcon && !item.icon && (
            <div className="w-4 shrink-0" />
          )}
          <span className="flex-1 truncate">{item.name}</span>
          {item.rightIcon && (
            <Icon fleet={item.rightIcon} size="sm" className="shrink-0" />
          )}
        </div>
      </DropdownMenuItem>
    )
  }

  return (
    <DropdownMenuSub ref={ref}>
      <DropdownMenuSubTrigger
        className={contextMenuItemVariants({ 
          variant: item.enabled === false ? "disabled" : "default" 
        })}
        disabled={item.enabled === false}
      >
        <div className="flex items-center gap-1 flex-1">
          {item.icon && (
            <Icon fleet={item.icon} size="sm" className="shrink-0" />
          )}
          {item.indentItemsWithoutIcon && !item.icon && (
            <div className="w-4 shrink-0" />
          )}
          <span className="flex-1 truncate">{item.name}</span>
          {item.rightIcon && (
            <Icon fleet={item.rightIcon} size="sm" className="shrink-0" />
          )}
        </div>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent
        className={contextMenuContentVariants({ variant: "default" })}
      >
        <ContextMenu
          items={item.children}
          searchOptions={item.searchable ? { placeholderText: "Search" } : undefined}
        />
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
})

ContextMenuGroup.displayName = "ContextMenuGroup"

const ContextMenuHeader = React.forwardRef<
  React.ElementRef<typeof DropdownMenuLabel>,
  {
    item: HeaderMenuItem
  }
>(({ item }, ref) => {
  return (
    <DropdownMenuLabel
      ref={ref}
      className={contextMenuHeaderVariants()}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex-1 truncate">{item.name}</span>
        <div className="flex items-center gap-1">
          {item.tailText && (
            <span className="text-[var(--fleet-text-secondary)] text-default">
              {item.tailText}
            </span>
          )}
          {item.rightIcon && (
            <Icon fleet={item.rightIcon} size="sm" className="shrink-0" />
          )}
        </div>
      </div>
    </DropdownMenuLabel>
  )
})

ContextMenuHeader.displayName = "ContextMenuHeader"

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuSeparator>,
  Record<string, never>
>(({}, ref) => {
  return (
    <DropdownMenuSeparator
      ref={ref}
      className={contextMenuSeparatorVariants()}
    />
  )
})

ContextMenuSeparator.displayName = "ContextMenuSeparator"

const ContextMenuText = React.forwardRef<
  React.ElementRef<typeof DropdownMenuItem>,
  {
    item: TextMenuItem
  }
>(({ item }, ref) => {
  return (
    <DropdownMenuItem
      ref={ref}
      className={cn(contextMenuItemVariants({ variant: "disabled" }), "cursor-default")}
      disabled
    >
      {item.text}
    </DropdownMenuItem>
  )
})

ContextMenuText.displayName = "ContextMenuText"

// Hook for right-click context menus
export function useContextMenu() {
  const [position, setPosition] = React.useState<{ x: number; y: number } | null>(null)
  const [isOpen, setIsOpen] = React.useState(false)

  const handleContextMenu = React.useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    setPosition({ x: event.clientX, y: event.clientY })
    setIsOpen(true)
  }, [])

  const handleClose = React.useCallback(() => {
    setIsOpen(false)
    setPosition(null)
  }, [])

  return {
    position,
    isOpen,
    handleContextMenu,
    handleClose,
  }
}

// Right-click context menu wrapper
export interface RightClickContextMenuProps {
  items: FleetMenuItem[]
  children: React.ReactNode
  searchOptions?: MenuSearchOptions
  className?: string
}

export const RightClickContextMenu = React.forwardRef<
  HTMLDivElement,
  RightClickContextMenuProps
>(({ items, children, searchOptions, className }, ref) => {
  const { position, isOpen, handleContextMenu, handleClose } = useContextMenu()

  const renderMenuItem = (item: FleetMenuItem, index: number) => {
    switch (item.type) {
      case 'action':
        return (
          <ContextMenuItem
            key={index}
            item={item}
            onSelect={() => {
              if (item.enabled !== false) {
                item.callback()
                handleClose()
              }
            }}
          />
        )
      
      case 'checkbox':
        return (
          <ContextMenuCheckboxItem
            key={index}
            item={item}
            onCheckedChange={(checked) => {
              item.onChange(checked)
              handleClose()
            }}
          />
        )
      
      case 'group':
        return (
          <ContextMenuGroup key={index} item={item} />
        )
      
      case 'header':
        return (
          <ContextMenuHeader key={index} item={item} />
        )
      
      case 'separator':
        return <ContextMenuSeparator key={index} />
      
      case 'text':
        return (
          <ContextMenuText key={index} item={item} />
        )
      
      default:
        return null
    }
  }

  return (
    <>
      <div
        ref={ref}
        onContextMenu={handleContextMenu}
        className={className}
      >
        {children}
      </div>
      
      {isOpen && position && (
        <DropdownMenu open={true} onOpenChange={(open) => !open && handleClose()}>
          <DropdownMenuTrigger asChild>
            <div
              className="fixed"
              style={{
                left: position.x,
                top: position.y,
                width: 1,
                height: 1,
                pointerEvents: 'none'
              }}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={contextMenuContentVariants({ variant: "default" })}
            onInteractOutside={handleClose}
            onEscapeKeyDown={handleClose}
            side="bottom"
            align="start"
            sideOffset={0}
            alignOffset={0}
          >
            {searchOptions && (
              <>
                <div className="p-1">
                  <Command>
                    <CommandInput
                      placeholder={searchOptions.placeholderText || "Search"}
                      className="text-default leading-default font-body-regular"
                    />
                  </Command>
                </div>
                <ContextMenuSeparator />
              </>
            )}
            
            {items.map(renderMenuItem)}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
})

RightClickContextMenu.displayName = "RightClickContextMenu"

// Export types and variants
export type {
  FleetMenuItem,
  ActionMenuItem,
  CheckboxMenuItem,
  GroupMenuItem,
  HeaderMenuItem,
  SeparatorMenuItem,
  TextMenuItem,
  MenuSearchOptions,
}

export {
  contextMenuContentVariants,
  contextMenuItemVariants,
  contextMenuHeaderVariants,
  contextMenuSeparatorVariants,
}