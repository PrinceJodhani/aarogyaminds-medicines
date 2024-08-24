
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isNewUser: boolean;
      name:string;
      image:string;
    };
  }

  interface User {
    id: string;
    isNewUser: boolean;
  }
}