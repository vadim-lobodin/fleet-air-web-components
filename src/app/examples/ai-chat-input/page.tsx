"use client"

import { AiChatInput } from "@/components/ui/ai-chat-input"
import { Typography } from "@/components/ui/typography"
import { Button } from "@/components/ui/button-shadcn"
import { useState } from "react"

const initialAttachments = [
  { icon: "file-types-java", text: "MyClass.java" },
  { icon: "file-types-kotlin", text: "MyData.kt" },
  { icon: "file-types-typescript", text: "MyComponent.tsx" },
]

export default function AiChatInputPage() {
  const [isSending, setIsSending] = useState(false)
  const [attachments, setAttachments] = useState(initialAttachments)
  const [agentMode, setAgentMode] = useState(false)
  const [selectedModel, setSelectedModel] = useState("claude-3-5-sonnet")

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-8">
      <div>
        <Typography variant="header-2-semibold">
          AI Chat Input
        </Typography>
        <Typography variant="default" className="text-muted-foreground mt-2">
          A customizable chat input component with a send button and loading state.
        </Typography>
      </div>

      <div className="max-w-lg space-y-4">
        <AiChatInput
          isSending={isSending}
          attachments={attachments}
          onRemoveAttachment={handleRemoveAttachment}
          onMentionClick={() => alert("Mention clicked")}
          onCommandClick={() => alert("Command clicked")}
          agentMode={agentMode}
          onAgentModeToggle={() => setAgentMode(!agentMode)}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
        />
        <div className="flex gap-2">
          <Button onClick={() => setIsSending(!isSending)}>
            {isSending ? "Stop Sending" : "Start Sending"}
          </Button>
          <Button variant="secondary" onClick={() => setAttachments(initialAttachments)}>
            Reset Attachments
          </Button>
        </div>
      </div>
    </div>
  )
}
