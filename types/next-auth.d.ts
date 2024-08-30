
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      password:string;
      email: string;
      id: string;
      isNewUser: boolean;
      name:string;
      image:string;
     
    };
  }

  interface User {
    email: string;
    password:string;
    id: string;
    isNewUser: boolean;
  }
}