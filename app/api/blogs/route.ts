// pages/api/blogs.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use your actual connection string here
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, summary, content, tags, videoUrl, author } = req.body;

    try {
      const result = await pool.query(
        'INSERT INTO mentalhealth (title, short_summary, full_html_blog, tags, video_url, author, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING id',
        [title, summary, content, tags.join(','), videoUrl, author]
      );
      res.status(200).json({ success: true, id: result.rows[0].id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Database insertion failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
