"use client"

import { AiChatInput } from "@/components/ui/ai-chat-input"
import { Typography } from "@/components/ui/typography"
import { Button } from "@/components/ui/button-shadcn"
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
    <div className="space-y-8">
      <div>
        <Typography variant="header-2-semibold">
          AI Chat Input
        </Typography>
        <Typography variant="default" className="text-muted-foreground mt-2">
          A self-managing chat input with optional external control. Works immediately for prototyping, supports external state for advanced usage.
        </Typography>
      </div>

      <div className="space-y-8">
        {/* Prototyping Mode - Zero Setup */}
        <div className="max-w-lg space-y-4">
          <Typography variant="header-3-semibold">
            Prototyping Mode
          </Typography>
          <Typography variant="default" className="text-muted-foreground">
            Works immediately without any props - perfect for rapid prototyping.
          </Typography>
          <AiChatInput />
        </div>

        {/* Advanced Mode - External Control */}
        <div className="max-w-lg space-y-4">
          <Typography variant="header-3-semibold">
            Advanced Mode
          </Typography>
          <Typography variant="default" className="text-muted-foreground">
            Full external control with custom state and handlers.
          </Typography>
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
      </div>
    </div>
  )
}
