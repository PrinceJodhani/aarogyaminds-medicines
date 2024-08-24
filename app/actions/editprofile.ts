'use server';
import { pool } from "@/lib/db";

interface EditProfileParams {
  id?: string;
  name?: string;
  bio?: string;
  insta_url?: string;
  fb_url?: string;
  twitter_url?: string;
  web_url?: string;
  psychiatrist?: boolean;
  psychologist?: boolean;
  degree?: string;
  degree_url?: string;
}
export async function EditProfile(data: EditProfileParams) {
  const client = await pool.connect();
  try {
    let query = `UPDATE users SET`;
    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    if (data.name) {
      fields.push(`name = $${index++}`);
      values.push(data.name);
    }
    if (data.bio) {
      fields.push(`bio = $${index++}`);
      values.push(data.bio);
    }
    if (data.insta_url) {
      fields.push(`insta_url = $${index++}`);
      values.push(data.insta_url);
    }
    if (data.fb_url) {
      fields.push(`fb_url = $${index++}`);
      values.push(data.fb_url);
    }
    if (data.twitter_url) {
      fields.push(`twitter_url = $${index++}`);
      values.push(data.twitter_url);
    }
    if (data.web_url) {
      fields.push(`web_url = $${index++}`);
      values.push(data.web_url);
    }
    if (data.psychiatrist !== undefined) {
      fields.push(`psychiatrist = $${index++}`);
      values.push(data.psychiatrist);
    }
    if (data.psychologist !== undefined) {
      fields.push(`psychologist = $${index++}`);
      values.push(data.psychologist);
    }
    if (data.degree) {
      fields.push(`degree = $${index++}`);
      values.push(data.degree);
    }
    if (data.degree_url) {
      fields.push(`degree_url = $${index++}`);
      values.push(data.degree_url);
    }

    query += ` ${fields.join(", ")} WHERE id = $${index}`;
    values.push(data.id);

    console.log('Executing query:', query);  // Log the query for debugging
    console.log('With values:', values);    // Log the values for debugging

    await client.query(query, values);
  } catch (error) {
    console.error('Error updating profile:', error);  // Catch and log any errors
    throw new Error('Failed to update profile');
  } finally {
    client.release();
  }
}
