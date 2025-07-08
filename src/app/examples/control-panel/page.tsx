'use client'

import { ControlPanel } from "@/components/ui/control-panel"
import { FleetWindowLayout } from "@/components/ui"

export default function ControlPanelExamples() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">Control Panel (Experimental)</h1>
        <p className="text-[var(--fleet-text-secondary)] mb-8">
          A tabbed control panel built on the ai-chat-context-preview foundation, featuring multiple collapsible sections for different content types.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Self-Managing Mode</h2>
          <p className="text-[var(--fleet-text-secondary)] mb-4">
            Default implementation with mock data matching the Figma design. Click to expand/collapse, switch between tabs, and interact with items.
          </p>
          <div className="max-w-md">
            <ControlPanel />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Already Expanded</h2>
          <p className="text-[var(--fleet-text-secondary)] mb-4">
            Control panel starting in expanded state showing all sections with their content.
          </p>
          <div className="max-w-md">
            <ControlPanel 
              defaultActiveSection="changes"
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Custom Data</h2>
          <p className="text-[var(--fleet-text-secondary)] mb-4">
            Control panel with custom data and external event handlers.
          </p>
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
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Fleet Window Layout Example</h2>
          <p className="text-[var(--fleet-text-secondary)] mb-4">
            Control Panel integrated into a self-managing Fleet window layout, demonstrating realistic usage in a Fleet environment.
          </p>
          <div className="h-[600px] border border-[var(--fleet-border-default)] rounded-lg overflow-hidden">
            <FleetWindowLayout 
              rightPanel={
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-[var(--fleet-border-default)]">
                    <div className="text-[var(--fleet-text-primary)] font-medium">Fleet AI</div>
                  </div>
                  <div className="flex-1 p-4">
                    <ControlPanel className="w-full" />
                  </div>
                </div>
              }
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h3 className="font-semibold">States & Interactions</h3>
              <ul className="space-y-1 text-[var(--fleet-text-secondary)]">
                <li>• Hidden/Collapsed/Expanded states</li>
                <li>• Tab switching between sections</li>
                <li>• Item counters in tab headers</li>
                <li>• Add/Remove item functionality</li>
                <li>• Hover interactions on items</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Content Types</h3>
              <ul className="space-y-1 text-[var(--fleet-text-secondary)]">
                <li>• Files with appropriate icons</li>
                <li>• Folders and directories</li>
                <li>• Git changes with diff indicators</li>
                <li>• Running processes with status</li>
                <li>• Tools and specifications</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}