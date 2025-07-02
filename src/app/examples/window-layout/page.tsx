"use client"

import React, { useState } from "react"
import { 
  WindowLayout,
  StandardWindowLayout,
  AirWindowLayout,
  Panel,
  PanelContainer,
  Button,
  Typography,
  Icon,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  MainToolbar,
  ToolbarButton,
  ToolbarSeparator,
  WorkspaceWidget,
  ProgressWidget,
  LeftToolbarSection,
  RightToolbarSection,
} from "@/components/ui"

export default function WindowLayoutPage() {
  const [leftPanelVisible, setLeftPanelVisible] = useState(true)
  const [rightPanelVisible, setRightPanelVisible] = useState(true)
  const [bottomPanelVisible, setBottomPanelVisible] = useState(true)
  const [airMainPanelVisible, setAirMainPanelVisible] = useState(true)
  
  // Progress state for demonstration
  const [progressVisible, setProgressVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  return (
    <>
      <div className="mb-8">
        <Typography variant="header-1-semibold" as="h1">
          Window Layout
        </Typography>
        <Typography variant="default" className="text-muted-foreground mt-2">
          Fleet window layout system with panels, toolbars, and splitters
        </Typography>
      </div>

      <div className="space-y-12">
        {/* Standard Layout */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Standard IDE Layout</Typography>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button
                variant={leftPanelVisible ? "primary" : "secondary"}
                size="sm"
                onClick={() => setLeftPanelVisible(!leftPanelVisible)}
              >
                <Icon fleet="panels-left" size="sm" />
                Left Panel
              </Button>
              <Button
                variant={rightPanelVisible ? "primary" : "secondary"}
                size="sm"
                onClick={() => setRightPanelVisible(!rightPanelVisible)}
              >
                <Icon fleet="panels-right" size="sm" />
                Right Panel
              </Button>
              <Button
                variant={bottomPanelVisible ? "primary" : "secondary"}
                size="sm"
                onClick={() => setBottomPanelVisible(!bottomPanelVisible)}
              >
                <Icon fleet="panels-bottom" size="sm" />
                Bottom Panel
              </Button>
            </div>

            <div className="h-[600px] border border-border rounded-lg overflow-hidden">
              <StandardWindowLayout
                header={
                  <MainToolbar
                    platform="default"
                    focused={true}
                    leftButtons={
                      <LeftToolbarSection>
                        <ToolbarButton icon="menu" tooltip="Main menu" />
                        <ToolbarButton 
                          icon={leftPanelVisible ? "panel-left-open" : "panel-left-closed"} 
                          tooltip="Toggle project panel"
                          active={leftPanelVisible}
                          onClick={() => setLeftPanelVisible(!leftPanelVisible)}
                        />
                        <ToolbarButton 
                          icon={bottomPanelVisible ? "panel-bottom-open" : "panel-bottom-closed"} 
                          tooltip="Toggle terminal panel"
                          active={bottomPanelVisible}
                          onClick={() => setBottomPanelVisible(!bottomPanelVisible)}
                        />
                        <ToolbarSeparator />
                        <ToolbarButton icon="tools" tooltip="Tools" />
                        <ToolbarButton icon="user-add" tooltip="Collaboration" />
                      </LeftToolbarSection>
                    }
                    workspace={
                      <WorkspaceWidget 
                        projectName="air-web-components"
                        branchName="main"
                      />
                    }
                    progress={
                      <ProgressWidget
                        visible={progressVisible}
                        progress={progress}
                        text="Building..."
                      />
                    }
                    rightButtons={
                      <RightToolbarSection>
                        <ToolbarButton icon="search" tooltip="Search everywhere" />
                        <ToolbarButton 
                          icon="notifications" 
                          tooltip="Notifications"
                          onClick={() => {
                            setProgressVisible(!progressVisible)
                            if (!progressVisible) {
                              // Simulate progress
                              let p = 0
                              const interval = setInterval(() => {
                                p += 10
                                setProgress(p)
                                if (p >= 100) {
                                  clearInterval(interval)
                                  setTimeout(() => {
                                    setProgressVisible(false)
                                    setProgress(0)
                                  }, 1000)
                                }
                              }, 200)
                            }
                          }}
                        />
                        <ToolbarButton 
                          icon={rightPanelVisible ? "panel-right-open" : "panel-right-closed"} 
                          tooltip="Profile settings"
                          active={rightPanelVisible}
                          onClick={() => setRightPanelVisible(!rightPanelVisible)}
                        />
                      </RightToolbarSection>
                    }
                  />
                }
                leftPanel={
                  <div className="p-4 h-full">
                    <Typography variant="default-semibold" className="mb-4">Project</Typography>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 p-2 hover:bg-[var(--fleet-list-item-background-hovered)] rounded">
                        <Icon fleet="folder" size="sm" />
                        <span>src</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 hover:bg-[var(--fleet-list-item-background-hovered)] rounded">
                        <Icon fleet="folder" size="sm" />
                        <span>components</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 hover:bg-[var(--fleet-list-item-background-hovered)] rounded">
                        <Icon fleet="file-types-typescript" size="sm" />
                        <span>window-layout.tsx</span>
                      </div>
                    </div>
                  </div>
                }
                rightPanel={
                  <div className="p-4 h-full">
                    <Typography variant="default-semibold" className="mb-4">Inspector</Typography>
                    <div className="space-y-2">
                      <Typography variant="default">Properties</Typography>
                      <Typography variant="small" className="text-muted-foreground">
                        No selection
                      </Typography>
                    </div>
                  </div>
                }
                bottomPanel={
                  <div className="p-4 h-full">
                    <Tabs defaultValue="terminal">
                      <TabsList>
                        <TabsTrigger value="terminal">Terminal</TabsTrigger>
                        <TabsTrigger value="problems">Problems</TabsTrigger>
                        <TabsTrigger value="output">Output</TabsTrigger>
                      </TabsList>
                      <TabsContent value="terminal" className="mt-4">
                        <Typography variant="code" className="text-green-400">
                          $ npm run dev
                        </Typography>
                      </TabsContent>
                      <TabsContent value="problems" className="mt-4">
                        <Typography variant="default">No problems</Typography>
                      </TabsContent>
                      <TabsContent value="output" className="mt-4">
                        <Typography variant="code">Build output...</Typography>
                      </TabsContent>
                    </Tabs>
                  </div>
                }
                mainContent={
                  <div className="p-4 h-full flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Icon fleet="editor" size="lg" />
                      <Typography variant="header-3-semibold">Welcome to Fleet</Typography>
                      <Typography variant="default" className="text-muted-foreground">
                        Open a file to start editing
                      </Typography>
                    </div>
                  </div>
                }
                leftPanelVisible={leftPanelVisible}
                rightPanelVisible={rightPanelVisible}
                bottomPanelVisible={bottomPanelVisible}
              />
            </div>
          </div>
        </section>

        {/* Air Layout */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Air (AI Chat) Layout</Typography>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button
                variant={airMainPanelVisible ? "primary" : "secondary"}
                size="sm"
                onClick={() => setAirMainPanelVisible(!airMainPanelVisible)}
              >
                <Icon fleet="editor" size="sm" />
                Main Panel
              </Button>
            </div>

            <div className="h-[600px] border border-border rounded-lg overflow-hidden">
              <AirWindowLayout
                header={
                  <MainToolbar
                    platform="default"
                    focused={true}
                    leftButtons={
                      <LeftToolbarSection>
                        <ToolbarButton icon="ai-assistant" tooltip="AI Assistant" />
                        <ToolbarButton icon="ai-chat" tooltip="AI Chat" />
                      </LeftToolbarSection>
                    }
                    workspace={
                      <WorkspaceWidget 
                        projectName="Fleet Air"
                        branchName="AI Assistant"
                      />
                    }
                    rightButtons={
                      <RightToolbarSection>
                        <ToolbarButton icon="settings" tooltip="Settings" />
                        <ToolbarButton icon="user" tooltip="Profile" />
                      </RightToolbarSection>
                    }
                  />
                }
                conversationHistory={
                  <div className="p-4 h-full">
                    <Typography variant="default-semibold" className="mb-4">Conversations</Typography>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 p-2 hover:bg-[var(--fleet-list-item-background-hovered)] rounded">
                        <Icon fleet="ai-chat" size="sm" />
                        <span>React Components</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 hover:bg-[var(--fleet-list-item-background-hovered)] rounded">
                        <Icon fleet="ai-chat" size="sm" />
                        <span>TypeScript Help</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 hover:bg-[var(--fleet-list-item-background-hovered)] rounded">
                        <Icon fleet="ai-chat" size="sm" />
                        <span>Code Review</span>
                      </div>
                    </div>
                  </div>
                }
                activeConversation={
                  <div className="p-4 h-full flex flex-col">
                    <Typography variant="default-semibold" className="mb-4">Chat</Typography>
                    <div className="flex-1 space-y-4 overflow-y-auto">
                      <div className="bg-[var(--fleet-chat-user-background)] p-3 rounded-lg ml-8">
                        <Typography variant="default">
                          Help me create a window layout component for React
                        </Typography>
                      </div>
                      <div className="bg-[var(--fleet-chat-assistant-background)] p-3 rounded-lg mr-8">
                        <Typography variant="default">
                          I&apos;d be happy to help you create a window layout component! Based on Fleet&apos;s design system, 
                          we can create a flexible layout with panels, toolbars, and splitters.
                        </Typography>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <input 
                        className="flex-1 px-3 py-2 border border-[var(--fleet-input-border-default)] rounded-lg bg-[var(--fleet-input-background)]"
                        placeholder="Type your message..."
                      />
                      <Button size="sm">
                        <Icon fleet="ai-send" size="sm" />
                      </Button>
                    </div>
                  </div>
                }
                mainPanel={
                  <div className="p-4 h-full">
                    <Typography variant="default-semibold" className="mb-4">Code Editor</Typography>
                    <div className="bg-[var(--fleet-editor-background)] border border-[var(--fleet-editor-border)] rounded-lg p-4 h-full">
                      <Typography variant="code" className="text-[var(--fleet-syntax-keyword)]">
                        {`export const WindowLayout = () => {
  return (
    <div className="window-layout">
      {/* Layout content */}
    </div>
  )
}`}
                      </Typography>
                    </div>
                  </div>
                }
                mainPanelVisible={airMainPanelVisible}
              />
            </div>
          </div>
        </section>

        {/* Custom Layout Example */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Custom Layout</Typography>
          <div className="space-y-4">
            <div className="h-[400px] border border-border rounded-lg overflow-hidden">
              <WindowLayout>
                <MainToolbar
                  platform="mac"
                  focused={true}
                  leftButtons={
                    <LeftToolbarSection>
                      <Typography variant="default-semibold">Custom App</Typography>
                    </LeftToolbarSection>
                  }
                  rightButtons={
                    <RightToolbarSection>
                      <ToolbarButton icon="more-horizontal" tooltip="Minimize" />
                      <ToolbarButton icon="close-small" tooltip="Close" />
                    </RightToolbarSection>
                  }
                />
                
                <PanelContainer orientation="vertical" className="p-2 gap-2">
                  <Panel className="p-4">
                    <Typography variant="header-3-semibold">Main Content Area</Typography>
                    <Typography variant="default" className="mt-2 text-muted-foreground">
                      This is a custom layout example using the individual components.
                    </Typography>
                  </Panel>
                  
                  <Panel height="sm" className="p-4">
                    <Typography variant="default-semibold">Status Bar</Typography>
                    <Typography variant="small" className="text-muted-foreground">
                      Ready
                    </Typography>
                  </Panel>
                </PanelContainer>
              </WindowLayout>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}