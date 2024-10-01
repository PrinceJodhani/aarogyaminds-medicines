// app/login/actions.ts

'use server';

import { query } from '@/lib/db';

export async function authenticateUser(email: string, password: string): Promise<boolean> {
  try {
   
    const result = await query('SELECT id FROM users WHERE email = $1 AND password = $2', [email, password]);
    return result.rows.length > 0;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw new Error('Internal Server Error');
  }
}
