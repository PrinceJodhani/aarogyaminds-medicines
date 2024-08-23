import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { query } from "@/lib/db";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }: any) {
      try {
        const existingUser = await query(
          "SELECT id FROM users WHERE google_id = $1",
          [profile.sub]
        );

        if (existingUser.rows.length > 0) {
          // Existing user
          user.isNewUser = false;
          user.id = existingUser.rows[0].id;
        } else {
          // New user
          const newUser = await query(
            `INSERT INTO users (google_id, name, email, profile_picture) 
             VALUES ($1, $2, $3, $4) RETURNING id`,
            [profile.sub, user.name, user.email, user.image]
          );
          user.isNewUser = true;
          user.id = newUser.rows[0].id;
        }

        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },

    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.isNewUser = token.isNewUser; // Persist isNewUser in the session
      }
      return session;
    },

    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.isNewUser = user.isNewUser;
      }
      return token;
    },

    async redirect({ baseUrl }: { baseUrl: string }) {
      return `${baseUrl}/editprofile`; // Always redirect to editprofile
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
