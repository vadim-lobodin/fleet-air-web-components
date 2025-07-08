'use client'

import { ControlPanel } from "@/components/ui/control-panel"
import { FleetWindowLayout, ExamplePageTemplate, ExampleSectionCard } from "@/components/ui"
import { Typography } from "@/components/ui/typography"

export default function ControlPanelExamples() {
  return (
    <ExamplePageTemplate
      title="Control Panel (Experimental)"
      description="A tabbed control panel built on the ai-chat-context-preview foundation, featuring multiple collapsible sections for different content types."
    >
        <ExampleSectionCard 
          title="Self-Managing Mode"
          description="Default implementation with mock data matching the Figma design. Click to expand/collapse, switch between tabs, and interact with items."
        >
          <div className="max-w-md">
            <ControlPanel />
          </div>
        </ExampleSectionCard>

        <ExampleSectionCard 
          title="Already Expanded"
          description="Control panel starting in expanded state showing all sections with their content."
        >
          <div className="max-w-md">
            <ControlPanel 
              defaultActiveSection="changes"
            />
          </div>
        </ExampleSectionCard>

        <ExampleSectionCard 
          title="Custom Data"
          description="Control panel with custom data and external event handlers."
        >
          <div className="max-w-md">
            <ControlPanel 
              data={{
                sections: [
                  {
                    id: "files",
                    name: "Files",
                    items: [
                      {
                        id: "1",
                        name: "README.md",
                        description: "Project documentation",
                        type: "file"
                      },
                      {
                        id: "2",
                        name: "src/components/",
                        type: "folder"
                      }
                    ]
                  },
                  {
                    id: "git",
                    name: "Git",
                    items: [
                      {
                        id: "1",
                        name: "main.ts",
                        description: "src/",
                        type: "file",
                        status: { additions: 5, deletions: 2 }
                      },
                      {
                        id: "2",
                        name: "feature-branch",
                        description: "Active branch",
                        type: "branch"
                      }
                    ]
                  }
                ]
              }}
              onAddToSection={(sectionId) => {
                console.log('Add to section:', sectionId)
              }}
              onRemoveItem={(sectionId, itemId) => {
                console.log('Remove item:', sectionId, itemId)
              }}
              onNavigateToItem={(sectionId, itemId) => {
                console.log('Navigate to item:', sectionId, itemId)
              }}
            />
          </div>
        </ExampleSectionCard>

        <ExampleSectionCard 
          title="Fleet Window Layout Example"
          description="Control Panel integrated into a self-managing Fleet window layout, demonstrating realistic usage in a Fleet environment."
        >
          <div className="h-[600px] border border-[var(--fleet-border-default)] rounded-lg overflow-hidden">
            <FleetWindowLayout 
              rightPanel={
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-[var(--fleet-border-default)]">
                    <Typography variant="default-semibold" className="text-[var(--fleet-text-primary)]">Fleet AI</Typography>
                  </div>
                  <div className="flex-1 p-4">
                    <ControlPanel className="w-full" />
                  </div>
                </div>
              }
            />
          </div>
        </ExampleSectionCard>

        <ExampleSectionCard title="Features">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Typography variant="header-3-semibold" className="text-[var(--fleet-text-primary)]">States & Interactions</Typography>
              <ul className="space-y-1">
                <li><Typography variant="default" className="text-[var(--fleet-text-secondary)]">• Hidden/Collapsed/Expanded states</Typography></li>
                <li><Typography variant="default" className="text-[var(--fleet-text-secondary)]">• Tab switching between sections</Typography></li>
                <li><Typography variant="default" className="text-[var(--fleet-text-secondary)]">• Item counters in tab headers</Typography></li>
                <li><Typography variant="default" className="text-[var(--fleet-text-secondary)]">• Add/Remove item functionality</Typography></li>
                <li><Typography variant="default" className="text-[var(--fleet-text-secondary)]">• Hover interactions on items</Typography></li>
              </ul>
            </div>
            <div className="space-y-2">
              <Typography variant="header-3-semibold" className="text-[var(--fleet-text-primary)]">Content Types</Typography>
              <ul className="space-y-1">
                <li><Typography variant="default" className="text-[var(--fleet-text-secondary)]">• Files with appropriate icons</Typography></li>
                <li><Typography variant="default" className="text-[var(--fleet-text-secondary)]">• Folders and directories</Typography></li>
                <li><Typography variant="default" className="text-[var(--fleet-text-secondary)]">• Git changes with diff indicators</Typography></li>
                <li><Typography variant="default" className="text-[var(--fleet-text-secondary)]">• Running processes with status</Typography></li>
                <li><Typography variant="default" className="text-[var(--fleet-text-secondary)]">• Tools and specifications</Typography></li>
              </ul>
            </div>
          </div>
        </ExampleSectionCard>
    </ExamplePageTemplate>
  )
}