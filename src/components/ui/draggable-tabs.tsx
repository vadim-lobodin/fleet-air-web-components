"use client"

import React, { useState, useCallback, createContext, useContext, useEffect } from "react"
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
  closestCenter,
} from "@dnd-kit/core"
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Tabs, TabsTrigger, TabsList, TabsContent } from "./tabs"
import { cn } from "@/lib/utils"

// Types
export interface DraggableTab {
  id: UniqueIdentifier
  content: React.ReactNode
  title: string
  icon?: React.ReactNode
  isModified?: boolean
  onClose?: () => void
  tabContent?: React.ReactNode
}

export interface TabIsland {
  id: UniqueIdentifier
  tabs: DraggableTab[]
  activeTab?: UniqueIdentifier
}

interface DraggableTabsContextValue {
  islands: TabIsland[]
  activeId: UniqueIdentifier | null
  isDragCompleting: boolean
  updateIslands: (islands: TabIsland[]) => void
  setActiveTab: (islandId: UniqueIdentifier, tabId: UniqueIdentifier) => void
}

// Context
const DraggableTabsContext = createContext<DraggableTabsContextValue | null>(null)

export const useDraggableTabs = () => {
  const context = useContext(DraggableTabsContext)
  if (!context) {
    throw new Error("useDraggableTabs must be used within a DraggableTabsProvider")
  }
  return context
}

// Provider
interface DraggableTabsProviderProps {
  children: React.ReactNode
  initialIslands: TabIsland[]
  onIslandsChange?: (islands: TabIsland[]) => void
}

export const DraggableTabsProvider: React.FC<DraggableTabsProviderProps> = ({
  children,
  initialIslands,
}) => {
  const [islands, setIslands] = useState<TabIsland[]>(initialIslands)
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isDragCompleting, setIsDragCompleting] = useState(false)


  // Ensure DndContext only runs on client side to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const updateIslands = useCallback((newIslands: TabIsland[]) => {
    setIslands(newIslands)
  }, [])


  const setActiveTab = useCallback((islandId: UniqueIdentifier, tabId: UniqueIdentifier) => {
    setIslands(prev => {
      const newIslands = [...prev]
      const islandIdx = newIslands.findIndex(island => island.id === islandId)
      if (islandIdx !== -1) {
        newIslands[islandIdx].activeTab = tabId
      }
      return newIslands
    })
  }, [])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id)
    setIsDragCompleting(false)
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    
    // Mark drag as completing to keep tab invisible
    setIsDragCompleting(true)

    if (!over) {
      setActiveId(null)
      setIsDragCompleting(false)
      return
    }

    const activeId = active.id
    const overId = over.id

    setIslands(prev => {
      // Find which islands contain the active and over items using current state
      const activeIsland = prev.find(island => 
        island.tabs.some(tab => tab.id === activeId) || island.id === activeId
      )
      const overIsland = prev.find(island => 
        island.tabs.some(tab => tab.id === overId) || island.id === overId
      )

      if (!activeIsland || !overIsland) {
        return prev
      }

      if (activeIsland.id === overIsland.id) {
        // Reordering within the same island
        const oldIndex = activeIsland.tabs.findIndex(tab => tab.id === activeId)
        const newIndex = activeIsland.tabs.findIndex(tab => tab.id === overId)

        if (oldIndex !== newIndex && oldIndex !== -1 && newIndex !== -1) {
          const newIslands = [...prev]
          const islandIndex = newIslands.findIndex(i => i.id === activeIsland.id)
          if (islandIndex !== -1) {
            const newTabs = arrayMove(activeIsland.tabs, oldIndex, newIndex)
            newIslands[islandIndex] = {
              ...newIslands[islandIndex],
              tabs: newTabs
            }
            return newIslands
          }
        }
      } else {
        // Moving between different islands
        const newIslands = [...prev]
        const fromIdx = newIslands.findIndex(island => island.id === activeIsland.id)
        const toIdx = newIslands.findIndex(island => island.id === overIsland.id)
        
        if (fromIdx !== -1 && toIdx !== -1) {
          const fromIslandData = { ...newIslands[fromIdx] }
          const toIslandData = { ...newIslands[toIdx] }
          
          const tabIndex = fromIslandData.tabs.findIndex(tab => tab.id === activeId)
          if (tabIndex !== -1) {
            const [tab] = fromIslandData.tabs.splice(tabIndex, 1)
            toIslandData.tabs = [...toIslandData.tabs, tab]
            
            // Update active tabs
            if (fromIslandData.activeTab === activeId) {
              fromIslandData.activeTab = fromIslandData.tabs[0]?.id
            }
            toIslandData.activeTab = activeId
            
            newIslands[fromIdx] = fromIslandData
            newIslands[toIdx] = toIslandData
          }
        }
        return newIslands
      }
      
      return prev
    })

    // Use requestAnimationFrame to ensure state update happens before making tab visible
    requestAnimationFrame(() => {
      setActiveId(null)
      setIsDragCompleting(false)
    })
  }, [])

  // Get the active tab data for drag overlay
  const activeTab = activeId ? islands.flatMap(i => i.tabs).find(tab => tab.id === activeId) : null

  const contextValue: DraggableTabsContextValue = {
    islands,
    activeId,
    isDragCompleting,
    updateIslands,
    setActiveTab,
  }

  // Only render DndContext on client side to prevent hydration mismatch
  if (!isClient) {
    return (
      <DraggableTabsContext.Provider value={contextValue}>
        {children}
      </DraggableTabsContext.Provider>
    )
  }

  return (
    <DraggableTabsContext.Provider value={contextValue}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {children}
        <DragOverlay>
          {activeTab ? <DragOverlayTab tab={activeTab} /> : null}
        </DragOverlay>
      </DndContext>
    </DraggableTabsContext.Provider>
  )
}

// Drag Overlay Tab Component (renders near cursor) - separate from sortable component to avoid ID conflicts
const DragOverlayTab: React.FC<{ tab: DraggableTab }> = ({ tab }) => {
  return (
    <div className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-2 py-1 h-7 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm cursor-move select-none bg-background border border-border shadow-lg opacity-90 gap-1">
      {tab.icon && <span className="shrink-0 flex items-center">{tab.icon}</span>}
      <span className="truncate font-semibold">{tab.title}</span>
      {tab.isModified && <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />}
    </div>
  )
}

// Sortable Tab Component
interface SortableTabProps {
  tab: DraggableTab
  islandId: UniqueIdentifier
  isActive?: boolean
  onTabClick?: (tabId: UniqueIdentifier) => void
}

// Inner component that safely uses the useSortable hook
const SortableTabInner: React.FC<SortableTabProps> = ({
  tab,
  isActive,
  onTabClick,
}) => {
  const { isDragCompleting, activeId } = useDraggableTabs()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tab.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  }

  // Keep tab invisible during drag or while drag is completing for this specific tab
  const shouldBeInvisible = isDragging || (isDragCompleting && activeId === tab.id)

  return (
    <TabsTrigger
      ref={setNodeRef}
      style={style}
      value={tab.id as string}
      className={cn(
        "cursor-move select-none",
        shouldBeInvisible && "opacity-0", // Make invisible during drag and completion
        isActive && "data-[state=active]:bg-[var(--fleet-tab-background-selected)]"
      )}
      onClick={() => onTabClick?.(tab.id)}
      icon={tab.icon}
      isModified={tab.isModified}
      closable={!!tab.onClose}
      onClose={tab.onClose}
      {...attributes}
      {...listeners}
    >
      {tab.title}
    </TabsTrigger>
  )
}

// Fallback component for SSR
const StaticTab: React.FC<SortableTabProps> = ({
  tab,
  isActive,
  onTabClick,
}) => {
  return (
    <TabsTrigger
      value={tab.id as string}
      className={cn(
        "cursor-move select-none transition-opacity",
        isActive && "data-[state=active]:bg-[var(--fleet-tab-background-selected)]"
      )}
      onClick={() => onTabClick?.(tab.id)}
      icon={tab.icon}
      isModified={tab.isModified}
      closable={!!tab.onClose}
      onClose={tab.onClose}
    >
      {tab.title}
    </TabsTrigger>
  )
}

export const SortableTab: React.FC<SortableTabProps> = (props) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Use SortableTabInner only on client side when DndContext is available
  if (isClient) {
    return <SortableTabInner {...props} />
  }

  // Use StaticTab for SSR
  return <StaticTab {...props} />
}

// Droppable Tab Island Component
interface DroppableTabIslandProps {
  islandId: UniqueIdentifier
  children?: React.ReactNode
  className?: string
}

const TabListWrapper: React.FC<{ children: React.ReactNode; tabIds: UniqueIdentifier[]; isClient: boolean }> = ({ children, tabIds, isClient }) => {
  if (isClient) {
    return (
      <SortableContext items={tabIds} strategy={horizontalListSortingStrategy}>
        {children}
      </SortableContext>
    )
  }
  return <>{children}</>
}

export const DroppableTabIsland: React.FC<DroppableTabIslandProps> = ({
  islandId,
  children,
  className,
}) => {
  const { islands, setActiveTab } = useDraggableTabs()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Get the current island data from the provider's context
  const island = islands.find(i => i.id === islandId)
  
  
  if (!island) {
    console.warn(`Island with id "${islandId}" not found`)
    return null
  }

  // Get all tab IDs for the sortable context
  const tabIds = island.tabs.map(tab => tab.id)

  return (
    <Tabs 
      value={island.activeTab as string} 
      onValueChange={(value) => setActiveTab(island.id, value)}
      className="w-full h-full flex flex-col"
    >
      <div className={cn("w-full h-full flex flex-col", className)}>
        {/* Tab Bar */}
        <div className="bg-card px-1.5 py-1">
          <TabListWrapper tabIds={tabIds} isClient={isClient}>
            <TabsList className="h-auto bg-transparent gap-1 p-0">
              {island.tabs.map((tab) => (
                <SortableTab
                  key={tab.id}
                  tab={tab}
                  islandId={island.id}
                  isActive={island.activeTab === tab.id}
                  onTabClick={(tabId) => setActiveTab(island.id, tabId)}
                />
              ))}
            </TabsList>
          </TabListWrapper>
        </div>
        
        {/* Content */}
        <div className="p-1.5 flex-1">
          {island.tabs.map((tab) => (
            <TabsContent 
              key={tab.id as string} 
              value={tab.id as string} 
              className="mt-0 h-full"
            >
              {tab.tabContent || tab.content}
            </TabsContent>
          ))}
          {children}
        </div>
      </div>
    </Tabs>
  )
}

// Legacy component exports for backward compatibility
export const DraggableTab = SortableTab