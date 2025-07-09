"use client"

import React, { useState, useMemo } from "react"
import { 
  FleetWindowLayout,
  Typography,
  TabsTrigger,
  FileTab,
  WorkspaceWidget,
  ContextMenu,
  FileTreeIsland,
  Icon,
  DraggableTabsProvider,
  DroppableTabIsland,
  type TabIsland,
  ExamplePageTemplate
} from "@/components/ui"
import { Toolbar, ToolbarButton, ToolbarSeparator } from "@/components/ui/toolbar"

// Move initial islands outside component to prevent recreation
const createInitialIslands = (): TabIsland[] => [
    {
      id: "main",
      activeTab: "package.json",
      tabs: [
        {
          id: "package.json",
          title: "package.json",
          content: <FileTab
            value="package.json"
            filename="package.json"
            fileIcon={<Icon fleet="file-types-json" size="sm" />}
            onClose={() => console.log('Close package.json')}
          />,
          tabContent: <Typography variant="default">package.json content</Typography>,
          icon: <Icon fleet="file-types-json" size="sm" />,
        },
        {
          id: "readme.md",
          title: "README.md",
          content: <FileTab
            value="readme.md"
            filename="README.md"
            fileIcon={<Icon fleet="file-types-markdown" size="sm" />}
            isModified={true}
            onClose={() => console.log('Close README.md')}
          />,
          tabContent: <Typography variant="default">README.md content</Typography>,
          icon: <Icon fleet="file-types-markdown" size="sm" />,
          isModified: true,
        },
      ],
    },
    {
      id: "right",
      activeTab: "right-tab1",
      tabs: [
        {
          id: "right-tab1",
          title: "Tab 1",
          content: <TabsTrigger value="right-tab1">Tab 1</TabsTrigger>,
          tabContent: <Typography variant="default">Right Panel - Tab 1 Content</Typography>,
        },
        {
          id: "right-tab2",
          title: "Tab 2",
          content: <TabsTrigger value="right-tab2">Tab 2</TabsTrigger>,
          tabContent: <Typography variant="default">Right Panel - Tab 2 Content</Typography>,
        },
      ],
    },
    {
      id: "bottom",
      activeTab: "bottom-tab1",
      tabs: [
        {
          id: "bottom-tab1",
          title: "Tab 1",
          content: <TabsTrigger value="bottom-tab1">Tab 1</TabsTrigger>,
          tabContent: <Typography variant="default">Bottom Panel - Tab 1 Content</Typography>,
        },
        {
          id: "bottom-tab2",
          title: "Tab 2",
          content: <TabsTrigger value="bottom-tab2">Tab 2</TabsTrigger>,
          tabContent: <Typography variant="default">Bottom Panel - Tab 2 Content</Typography>,
        },
      ],
    },
]

export default function WindowLayoutPage() {
  const [leftPanelVisible, setLeftPanelVisible] = useState(true)
  const [rightPanelVisible, setRightPanelVisible] = useState(true)
  const [bottomPanelVisible, setBottomPanelVisible] = useState(true)

  // Memoize initial islands to prevent recreation on every render
  const initialIslands = useMemo(() => createInitialIslands(), [])

  return (
    <ExamplePageTemplate
      title="Window Layout"
      description="Fleet window layout with draggable tabs between islands. This uses default-multiline for proper leading after H1."
    >
      <div className="space-y-8">
        {/* Fleet Window Layout */}
        <section className="space-y-6">
          <Typography variant="header-2-semibold">Fleet Window Layout with Draggable Tabs</Typography>
          <div className="space-y-4">
            <DraggableTabsProvider
              initialIslands={initialIslands}
            >
              <div className="h-[600px] border border-border rounded-lg overflow-hidden">
                <FleetWindowLayout
                  platform="default"
                  toolbarProps={{
                    focused: true,
                    leftButtons: (
                      <Toolbar variant="regular" size="large">
                        <ToolbarButton 
                          icon={leftPanelVisible ? "panel-left-open" : "panel-left-closed"} 
                          tooltip="Toggle left panel"
                          onClick={() => setLeftPanelVisible(!leftPanelVisible)}
                          selected={leftPanelVisible}
                        />
                        <ToolbarButton 
                          icon={bottomPanelVisible ? "panel-bottom-open" : "panel-bottom-closed"} 
                          tooltip="Toggle bottom panel"
                          onClick={() => setBottomPanelVisible(!bottomPanelVisible)}
                          selected={bottomPanelVisible}
                        />
                        <ToolbarButton 
                          icon={rightPanelVisible ? "panel-right-open" : "panel-right-closed"} 
                          tooltip="Toggle right panel"
                          onClick={() => setRightPanelVisible(!rightPanelVisible)}
                          selected={rightPanelVisible}
                        />
                        <ToolbarSeparator />
                        <ToolbarButton icon="tools" tooltip="Tools" />
                      </Toolbar>
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
                      <Toolbar variant="regular" size="large">
                        <ToolbarButton icon="ai-chat" tooltip="Chat history" />
                        <ToolbarButton icon="run" tooltip="Run" />
                        <ToolbarButton icon="search" tooltip="Search everywhere" />
                        <ToolbarButton icon="notifications" tooltip="Notifications" />
                        <ToolbarButton icon="settings" tooltip="Settings" />
                      </Toolbar>
                    )
                  }}
                  leftPanel={
                    <FileTreeIsland 
                      onFileClick={(file) => console.log('File clicked:', file.name)}
                      onFolderToggle={(folder, isExpanded) => console.log('Folder toggled:', folder.name, isExpanded)}
                    />
                  }
                  rightPanel={
                    <DroppableTabIsland islandId="right" />
                  }
                  bottomPanel={
                    <DroppableTabIsland islandId="bottom" />
                  }
                  mainContent={
                    <DroppableTabIsland islandId="main" />
                  }
                  leftPanelVisible={leftPanelVisible}
                  rightPanelVisible={rightPanelVisible}
                  bottomPanelVisible={bottomPanelVisible}
                />
              </div>
            </DraggableTabsProvider>
          </div>
        </section>
      </div>
    </ExamplePageTemplate>
  )