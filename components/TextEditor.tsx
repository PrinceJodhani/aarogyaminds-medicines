"use client";
import TextareaAutosize from "react-textarea-autosize";
import BlockNote from "./BlockNote";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";

interface TextEditorProps {
  onContentChange: (content: string) => void; // Accept a prop for content change
}

export default function TextEditor({ onContentChange }: TextEditorProps) {
  const [content, setContent] = useState("");

  const handleContentChange = (htmlContent: string) => {
    setContent(htmlContent); // Save the HTML content in state
    onContentChange(htmlContent); // Pass the content to the parent component
  };

  useEffect(() => {
    onContentChange(content); // Update content in the parent when content state changes
  }, [content, onContentChange]);

  return (
    <main className="min-h-screen">
      {/* BlockNote editor */}
      <BlockNote onChange={handleContentChange} />
      <input type="hidden" name="content" value={content} />
    </main>
  );
}
