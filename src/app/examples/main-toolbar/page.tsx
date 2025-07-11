"use client"

import { useState } from "react"
import { Typography } from "@/components/ui/typography"
import { Button } from "@/components/ui/button-shadcn"
import {
  ContextMenu
} from "@/components/ui/context-menu"
import {
  MainToolbar,
  WorkspaceWidget,
  ProgressWidget,
} from "@/components/ui/main-toolbar"
import { Toolbar, ToolbarButton, ToolbarSeparator } from "@/components/ui/toolbar"
import { ExampleSectionCard, ExamplePageTemplate } from "@/components/ui"

export default function MainToolbarPage() {
  const [showProgress, setShowProgress] = useState(false)
  const [progress, setProgress] = useState(65)
  
  // Panel states - default closed
  const [leftPanelOpen, setLeftPanelOpen] = useState(false)
  const [bottomPanelOpen, setBottomPanelOpen] = useState(false)
  const [rightPanelOpen, setRightPanelOpen] = useState(false)

  return (
    <ExamplePageTemplate
      title="Main Toolbar"
      description="A sophisticated toolbar component with intelligent layout algorithm, based on Fleet&apos;s MainToolbar implementation. This uses default-multiline for proper leading after H1."
    >
      <div className="space-y-8">
        {/* Main Toolbar Demo */}
        <ExampleSectionCard title="Main Toolbar">
          
          {/* Live Demo */}
          <div className="border rounded-lg overflow-hidden mb-4">
            <MainToolbar
              leftButtons={
                <Toolbar variant="regular" size="large">
                  <ToolbarButton 
                    icon={leftPanelOpen ? "panel-left-open" : "panel-left-closed"} 
                    tooltip="Toggle left panel"
                    onClick={() => setLeftPanelOpen(!leftPanelOpen)}
                    selected={leftPanelOpen}
                  />
                  <ToolbarButton 
                    icon={bottomPanelOpen ? "panel-bottom-open" : "panel-bottom-closed"} 
                    tooltip="Toggle bottom panel"
                    onClick={() => setBottomPanelOpen(!bottomPanelOpen)}
                    selected={bottomPanelOpen}
                  />
                  <ToolbarButton 
                    icon={rightPanelOpen ? "panel-right-open" : "panel-right-closed"} 
                    tooltip="Toggle right panel"
                    onClick={() => setRightPanelOpen(!rightPanelOpen)}
                    selected={rightPanelOpen}
                  />
                  <ToolbarSeparator />
                  <ToolbarButton icon="tools" tooltip="Tools" />
                </Toolbar>
              }
              workspace={
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
                        <Button
                          variant="ghost"
                          className="h-auto w-auto px-1 py-0.5 min-w-0"
                        >
                          <Typography variant="default-semibold" className="truncate">
                            air-web-components
                          </Typography>
                        </Button>
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
                        <Button
                          variant="ghost"
                          className="h-auto w-auto px-1 py-0.5 min-w-0"
                        >
                          <Typography variant="default-semibold" className="truncate">
                            main
                          </Typography>
                        </Button>
                      }
                    />
                  }
                />
              }
              rightButtons={
                <div className="flex items-center gap-2">
                  {showProgress && (
                    <>
                      <ProgressWidget
                        visible={true}
                        progress={progress}
                        text="Building project..."
                      />
                      <div className="w-px h-4 bg-[var(--fleet-separator-default)]" />
                    </>
                  )}
                  <Toolbar variant="regular" size="large">
                    <ToolbarButton icon="ai-chat" tooltip="Chat history" />
                    <ToolbarButton icon="run" tooltip="Run" />
                    <ToolbarButton icon="search" tooltip="Search everywhere" />
                    <ToolbarButton icon="notifications" tooltip="Notifications" />
                    <ToolbarButton icon="settings" tooltip="Settings" />
                  </Toolbar>
                </div>
              }
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowProgress(!showProgress)}
            >
              {showProgress ? "Hide" : "Show"} Progress
            </Button>
            {showProgress && (
              <>
                <Typography variant="small" className="font-semibold">Progress:</Typography>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => setProgress(parseInt(e.target.value))}
                  className="w-32"
                />
                <Typography variant="small">{progress}%</Typography>
              </>
            )}
          </div>
        </ExampleSectionCard>

      </div>
    </ExamplePageTemplate>
  )
}