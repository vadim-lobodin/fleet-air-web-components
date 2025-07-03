"use client"

import React, { useState, useCallback, createContext, useContext } from "react"
import { TabsTrigger, TabsList, TabsContent } from "./tabs"
import { cn } from "@/lib/utils"

// Types
export interface DraggableTab {
  id: string
  content: React.ReactNode
  title: string
  icon?: React.ReactNode
  isModified?: boolean
  onClose?: () => void
  tabContent?: React.ReactNode
}

export interface TabIsland {
  id: string
  tabs: DraggableTab[]
  activeTab?: string
}

interface DraggableTabsContextValue {
  islands: TabIsland[]
  draggedTab: string | null
  updateIslands: (islands: TabIsland[]) => void
  moveTab: (tabId: string, fromIsland: string, toIsland: string, toIndex?: number) => void
  setDraggedTab: (tabId: string | null) => void
  setActiveTab: (islandId: string, tabId: string) => void
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
  onIslandsChange,
}) => {
  const [islands, setIslands] = useState<TabIsland[]>(initialIslands)
  const [draggedTab, setDraggedTab] = useState<string | null>(null)

  const updateIslands = useCallback((newIslands: TabIsland[]) => {
    setIslands(newIslands)
    onIslandsChange?.(newIslands)
  }, [onIslandsChange])

  const moveTab = useCallback((tabId: string, fromIsland: string, toIsland: string, toIndex?: number) => {
    setIslands(prev => {
      const newIslands = [...prev]
      const fromIdx = newIslands.findIndex(island => island.id === fromIsland)
      const toIdx = newIslands.findIndex(island => island.id === toIsland)
      
      if (fromIdx === -1 || toIdx === -1) return prev
      
      const fromIslandData = newIslands[fromIdx]
      const toIslandData = newIslands[toIdx]
      
      const tabIndex = fromIslandData.tabs.findIndex(tab => tab.id === tabId)
      if (tabIndex === -1) return prev
      
      const [tab] = fromIslandData.tabs.splice(tabIndex, 1)
      
      if (fromIsland === toIsland) {
        // Moving within the same island
        const insertIndex = toIndex !== undefined ? toIndex : toIslandData.tabs.length
        toIslandData.tabs.splice(insertIndex, 0, tab)
      } else {
        // Moving between islands
        const insertIndex = toIndex !== undefined ? toIndex : toIslandData.tabs.length
        toIslandData.tabs.splice(insertIndex, 0, tab)
        // Update active tab if moving to a different island
        if (fromIslandData.activeTab === tabId) {
          fromIslandData.activeTab = fromIslandData.tabs[0]?.id
        }
        toIslandData.activeTab = tabId
      }
      
      return newIslands
    })
  }, [])

  const setActiveTab = useCallback((islandId: string, tabId: string) => {
    setIslands(prev => {
      const newIslands = [...prev]
      const islandIdx = newIslands.findIndex(island => island.id === islandId)
      if (islandIdx !== -1) {
        newIslands[islandIdx].activeTab = tabId
      }
      return newIslands
    })
  }, [])

  const contextValue: DraggableTabsContextValue = {
    islands,
    draggedTab,
    updateIslands,
    moveTab,
    setDraggedTab,
    setActiveTab,
  }

  return (
    <DraggableTabsContext.Provider value={contextValue}>
      {children}
    </DraggableTabsContext.Provider>
  )
}

// Draggable Tab Component
interface DraggableTabProps {
  tab: DraggableTab
  islandId: string
  index: number
  isActive?: boolean
  onTabClick?: (tabId: string) => void
}

export const DraggableTab: React.FC<DraggableTabProps> = ({
  tab,
  islandId,
  index,
  isActive,
  onTabClick,
}) => {
  const { setDraggedTab } = useDraggableTabs()

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ 
      tabId: tab.id, 
      fromIsland: islandId, 
      fromIndex: index 
    }))
    e.dataTransfer.effectAllowed = "move"
    setDraggedTab(tab.id)
  }

  const handleDragEnd = () => {
    setDraggedTab(null)
  }

  return (
    <TabsTrigger
      key={tab.id}
      value={tab.id}
      draggable
      data-tab-id={tab.id}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={cn(
        "cursor-move select-none",
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

// Droppable Tab Island Component
interface DroppableTabIslandProps {
  island: TabIsland
  children?: React.ReactNode
  className?: string
}

export const DroppableTabIsland: React.FC<DroppableTabIslandProps> = ({
  island,
  children,
  className,
}) => {
  const { setActiveTab, moveTab, draggedTab } = useDraggableTabs()
  const [isDragOver, setIsDragOver] = useState(false)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setIsDragOver(true)
    
    // Calculate which index we're hovering over for visual feedback
    const tabElements = e.currentTarget.querySelectorAll('[data-tab-id]')
    let hoverIndex = island.tabs.length
    
    for (let i = 0; i < tabElements.length; i++) {
      const tabRect = tabElements[i].getBoundingClientRect()
      const tabCenter = tabRect.left + tabRect.width / 2
      
      if (e.clientX < tabCenter) {
        hoverIndex = i
        break
      }
    }
    
    setDragOverIndex(hoverIndex)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    // Only set drag over to false if we're leaving the drop zone entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false)
      setDragOverIndex(null)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    setDragOverIndex(null)
    
    try {
      const dragData = JSON.parse(e.dataTransfer.getData("text/plain"))
      const { tabId, fromIsland, fromIndex } = dragData
      
      if (tabId && fromIsland) {
        if (fromIsland !== island.id) {
          // Moving between different islands
          moveTab(tabId, fromIsland, island.id)
        } else {
          // Moving within the same island - calculate drop position
          const tabElements = e.currentTarget.querySelectorAll('[data-tab-id]')
          let dropIndex = island.tabs.length
          
          for (let i = 0; i < tabElements.length; i++) {
            const tabRect = tabElements[i].getBoundingClientRect()
            const tabCenter = tabRect.left + tabRect.width / 2
            
            if (e.clientX < tabCenter) {
              dropIndex = i
              break
            }
          }
          
          // Only move if position actually changed
          if (dropIndex !== fromIndex && dropIndex !== fromIndex + 1) {
            moveTab(tabId, fromIsland, island.id, dropIndex > fromIndex ? dropIndex - 1 : dropIndex)
          }
        }
      }
    } catch (error) {
      console.error("Error parsing drag data:", error)
    }
  }

  return (
    <div
      className={cn(
        "w-full h-full flex flex-col",
        isDragOver && "ring-2 ring-primary/50 ring-offset-2",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Tab Bar */}
      <div className="bg-card px-1.5 py-1">
        <TabsList 
          className="h-auto bg-transparent gap-1 p-0"
          data-island-id={island.id}
        >
          {island.tabs.map((tab, index) => (
            <React.Fragment key={tab.id}>
              {/* Drop indicator before tab */}
              {draggedTab && isDragOver && dragOverIndex === index && (
                <div className="h-7 w-1 bg-primary rounded animate-pulse" />
              )}
              <DraggableTab
                tab={tab}
                islandId={island.id}
                index={index}
                isActive={island.activeTab === tab.id}
                onTabClick={(tabId) => setActiveTab(island.id, tabId)}
              />
            </React.Fragment>
          ))}
          {/* Drop indicator at the end */}
          {draggedTab && isDragOver && dragOverIndex === island.tabs.length && (
            <div className="h-7 w-1 bg-primary rounded animate-pulse" />
          )}
          {/* General drop zone indicator when no specific position */}
          {draggedTab && isDragOver && dragOverIndex === null && (
            <div
              className="h-7 w-2 border-2 border-dashed border-primary/50 rounded opacity-50"
            />
          )}
        </TabsList>
      </div>
      
      {/* Content */}
      <div className="p-1.5 flex-1">
        {island.tabs.map((tab) => (
          <TabsContent 
            key={tab.id} 
            value={tab.id} 
            className="mt-0 h-full"
            style={{ display: island.activeTab === tab.id ? 'block' : 'none' }}
          >
            {tab.tabContent || tab.content}
          </TabsContent>
        ))}
        {children}
      </div>
    </div>
  )
}