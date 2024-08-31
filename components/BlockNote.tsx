// "use client"
// import {BlockNoteEditor, PartialBlock} from "@blocknote/core"
// import {useCreateBlockNote} from "@blocknote/react"
// import { BlockNoteView } from "@blocknote/mantine";

// import "@blocknote/core/style.css"
// import "@blocknote/react/style.css"
// import "@blocknote/mantine/style.css";
// import React from "react"

// import dynamic from "next/dynamic";
// import { useMemo } from "react";

// interface EditProps{
//     onChange: ()=> void;
//     initialContent?:string;
//     editable?:boolean;
// }

// const BlockNote:React.FC<EditProps> = ({onChange,initialContent,editable}) => {

//     const Editor = useMemo(
//         ()=> dynamic(()=> import('@/components/TextEditor'),{ssr:false}),
//         []
//     )

//     const editor: BlockNoteEditor = useCreateBlockNote({
//         initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
//     })
//     return(
//         <BlockNoteView editor={editor} editable={editable} theme="light" onChange={onchange} />
//     )
// }

// export default BlockNote;



////////////////////////////////////////
/////////////////////////////////
///////////////////////////

"use client";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

import "@blocknote/core/style.css";
import "@blocknote/react/style.css";
import "@blocknote/mantine/style.css";
import React, { useEffect, useState, useCallback } from "react";

interface EditProps {
  onChange: (html: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const BlockNote: React.FC<EditProps> = ({ onChange, initialContent, editable = true }) => {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [prevHtmlContent, setPrevHtmlContent] = useState<string>("");

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
  });

  // Debounced function to update and log content
  const debounce = (func: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const updateContent = useCallback(async () => {
    const html = await editor.blocksToHTMLLossy(editor.document);

    if (html !== prevHtmlContent) { // Only update if content has changed
      setHtmlContent(html); // Update state
      onChange(html); // Call the onChange prop
      setPrevHtmlContent(html); // Update previous content
    }
  }, [editor, onChange, prevHtmlContent]);

  // Create a debounced version of the updateContent function
  const debouncedUpdateContent = useCallback(debounce(updateContent, 500), [updateContent]);

  useEffect(() => {
    // Update content initially
    debouncedUpdateContent();

    // Set up an interval to periodically check content
    const interval = setInterval(debouncedUpdateContent, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [debouncedUpdateContent]);

  useEffect(() => {
    // Log content to console if it changes
    if (htmlContent !== prevHtmlContent) {
      console.log(htmlContent);
    }
  }, [htmlContent, prevHtmlContent]);

  return (
    <BlockNoteView editor={editor} editable={editable} theme="light" />
  );
};

export default BlockNote;


