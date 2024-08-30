'use server';
import { getServerSession } from "next-auth";
// import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { insertBlog } from "@/lib/db";
import TextEditor from "@/components/TextEditor";
import Link from "next/link";

// Server action for adding a new blog
export async function addNewBlog(formData: FormData) {
   // Marking as a server function

  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const content = formData.get("content") as string;
  const tags = formData.get("tags")?.toString().split(',') || [];

  const author = formData.get("author") as string;

  await insertBlog(title, summary, content, tags, author);
}

export default async function AddBlogPage() {
  const session = await getServerSession(authOptions);
  
if(session?.user.isNewUser){
  redirect('/editprofile');

}
  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="container mx-auto py-8">
      {/* <h1 className="text-3xl font-bold mb-4">Create a New Blog</h1> */}
      <h2></h2>
      {/* <BlogForm author={session?.user?.name || ''} /> */}
     <TextEditor/>
    </div>
  );
}
