"use client"

import React, { useState } from "react"
import { 
  FleetWindowLayout,
  Button,
  Typography,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  ToolbarButton,
  ToolbarSeparator,
  WorkspaceWidget,
  ProgressWidget,
  LeftToolbarSection,
  RightToolbarSection,
  ContextMenu,
} from "@/components/ui"

export default function WindowLayoutPage() {
  const [leftPanelVisible, setLeftPanelVisible] = useState(true)
  const [rightPanelVisible, setRightPanelVisible] = useState(true)
  const [bottomPanelVisible, setBottomPanelVisible] = useState(true)

  return (
    <>
      <div className="mb-8">
        <Typography variant="header-1-semibold" as="h1">
          Window Layout
        </Typography>
        <Typography variant="default" className="text-muted-foreground mt-2">
          Fleet window layout with default toolbar and 4 islands with tabs
        </Typography>
      </div>

      <div className="space-y-8">
        {/* Fleet Window Layout */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Fleet Window Layout</Typography>
          <div className="space-y-4">

            <div className="h-[600px] border border-border rounded-lg overflow-hidden">
              <FleetWindowLayout
                platform="default"
                toolbarProps={{
                  focused: true,
                  leftButtons: (
                    <LeftToolbarSection>
                      <ToolbarButton 
                        icon={leftPanelVisible ? "panel-left-open" : "panel-left-closed"} 
                        tooltip="Toggle left panel"
                        onClick={() => setLeftPanelVisible(!leftPanelVisible)}
                        active={leftPanelVisible}
                      />
                      <ToolbarButton 
                        icon={bottomPanelVisible ? "panel-bottom-open" : "panel-bottom-closed"} 
                        tooltip="Toggle bottom panel"
                        onClick={() => setBottomPanelVisible(!bottomPanelVisible)}
                        active={bottomPanelVisible}
                      />
                      <ToolbarButton 
                        icon={rightPanelVisible ? "panel-right-open" : "panel-right-closed"} 
                        tooltip="Toggle right panel"
                        onClick={() => setRightPanelVisible(!rightPanelVisible)}
                        active={rightPanelVisible}
                      />
                      <ToolbarSeparator />
                      <ToolbarButton icon="tools" tooltip="Tools" />
                    </LeftToolbarSection>
                  ),
                  workspace: (
                    <WorkspaceWidget 
                      projectName="air-web-components"
                      branchName="main"
                      projectMenu={
                        <ContextMenu
                          items={[
                            {
                              type: 'action',
                              name: 'Open...',
                              icon: 'folder',
                              shortcutText: '⌘O',
                              callback: () => console.log('Open project')
                            },
                            {
                              type: 'action',
                              name: 'Clone from Git...',
                              icon: 'vcs-vcs',
                              callback: () => console.log('Clone from Git')
                            },
                            { type: 'separator' },
                            {
                              type: 'action',
                              name: 'Connect To',
                              rightIcon: 'chevron-right',
                              callback: () => console.log('Connect To')
                            },
                            { type: 'separator' },
                            {
                              type: 'action',
                              name: 'Rename Workspace...',
                              callback: () => console.log('Rename workspace')
                            },
                            { type: 'separator' },
                            {
                              type: 'text',
                              name: 'No recent workspaces',
                              text: 'No recent workspaces'
                            }
                          ]}
                          trigger={
                            <ToolbarButton
                              tooltip="Project actions"
                              className="h-auto w-auto px-1 py-0.5 min-w-0"
                            >
                              <Typography variant="default-semibold" className="truncate">
                                air-web-components
                              </Typography>
                            </ToolbarButton>
                          }
                        />
                      }
                      branchMenu={
                        <ContextMenu
                          items={[
                            {
                              type: 'action',
                              name: 'Switch Branch...',
                              icon: 'vcs-branch',
                              callback: () => console.log('Switch branch')
                            },
                            {
                              type: 'action',
                              name: 'New Branch...',
                              icon: 'add',
                              callback: () => console.log('New branch')
                            },
                            { type: 'separator' },
                            {
                              type: 'action',
                              name: 'Pull',
                              icon: 'vcs-get',
                              callback: () => console.log('Pull')
                            },
                            {
                              type: 'action',
                              name: 'Push',
                              icon: 'vcs-commit',
                              callback: () => console.log('Push')
                            }
                          ]}
                          trigger={
                            <ToolbarButton
                              tooltip="Branch actions"
                              className="h-auto w-auto px-1 py-0.5 min-w-0"
                            >
                              <Typography variant="default-semibold" className="truncate">
                                main
                              </Typography>
                            </ToolbarButton>
                          }
                        />
                      }
                    />
                  ),
                  rightButtons: (
                    <RightToolbarSection>
                      <ToolbarButton icon="ai-chat" tooltip="Chat history" />
                      <ToolbarButton icon="run" tooltip="Run" />
                      <ToolbarButton icon="search" tooltip="Search everywhere" />
                      <ToolbarButton icon="notifications" tooltip="Notifications" />
                      <ToolbarButton icon="settings" tooltip="Settings" />
                    </RightToolbarSection>
                  )
                }}
                leftPanel={
                  <Tabs defaultValue="tab1" className="w-full h-full flex flex-col">
                    {/* Tab Bar */}
                    <div className="bg-card px-1.5 py-1">
                      <TabsList className="h-auto bg-transparent gap-1 p-0">
                        <TabsTrigger value="tab1" className="h-6">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2" className="h-6">Tab 2</TabsTrigger>
                      </TabsList>
                    </div>
                    
                    {/* Content */}
                    <div className="p-1.5 flex-1">
                      <TabsContent value="tab1" className="mt-0 h-full">
                        <Typography variant="default">Left Panel - Tab 1 Content</Typography>
                      </TabsContent>
                      <TabsContent value="tab2" className="mt-0 h-full">
                        <Typography variant="default">Left Panel - Tab 2 Content</Typography>
                      </TabsContent>
                    </div>
                  </Tabs>
                }
                rightPanel={
                  <Tabs defaultValue="tab1" className="w-full h-full flex flex-col">
                    {/* Tab Bar */}
                    <div className="bg-card px-1.5 py-1">
                      <TabsList className="h-auto bg-transparent gap-1 p-0">
                        <TabsTrigger value="tab1" className="h-6">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2" className="h-6">Tab 2</TabsTrigger>
                      </TabsList>
                    </div>
                    
                    {/* Content */}
                    <div className="p-1.5 flex-1">
                      <TabsContent value="tab1" className="mt-0 h-full">
                        <Typography variant="default">Right Panel - Tab 1 Content</Typography>
                      </TabsContent>
                      <TabsContent value="tab2" className="mt-0 h-full">
                        <Typography variant="default">Right Panel - Tab 2 Content</Typography>
                      </TabsContent>
                    </div>
                  </Tabs>
                }
                bottomPanel={
                  <Tabs defaultValue="tab1" className="w-full h-full flex flex-col">
                    {/* Tab Bar */}
                    <div className="bg-card px-1.5 py-1">
                      <TabsList className="h-auto bg-transparent gap-1 p-0">
                        <TabsTrigger value="tab1" className="h-6">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2" className="h-6">Tab 2</TabsTrigger>
                      </TabsList>
                    </div>
                    
                    {/* Content */}
                    <div className="p-1.5 flex-1">
                      <TabsContent value="tab1" className="mt-0 h-full">
                        <Typography variant="default">Bottom Panel - Tab 1 Content</Typography>
                      </TabsContent>
                      <TabsContent value="tab2" className="mt-0 h-full">
                        <Typography variant="default">Bottom Panel - Tab 2 Content</Typography>
                      </TabsContent>
                    </div>
                  </Tabs>
                }
                mainContent={
                  <Tabs defaultValue="tab1" className="w-full h-full flex flex-col">
                    {/* Tab Bar */}
                    <div className="bg-card px-1.5 py-1">
                      <TabsList className="h-auto bg-transparent gap-1 p-0">
                        <TabsTrigger value="tab1" className="h-6">Tab 1</TabsTrigger>
                        <TabsTrigger value="tab2" className="h-6">Tab 2</TabsTrigger>
                      </TabsList>
                    </div>
                    
                    {/* Content */}
                    <div className="p-1.5 flex-1">
                      <TabsContent value="tab1" className="mt-0 h-full">
                        <Typography variant="default">Main Content - Tab 1 Content</Typography>
                      </TabsContent>
                      <TabsContent value="tab2" className="mt-0 h-full">
                        <Typography variant="default">Main Content - Tab 2 Content</Typography>
                      </TabsContent>
                    </div>
                  </Tabs>
                }
                leftPanelVisible={leftPanelVisible}
                rightPanelVisible={rightPanelVisible}
                bottomPanelVisible={bottomPanelVisible}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}