"use client"

import React from "react"
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { basicSetup } from "@codemirror/basic-setup";

interface EditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  height?: string;
  readOnly?: boolean;
}

const Editor = React.forwardRef<
  ReactCodeMirrorRef,
  EditorProps
>(
  ({ value, onChange, language = "javascript", height = "400px", readOnly = false }, ref) => {
    const extensions = [];
    if (language === "javascript") {
      extensions.push(javascript({ jsx: true }));
    }
    // Add more language extensions as needed

    return (
      <CodeMirror
        value={value}
        height={height}
        extensions={extensions}
        onChange={(val) => onChange?.(val)}
        readOnly={readOnly}
        ref={ref}
      />
    );
  }
);

Editor.displayName = "Editor";

export { Editor };
