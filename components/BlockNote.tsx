"use client"
import {BlockNoteEditor, PartialBlock} from "@blocknote/core"
import {useCreateBlockNote} from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine";

import "@blocknote/core/style.css"
import "@blocknote/react/style.css"
import "@blocknote/mantine/style.css";
import React from "react"

import dynamic from "next/dynamic";
import { useMemo } from "react";


import { json } from "stream/consumers";

interface EditProps{
    onChange: ()=> void;
    initialContent?:string;
    editable?:boolean;
}

const BlockNote:React.FC<EditProps> = ({onChange,initialContent,editable}) => {

    const Editor = useMemo(
        ()=> dynamic(()=> import('@/components/TextEditor'),{ssr:false}),
        []
    )

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
    })
    return(
        <BlockNoteView editor={editor} editable={editable} theme="light" onChange={onchange} />
    )
}

export default BlockNote;