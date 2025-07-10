import {
  TiptapImage,
  TiptapLink,
  TiptapUnderline,
  UpdatedImage,
  TaskList,
  TaskItem,
  HorizontalRule,
  StarterKit,
  Placeholder,
  UploadImagesPlugin,
} from "novel";

import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import { cn } from "@/lib/utils";

const tiptapImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: cn("opacity-40 rounded-lg border border-stone-200"),
      }),
    ];
  },
}).configure({
  allowBase64: true,
  HTMLAttributes: {
    class: cn("rounded-lg border border-muted"),
  },
});

const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cn(
      "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
    ),
  },
});

const updatedImage = UpdatedImage.configure({
  HTMLAttributes: {
    class: cn("rounded-lg border border-muted"),
  },
});

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cn("not-prose pl-2"),
  },
});
const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cn("flex gap-2 items-start leading-default-multiline my-2"),
  },
  nested: false,
});

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cn("mt-4 mb-6 border-t border-muted-foreground"),
  },
});

// Create lowlight instance and configure with common programming languages
const lowlight = createLowlight();
lowlight.register('javascript', require('highlight.js/lib/languages/javascript'));
lowlight.register('typescript', require('highlight.js/lib/languages/typescript'));
lowlight.register('python', require('highlight.js/lib/languages/python'));
lowlight.register('java', require('highlight.js/lib/languages/java'));
lowlight.register('kotlin', require('highlight.js/lib/languages/kotlin'));
lowlight.register('css', require('highlight.js/lib/languages/css'));
lowlight.register('html', require('highlight.js/lib/languages/xml'));
lowlight.register('json', require('highlight.js/lib/languages/json'));
lowlight.register('bash', require('highlight.js/lib/languages/bash'));
lowlight.register('sql', require('highlight.js/lib/languages/sql'));

const codeBlockLowlight = CodeBlockLowlight.configure({
  lowlight,
  defaultLanguage: 'javascript',
  HTMLAttributes: {
    class: cn(
      "rounded-sm bg-[var(--fleet-background-secondary)] border border-[var(--fleet-border)] p-5 font-mono font-medium",
      "text-[var(--fleet-text-primary)] overflow-x-auto",
      "hljs" // Add hljs class for syntax highlighting
    ),
  },
});

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cn("list-disc list-outside leading-default-multiline"),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cn("list-decimal list-outside leading-default-multiline"),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cn("leading-default-multiline mb-1"),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cn("border-l-4 border-primary"),
    },
  },
  codeBlock: false, // Disable default code block, we'll use CodeBlockLowlight
  code: {
    HTMLAttributes: {
      class: cn("rounded-md bg-muted  px-1.5 py-1 font-mono font-medium"),
      spellcheck: "false",
    },
  },
  horizontalRule: false,
  dropcursor: {
    color: "#DBEAFE",
    width: 4,
  },
  gapcursor: false,
});

const placeholder = Placeholder.configure({
  placeholder: ({ node }) => {
    if (node.type.name === "heading") {
      return "What's the title?";
    }

    return "Press '/' for commands";
  },
});

export const defaultExtensions = [
  starterKit,
  placeholder,
  tiptapLink,
  updatedImage, // This supports resizing, so we don't need tiptapImage
  taskList,
  taskItem,
  horizontalRule,
  TiptapUnderline,
  codeBlockLowlight, // Add syntax highlighting for code blocks
];