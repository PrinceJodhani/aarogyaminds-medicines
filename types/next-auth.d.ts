// types/next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module "next-auth" {
  interface User extends DefaultUser {
    /** The user's email address. */
    email: string;
    password: string;
    /** Indicates if the user is new. */
    isNewUser?: boolean;
    /** The user's unique ID. */
    id: string;
  }

  interface Session {
    user: {
      /** The user's email address. */
      email: string;
      password: string;
      /** Indicates if the user is new. */
      isNewUser?: boolean;
      /** The user's unique ID. */
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** The user's email address. */
    email?: string;
    password: string;
    /** Indicates if the user is new. */
    isNewUser?: boolean;
    /** The user's unique ID. */
    id?: string;
  }
}
