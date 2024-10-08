"use server"
// app/(dashboard)/viewblogs/actions.ts
import { query } from "@/lib/db";

// Fetch blogs by user email
export async function getBlogsByEmail(email: string) {
  const result = await query(
    `SELECT id, title, slug, created_at FROM mentalhealth WHERE email = $1`,
    [email]
  );
  return result.rows;
}

// Delete blog by ID
export async function deleteBlogById(slug: string) {
  const result = await query(`DELETE FROM mentalhealth WHERE slug = $1`, [slug]);
  return result.rowCount; // return the number of rows deleted
}
