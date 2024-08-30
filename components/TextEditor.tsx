"use client"
import TextareaAutosize from "react-textarea-autosize"
import BlockNote from "./BlockNote"
export default function TextEditor(){

    return (
        <main className="min-h-screen">
            <div className="flex flex-col py-10 w-full">
                <TextareaAutosize placeholder="Untitled" className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus-outline-none"/>
            </div>
            <BlockNote onChange={()=>{}}/>
        </main>
    )
}