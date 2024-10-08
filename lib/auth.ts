// app/api/auth/[...nextauth]/route.ts

import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { query } from "@/lib/db"; // Ensure this is imported

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Aarogya Minds",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter Your Email" },
        password: { label: "Password", type: "password" },
        signup: { label: "Signup", type: "text" }, // Include signup in credentials
      },
      async authorize(credentials, req) {
        const { email, password, signup } = credentials as { email: string; password: string; signup?: string };

        if (signup === "true") {
          // This is a sign-up attempt
          // Check if user already exists
          const existingUser = await query("SELECT id FROM users WHERE email = $1", [email]);
          if (existingUser.rows.length > 0) {
            // User already exists
            return null; // Return null to indicate failure (user already exists)
          } else {
            // Insert new user
            await query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
            return { email, isNewUser: true } as User;
          }
        } else {
          // This is a login attempt
          // Check if user exists with matching email and password
          const result = await query(
            "SELECT id, email FROM users WHERE email = $1 AND password = $2",
            [email, password]
          );

          if (result.rows.length > 0) {
            // User exists and password matches
            return { email: result.rows[0].email, isNewUser: false } as User;
          } else {
            // User not found or password incorrect
            return null;
          }
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.email = user.email;
        token.isNewUser = (user as any).isNewUser;
        // Handle Google provider separately if needed
        if (account && account.provider === "google") {
          // Your existing logic for Google sign-in
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      session.user.isNewUser = token.isNewUser;
      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/editprofile`;
    },
  },
  pages: {
    signIn: "/signup", // Custom sign-up page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
