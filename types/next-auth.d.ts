
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
declare module "next-auth" {
  interface User extends DefaultUser {
    email: string;
    password:string;
    id: string;
    isNewUser?: boolean;
  }
  interface Session extends DefaultSession {
    user: User;
  }
  interface JWT {
    email: string;
    isNewUser?: boolean;
  }

  
}