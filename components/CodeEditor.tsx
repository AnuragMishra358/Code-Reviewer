"use client";

import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, setCode }: any) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Editor
        height="400px"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || "")}
      />
    </div>
  );
}