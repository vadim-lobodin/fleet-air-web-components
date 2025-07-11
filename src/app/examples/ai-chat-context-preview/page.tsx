"use client"

import { useState } from "react"
import { ExamplePageTemplate, ExampleSectionCard } from "@/components/ui"
import { Typography } from "@/components/ui/typography"
import { AiChatContextPreview, type AiChatContext } from "@/components/ui/ai-chat-context-preview"
import { Button } from "@/components/ui/button-shadcn"
import { Island } from "@/components/ui/island"

export default function AiChatContextPreviewPage() {
  const [sampleContext, setSampleContext] = useState<AiChatContext>({
    id: "chat-1",
    contextEntries: [
      {
        id: "entry-1",
        name: "UserService.kt",
        description: "Authentication service implementation",
        tooltipText: "src/main/kotlin/com/example/UserService.kt",
        isPinned: false,
        type: "file"
      },
      {
        id: "entry-2",
        name: "main",
        description: "Main development branch",
        tooltipText: "git branch: main",
        isPinned: true,
        type: "branch"
      },
      {
        id: "entry-3",
        name: "fix: authentication bug",
        description: "Commit 3a2b1c4d",
        tooltipText: "Latest commit fixing authentication issues",
        isPinned: false,
        type: "commit"
      },
      {
        id: "entry-4",
        name: "DatabaseConfig.kt",
        description: "Database configuration",
        tooltipText: "src/main/kotlin/com/example/config/DatabaseConfig.kt",
        isPinned: false,
        type: "file"
      },
      {
        id: "entry-5",
        name: "api.yaml",
        description: "OpenAPI specification",
        tooltipText: "docs/api.yaml",
        isPinned: false,
        type: "file"
      }
    ],
    tools: [
      {
        id: "tool-1",
        name: "File Explorer",
        description: "Browse project files",
        iconKey: "symbols"
      },
      {
        id: "tool-2",
        name: "Git Commands",
        description: "Git operations",
        iconKey: "symbols"
      },
      {
        id: "tool-3",
        name: "Terminal",
        description: "Command line interface",
        iconKey: "symbols"
      }
    ]
  })

  const handleRemoveEntry = (entryId: string) => {
    setSampleContext(prev => ({
      ...prev,
      contextEntries: prev.contextEntries.filter(entry => entry.id !== entryId)
    }))
  }

  const handleTogglePinEntry = (entryId: string) => {
    setSampleContext(prev => ({
      ...prev,
      contextEntries: prev.contextEntries.map(entry =>
        entry.id === entryId ? { ...entry, isPinned: !entry.isPinned } : entry
      )
    }))
  }

  const handleNavigateToEntry = (entryId: string) => {
    console.log("Navigate to entry:", entryId)
  }

  const handleAddFiles = () => {
    console.log("Add files to context")
  }

  

  const resetContext = () => {
    setSampleContext({
      id: "chat-1",
      contextEntries: [
        {
          id: "entry-1",
          name: "UserService.kt",
          description: "Authentication service implementation",
          tooltipText: "src/main/kotlin/com/example/UserService.kt",
          isPinned: false,
          type: "file"
        },
        {
          id: "entry-2",
          name: "main",
          description: "Main development branch",
          tooltipText: "git branch: main",
          isPinned: true,
          type: "branch"
        },
        {
          id: "entry-3",
          name: "fix: authentication bug",
          description: "Commit 3a2b1c4d",
          tooltipText: "Latest commit fixing authentication issues",
          isPinned: false,
          type: "commit"
        }
      ],
      tools: [
        {
          id: "tool-1",
          name: "File Explorer",
          description: "Browse project files",
          iconKey: "symbols"
        },
        {
          id: "tool-2",
          name: "Git Commands",
          description: "Git operations",
          iconKey: "symbols"
        }
      ]
    })
  }

  return (
    <ExamplePageTemplate
      title="AI Chat Context Preview"
      description="Fleet-style context preview component for AI chat interfaces, showing attached files, branches, commits, and available tools. This uses default-multiline for proper leading after H1."
    >

        <ExampleSectionCard title="Interactive Example">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button onClick={resetContext} variant="secondary" size="sm">
                Reset Context
              </Button>
              <Typography variant="small" style={{ color: 'var(--fleet-text-secondary)' }}>
                Try clicking the context header to expand/collapse, hover over entries to see actions
              </Typography>
            </div>
            
            <Island>
              <AiChatContextPreview
                context={sampleContext}
                onRemoveEntry={handleRemoveEntry}
                onTogglePinEntry={handleTogglePinEntry}
                onNavigateToEntry={handleNavigateToEntry}
                onAddFiles={handleAddFiles}
                maxWidth="500px"
              />
            </Island>
          </div>
        </ExampleSectionCard>

        <ExampleSectionCard title="States">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Typography variant="header-3-semibold" style={{ color: 'var(--fleet-text-primary)' }}>
                Empty Context
              </Typography>
              <AiChatContextPreview
                context={{
                  id: "empty-context",
                  contextEntries: [],
                  tools: []
                }}
                onAddFiles={handleAddFiles}
                maxWidth="300px"
              />
            </div>

            <div className="space-y-2">
              <Typography variant="header-3-semibold" style={{ color: 'var(--fleet-text-primary)' }}>
                With Tools Only
              </Typography>
              <AiChatContextPreview
                context={{
                  id: "tools-only",
                  contextEntries: [],
                  tools: [
                    {
                      id: "tool-1",
                      name: "File Explorer",
                      iconKey: "symbols"
                    },
                    {
                      id: "tool-2",
                      name: "Git Commands",
                      iconKey: "symbols"
                    }
                  ]
                }}
                onAddFiles={handleAddFiles}
                maxWidth="300px"
              />
            </div>

            <div className="space-y-2">
              <Typography variant="header-3-semibold" style={{ color: 'var(--fleet-text-primary)' }}>
                Disabled State
              </Typography>
              <AiChatContextPreview
                context={{
                  id: "disabled-context",
                  contextEntries: [
                    {
                      id: "entry-1",
                      name: "UserService.kt",
                      description: "Authentication service",
                      iconKey: "kotlin-file",
                      type: "file"
                    }
                  ],
                  tools: [
                    {
                      id: "tool-1",
                      name: "File Explorer",
                      iconKey: "symbols"
                    }
                  ]
                }}
                disabled={true}
                maxWidth="300px"
              />
            </div>
          </div>
        </ExampleSectionCard>

        <ExampleSectionCard title="Implementation">
          <div className="space-y-4">
            <Typography variant="header-3-semibold" style={{ color: 'var(--fleet-text-primary)' }}>
              Basic Usage
            </Typography>
            <div className="bg-[var(--fleet-editor-background)] rounded-lg p-4 font-mono text-sm">
              <pre className="text-[var(--fleet-text-primary)] whitespace-pre-wrap">
{`import { AiChatContextPreview, type AiChatContext } from "@/components/ui/ai-chat-context-preview"

const context: AiChatContext = {
  id: "chat-1",
  contextEntries: [
    {
      id: "entry-1",
      name: "UserService.kt",
      description: "Authentication service implementation",
      iconKey: "kotlin-file",
      tooltipText: "src/main/kotlin/com/example/UserService.kt",
      isPinned: false,
      type: "file"
    }
  ],
  tools: [
    {
      id: "tool-1",
      name: "File Explorer",
      iconKey: "symbols"
    }
  ]
}

<AiChatContextPreview
  context={context}
  onRemoveEntry={(entryId) => console.log('Remove', entryId)}
  onTogglePinEntry={(entryId) => console.log('Toggle pin', entryId)}
  onNavigateToEntry={(entryId) => console.log('Navigate', entryId)}
  onAddFiles={() => console.log('Add files')}
  onAddBranches={() => console.log('Add branches')}
  onAddCommits={() => console.log('Add commits')}
  onUploadFile={() => console.log('Upload file')}
/>`}
              </pre>
            </div>
          </div>
        </ExampleSectionCard>

        <ExampleSectionCard title="Features">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Typography variant="header-3-semibold" style={{ color: 'var(--fleet-text-primary)' }}>
                Context Management
              </Typography>
              <ul className="space-y-1">
                <li>
                  <Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
                    • Expandable/collapsible context view
                  </Typography>
                </li>
                <li>
                  <Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
                    • Pin/unpin context entries
                  </Typography>
                </li>
                <li>
                  <Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
                    • Remove context entries
                  </Typography>
                </li>
                <li>
                  <Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
                    • Navigate to context entries
                  </Typography>
                </li>
                <li>
                  <Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
                    • Add files, branches, commits
                  </Typography>
                </li>
                <li>
                  <Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
                    • Upload files from computer
                  </Typography>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <Typography variant="header-3-semibold" style={{ color: 'var(--fleet-text-primary)' }}>
                Visual Features
              </Typography>
              <ul className="space-y-1">
                <li>
                  <Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
                    • Fleet-style animations and transitions
                  </Typography>
                </li>
                <li>
                  <Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
                    • Hover effects on entries
                  </Typography>
                </li>
                <li>
                  <Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
                    • Tooltips for all actions
                  </Typography>
                </li>
                <li>
                  <Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
                    • Responsive design
                  </Typography>
                </li>
                <li>
                  <Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
                    • Keyboard navigation support
                  </Typography>
                </li>
                <li>
                  <Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
                    • Context menu for adding attachments
                  </Typography>
                </li>
              </ul>
            </div>
          </div>
        </ExampleSectionCard>
      </ExamplePageTemplate>
  )
}