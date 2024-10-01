// TextEditor.tsx

"use client";
import { useState, useEffect } from "react";
import BlockNote from "./BlockNote";

interface TextEditorProps {
  onContentChange: (content: string) => void;
}

export default function TextEditor({ onContentChange }: TextEditorProps) {
  const [content, setContent] = useState("");

  const handleContentChange = (htmlContent: string) => {
    setContent(htmlContent);
    onContentChange(htmlContent);
  };

  useEffect(() => {
    onContentChange(content);
  }, [content, onContentChange]);

  return (
    <div className="w-full overflow-hidden">
      <div className="w-full">
        <BlockNote
          onChange={handleContentChange}
          className="w-full break-words"
        />
      </div>
      <input type="hidden" name="content" value={content} />
    </div>
  );
}
