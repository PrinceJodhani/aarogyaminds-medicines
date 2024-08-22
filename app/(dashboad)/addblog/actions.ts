'use server';

import { insertBlog } from '@/lib/db';

export async function addNewBlog(data: FormData, author: string) {
  const title = data.get('title') as string;
  const summary = data.get('summary') as string;
  const content = data.get('content') as string;
  const tags = (data.get('tags') as string).split(',');
  const videoUrl = data.get('videoUrl') as string;

  await insertBlog(title, summary, content, tags, videoUrl, author);
}
