'use server';
import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const insertBlog = async (title: string, summary: string, content: string, tags: string[], author: string, email: string, img:string,slug:string) => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO mentalhealth (title, short_summary, full_html_blog, tags, author, email, created_at, img_url,slug)
      VALUES ($1, $2, $3, $4, $5, $6, NOW(),$7,$8)
      RETURNING id;
    `;
    const values = [title, summary, content, tags.join(','), author, email, img,slug];
    const result = await client.query(query, values);
    return result.rows[0].id;
  } finally {
    client.release();
  }
};



export const deleteBlog = async (id: number) => {
  const client = await pool.connect();
  try {
    const query = `DELETE FROM mentalhealth WHERE id = $1`;
    await client.query(query, [id]);
  } finally {
    client.release();
  }
};

//
