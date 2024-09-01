// 'use server';
// import { getServerSession } from "next-auth";
// // import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// import { insertBlog } from "@/lib/db";
// import TextEditor from "@/components/TextEditor";
// import Link from "next/link";

// // Server action for adding a new blog
// export async function addNewBlog(formData: FormData) {
//    // Marking as a server function

//   const title = formData.get("title") as string;
//   const summary = formData.get("summary") as string;
//   const content = formData.get("content") as string;
//   const tags = formData.get("tags")?.toString().split(',') || [];

//   const author = formData.get("author") as string;

//   await insertBlog(title, summary, content, tags, author);
// }

// export default async function AddBlogPage() {
//   const session = await getServerSession(authOptions);
  
// if(session?.user.isNewUser){
//   redirect('/editprofile');

// }
//   if (!session) {
//     redirect('/api/auth/signin');
//   }

//   return (
//     <div className="container mx-auto py-8">
//       {/* <h1 className="text-3xl font-bold mb-4">Create a New Blog</h1> */}
//       <h2></h2>
//       {/* <BlogForm author={session?.user?.name || ''} /> */}
//      <TextEditor/>
//     </div>
//   );
// }









//////////////////////////////////
/////////////////////////
//////////////////////
'use client';
import { useState } from 'react';
import TextEditor from '@/components/TextEditor';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { addNewBlog } from './actions';
import { useSession } from "next-auth/react";

export default function AddBlogPage() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState(''); // State for the blog content (HTML)
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.name) {
      alert("User is not logged in. Please sign in first.");
      return;
    }

    // Form data is collected here
    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('tags', tags);
    formData.append('content', content); // Attach content from the state

    // Call the server action to save the blog
    await addNewBlog(formData, session.user.name);

    // Redirect to a success page
    router.push('/success');
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Create a New Blog</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title Input */}
        <Input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Blog Title"
          required
          className="mb-4 p-2 border rounded"
        />

        {/* Summary Input */}
        <Input
          name="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Enter Short Summary"
          required
          className="mb-4 p-2 border rounded"
        />

        {/* Tags Input */}
        <Input
          name="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter Tags (comma-separated)"
          className="mb-4 p-2 border rounded"
        />

        {/* TextEditor for content */}
        <TextEditor onContentChange={setContent} />

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Publish Blog
        </button>
      </form>
    </div>
  );
}
