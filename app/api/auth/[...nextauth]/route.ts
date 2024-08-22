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
    async signIn({ user, account, profile }: any) {
      try {
        const existingUser = await query(
          "SELECT id FROM users WHERE google_id = $1",
          [profile.sub]
          
        );
       
        if (existingUser.rows.length > 0) {
          user.id = existingUser.rows[0].id;
        } else {
          const newUser = await query(
            `INSERT INTO users (google_id, name, email, profile_picture) 
             VALUES ($1, $2, $3, $4) RETURNING id`,
            [profile.sub, user.name, user.email, user.image]
          );
          user.id = newUser.rows[0].id;
        }

        return true;
      } catch (error) {
        console.error("Error saving user data:", error);
        return false;
      }
    },

    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      try {
        // Logic for determining redirect URL
        const existingUser = await query(
          "SELECT id FROM users WHERE id = $1",
          [url]
        );

        return existingUser.rows.length > 0 ? `${baseUrl}/addblog` : `${baseUrl}/editprofile`;
      } catch (error) {
        console.error("Error during redirection:", error);
        return baseUrl;
      }
    },

    async session({ session, token }: any) {
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },

    async jwt({ token, user }: any) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
