// // "use client"
// // import TextareaAutosize from "react-textarea-autosize"
// // import BlockNote from "./BlockNote"
// // export default function TextEditor(){

// //     return (
// //         <main className="min-h-screen">
// //             <div className="flex flex-col py-10 w-full">
// //                 <TextareaAutosize placeholder="Untitled" className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus-outline-none"/>
// //             </div>
// //             <BlockNote onChange={()=>{}}/>
// //         </main>
// //     )
// // }


// "use client";
// import TextareaAutosize from "react-textarea-autosize";
// import BlockNote from "./BlockNote";
// import { useState } from "react";
// import { Input } from "./ui/input";

// export default function TextEditor() {
//   const [content, setContent] = useState("");

//   const handleContentChange = (htmlContent: string) => {
//     console.log(htmlContent); // Log content as HTML
//     setContent(htmlContent);
//   };

//   return (
//     <main className="min-h-screen">
//       <div className="flex flex-col py-10 w-full">
//         <TextareaAutosize
//           placeholder="Untitled"
//           className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus-outline-none"
//         />
//       </div>
//       <BlockNote onChange={handleContentChange} />
//       <Input placeholder="summary"></Input>
//     </main>
//   );
// }








/////////////////////////////////
////////////////////////
//////////////////

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
      <div className="flex flex-col py-10 w-full">
        <TextareaAutosize
          name="title"
          placeholder="Untitled"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus-outline-none"
        />
      </div>
      {/* BlockNote editor */}
      <BlockNote onChange={handleContentChange} />
      <input type="hidden" name="content" value={content} />
    </main>
  );
}
