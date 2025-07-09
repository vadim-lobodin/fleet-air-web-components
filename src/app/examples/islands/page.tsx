"use client"

import { useState } from "react"
import { Typography } from "@/components/ui/typography"
import { Button } from "@/components/ui/button-shadcn"
import { Icon } from "@/components/ui/icon"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { AiChatInput } from "@/components/ui/ai-chat-input"
import { AiChatContextPreview } from "@/components/ui/ai-chat-context-preview"
import {
  Island,
  IslandSplitter,
  IslandContainer,
  IslandWithTabs,
  TabBar,
  TabContentArea,
  ChatIsland,
  FileTreeIsland,
  ExampleSectionCard,
  ExamplePageTemplate
} from "@/components/ui"

export default function IslandsPage() {
  const [showSplitters, setShowSplitters] = useState(true)
  const [containerDirection, setContainerDirection] = useState<"horizontal" | "vertical">("horizontal")

  return (
    <ExamplePageTemplate
      title="Islands"
      description="Fleet's container components with 8px rounded corners and proper Fleet background colors. Islands provide visual grouping and content organization with consistent spacing and theme-aware styling."
    >
      <div className="space-y-8">
        {/* Basic Islands */}
        <ExampleSectionCard title="Basic Islands">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Island>
              <Typography variant="default-semibold">Default Island</Typography>
              <Typography variant="default" className="text-muted-foreground">
                Basic island with Fleet background colors and 6px padding.
              </Typography>
            </Island>
            
            <Island variant="panel" shadow="sm">
              <Typography variant="default-semibold">Panel Island</Typography>
              <Typography variant="default" className="text-muted-foreground">
                Panel variant with subtle shadow for side panels.
              </Typography>
            </Island>

            <Island variant="main" shadow="lg">
              <Typography variant="default-semibold">Main Island</Typography>
              <Typography variant="default" className="text-muted-foreground">
                Main variant with larger shadow for primary content.
              </Typography>
            </Island>
          </div>
        </ExampleSectionCard>

        {/* Fleet Window Layout */}
        <ExampleSectionCard title="Fleet Window Layout">
          <div className="h-96 border border-border rounded-lg overflow-hidden">
            <div className="flex h-full gap-2 p-2">
              {/* Left Panel */}
              <div className="w-64 flex flex-col gap-2">
                <FileTreeIsland
                  onFileClick={(file) => console.log('File clicked:', file.name)}
                  onFolderToggle={(folder, isExpanded) => console.log('Folder toggled:', folder.name, isExpanded)}
                  tabTitle="Files"
                  className="flex-1"
                />
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col gap-2">
                <Island className="flex-1 flex flex-col">
                  <div className="flex-1 flex items-center justify-center">
                    <Typography variant="default" className="text-muted-foreground">
                      Main editor area (DroppableTabIsland implementation pending)
                    </Typography>
                  </div>
                </Island>
              </div>

              {/* Right Panel */}
              <div className="w-64 flex flex-col gap-2">
                <Island className="flex-1">
                  <div className="flex items-center justify-center h-full">
                    <Typography variant="default" className="text-muted-foreground">
                      Chat area (DroppableTabIsland implementation pending)
                    </Typography>
                  </div>
                </Island>
              </div>
            </div>
          </div>
        </ExampleSectionCard>

        {/* Draggable Tab Islands - Note */}
        <ExampleSectionCard title="Draggable Tab Islands">
          <div className="space-y-6">
            <Island variant="panel" className="bg-muted/50">
              <Typography variant="default-semibold" className="mb-3">Coming Soon:</Typography>
              <Typography variant="default" className="text-muted-foreground">
                DroppableTabIsland component with @dnd-kit drag-and-drop functionality is being finalized. 
                This will provide tabbed islands with reorderable tabs, close buttons, and seamless Fleet styling.
              </Typography>
              <Typography variant="small" className="text-muted-foreground mt-2">
                Features will include:
              </Typography>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• Drag-and-drop tab reordering</li>
                <li>• Tab close buttons with dirty state indicators</li>
                <li>• Keyboard navigation support</li>
                <li>• Proper Fleet island background colors</li>
                <li>• Seamless integration with existing island patterns</li>
              </ul>
            </Island>
          </div>
        </ExampleSectionCard>

        {/* Auto-Scrolling Demo */}
        <ExampleSectionCard title="Auto-Scrolling Behavior">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Typography variant="default-semibold">
                Without Fixed Height (No Scrolling)
              </Typography>
              <Island variant="panel">
                <div className="space-y-2">
                  <Typography variant="small" className="font-semibold">File Explorer</Typography>
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="flex items-center gap-2 p-1 text-sm hover:bg-muted/50 rounded">
                      <Icon fleet="file-types-typescript" size="sm" />
                      <span>file-{i + 1}.tsx</span>
                    </div>
                  ))}
                </div>
              </Island>
            </div>
            <div className="space-y-2">
              <Typography variant="default-semibold">
                With Fixed Height (Auto-Scrolling)
              </Typography>
              <Island variant="panel" className="h-40">
                <div className="space-y-2">
                  <Typography variant="small" className="font-semibold">File Explorer</Typography>
                  {Array.from({ length: 15 }, (_, i) => (
                    <div key={i} className="flex items-center gap-2 p-1 text-sm hover:bg-muted/50 rounded">
                      <Icon fleet="file-types-typescript" size="sm" />
                      <span>file-{i + 1}.tsx</span>
                    </div>
                  ))}
                </div>
              </Island>
            </div>
          </div>
        </ExampleSectionCard>

        {/* Fleet Tab Island */}
        <ExampleSectionCard title="Fleet Tab Island (Pinned Tabs)">
          <div className="max-w-md">
            <IslandWithTabs className="h-64">
              <Tabs defaultValue="tab1" className="w-full h-full flex flex-col">
                {/* Tab Bar - Pinned */}
                <TabBar>
                  <TabsList className="h-auto bg-transparent gap-1 p-0">
                    <TabsTrigger value="tab1">
                      <Icon fleet="file-types-text" size="sm" className="mr-1" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="tab2">
                      <Icon fleet="file-types-typescript" size="sm" className="mr-1" />
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="tab3">
                      <Icon fleet="settings" size="sm" className="mr-1" />
                      Settings
                    </TabsTrigger>
                  </TabsList>
                </TabBar>
                
                {/* Content Area - Scrollable */}
                <TabContentArea>
                  <TabsContent value="tab1" className="mt-0 h-full">
                    <Island className="h-full">
                      <div className="space-y-3">
                        <Typography variant="default-semibold">
                          Overview Content (Scrollable)
                        </Typography>
                        <Typography variant="default" className="text-muted-foreground">
                          Tabs are pinned at the top, content scrolls independently.
                        </Typography>
                        {Array.from({ length: 15 }, (_, i) => (
                          <div key={i} className="p-2 bg-muted/30 rounded">
                            <Typography variant="small">Item {i + 1}</Typography>
                            <Typography variant="small" className="text-muted-foreground">
                              Content item {i + 1} with scrollable behavior.
                            </Typography>
                          </div>
                        ))}
                      </div>
                    </Island>
                  </TabsContent>
                  <TabsContent value="tab2" className="mt-0 h-full">
                    <Island className="h-full">
                      <div className="space-y-3">
                        <Typography variant="default-semibold">
                          Details Content
                        </Typography>
                        {Array.from({ length: 8 }, (_, i) => (
                          <div key={i} className="p-2 bg-primary/10 rounded">
                            <Typography variant="small">Detail {i + 1}</Typography>
                          </div>
                        ))}
                      </div>
                    </Island>
                  </TabsContent>
                  <TabsContent value="tab3" className="mt-0 h-full">
                    <Island className="h-full">
                      <div className="space-y-3">
                        <Typography variant="default-semibold">
                          Settings Content
                        </Typography>
                        {Array.from({ length: 6 }, (_, i) => (
                          <div key={i} className="p-2 border border-border rounded">
                            <Typography variant="small">Setting {i + 1}</Typography>
                          </div>
                        ))}
                      </div>
                    </Island>
                  </TabsContent>
                </TabContentArea>
              </Tabs>
            </IslandWithTabs>
          </div>
        </ExampleSectionCard>

        {/* File Tree Island */}
        <ExampleSectionCard title="File Tree Island">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Typography variant="default-semibold" className="mb-2">With Tabs</Typography>
              <div className="w-full h-80 border border-border rounded-lg overflow-hidden">
                <FileTreeIsland
                  onFileClick={(file) => console.log('File clicked:', file.name)}
                  onFolderToggle={(folder, isExpanded) => console.log('Folder toggled:', folder.name, isExpanded)}
                  tabTitle="Files"
                />
              </div>
            </div>
            <div>
              <Typography variant="default-semibold" className="mb-2">Without Tabs</Typography>
              <div className="w-full h-80 border border-border rounded-lg overflow-hidden">
                <FileTreeIsland
                  onFileClick={(file) => console.log('File clicked:', file.name)}
                  onFolderToggle={(folder, isExpanded) => console.log('Folder toggled:', folder.name, isExpanded)}
                  showTabs={false}
                />
              </div>
            </div>
          </div>
        </ExampleSectionCard>

        {/* Chat Island */}
        <ExampleSectionCard title="Chat Island">
          <div className="max-w-2xl">
            <ChatIsland 
              className="h-96"
              defaultTab="chat1"
              tabs={[
                {
                  value: "chat1",
                  label: "Chat Name",
                  icon: "ai-chat",
                  chatContent: (
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Icon fleet="user" size="sm" className="mt-1" />
                        <div>
                          <Typography variant="small" className="font-semibold mb-1">
                            You
                          </Typography>
                          <Typography variant="small">
                            How do I implement drag-and-drop tabs in Fleet islands?
                          </Typography>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon fleet="ai-chat" size="sm" className="mt-1" />
                        <div>
                          <Typography variant="small" className="font-semibold mb-1">
                            Assistant
                          </Typography>
                          <Typography variant="small">
                            Use the DroppableTabIsland component with @dnd-kit for drag-and-drop functionality. The component handles tab reordering and provides proper Fleet styling.
                          </Typography>
                        </div>
                      </div>
                    </div>
                  ),
                  contextPreview: (
                    <AiChatContextPreview
                      className="w-full"
                      context={{
                        id: "demo-context-1",
                        contextEntries: [
                          {
                            id: "1",
                            name: "island.tsx",
                            description: "Island component with DroppableTabIsland",
                            type: "file",
                            isPinned: true
                          },
                          {
                            id: "2",
                            name: "main",
                            description: "Current branch",
                            type: "branch",
                            isPinned: false
                          }
                        ]
                      }}
                      onRemoveEntry={(id) => console.log('Remove entry:', id)}
                      onTogglePinEntry={(id) => console.log('Toggle pin:', id)}
                      onNavigateToEntry={(id) => console.log('Navigate to:', id)}
                    />
                  ),
                  chatInput: (
                    <AiChatInput
                      placeholder="Ask about islands and drag-and-drop..."
                      onSubmit={(e) => {
                        e.preventDefault()
                        console.log('Chat 1 submitted')
                      }}
                    />
                  )
                },
                {
                  value: "chat2",
                  label: "Another Chat",
                  icon: "ai-chat",
                  chatContent: (
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Icon fleet="user" size="sm" className="mt-1" />
                        <div>
                          <Typography variant="small" className="font-semibold mb-1">
                            You
                          </Typography>
                          <Typography variant="small">
                            What's the difference between regular islands and tab islands?
                          </Typography>
                        </div>
                      </div>
                    </div>
                  ),
                  contextPreview: (
                    <AiChatContextPreview
                      className="w-full"
                      context={{
                        id: "demo-context-2",
                        contextEntries: [
                          {
                            id: "3",
                            name: "ISLAND_IMPLEMENTATION.md",
                            description: "Island documentation",
                            type: "file",
                            isPinned: false
                          },
                          {
                            id: "4",
                            name: "develop",
                            description: "Feature branch",
                            type: "branch",
                            isPinned: true
                          }
                        ]
                      }}
                      onRemoveEntry={(id) => console.log('Remove entry:', id)}
                      onTogglePinEntry={(id) => console.log('Toggle pin:', id)}
                      onNavigateToEntry={(id) => console.log('Navigate to:', id)}
                    />
                  ),
                  chatInput: (
                    <AiChatInput
                      placeholder="Ask about this conversation..."
                      onSubmit={(e) => {
                        e.preventDefault()
                        console.log('Chat 2 submitted')
                      }}
                    />
                  )
                }
              ]}
            />
          </div>
        </ExampleSectionCard>

        {/* Island Container with Splitters */}
        <ExampleSectionCard title="Island Container with Splitters">
          <div className="mb-4 flex flex-wrap gap-2">
            <Button
              variant={showSplitters ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setShowSplitters(!showSplitters)}
            >
              {showSplitters ? "Hide" : "Show"} Splitters
            </Button>
            <Button
              variant={containerDirection === "horizontal" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setContainerDirection("horizontal")}
            >
              Horizontal
            </Button>
            <Button
              variant={containerDirection === "vertical" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setContainerDirection("vertical")}
            >
              Vertical
            </Button>
          </div>

          <div className="h-64 border rounded-lg p-2">
            <IslandContainer direction={containerDirection} className="h-full">
              <Island className="flex-1 min-h-0">
                <Typography variant="default-semibold">First Island</Typography>
                <Typography variant="small" className="text-muted-foreground">
                  Content in first island with proper Fleet background
                </Typography>
              </Island>
              
              {showSplitters && <IslandSplitter direction={containerDirection} />}
              
              <Island className="flex-1 min-h-0">
                <Typography variant="default-semibold">Second Island</Typography>
                <Typography variant="small" className="text-muted-foreground">
                  Content in second island with Fleet styling
                </Typography>
              </Island>
              
              {showSplitters && <IslandSplitter direction={containerDirection} />}
              
              <Island className="flex-1 min-h-0">
                <Typography variant="default-semibold">Third Island</Typography>
                <Typography variant="small" className="text-muted-foreground">
                  Content in third island matching Fleet design
                </Typography>
              </Island>
            </IslandContainer>
          </div>
        </ExampleSectionCard>

        {/* Implementation Details */}
        <ExampleSectionCard title="Implementation Notes">
          <Island variant="panel" className="bg-muted/50">
            <Typography variant="default-semibold" className="mb-3">Key Features:</Typography>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>8px rounded corners with no borders (Fleet-accurate)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Proper Fleet island background colors (--fleet-island-background)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>6px padding for content areas (Fleet standard)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>DroppableTabIsland with @dnd-kit drag-and-drop support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Auto-scrollable content when fixed height is set</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Seamless tab integration with pinned tabs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Multiple variants (default, panel, main, conversation)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>FileTreeIsland for project structure navigation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>ChatIsland for AI chat interfaces with context preview</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Island containers with optional splitters for resizable layouts</span>
              </li>
            </ul>
          </Island>
        </ExampleSectionCard>
      </div>
    </ExamplePageTemplate>
  )
}