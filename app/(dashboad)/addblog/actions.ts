'use server';

import { insertBlog } from '@/lib/db';
import { query } from '@/lib/db';

export async function addNewBlog(data: FormData, author: string, email: string) {
  const title = data.get('title') as string;
  const summary = data.get('summary') as string;
  const content = data.get('content') as string; // This is the HTML content
  const tags = (data.get('tags') as string)?.split(',');
  const img = data.get('imageUrl') as string;


  // Ensure that the HTML content is inserted into the database
  await insertBlog(title, summary, content, tags, author, email,img);
}

export async function getUser(email: string){
  try {
    // Check if the user already exists
    const existingUser = await query("SELECT * FROM users WHERE email = $1", [email]);
    return existingUser.rows[0];
    
  } catch (error) {
    console.error("Error getting user:", error);
    throw new Error("Failed to get user");
  }
}