// app/actions/fetchprofile.ts
'use server';
import { pool } from "@/lib/db";

interface FetchProfileParams {
  email: string;
}

export async function FetchProfile({ email }: FetchProfileParams) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0]; // Assuming there is only one user per ID
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw new Error('Failed to fetch profile');
  } finally {
    client.release();
  }
}
