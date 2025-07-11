"use client"

import { AiChatInput } from "@/components/ui/ai-chat-input"
import { Typography } from "@/components/ui/typography"
import { Button } from "@/components/ui/button-shadcn"
import { ExamplePageTemplate, ExampleSectionCard } from "@/components/ui"
import { useState } from "react"

// const initialAttachments = [
//   { icon: "file-types-java", text: "MyClass.java" },
//   { icon: "file-types-kotlin", text: "MyData.kt" },
//   { icon: "file-types-typescript", text: "MyComponent.tsx" },
// ]

export default function AiChatInputPage() {
  const [isSending, setIsSending] = useState(false)
  const [selectedModel, setSelectedModel] = useState("claude-3-5-sonnet")

  return (
    <ExamplePageTemplate
      title="AI Chat Input"
      description="A self-managing chat input with optional external control. Works immediately for prototyping, supports external state for advanced usage."
    >
      <ExampleSectionCard
        title="Prototyping Mode"
        description="Works immediately without any props - perfect for rapid prototyping."
      >
        <div className="max-w-lg">
          <AiChatInput />
        </div>
      </ExampleSectionCard>

      <ExampleSectionCard
        title="Advanced Mode"
        description="Full external control with custom state and handlers."
      >
        <div className="max-w-lg space-y-4">
          <AiChatInput
            isSending={isSending}
            onMentionClick={() => alert("Mention clicked")}
            onCommandClick={() => alert("Command clicked")}
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            onSend={(message) => {
              console.log('Sending:', message)
              setIsSending(true)
              // Simulate processing
              setTimeout(() => setIsSending(false), 3000)
            }}
            onStop={() => {
              console.log('Stopping')
              setIsSending(false)
            }}
          />
          <div className="flex gap-2">
            <Button onClick={() => setIsSending(!isSending)}>
              {isSending ? "Force Stop" : "Force Start"}
            </Button>
          </div>
        </div>
      </ExampleSectionCard>
      <ExampleSectionCard title="Features">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Typography variant="header-3-semibold" className="text-[var(--fleet-text-primary)]">
              Core Features
            </Typography>
            <ul className="space-y-2">
              <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
                • Self-managing mode with sensible defaults
              </Typography></li>
              <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
                • Model selection dropdown
              </Typography></li>
              <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
                • Send/Stop button states
              </Typography></li>
              <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
                • Mention (@) and command (/) triggers
              </Typography></li>
              <li><Typography variant="default" style={{ color: 'var(--fleet-text-secondary)' }}>
                • Auto-expanding textarea
              </Typography></li>
            </ul>
          </div>
          <div className="space-y-3">
            <Typography variant="header-3-semibold" className="text-[var(--fleet-text-primary)]">
              External Control
            </Typography>
            <ul className="space-y-2">
              <li><Typography variant="default" className="text-[var(--fleet-text-secondary)]">
                • Optional external state management
              </Typography></li>
              <li><Typography variant="default" className="text-[var(--fleet-text-secondary)]">
                • Custom send/stop handlers
              </Typography></li>
              <li><Typography variant="default" className="text-[var(--fleet-text-secondary)]">
                • Model selection control
              </Typography></li>
              <li><Typography variant="default" className="text-[var(--fleet-text-secondary)]">
                • Mention/command click handlers
              </Typography></li>
              <li><Typography variant="default" className="text-[var(--fleet-text-secondary)]">
                • Progressive enhancement pattern
              </Typography></li>
            </ul>
          </div>
        </div>
      </ExampleSectionCard>
    </ExamplePageTemplate>
  )
}