"use client"

import { ExamplePageTemplate } from "@/components/ui/example-page-template"
import { ExampleSectionCard } from "@/components/ui/example-section-card"
import { TaskModeWindow } from "@/components/ui/task-mode-window"
import { Typography } from "@/components/ui/typography"
import { Button } from "@/components/ui/button-shadcn"
import { useState } from "react"

export default function TaskModeWindowPage() {
  const [contextItems, setContextItems] = useState(2)
  const [tools, setTools] = useState(4)
  const [message, setMessage] = useState("")

  const handleAddContext = () => {
    setContextItems(prev => prev + 1)
  }

  const handleBrowseFiles = () => {
    alert("Browse project files clicked!")
  }

  const handleOpenTerminal = () => {
    alert("Open terminal clicked!")
  }

  const handleSendMessage = (msg: string) => {
    setMessage(msg)
    alert(`Task submitted: ${msg}`)
  }

  return (
    <ExamplePageTemplate
      title="Task Mode Window"
      description="A task creation interface that mirrors Fleet's AI-assisted development workflow with context management and action buttons."
    >
      <div className="space-y-8">
        {/* Default Task Mode Window */}
        <ExampleSectionCard
          title="Default Task Mode Window"
          description="The standard task creation interface with centered layout and default content."
        >
          <div className="h-[600px] bg-[var(--fleet-background-primary)] rounded-lg border border-[var(--fleet-border-default)]">
            <TaskModeWindow />
          </div>
        </ExampleSectionCard>

        {/* Custom Task Mode Window */}
        <ExampleSectionCard
          title="Custom Task Mode Window"
          description="A customized task mode window with custom handlers and different content."
        >
          <div className="h-[600px] bg-[var(--fleet-background-primary)] rounded-lg border border-[var(--fleet-border-default)]">
            <TaskModeWindow
              title="Create New Feature"
              informationItems={[
                {
                  icon: "ai-assistant",
                  text: "AI will analyze your codebase and suggest implementation approaches",
                },
                {
                  icon: "vcs-branch",
                  text: "Changes will be isolated in a new branch for safe experimentation",
                },
                {
                  icon: "test-runner-test-passed",
                  text: "Automated tests will be generated to ensure code quality",
                },
              ]}
              actionButtons={[
                {
                  label: "Select Files",
                  icon: "file-types-typescript",
                },
                {
                  label: "Run Tests",
                  icon: "test-runner-test-passed",
                },
              ]}
              contextItemsCount={contextItems}
              toolsCount={tools}
              onAddContext={handleAddContext}
              onBrowseFiles={handleBrowseFiles}
              onOpenTerminal={handleOpenTerminal}
              chatInputProps={{
                placeholder: "Describe the feature you want to build...",
                onSend: handleSendMessage,
                selectedModel: "claude-3-5-sonnet",
              }}
            />
          </div>
        </ExampleSectionCard>

        {/* Left-aligned Task Mode Window */}
        <ExampleSectionCard
          title="Left-aligned Task Mode Window"
          description="A task mode window with left-aligned content layout."
        >
          <div className="h-[600px] bg-[var(--fleet-background-primary)] rounded-lg border border-[var(--fleet-border-default)]">
            <TaskModeWindow
              title="Debug Issue"
              alignment="left"
              informationItems={[
                {
                  icon: "debugger",
                  text: "Provide error messages, stack traces, and reproduction steps",
                },
                {
                  icon: "search",
                  text: "AI will search through your codebase for potential causes",
                },
                {
                  icon: "explain",
                  text: "Get explanations and suggested fixes for the issue",
                },
              ]}
              actionButtons={[
                {
                  label: "View Logs",
                  icon: "file-types-text",
                },
                {
                  label: "Run Debugger",
                  icon: "debugger-fill",
                },
              ]}
            />
          </div>
        </ExampleSectionCard>

        {/* Interactive Controls */}
        <ExampleSectionCard
          title="Interactive Controls"
          description="Test the interactive features of the task mode window."
        >
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button
                variant="secondary"
                onClick={() => setContextItems(prev => prev + 1)}
              >
                Add Context Item
              </Button>
              <Button
                variant="secondary"
                onClick={() => setTools(prev => prev + 1)}
              >
                Add Tool
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setContextItems(2)
                  setTools(4)
                }}
              >
                Reset
              </Button>
            </div>
            <div className="text-sm text-[var(--fleet-text-secondary)]">
              Context Items: {contextItems} | Tools: {tools}
              {message && ` | Last Message: "${message}"`}
            </div>
          </div>
        </ExampleSectionCard>

        {/* Design System Notes */}
        <ExampleSectionCard
          title="Design System Notes"
          description="Implementation details and design system usage."
        >
          <div className="space-y-4 text-sm">
            <div>
              <Typography variant="default-semibold" className="mb-2">
                Key Features:
              </Typography>
              <ul className="space-y-1 text-[var(--fleet-text-secondary)]">
                <li>• Centered layout with proper spacing matching Fleet design</li>
                <li>• Semantic Fleet colors for all elements</li>
                <li>• Integrated AiChatInput component with model selection</li>
                <li>• Context bar showing dynamic context items and tools count</li>
                <li>• Customizable information items with Fleet icons</li>
                <li>• Action buttons with Fleet styling and icon support</li>
                <li>• Self-contained with default state management</li>
              </ul>
            </div>
            <div>
              <Typography variant="default-semibold" className="mb-2">
                Fleet Design System Integration:
              </Typography>
              <ul className="space-y-1 text-[var(--fleet-text-secondary)]">
                <li>• Uses Fleet semantic color tokens for consistent theming</li>
                <li>• Typography variants match Fleet's type scale</li>
                <li>• Icons from Fleet's icon library</li>
                <li>• Button variants using Fleet's button system</li>
                <li>• Spacing and layout following Fleet design patterns</li>
              </ul>
            </div>
          </div>
        </ExampleSectionCard>
      </div>
    </ExamplePageTemplate>
  )
}