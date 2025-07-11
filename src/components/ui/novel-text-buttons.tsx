import { EditorBubbleItem, useEditor } from "novel";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
} from "lucide-react";

export const TextButtons = () => {
  const { editor } = useEditor();
  if (!editor) return null;

  const items = [
    {
      name: "bold",
      isActive: () => editor.isActive("bold"),
      command: () => editor.chain().focus().toggleBold().run(),
      icon: Bold,
    },
    {
      name: "italic",
      isActive: () => editor.isActive("italic"),
      command: () => editor.chain().focus().toggleItalic().run(),
      icon: Italic,
    },
    {
      name: "underline",
      isActive: () => editor.isActive("underline"),
      command: () => editor.chain().focus().toggleUnderline().run(),
      icon: Underline,
    },
    {
      name: "strike",
      isActive: () => editor.isActive("strike"),
      command: () => editor.chain().focus().toggleStrike().run(),
      icon: Strikethrough,
    },
    {
      name: "code",
      isActive: () => editor.isActive("code"),
      command: () => editor.chain().focus().toggleCode().run(),
      icon: Code,
    },
  ];

  return (
    <div className="flex">
      {items.map((item, index) => (
        <EditorBubbleItem
          key={index}
          onSelect={() => {
            item.command();
          }}
          className={cn(
            "flex items-center justify-center",
            "h-8 w-8 rounded-[4px]",
            "text-sm text-[var(--fleet-listItem-text-default)]",
            "hover:bg-[var(--fleet-listItem-background-hovered)]",
            "focus:bg-[var(--fleet-listItem-background-focused)]",
            "transition-colors cursor-pointer",
            item.isActive()
              ? "bg-[var(--fleet-listItem-background-focused)] text-[var(--fleet-listItem-text-focused)]"
              : ""
          )}
        >
          <item.icon className="h-4 w-4" />
        </EditorBubbleItem>
      ))}
    </div>
  );
};