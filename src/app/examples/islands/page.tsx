"use client"

import { useState } from "react"
import { Typography } from "@/components/ui/typography"
import { Button } from "@/components/ui/button-shadcn"
import { Icon } from "@/components/ui/icon"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Island,
  IslandSplitter,
  IslandContainer,
  IslandWithTabs,
  ConversationIsland,
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Island>
              <Typography variant="default" className="font-semibold mb-2">Default Island</Typography>
              <Typography variant="default" className="text-muted-foreground">
                Basic island with default padding and styling.
              </Typography>
            </Island>
            
            <Island variant="panel" shadow="sm">
              <Typography variant="default" className="font-semibold mb-2">Panel Island</Typography>
              <Typography variant="default" className="text-muted-foreground">
                Panel variant with subtle shadow.
              </Typography>
            </Island>
          </div>
        </ExampleSectionCard>

        {/* Fleet Tab Island */}
        <ExampleSectionCard title="Fleet Tab Island">
          <div className="max-w-md">
            <Island className="overflow-hidden h-64" padding="none">
              <Tabs defaultValue="tab1" className="w-full h-full flex flex-col">
                {/* Tab Bar */}
                <div className="bg-card px-1.5 py-1">
                  <TabsList className="h-auto bg-transparent gap-1 p-0">
                    <TabsTrigger value="tab1" >Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2" >Tab 2</TabsTrigger>
                    <TabsTrigger value="tab3" >Tab 3</TabsTrigger>
                  </TabsList>
                </div>
                
                {/* Content */}
                <div className="p-1.5 flex-1">
                  <TabsContent value="tab1" className="mt-0 h-full">
                    <Typography variant="default" className="font-semibold mb-2">
                      Tab 1 Content
                    </Typography>
                    <Typography variant="default" className="text-muted-foreground">
                      This is the content for Tab 1. The island has 6px padding as per Fleet specifications.
                    </Typography>
                  </TabsContent>
                  <TabsContent value="tab2" className="mt-0 h-full">
                    <Typography variant="default" className="font-semibold mb-2">
                      Tab 2 Content
                    </Typography>
                    <Typography variant="default" className="text-muted-foreground">
                      This is the content for Tab 2. Using Fleet&apos;s proper tabs component.
                    </Typography>
                  </TabsContent>
                  <TabsContent value="tab3" className="mt-0 h-full">
                    <Typography variant="default" className="font-semibold mb-2">
                      Tab 3 Content
                    </Typography>
                    <Typography variant="default" className="text-muted-foreground">
                      This is the content for Tab 3. Fleet design system integration.
                    </Typography>
                  </TabsContent>
                </div>
              </Tabs>
            </Island>
          </div>
        </ExampleSectionCard>

        {/* Island Variants */}
        <ExampleSectionCard title="Island Variants">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Island variant="default">
              <Typography variant="small" className="font-semibold">Default</Typography>
              <Typography variant="small" className="text-muted-foreground">6px padding (Fleet standard)</Typography>
            </Island>
            
            <Island variant="panel">
              <Typography variant="small" className="font-semibold">Panel</Typography>
              <Typography variant="small" className="text-muted-foreground">For side panels</Typography>
            </Island>
            
            <Island variant="main" shadow="lg">
              <Typography variant="small" className="font-semibold">Main</Typography>
              <Typography variant="small" className="text-muted-foreground">With shadow</Typography>
            </Island>
          </div>
        </ExampleSectionCard>

        {/* Island with Tabs (Simplified) */}
        <ExampleSectionCard title="Island with Tabs (Simplified)">
          <div className="max-w-md">
            <IslandWithTabs className="h-64">
              <Tabs defaultValue="overview" className="w-full h-full flex flex-col">
                {/* Tab Bar */}
                <div className="bg-card px-1.5 py-1">
                  <TabsList className="h-auto bg-transparent gap-1 p-0">
                    <TabsTrigger value="overview" >
                      <Icon fleet="file-types-text" size="sm" className="mr-1" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="details" >
                      <Icon fleet="file-types-typescript" size="sm" className="mr-1" />
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="settings" >
                      <Icon fleet="settings" size="sm" className="mr-1" />
                      Settings
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                {/* Content */}
                <div className="p-1.5 flex-1">
                  <TabsContent value="overview" className="mt-0 h-full">
                    <Typography variant="default" className="font-semibold mb-2">Overview Content</Typography>
                    <Typography variant="default" className="text-muted-foreground">
                      This is the overview tab content using the proper Fleet Tab Island pattern.
                    </Typography>
                  </TabsContent>
                  <TabsContent value="details" className="mt-0 h-full">
                    <Typography variant="default" className="font-semibold mb-2">Details Content</Typography>
                    <Typography variant="default" className="text-muted-foreground">
                      Detailed information with consistent Fleet 6px padding.
                    </Typography>
                  </TabsContent>
                  <TabsContent value="settings" className="mt-0 h-full">
                    <Typography variant="default" className="font-semibold mb-2">Settings Content</Typography>
                    <Typography variant="default" className="text-muted-foreground">
                      Configuration options using IslandWithTabs component.
                    </Typography>
                  </TabsContent>
                </div>
              </Tabs>
            </IslandWithTabs>
          </div>
        </ExampleSectionCard>

        {/* Island Variants Demo */}
        <ExampleSectionCard title="Island Variants Demo">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Island variant="panel" className="h-64">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <Icon fleet="folder" size="sm" />
                  <Typography variant="default" className="font-semibold">Panel Variant</Typography>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-muted rounded cursor-pointer">
                  <Icon fleet="file-types-typescript" size="sm" />
                  <Typography variant="small">component.tsx</Typography>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-muted rounded cursor-pointer">
                  <Icon fleet="file-types-javascript" size="sm" />
                  <Typography variant="small">utils.js</Typography>
                </div>
              </div>
            </Island>
            
            <Island variant="main" className="h-64">
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Icon fleet="file-types-text" size="lg" className="mx-auto mb-2 text-muted-foreground" />
                  <Typography variant="default" className="font-semibold">Main Variant</Typography>
                  <Typography variant="small" className="text-muted-foreground">
                    Primary content area
                  </Typography>
                </div>
              </div>
            </Island>
            
            <Island variant="panel" className="h-64">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Icon fleet="debugger" size="sm" />
                  <Typography variant="default" className="font-semibold">Panel Variant</Typography>
                </div>
                <div className="space-y-3">
                  <div>
                    <Typography variant="small" className="font-medium">Properties</Typography>
                    <Typography variant="small" className="text-muted-foreground">Type: Component</Typography>
                  </div>
                  <div>
                    <Typography variant="small" className="font-medium">Size</Typography>
                    <Typography variant="small" className="text-muted-foreground">Width: 100%</Typography>
                  </div>
                </div>
              </div>
            </Island>
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

        {/* File Tree Island */}
        <ExampleSectionCard title="File Tree Island">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Typography variant="default-semibold" className="mb-2">With File Tab</Typography>
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

        {/* Conversation Island */}
        <ExampleSectionCard title="Conversation Island">
          <ConversationIsland className="h-80">
            <div className="h-full flex flex-col">
              <div className="flex-1 space-y-4 overflow-auto">
                <div className="flex gap-3">
                  <Icon fleet="user" size="sm" className="mt-1" />
                  <div>
                    <Typography variant="small" className="font-semibold mb-1">You</Typography>
                    <Typography variant="small">How do I use the island components?</Typography>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon fleet="ai-chat" size="sm" className="mt-1" />
                  <div>
                    <Typography variant="small" className="font-semibold mb-1">Assistant</Typography>
                    <Typography variant="small">
                      Islands are container components that provide consistent spacing and visual grouping. 
                      You can use different variants like panel, main, or conversation depending on your use case.
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Ask a question..."
                    className="flex-1 px-3 py-2 bg-background border border-input rounded text-sm"
                  />
                  <Button size="sm">
                    <Icon fleet="ai-send" size="sm" />
                  </Button>
                </div>
              </div>
            </div>
          </ConversationIsland>
        </ExampleSectionCard>

        {/* Terminal-style Island */}
        <ExampleSectionCard title="Terminal-style Island">
          <Island variant="panel" className="h-32">
            <div className="font-mono text-sm space-y-1">
              <div className="text-green-600 dark:text-green-400">$ npm run dev</div>
              <div className="text-muted-foreground">Starting development server...</div>
              <div className="text-blue-600 dark:text-blue-400">✓ Server running on http://localhost:3000</div>
              <div className="text-muted-foreground">Ready in 1.2s</div>
            </div>
          </Island>
        </ExampleSectionCard>

        {/* Implementation Details */}
        <ExampleSectionCard title="Implementation Notes">
          <Island variant="panel" className="bg-muted/50">
            <Typography variant="default" className="font-semibold mb-3">Key Features:</Typography>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>8px rounded corners with no borders, using shadcn/ui design tokens</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Multiple variants (default, panel, conversation, main) for different use cases</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Fleet-standard 6px padding and configurable shadows (none, sm, default, lg)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Specialized components for common layout patterns (panels, content areas)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Integrated tab support with IslandWithTabs component</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Splitter components for resizable layouts</span>
              </li>
            </ul>
          </Island>
        </ExampleSectionCard>
      </div>
    </>
  )
}