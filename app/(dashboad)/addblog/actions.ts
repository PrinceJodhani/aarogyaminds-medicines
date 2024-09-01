// 'use server';

// import { insertBlog } from '@/lib/db';

// export async function addNewBlog(data: FormData, author: string) {
//   const title = data.get('title') as string;
//   const summary = data.get('summary') as string;
//   const content = data.get('content') as string;
//   const tags = (data.get('tags') as string).split(',');

//   await insertBlog(title, summary, content, tags, author);
// }






///////////////////////////////
////////////////////////
/////////////

'use server';

import { insertBlog } from '@/lib/db';

export async function addNewBlog(data: FormData, author: string) {
  const title = data.get('title') as string;
  const summary = data.get('summary') as string;
  const content = data.get('content') as string; // This is the HTML content
  const tags = (data.get('tags') as string)?.split(',');

  // Ensure that the HTML content is inserted into the database
  await insertBlog(title, summary, content, tags, author);
}
