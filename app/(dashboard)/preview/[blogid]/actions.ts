'use server';

import { query } from '@/lib/db';

export async function getBlogs(blogId: string) {
  try {
    // Query to join mentalhealth and users tables based on email and matching title with blogId
    const queryText = `
      SELECT 
        m.id, m.title, m.short_summary, m.full_html_blog, m.tags, m.img_url, m.author, m.created_at, m.slug, 
        u.name, u.profile_picture, u.bio, u.insta_url, u.fb_url, u.twitter_url, u.degree, u.speciality, u.web_url
      FROM 
        mentalhealth m
      JOIN 
        users u
      ON 
        m.email = u.email
      WHERE 
        m.slug = $1
    `;
    const existingBlogs = await query(queryText, [blogId]);

    const blogs = existingBlogs.rows;
    return blogs;
    
  } catch (error) {
    console.error("Error getting blogs:", error);
    throw new Error("Failed to get blogs");
  }
}


// Fetch blogs by hashtag
export async function getBlogsByHashtag(hashtag: string) {
  try {
    const queryText = `
      SELECT * FROM mentalhealth 
      WHERE $1 = ANY(string_to_array(tags, ','))
      ORDER BY id DESC
    `;
    const existingBlogs = await query(queryText, [hashtag]);
    return existingBlogs.rows;
  } catch (error) {
    console.error("Error getting blogs by hashtag:", error);
    throw new Error("Failed to get blogs by hashtag");
  }
}

// Delete blog by ID
export async function deleteBlogById(slug: string) {
  const result = await query(`DELETE FROM mentalhealth WHERE slug = $1`, [slug]);
  return result.rowCount; // return the number of rows deleted
}