import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { query } from "@/lib/db";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      try {
        // Check if user already exists
        const existingUser = await query(
          "SELECT id FROM users WHERE google_id = $1",
          [profile.sub]
        );

        if (existingUser.rows.length === 0) {
          // If not, insert a new user
          await query(
            `INSERT INTO users (google_id, name, email, profile_picture) 
             VALUES ($1, $2, $3, $4)`,
            [profile.sub, user.name, user.email, user.image]
          );
        }

        return true;
      } catch (error) {
        console.error("Error saving user data:", error);
        return false;
      }
    },

    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Redirect to /editprofile after successful sign-in
      return `${baseUrl}/editprofile`;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
