// app/(dashboard)/viewblogs/actions.ts
"use server"
import { query } from "@/lib/db";



// Delete blog by slug
export async function deleteBlogById(slug: string) {
  const result = await query(`DELETE FROM mentalhealth WHERE slug = $1`, [slug]);
  return result.rowCount; // return the number of rows deleted
}

// Fetch blog by slug
export async function getBlogBySlug(slug: string) {
  const result = await query(
    `SELECT title, short_summary, full_html_blog, img_url FROM mentalhealth WHERE slug = $1`,
    [slug]
  );
  return result.rows[0];
}

// Update blog by slug
export async function updateBlogBySlug(slug: string, updatedBlog: any) {
  const { title, short_summary, full_html_blog, img_url } = updatedBlog;
  const result = await query(
    `UPDATE mentalhealth SET title = $1, short_summary = $2, full_html_blog = $3, img_url = $4 WHERE slug = $5`,
    [title, short_summary, full_html_blog, img_url, slug]
  );
  return result.rowCount; // return the number of rows updated
}
