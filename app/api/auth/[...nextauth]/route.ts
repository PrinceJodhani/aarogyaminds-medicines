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
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as { email: string; password: string };
        
        // Check if user exists for credentials login
        const existingUser = await query("SELECT id FROM users WHERE email = $1", [email]);
        if (existingUser.rows.length > 0) {
          return { email, isNewUser: false } as User;
        } else {
          // Insert user if not exists and return new user info
          await query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
          return { email, isNewUser: true } as User;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.email = user.email;
        token.isNewUser = user.isNewUser; // Set the flag for new users
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.email = token.email;
      session.user.isNewUser = token.isNewUser; // Include new user flag in session
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
