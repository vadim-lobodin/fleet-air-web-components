"use client";

import {
  EditorRoot,
  EditorContent,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorCommandList,
  EditorBubble,
  ImageResizer,
  handleCommandNavigation,
  type JSONContent,
} from "novel";
import { defaultExtensions } from "./novel-extensions";
import { slashCommand, suggestionItems } from "./novel-selectors";
import { TextButtons } from "./novel-text-buttons";
import { NodeSelector } from "./novel-node-selector";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const novelEditorVariants = cva(
  // Fleet typography foundation
  "text-default leading-default font-body-regular tracking-default",
  {
    variants: {
      variant: {
        default: "min-h-[200px] w-full",
        compact: "min-h-[100px] w-full",
        expanded: "min-h-[400px] w-full",
      },
      size: {
        sm: "text-sm",
        md: "text-default",
        lg: "text-medium",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const extensions = [...defaultExtensions, slashCommand];

export interface NovelEditorProps extends VariantProps<typeof novelEditorVariants> {
  className?: string;
  initialContent?: JSONContent;
  onUpdate?: (content: JSONContent) => void;
  placeholder?: string;
  editable?: boolean;
}

const NovelEditor = ({
  className,
  variant,
  size,
  initialContent,
  onUpdate,
  placeholder = "Press '/' for commands...",
  editable = true,
  ...props
}: NovelEditorProps) => {
  const [content, setContent] = useState<JSONContent | null>(initialContent || null);
  const [openNode, setOpenNode] = useState(false);

  const debouncedUpdates = useDebouncedCallback(async (editor) => {
    const json = editor.getJSON();
    setContent(json);
    onUpdate?.(json);
  }, 500);

  return (
    <div
      className={cn(
        novelEditorVariants({ variant, size }),
        // Fleet styling
        "rounded-md border-2 border-[var(--fleet-border)] bg-[var(--fleet-background-primary)]",
        "focus-within:border-[var(--fleet-border-focused)] focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--fleet-focusOutline)]",
        className
      )}
      {...props}
    >
      <EditorRoot>
        <EditorContent
          initialContent={content}
          extensions={extensions}
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            handlePaste: (view, event) => {
              const hasFiles = event.clipboardData?.files?.length;
              if (hasFiles) {
                event.preventDefault();
                const file = event.clipboardData.files[0];
                
                // Check if it's an image
                if (file.type.includes("image/")) {
                  // Create a file reader to convert to base64
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (reader.result) {
                      const pos = view.state.selection.from;
                      const transaction = view.state.tr.insert(
                        pos,
                        view.state.schema.nodes.image.create({ src: reader.result })
                      );
                      view.dispatch(transaction);
                    }
                  };
                  reader.readAsDataURL(file);
                  return true;
                }
              }
              return false;
            },
            handleDrop: (view, event, _slice, moved) => {
              if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
                event.preventDefault();
                const file = event.dataTransfer.files[0];
                
                if (file.type.includes("image/")) {
                  const coordinates = view.posAtCoords({
                    left: event.clientX,
                    top: event.clientY,
                  });
                  
                  if (coordinates) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (reader.result) {
                        const transaction = view.state.tr.insert(
                          coordinates.pos,
                          view.state.schema.nodes.image.create({ src: reader.result })
                        );
                        view.dispatch(transaction);
                      }
                    };
                    reader.readAsDataURL(file);
                    return true;
                  }
                }
              }
              return false;
            },
            attributes: {
              class: cn(
                "focus:outline-none p-4 min-h-[inherit]",
                // Fleet text styling
                "text-[var(--fleet-text-primary)]",
                // Prose styling for rich text
                "prose prose-sm max-w-none",
                "prose-headings:text-[var(--fleet-text-primary)]",
                "prose-p:text-[var(--fleet-text-primary)]",
                "prose-strong:text-[var(--fleet-text-primary)]",
                "prose-em:text-[var(--fleet-text-primary)]",
                "prose-code:text-[var(--fleet-text-primary)] prose-code:bg-[var(--fleet-background-secondary)]",
                "prose-pre:bg-[var(--fleet-background-secondary)] prose-pre:text-[var(--fleet-text-primary)]",
                "prose-blockquote:text-[var(--fleet-text-secondary)] prose-blockquote:border-l-[var(--fleet-border-focused)]",
                "prose-a:text-[var(--fleet-text-accent)]",
                "prose-li:text-[var(--fleet-text-primary)]",
                "prose-hr:border-[var(--fleet-border)]",
                // Text selection highlighting
                "[&_*::selection]:bg-[var(--fleet-inputField-selectionBackground-default)]",
                "[&_*::selection]:text-[var(--fleet-text-primary)]",
              ),
            },
            editable: () => editable,
          }}
          onUpdate={({ editor }) => {
            debouncedUpdates(editor);
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className={cn(
            "z-50 h-auto max-h-[330px] overflow-y-auto",
            "min-w-[140px] max-w-[400px]",
            "bg-[var(--fleet-popup-background)]",
            "border border-[var(--fleet-popup-border)]",
            "shadow-lg rounded-[4px]",
            "p-1.5",
            "transition-all"
          )}>
            <EditorCommandEmpty className={cn(
              "px-2 py-1.5",
              "text-default leading-default font-body-regular tracking-default",
              "text-[var(--fleet-text-secondary)]"
            )}>
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className={cn(
                    // Fleet context menu styling
                    "text-default leading-default font-body-regular tracking-default",
                    "relative flex cursor-default items-center",
                    "rounded-[4px] px-2 py-1.5",
                    "select-none outline-none transition-colors",
                    "min-h-6 gap-3",
                    "text-[var(--fleet-listItem-text-default)]",
                    "hover:bg-[var(--fleet-listItem-background-hovered)]",
                    "focus:bg-[var(--fleet-listItem-background-focused)]",
                    "focus:text-[var(--fleet-listItem-text-focused)]",
                    "data-[highlighted]:bg-[var(--fleet-listItem-background-focused)]",
                    "data-[highlighted]:text-[var(--fleet-listItem-text-focused)]",
                    "aria-selected:bg-[var(--fleet-listItem-background-focused)]",
                    "aria-selected:text-[var(--fleet-listItem-text-focused)]",
                    "[&[data-selected='true']]:bg-[var(--fleet-listItem-background-focused)]",
                    "[&[data-selected='true']]:text-[var(--fleet-listItem-text-focused)]"
                  )}
                  key={item.title}
                >
                  <div className="h-4 w-4 flex items-center justify-center flex-shrink-0 text-[var(--fleet-text-secondary)]">
                    {item.icon}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-default leading-default font-body-regular tracking-default text-[var(--fleet-listItem-text-default)] truncate">
                      {item.title}
                    </span>
                    <span className="text-small leading-small font-body-regular tracking-default text-[var(--fleet-text-secondary)] truncate">
                      {item.description}
                    </span>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <EditorBubble
            tippyOptions={{
              placement: "top",
              onHidden: () => {
                setOpenNode(false);
              },
            }}
            className={cn(
              "flex w-fit max-w-[90vw] overflow-hidden",
              "bg-[var(--fleet-popup-background)]",
              "border border-[var(--fleet-popup-border)]",
              "shadow-lg rounded-[4px]",
              "p-1 gap-1"
            )}
          >
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <div className="h-6 w-px bg-[var(--fleet-border)]" />
            <TextButtons />
          </EditorBubble>
        </EditorContent>
      </EditorRoot>
    </div>
  );
};

export { NovelEditor, novelEditorVariants };