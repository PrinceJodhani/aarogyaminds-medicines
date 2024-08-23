import { pool } from "@/lib/db"

export async function EditProfile() {
    const client = await pool.connect();
    try {
      const query = `INSERT INTO mentalhealth (title, short_summary, full_html_blog, tags, video_url, author, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, NOW())
        RETURNING id;
      `;
      const values = [title, summary, content, tags.join(','), videoUrl, author];
      const result = await client.query(query, values);
      return result.rows[0].id;
    } finally {
      client.release();
    }
}
