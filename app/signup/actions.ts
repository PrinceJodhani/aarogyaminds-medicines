// app/signup/actions.ts

'use server';

import { query } from '@/lib/db';

export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const result = await query('SELECT 1 FROM users WHERE email = $1 LIMIT 1', [email]);
    return result.rows.length > 0;
  } catch (error) {
    console.error('Error checking email:', error);
    throw new Error('Internal Server Error');
  }
}
