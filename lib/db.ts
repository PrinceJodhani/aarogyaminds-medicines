import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const insertBlog = async (title: string, summary: string, content: string, tags: string[], videoUrl: string, author: string) => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO mentalhealth (title, short_summary, full_html_blog, tags, video_url, author, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING id;
    `;
    const values = [title, summary, content, tags.join(','), videoUrl, author];
    const result = await client.query(query, values);
    return result.rows[0].id;
  } finally {
    client.release();
  }
};
