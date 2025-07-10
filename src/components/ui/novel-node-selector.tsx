import { EditorBubbleItem, useEditor } from "novel";
import { Button } from "@/components/ui/button-shadcn";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Check,
  CheckSquare,
  ChevronDown,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ListOrdered,
  TextQuote,
  Text,
  List,
} from "lucide-react";
import { useState } from "react";

interface NodeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NodeSelector = ({ open, onOpenChange }: NodeSelectorProps) => {
  const { editor } = useEditor();
  if (!editor) return null;

  const items = [
    {
      name: "Text",
      icon: Text,
      command: () =>
        editor.chain().focus().toggleNode("paragraph", "paragraph").run(),
      isActive: () =>
        editor.isActive("paragraph") &&
        !editor.isActive("bulletList") &&
        !editor.isActive("orderedList"),
    },
    {
      name: "Heading 1",
      icon: Heading1,
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      name: "Heading 2",
      icon: Heading2,
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      name: "Heading 3",
      icon: Heading3,
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive("heading", { level: 3 }),
    },
    {
      name: "To-do List",
      icon: CheckSquare,
      command: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive("taskList"),
    },
    {
      name: "Bullet List",
      icon: List,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      name: "Numbered List",
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      name: "Quote",
      icon: TextQuote,
      command: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      name: "Code",
      icon: Code,
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
  ];

  const activeItem = items.filter((item) => item.isActive()).pop() ?? {
    name: "Multiple",
  };

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className={cn(
            "gap-2 rounded-[4px] border-none",
            "h-8 px-2",
            "text-sm text-[var(--fleet-listItem-text-default)]",
            "hover:bg-[var(--fleet-listItem-background-hovered)]",
            "focus:bg-[var(--fleet-listItem-background-focused)]"
          )}
        >
          <span className="whitespace-nowrap text-sm">{activeItem.name}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn(
          "z-[99999] my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto",
          "bg-[var(--fleet-popup-background)]",
          "border border-[var(--fleet-popup-border)]",
          "shadow-lg rounded-[4px]",
          "p-1.5"
        )}
      >
        {items.map((item, index) => (
          <EditorBubbleItem
            key={index}
            onSelect={() => {
              item.command();
              onOpenChange(false);
            }}
            className={cn(
              "flex cursor-pointer items-center justify-between rounded-[4px] px-2 py-1.5 text-sm",
              "text-[var(--fleet-listItem-text-default)]",
              "hover:bg-[var(--fleet-listItem-background-hovered)]",
              "focus:bg-[var(--fleet-listItem-background-focused)]"
            )}
          >
            <div className="flex items-center space-x-2">
              <div className="rounded-sm border border-[var(--fleet-border)] p-1">
                <item.icon className="h-3 w-3" />
              </div>
              <span>{item.name}</span>
            </div>
            {activeItem.name === item.name && <Check className="h-4 w-4" />}
          </EditorBubbleItem>
        ))}
      </PopoverContent>
    </Popover>
  );
};