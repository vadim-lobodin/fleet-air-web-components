"use client";

import { NovelEditor } from "@/components/ui/novel-editor";
import { Typography } from "@/components/ui/typography";
import { ExamplePageTemplate, ExampleSectionCard } from "@/components/ui";
import { useState } from "react";
import type { JSONContent } from "novel";

export default function NovelEditorExample() {
  const [content, setContent] = useState<JSONContent | null>(null);

  const handleUpdate = (newContent: JSONContent) => {
    setContent(newContent);
  };

  const sampleContent = {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Welcome to the Novel editor integrated with Fleet design system!"
          }
        ]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "This editor includes:"
          }
        ]
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "Fleet color system integration"
                  }
                ]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "Typography system with Fleet fonts"
                  }
                ]
              }
            ]
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "Tailwind Typography plugin support"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  return (
    <ExamplePageTemplate
      title="Novel Editor"
      description="Rich text editor powered by Novel with Fleet design system integration"
    >
      <ExampleSectionCard title="Default Editor">
        <NovelEditor
          placeholder="Start typing your content..."
          onUpdate={handleUpdate}
        />
      </ExampleSectionCard>

      <ExampleSectionCard title="Compact Editor">
        <NovelEditor
          variant="compact"
          placeholder="Compact editor for short content..."
          onUpdate={handleUpdate}
        />
      </ExampleSectionCard>

      <ExampleSectionCard title="Expanded Editor">
        <NovelEditor
          variant="expanded"
          placeholder="Large editor for extensive content..."
          onUpdate={handleUpdate}
        />
      </ExampleSectionCard>

      <ExampleSectionCard title="Pre-filled Content">
        <NovelEditor
          initialContent={sampleContent}
          onUpdate={handleUpdate}
        />
      </ExampleSectionCard>

      <ExampleSectionCard title="Read-only Editor">
        <NovelEditor
          initialContent={sampleContent}
          editable={false}
          onUpdate={handleUpdate}
        />
      </ExampleSectionCard>

      {content && (
        <ExampleSectionCard title="Editor Content (JSON)">
          <pre className="text-xs overflow-auto p-4 bg-[var(--fleet-background-secondary)] rounded-md">
            {JSON.stringify(content, null, 2)}
          </pre>
        </ExampleSectionCard>
      )}
    </ExamplePageTemplate>
  );
}