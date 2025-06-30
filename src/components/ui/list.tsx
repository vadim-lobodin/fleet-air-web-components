"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ScrollArea } from "./scroll-area"
import { Typography } from "./typography"
import { Icon } from "./icon"
import { Button } from "./button-shadcn"

// ===== TYPES AND INTERFACES =====

export interface ListItemOpts {
  isFocused: boolean
  isHovered: boolean
  isSelected: boolean
  isCursor: boolean
  hasSelectionAbove?: boolean
  hasSelectionBelow?: boolean
  matcher?: Matcher | null
}

export interface Matcher {
  matchedRanges(text: string): Array<{ start: number; end: number }> | null
  matchingDegree(text: string): number
}

export interface ListState<T = unknown> {
  cursorKey: T | null
  selection: Set<T>
  multiSelectionAnchorKey: T | null
}

export interface ListOptions {
  confirmOnClick?: boolean
  selectFirstItem?: boolean
  selectFirstItemOnFocus?: boolean
  updateCursorOnHover?: boolean
  resetCursorOnMouseLeave?: boolean
  resetCursorOnCancel?: boolean
  updateSelectionWithCursor?: boolean
  homeEndActionsEnabled?: boolean
  keyboardSelectActionEnabled?: boolean
  multiSelectionEnabled?: boolean
  contextActionsEnabled?: boolean
  spacing?: number
  className?: string
}

export interface ListProps<T> {
  items: T[]
  keyFn?: (item: T) => string | number
  renderItem: (item: T, opts: ListItemOpts) => React.ReactNode
  selectableFn?: (item: T) => boolean
  
  // State management
  selectedKeys?: Set<string | number>
  cursorKey?: string | number
  onSelectionChange?: (keys: Set<string | number>, items: T[]) => void
  onCursorChange?: (key: string | number | null, item: T | null) => void
  onConfirm?: (items: T[]) => void
  
  // Options
  options?: ListOptions
  
  // Styling
  className?: string
  style?: React.CSSProperties
  height?: number | string
}

// ===== FLEET STYLING =====

const listVariants = cva(
  [
    "flex flex-col",
    "text-default leading-default font-body-regular tracking-default",
    "focus-visible:outline-none"
  ],
  {
    variants: {
      spacing: {
        none: "gap-0",
        sm: "gap-0.5", // 2dp
        default: "gap-0.5", // 2dp
        md: "gap-1", // 4dp
        lg: "gap-1.5", // 6dp
      }
    },
    defaultVariants: {
      spacing: "default"
    }
  }
)

const listItemVariants = cva(
  [
    "relative flex items-center",
    "h-6 px-3 mx-1.5", // Exactly 24px height, 12dp horizontal padding, 6dp outer margin
    "rounded-[4px]", // 4dp radius
    "transition-colors duration-75",
    "cursor-pointer select-none",
    "text-default leading-default font-body-regular tracking-default",
    "outline-none focus:outline-none focus-visible:outline-none", // Remove all focus outlines
    "ring-0 focus:ring-0 focus-visible:ring-0" // Remove any focus rings
  ],
  {
    variants: {
      state: {
        default: [
          "bg-[var(--fleet-listItem-background-default)] text-[var(--fleet-listItem-text-default)]",
          "hover:bg-[var(--fleet-listItem-background-hovered)]"
        ],
        selected: [
          "bg-[var(--fleet-listItem-background-focused)] text-[var(--fleet-listItem-text-focused)]"
        ],
        cursor: [
          "bg-[var(--fleet-listItem-background-focused)] text-[var(--fleet-listItem-text-focused)]"
        ],
        selectedCursor: [
          "bg-[var(--fleet-listItem-background-focused)] text-[var(--fleet-listItem-text-focused)]"
        ]
      }
    },
    defaultVariants: {
      state: "default"
    }
  }
)

// ===== HOOKS =====

function useListState<T>(
  items: T[],
  keyFn: (item: T) => string | number,
  initialState?: Partial<ListState<string | number>>
): [ListState<string | number>, React.Dispatch<React.SetStateAction<ListState<string | number>>>] {
  const [state, setState] = React.useState<ListState<string | number>>(() => ({
    cursorKey: initialState?.cursorKey ?? null,
    selection: initialState?.selection ?? new Set(),
    multiSelectionAnchorKey: initialState?.multiSelectionAnchorKey ?? null
  }))

  // Build key to index mapping
  const keyToIndex = React.useMemo(() => {
    const map = new Map<string | number, number>()
    items.forEach((item, index) => {
      map.set(keyFn(item), index)
    })
    return map
  }, [items, keyFn])

  // Auto-adjust cursor if it becomes invalid
  React.useEffect(() => {
    setState(prevState => {
      if (prevState.cursorKey !== null && !keyToIndex.has(prevState.cursorKey)) {
        // Cursor is invalid, clear it
        return {
          ...prevState,
          cursorKey: null
        }
      }
      return prevState
    })
  }, [keyToIndex])

  return [state, setState]
}

function useKeyboardNavigation<T>(
  items: T[],
  keyFn: (item: T) => string | number,
  selectableFn: (item: T) => boolean,
  state: ListState<string | number>,
  setState: React.Dispatch<React.SetStateAction<ListState<string | number>>>,
  options: ListOptions,
  onSelectionChange?: (keys: Set<string | number>, items: T[]) => void,
  onCursorChange?: (key: string | number | null, item: T | null) => void,
  onConfirm?: (items: T[]) => void
) {
  const keyToIndex = React.useMemo(() => {
    const map = new Map<string | number, number>()
    items.forEach((item, index) => {
      map.set(keyFn(item), index)
    })
    return map
  }, [items, keyFn])

  const findNextSelectableIndex = React.useCallback((
    startIndex: number,
    direction: 1 | -1,
    cycle: boolean = false
  ): number | null => {
    const size = items.length
    if (size === 0) return null

    let currentIdx = startIndex
    let visited = 0

    do {
      if (cycle) {
        currentIdx = ((currentIdx % size) + size) % size
      } else if (currentIdx < 0 || currentIdx >= size) {
        return null
      }

      if (currentIdx >= 0 && currentIdx < size && selectableFn(items[currentIdx])) {
        return currentIdx
      }

      visited++
      currentIdx += direction
    } while (currentIdx !== startIndex && visited < size)

    return null
  }, [items, selectableFn])

  const moveCursor = React.useCallback((targetKey: string | number) => {
    setState(prevState => {
      const newState = {
        ...prevState,
        cursorKey: targetKey
      }

      if (options.updateSelectionWithCursor) {
        newState.selection = new Set([targetKey])
        newState.multiSelectionAnchorKey = targetKey
      }

      return newState
    })

    // Call callbacks
    const targetIndex = keyToIndex.get(targetKey)
    const targetItem = targetIndex !== undefined ? items[targetIndex] : null
    onCursorChange?.(targetKey, targetItem)
    
    if (options.updateSelectionWithCursor) {
      const selectedItems = targetIndex !== undefined ? [items[targetIndex]] : []
      onSelectionChange?.(new Set([targetKey]), selectedItems)
    }
  }, [setState, options.updateSelectionWithCursor, keyToIndex, items, onCursorChange, onSelectionChange])

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    const currentIndex = state.cursorKey ? keyToIndex.get(state.cursorKey) : null

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault()
        const nextIndex = findNextSelectableIndex(
          currentIndex !== null && currentIndex !== undefined ? currentIndex + 1 : 0, 
          1, 
          false
        )
        if (nextIndex !== null) {
          moveCursor(keyFn(items[nextIndex]))
        }
        break
      }

      case 'ArrowUp': {
        event.preventDefault()
        const prevIndex = findNextSelectableIndex(
          currentIndex !== null && currentIndex !== undefined ? currentIndex - 1 : items.length - 1, 
          -1, 
          false
        )
        if (prevIndex !== null) {
          moveCursor(keyFn(items[prevIndex]))
        }
        break
      }

      case 'Home': {
        if (options.homeEndActionsEnabled) {
          event.preventDefault()
          const firstIndex = findNextSelectableIndex(0, 1, false)
          if (firstIndex !== null) {
            moveCursor(keyFn(items[firstIndex]))
          }
        }
        break
      }

      case 'End': {
        if (options.homeEndActionsEnabled) {
          event.preventDefault()
          const lastIndex = findNextSelectableIndex(items.length - 1, -1, false)
          if (lastIndex !== null) {
            moveCursor(keyFn(items[lastIndex]))
          }
        }
        break
      }

      case 'Enter':
      case ' ': {
        event.preventDefault()
        if (state.cursorKey !== null) {
          const cursorIndex = keyToIndex.get(state.cursorKey)
          if (cursorIndex !== undefined) {
            const selectedItems = state.selection.size > 0 
              ? Array.from(state.selection).map(key => {
                  const idx = keyToIndex.get(key)
                  return idx !== undefined ? items[idx] : null
                }).filter(Boolean) as T[]
              : [items[cursorIndex]]
            onConfirm?.(selectedItems)
          }
        }
        break
      }

      case 'Escape': {
        if (options.resetCursorOnCancel) {
          event.preventDefault()
          setState(prevState => ({
            ...prevState,
            cursorKey: null,
            selection: new Set()
          }))
          onCursorChange?.(null, null)
          onSelectionChange?.(new Set(), [])
        }
        break
      }
    }
  }, [state, keyToIndex, findNextSelectableIndex, moveCursor, keyFn, items, options, onConfirm, setState, onCursorChange, onSelectionChange])

  return { handleKeyDown }
}

// ===== COMPONENTS =====

export interface ListItemProps {
  children: React.ReactNode
  opts: ListItemOpts
  onClick?: (event: React.MouseEvent) => void
  onDoubleClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  className?: string
}

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  ({ children, opts, onClick, onDoubleClick, onMouseEnter, onMouseLeave, className }, ref) => {
    const getState = () => {
      if (opts.isCursor && opts.isSelected) return "selectedCursor"
      if (opts.isCursor) return "cursor"
      if (opts.isSelected) return "selected"
      return "default"
    }

    return (
      <div
        ref={ref}
        className={cn(
          listItemVariants({
            state: getState()
          }),
          className
        )}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        role="option"
        aria-selected={opts.isSelected}
        tabIndex={opts.isCursor ? 0 : -1}
      >
        {children}
      </div>
    )
  }
)
ListItem.displayName = "ListItem"

const ListComponent = React.forwardRef(<T extends object>({
    items,
    keyFn = (item: T) => {
      const key = (item as { id?: string | number; key?: string | number })?.id ?? (item as { id?: string | number; key?: string | number })?.key;
      if (key !== undefined) {
        return key;
      }
      // Fallback for items that are strings or numbers themselves, or have a different key property
      return String(item);
    },
    renderItem,
    selectableFn = () => true,
    selectedKeys,
    cursorKey,
    onSelectionChange,
    onCursorChange,
    onConfirm,
    options = {},
    className,
    style,
    height = "300px"
  }: ListProps<T>, ref: React.ForwardedRef<HTMLDivElement>) => {
    const [focused, setFocused] = React.useState(false)
    const [hoveredKey, setHoveredKey] = React.useState<string | number | null>(null)
    
    // Use controlled state if provided, otherwise use internal state
    const [internalState, setInternalState] = useListState(items, keyFn, {
      cursorKey,
      selection: selectedKeys
    })

    const isControlled = selectedKeys !== undefined || cursorKey !== undefined
    const state = React.useMemo(() => isControlled 
      ? { cursorKey: cursorKey ?? null, selection: selectedKeys ?? new Set(), multiSelectionAnchorKey: null }
      : internalState, [isControlled, cursorKey, selectedKeys, internalState])
    const setState = isControlled 
      ? (newState: React.SetStateAction<ListState<string | number>>) => {
          // For controlled mode, we call the callbacks instead of updating internal state
          if (typeof newState === 'function') {
            const computed = newState(state)
            const cursorIndex = computed.cursorKey ? keyToIndex.get(computed.cursorKey) : undefined
            const cursorItem = cursorIndex !== undefined ? items[cursorIndex] || null : null
            onCursorChange?.(computed.cursorKey, cursorItem)
            if (computed.selection !== state.selection) {
              const selectedItems = Array.from(computed.selection).map(key => {
                const idx = keyToIndex.get(key)
                return idx !== undefined ? items[idx] : null
              }).filter(Boolean) as T[]
              onSelectionChange?.(computed.selection, selectedItems)
            }
          }
        }
      : setInternalState

    const keyToIndex = React.useMemo(() => {
      const map = new Map<string | number, number>()
      items.forEach((item, index) => {
        map.set(keyFn(item), index)
      })
      return map
    }, [items, keyFn])

    const mergedOptions: Required<ListOptions> = React.useMemo(() => ({
      confirmOnClick: true,
      selectFirstItem: false,
      selectFirstItemOnFocus: true,
      updateCursorOnHover: false,
      resetCursorOnMouseLeave: false,
      resetCursorOnCancel: false,
      updateSelectionWithCursor: true,
      homeEndActionsEnabled: true,
      keyboardSelectActionEnabled: true,
      multiSelectionEnabled: false,
      contextActionsEnabled: true,
      spacing: 0,
      className: "",
      ...options
    }), [options])

    const { handleKeyDown } = useKeyboardNavigation(
      items,
      keyFn,
      selectableFn,
      state,
      setState,
      mergedOptions,
      onSelectionChange,
      onCursorChange,
      onConfirm
    )

    // Handle item click
    const handleItemClick = React.useCallback((item: T, event: React.MouseEvent) => {
      const itemKey = keyFn(item)
      
      if (!selectableFn(item)) return

      if (event.ctrlKey || event.metaKey) {
        // Multi-select toggle
        if (mergedOptions.multiSelectionEnabled) {
          const newSelection = new Set(state.selection)
          if (newSelection.has(itemKey)) {
            newSelection.delete(itemKey)
          } else {
            newSelection.add(itemKey)
          }
          
          const selectedItems = Array.from(newSelection).map(key => {
            const idx = keyToIndex.get(key)
            return idx !== undefined ? items[idx] : null
          }).filter(Boolean) as T[]
          
          onSelectionChange?.(newSelection, selectedItems)
          onCursorChange?.(itemKey, item)
        }
      } else if (event.shiftKey && mergedOptions.multiSelectionEnabled && state.multiSelectionAnchorKey) {
        // Range selection
        const anchorIndex = keyToIndex.get(state.multiSelectionAnchorKey)
        const targetIndex = keyToIndex.get(itemKey)
        
        if (anchorIndex !== undefined && targetIndex !== undefined) {
          const start = Math.min(anchorIndex, targetIndex)
          const end = Math.max(anchorIndex, targetIndex)
          const rangeSelection = new Set<string | number>()
          
          for (let i = start; i <= end; i++) {
            if (selectableFn(items[i])) {
              rangeSelection.add(keyFn(items[i]))
            }
          }
          
          const selectedItems = Array.from(rangeSelection).map(key => {
            const idx = keyToIndex.get(key)
            return idx !== undefined ? items[idx] : null
          }).filter(Boolean) as T[]
          
          onSelectionChange?.(rangeSelection, selectedItems)
          onCursorChange?.(itemKey, item)
        }
      } else {
        // Single selection
        const newSelection = new Set([itemKey])
        onSelectionChange?.(newSelection, [item])
        onCursorChange?.(itemKey, item)

        // Confirm on click if enabled
        if (mergedOptions.confirmOnClick) {
          onConfirm?.([item])
        }
      }
    }, [keyFn, selectableFn, mergedOptions, state, keyToIndex, items, onSelectionChange, onCursorChange, onConfirm])

    const handleItemDoubleClick = React.useCallback((item: T) => {
      if (selectableFn(item)) {
        onConfirm?.([item])
      }
    }, [selectableFn, onConfirm])

    const handleItemMouseEnter = React.useCallback((item: T) => {
      const itemKey = keyFn(item)
      setHoveredKey(itemKey)
      
      if (mergedOptions.updateCursorOnHover && selectableFn(item)) {
        onCursorChange?.(itemKey, item)
      }
    }, [keyFn, mergedOptions.updateCursorOnHover, selectableFn, onCursorChange])

    const handleItemMouseLeave = React.useCallback((item: T) => {
      const itemKey = keyFn(item)
      setHoveredKey(null)
      
      if (mergedOptions.resetCursorOnMouseLeave && state.cursorKey === itemKey) {
        onCursorChange?.(null, null)
      }
    }, [keyFn, mergedOptions.resetCursorOnMouseLeave, state.cursorKey, onCursorChange])

    // Auto-select first item on focus if enabled
    React.useEffect(() => {
      if (focused && mergedOptions.selectFirstItemOnFocus && !state.cursorKey && items.length > 0) {
        const firstSelectableIndex = items.findIndex(selectableFn)
        if (firstSelectableIndex !== -1) {
          const firstItem = items[firstSelectableIndex]
          const firstKey = keyFn(firstItem)
          onCursorChange?.(firstKey, firstItem)
          if (mergedOptions.updateSelectionWithCursor) {
            onSelectionChange?.(new Set([firstKey]), [firstItem])
          }
        }
      }
    }, [focused, mergedOptions.selectFirstItemOnFocus, mergedOptions.updateSelectionWithCursor, state.cursorKey, items, selectableFn, keyFn, onCursorChange, onSelectionChange])

    return (
      <div
        ref={ref}
        className={cn("flex flex-col", className)}
        style={{ height, ...style }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="listbox"
        aria-multiselectable={mergedOptions.multiSelectionEnabled}
      >
        <ScrollArea className="flex-1">
          <div className={cn(listVariants({ spacing: mergedOptions.spacing === 0 ? "none" : "default" }))}>
            {items.map((item) => {
              const itemKey = keyFn(item)
              const isSelected = state.selection.has(itemKey)
              const isCursor = state.cursorKey === itemKey
              const isHovered = hoveredKey === itemKey
              
              const opts: ListItemOpts = {
                isFocused: focused && isCursor, // Only the cursor item should be focused
                isHovered,
                isSelected,
                isCursor,
                hasSelectionAbove: false, // TODO: Implement proper selection grouping
                hasSelectionBelow: false, // TODO: Implement proper selection grouping
                matcher: null // TODO: Implement search highlighting
              }

              return (
                <ListItem
                  key={itemKey}
                  opts={opts}
                  onClick={(e) => handleItemClick(item, e as React.MouseEvent)}
                  onDoubleClick={() => handleItemDoubleClick(item)}
                  onMouseEnter={() => handleItemMouseEnter(item)}
                  onMouseLeave={() => handleItemMouseLeave(item)}
                >
                  {renderItem(item, opts)}
                </ListItem>
              )
            })}
          </div>
        </ScrollArea>
      </div>
    )
  })

ListComponent.displayName = "ListComponent"

export const List = ListComponent as <T extends object>(props: ListProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }) => React.ReactElement
;(ListComponent as React.FunctionComponent<ListProps<object>>).displayName = "List"

// ===== FLEET LIST CELL VARIANTS =====

export interface FleetListCellProps {
  text: string
  variant?: 'default' | 'hint' | 'chevron' | 'icon' | 'iconOverlay' | 'iconRight' | 'counter' | 'checkbox' | 'buttons' | 'rightHint'
  
  // Content
  hint?: string
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
  counter?: number | string
  rightHint?: string
  
  // Icon variants
  hasOverlay?: boolean
  
  // Controls
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  buttons?: Array<{
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary' | 'dangerous'
  }>
  
  // Layout
  className?: string
  onClick?: () => void
}

export const FleetListCell = React.forwardRef<HTMLDivElement, FleetListCellProps>(
  ({ 
    text, 
    variant = 'default', 
    hint, 
    icon, 
    rightIcon,
    counter, 
    rightHint,
    hasOverlay = false,
    checked,
    onCheckedChange,
    buttons,
    className, 
    onClick 
  }, ref) => {
    const renderContent = () => {
      switch (variant) {
        case 'default':
          return (
            <div className="flex items-center gap-1 w-full min-w-0">
              <Typography className="truncate">{text}</Typography>
            </div>
          )

        case 'hint':
          return (
            <div className="flex items-center gap-1 w-full min-w-0">
              <Typography className="truncate">{text}</Typography>
              {hint && (
                <Typography className="text-muted-foreground truncate">
                  {hint}
                </Typography>
              )}
            </div>
          )

        case 'chevron':
          return (
            <div className="flex items-center gap-1 w-full min-w-0">
              <Icon fleet="chevron-right" size="sm" className="flex-shrink-0" />
              <Typography className="truncate">{text}</Typography>
            </div>
          )

        case 'icon':
        case 'iconOverlay':
          return (
            <div className="flex items-center gap-1 w-full min-w-0">
              <div className="relative flex-shrink-0 w-4 h-4">
                {icon}
                {variant === 'iconOverlay' && hasOverlay && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </div>
              <Typography className="truncate">{text}</Typography>
            </div>
          )

        case 'iconRight':
          return (
            <div className="flex items-center justify-between gap-1 w-full min-w-0">
              <Typography className="truncate">{text}</Typography>
              <div className="flex-shrink-0 w-4 h-4">
                {rightIcon || icon}
              </div>
            </div>
          )

        case 'counter':
          return (
            <div className="flex items-center justify-between gap-1 w-full min-w-0">
              <Typography className="truncate">{text}</Typography>
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="bg-muted text-muted-foreground text-xs px-1.5 py-0.5 rounded">
                  {counter}
                </span>
              </div>
            </div>
          )

        case 'checkbox':
          return (
            <div className="flex items-center gap-1 w-full min-w-0">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onCheckedChange?.(e.target.checked)}
                className="flex-shrink-0 w-4 h-4"
              />
              <Typography className="truncate">{text}</Typography>
            </div>
          )

        case 'buttons':
          return (
            <div className="flex items-center justify-between gap-1 w-full min-w-0">
              <Typography className="truncate">{text}</Typography>
              <div className="flex items-center gap-1 flex-shrink-0">
                {buttons?.map((button, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant={button.variant || 'secondary'}
                    onClick={(e) => {
                      e.stopPropagation()
                      button.onClick()
                    }}
                  >
                    {button.label}
                  </Button>
                ))}
                {rightIcon}
              </div>
            </div>
          )

        case 'rightHint':
          return (
            <div className="flex items-center justify-between gap-1 w-full min-w-0">
              <Typography className="truncate">{text}</Typography>
              <Typography className="text-muted-foreground flex-shrink-0">
                {rightHint}
              </Typography>
            </div>
          )

        default:
          return (
            <div className="flex items-center gap-1 w-full min-w-0">
              <Typography className="truncate">{text}</Typography>
            </div>
          )
      }
    }

    return (
      <div 
        ref={ref} 
        className={cn("w-full", className)}
        onClick={onClick}
      >
        {renderContent()}
      </div>
    )
  }
)
FleetListCell.displayName = "FleetListCell"

// ===== UTILITY COMPONENTS =====

export interface DefaultListItemProps {
  text: string
  icon?: React.ReactNode
  secondary?: string
  className?: string
}

export const DefaultListItem = React.forwardRef<HTMLDivElement, DefaultListItemProps>(
  ({ text, icon, secondary, className }, ref) => {
    return (
      <FleetListCell
        ref={ref}
        variant={secondary ? "hint" : "default"}
        text={text}
        hint={secondary}
        icon={icon}
        className={className}
      />
    )
  }
)
DefaultListItem.displayName = "DefaultListItem"

export { listVariants, listItemVariants } 