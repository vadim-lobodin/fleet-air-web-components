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
  ExampleSectionCard
} from "@/components/ui"

export default function IslandsPage() {
  const [showSplitters, setShowSplitters] = useState(true)
  const [containerDirection, setContainerDirection] = useState<"horizontal" | "vertical">("horizontal")

  return (
    <>
      <div className="mb-8">
        <Typography variant="header-1-semibold" as="h1">
          Islands
        </Typography>
        <Typography variant="default" className="text-muted-foreground mt-2">
          Container components with rounded borders and consistent spacing, inspired by Fleet&apos;s island design pattern.
        </Typography>
      </div>

      <div className="space-y-8">
        {/* Basic Islands */}
        <ExampleSectionCard title="Basic Islands">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Island>
              <Typography variant="default" className="font-semibold mb-2">Default Island</Typography>
              <Typography variant="default" className="text-muted-foreground">
                Basic island with horizontal padding only.
              </Typography>
            </Island>
            
            <Island variant="panel" shadow="sm">
              <Typography variant="default" className="font-semibold mb-2">Panel Island</Typography>
              <Typography variant="default" className="text-muted-foreground">
                Panel variant with subtle shadow.
              </Typography>
            </Island>

            <Island variant="main" shadow="lg">
              <Typography variant="default" className="font-semibold mb-2">Main Island</Typography>
              <Typography variant="default" className="text-muted-foreground">
                Main variant with large shadow.
              </Typography>
            </Island>
          </div>
        </ExampleSectionCard>

        {/* Auto-Scrolling Demo */}
        <ExampleSectionCard title="Auto-Scrolling Behavior">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Typography variant="default" className="font-medium">
                Without Fixed Height (No Scrolling)
              </Typography>
              <Island variant="panel">
                <div className="space-y-2">
                  <Typography variant="small" className="font-semibold">File Explorer</Typography>
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="flex items-center gap-2 p-1 text-sm">
                      <Icon fleet="file-types-typescript" size="sm" />
                      <span>file-{i + 1}.tsx</span>
                    </div>
                  ))}
                </div>
              </Island>
            </div>
            <div className="space-y-2">
              <Typography variant="default" className="font-medium">
                With Fixed Height (Auto-Scrolling)
              </Typography>
              <Island variant="panel" className="h-40">
                <div className="space-y-2">
                  <Typography variant="small" className="font-semibold">File Explorer</Typography>
                  {Array.from({ length: 15 }, (_, i) => (
                    <div key={i} className="flex items-center gap-2 p-1 text-sm">
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
                        <Typography variant="default" className="font-semibold">
                          Overview Content (Scrollable)
                        </Typography>
                        <Typography variant="default" className="text-muted-foreground">
                          Tabs are pinned at the top, content scrolls independently.
                        </Typography>
                        {Array.from({ length: 15 }, (_, i) => (
                          <div key={i} className="p-2 bg-muted/30 rounded">
                            <Typography variant="small" className="font-medium">Item {i + 1}</Typography>
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
                        <Typography variant="default" className="font-semibold">
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
                        <Typography variant="default" className="font-semibold">
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
                      {/* Empty chat content */}
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
                            name: "component.tsx",
                            description: "React component file",
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
                      placeholder="Work with AI, @ for mentions, / for commands"
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
                      {/* Empty chat content */}
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
                            name: "styles.css",
                            description: "Stylesheet",
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
                <Typography variant="default" className="font-semibold mb-2">First Island</Typography>
                <Typography variant="small" className="text-muted-foreground">
                  Content in first island
                </Typography>
              </Island>
              
              {showSplitters && <IslandSplitter direction={containerDirection} />}
              
              <Island className="flex-1 min-h-0">
                <Typography variant="default" className="font-semibold mb-2">Second Island</Typography>
                <Typography variant="small" className="text-muted-foreground">
                  Content in second island
                </Typography>
              </Island>
              
              {showSplitters && <IslandSplitter direction={containerDirection} />}
              
              <Island className="flex-1 min-h-0">
                <Typography variant="default" className="font-semibold mb-2">Third Island</Typography>
                <Typography variant="small" className="text-muted-foreground">
                  Content in third island
                </Typography>
              </Island>
            </IslandContainer>
          </div>
        </ExampleSectionCard>


        {/* Implementation Details */}
        <ExampleSectionCard title="Implementation Notes">
          <Island variant="panel" className="bg-muted/50">
            <Typography variant="default" className="font-semibold mb-3">Key Features:</Typography>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>8px rounded corners with no borders</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>6px horizontal padding (left/right only)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Auto-scrollable when fixed height is set</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Pinned tabs with TabBar and TabContentArea</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Multiple variants (default, panel, main)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>ChatIsland for AI chat interfaces with pinned context preview and input</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Integrated shadcn/ui scroll-area component</span>
              </li>
            </ul>
          </Island>
        </ExampleSectionCard>
      </div>
    </>
  )
}