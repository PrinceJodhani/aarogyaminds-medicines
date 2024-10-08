'use server';

import { insertBlog } from '@/lib/db';
import { query } from '@/lib/db';

// Function to add a new blog
export async function addNewBlog(data: FormData, author: string, email: string) {
  const title = data.get('title') as string;
  const summary = data.get('summary') as string;
  const content = data.get('content') as string; // This is the HTML content
  const tags = (data.get('tags') as string)?.split(',');
  const img = data.get('imageUrl') as string;
  const slug = data.get('slug') as string;

  // Check if the slug already exists in the database
  const slugExists = await checkSlugExists(slug);
  if (slugExists) {
    throw new Error('Slug already exists. Please choose a different slug.');
  }

  // Ensure that the HTML content is inserted into the database
  await insertBlog(title, summary, content, tags, author, email, img, slug);
}

// Function to check if a slug already exists in the database
export async function checkSlugExists(slug: string): Promise<boolean> {
  try {
    const result = await query('SELECT COUNT(*) FROM mentalhealth WHERE slug = $1', [slug]);
    return result.rows[0].count > 0;
  } catch (error) {
    console.error('Error checking slug existence:', error);
    throw new Error('Failed to check slug existence');
  }
}

// Function to get a user by email
export async function getUser(email: string) {
  try {
    // Check if the user already exists
    const existingUser = await query('SELECT * FROM users WHERE email = $1', [email]);
    return existingUser.rows[0];
  } catch (error) {
    console.error('Error getting user:', error);
    throw new Error('Failed to get user');
  }
}
