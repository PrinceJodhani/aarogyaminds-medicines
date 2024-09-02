"use client";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/style.css";
import "@blocknote/react/style.css";
import "@blocknote/mantine/style.css";
import React, { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";

// Disable SSR for this component to prevent hydration errors
const BlockNote: React.FC<{
  onChange: (html: string) => void;
  initialContent?: string;
  editable?: boolean;
}> = ({ onChange, initialContent, editable = true }) => {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [prevHtmlContent, setPrevHtmlContent] = useState<string>("");

  // Only initialize editor on the client-side
  const editor: BlockNoteEditor | null = useCreateBlockNote({
    initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
  });

  const debounce = (func: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const updateContent = useCallback(async () => {
    if (editor) {
      const html = await editor.blocksToHTMLLossy(editor.document);
      if (html !== prevHtmlContent) {
        setHtmlContent(html);
        onChange(html);
        setPrevHtmlContent(html);
      }
    }
  }, [editor, onChange, prevHtmlContent]);

  const debouncedUpdateContent = useCallback(debounce(updateContent, 500), [updateContent]);

  useEffect(() => {
    if (editor) {
      debouncedUpdateContent();
      const interval = setInterval(debouncedUpdateContent, 1000);
      return () => clearInterval(interval);
    }
  }, [debouncedUpdateContent, editor]);

  useEffect(() => {
    if (htmlContent !== prevHtmlContent) {
      console.log(htmlContent);
    }
  }, [htmlContent, prevHtmlContent]);

  if (!editor) return null; // Prevent rendering on the server

  return <BlockNoteView editor={editor} editable={editable} theme="light" />;
};

// Dynamically import BlockNote with SSR disabled
export default dynamic(() => Promise.resolve(BlockNote), { ssr: false });
