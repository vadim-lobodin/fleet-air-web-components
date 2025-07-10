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
        type: "heading",
        attrs: { level: 1 },
        content: [
          {
            type: "text",
            text: "Novel Editor with Fleet Design System"
          }
        ]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "This is a comprehensive demonstration of the Novel editor integrated with Fleet's design system. The editor supports "
          },
          {
            type: "text",
            marks: [{ type: "bold" }],
            text: "rich text formatting"
          },
          {
            type: "text",
            text: ", "
          },
          {
            type: "text",
            marks: [{ type: "italic" }],
            text: "italic text"
          },
          {
            type: "text",
            text: ", "
          },
          {
            type: "text",
            marks: [{ type: "underline" }],
            text: "underlined content"
          },
          {
            type: "text",
            text: ", and "
          },
          {
            type: "text",
            marks: [{ type: "code" }],
            text: "inline code"
          },
          {
            type: "text",
            text: "."
          }
        ]
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [
          {
            type: "text",
            text: "Key Features"
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
                    marks: [{ type: "bold" }],
                    text: "AI Actions:"
                  },
                  {
                    type: "text",
                    text: " Click the Actions button to improve writing, fix grammar, or continue text"
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
                    marks: [{ type: "bold" }],
                    text: "Fleet Colors:"
                  },
                  {
                    type: "text",
                    text: " Full integration with Fleet's semantic color system"
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
                    marks: [{ type: "bold" }],
                    text: "Syntax Highlighting:"
                  },
                  {
                    type: "text",
                    text: " Code blocks with Fleet themes (light/dark)"
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
                    marks: [{ type: "bold" }],
                    text: "Slash Commands:"
                  },
                  {
                    type: "text",
                    text: " Type '/' to access formatting options"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: "heading",
        attrs: { level: 3 },
        content: [
          {
            type: "text",
            text: "Code Example"
          }
        ]
      },
      {
        type: "codeBlock",
        attrs: { language: "typescript" },
        content: [
          {
            type: "text",
            text: "// Fleet-themed syntax highlighting\nconst editor = new NovelEditor({\n  theme: 'fleet',\n  extensions: [AIExtension, FleetColors],\n  onUpdate: (content) => {\n    console.log('Content updated:', content)\n  }\n})"
          }
        ]
      },
      {
        type: "heading",
        attrs: { level: 3 },
        content: [
          {
            type: "text",
            text: "Task List"
          }
        ]
      },
      {
        type: "taskList",
        content: [
          {
            type: "taskItem",
            attrs: { checked: true },
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "Integrate Fleet design system"
                  }
                ]
              }
            ]
          },
          {
            type: "taskItem",
            attrs: { checked: true },
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "Add AI-powered features"
                  }
                ]
              }
            ]
          },
          {
            type: "taskItem",
            attrs: { checked: false },
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "Implement collaborative editing"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: "blockquote",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                marks: [{ type: "italic" }],
                text: "\"The best editor is one that gets out of your way and lets you focus on writing.\""
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