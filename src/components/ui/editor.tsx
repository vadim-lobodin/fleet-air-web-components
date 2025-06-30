"use client"

import React from "react"
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useTheme } from "next-themes";
import { EditorView } from "@codemirror/view";

interface EditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  height?: string;
  readOnly?: boolean;
}

const Editor = React.forwardRef<
  EditorView, // Correct type for CodeMirror editor instance
  EditorProps
>(
  ({ value, onChange, language = "javascript", height = "400px", readOnly = false }, ref) => {
    const { theme } = useTheme();

    const extensions = [];
    if (language === "javascript") {
      extensions.push(javascript({ jsx: true }));
    }
    // Add more language extensions as needed

    // Define CodeMirror themes based on Fleet colors
    const lightTheme = EditorView.theme({
      "&.cm-editor": {
        backgroundColor: "var(--fleet-background-primary)",
        color: "var(--fleet-text-primary)",
      },
      ".cm-content": {
        caretColor: "var(--fleet-editor-caret-background)",
      },
      ".cm-selectionBackground": {
        backgroundColor: "var(--fleet-inputField-selectionBackground-default)",
      },
      ".cm-activeLine": {
        backgroundColor: "var(--fleet-editor-currentLine-background-default)",
      },
      ".cm-activeLineGutter": {
        backgroundColor: "var(--fleet-editor-currentLine-background-default)",
      },
    });

    const darkTheme = EditorView.theme({
      "&.cm-editor": {
        backgroundColor: "var(--fleet-background-primary)",
        color: "var(--fleet-text-primary)",
      },
      ".cm-content": {
        caretColor: "var(--fleet-editor-caret-background)",
      },
      ".cm-selectionBackground": {
        backgroundColor: "var(--fleet-inputField-selectionBackground-default)",
      },
      ".cm-activeLine": {
        backgroundColor: "var(--fleet-editor-currentLine-background-default)",
      },
      ".cm-activeLineGutter": {
        backgroundColor: "var(--fleet-editor-currentLine-background-default)",
      },
    });

    const currentTheme = theme === "dark" ? darkTheme : lightTheme;

    return (
      <CodeMirror
        value={value}
        height={height}
        extensions={extensions}
        onChange={(val) => onChange?.(val)}
        theme={currentTheme} // Apply the dynamically selected theme
        readOnly={readOnly}
        ref={ref}
        basicSetup={{
          lineNumbers: false, // Hide line numbers for simplicity
          foldGutter: false,
          highlightActiveLine: true,
          highlightActiveLineGutter: false,
          syntaxHighlighting: true,
        }}
      />
    );
  }
);

Editor.displayName = "Editor";

export { Editor };
