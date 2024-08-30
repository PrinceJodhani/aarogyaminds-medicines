import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { query } from "@/lib/db";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Aarogya Minds",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter Your Email" },
        password: { label: "Password", type: "password" },
        signup: { label: "Sign Up", type: "hidden" }, // Add this field to help distinguish sign-ups
      },
      async authorize(credentials, req) {
        const { email, password, signup } = credentials as {
          email: string;
          password: string;
          signup: string;
        };

        try {
          if (signup === "true") {
            // Handle sign-up
            const existingUser = await query("SELECT id FROM users WHERE email = $1", [email]);

            if (existingUser.rows.length > 0) {
              return { id: existingUser.rows[0].id, isNewUser: false };
            } else {
              const newUser = await query(
                "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id",
                [email, password]
              );
              return { id: newUser.rows[0].id, isNewUser: true };
            }
          } else {
            // Handle login
            const existingUser = await query("SELECT id FROM users WHERE email = $1 AND password = $2", [email, password]);

            if (existingUser.rows.length > 0) {
              return { id: existingUser.rows[0].id, isNewUser: false };
            } else {
              return null;
            }
          }
        } catch (error) {
          console.error("Error in CredentialsProvider authorize:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }: any) {
      if (profile && profile.sub) {
        try {
          const existingUser = await query(
            "SELECT id FROM users WHERE google_id = $1",
            [profile.sub]
          );

          if (existingUser.rows.length > 0) {
            user.isNewUser = false;
            user.id = existingUser.rows[0].id;
          } else {
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
      }

      // For non-Google logins, return false to prevent sign-in callback handling
      return false;
    },

    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.isNewUser = token.isNewUser;
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
      return `${baseUrl}/editprofile`;
    },
  },
  pages: {
    signIn: "/signup", // This will be used for your custom sign-up page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
