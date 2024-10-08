// import React from 'react';
// import dynamic from 'next/dynamic';
// import 'react-quill/dist/quill.snow.css';
// import { Label } from "@/components/ui/label"
// import Quill from 'quill';
// // Dynamically import ReactQuill to avoid SSR issues
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// interface QuillEditorProps {
//   value: string;
//   onChange: (value: string) => void;
// }

// const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
//   return (
//     <div className="flex flex-col space-y-1.5">

//       <ReactQuill
//         value={value}
//         onChange={onChange}
//         theme="snow"
//         placeholder="Write your blog content here..."
//         modules={{
//             toolbar: [
//                 [{ 'font': [] }],
//                 [{ 'size': ['small', 'medium', 'large', 'huge'] }],
//                 ['bold', 'italic', 'underline', 'strike'],
//                 [{ 'color': [] }, { 'background': [] }],
//                 [{ 'script': 'sub' }, { 'script': 'super' }],
//                 [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//                 [{ 'indent': '-1' }, { 'indent': '+1' }],
//                 [{ 'align': [] }],
//                 ['link', 'image', 'video'],
//                 ['clean'] // Remove formatting button
//               ],
//           }}
//           style={{ height: '400px' }}
//       />
//     </div>
//   );
// };

// export default QuillEditor;
