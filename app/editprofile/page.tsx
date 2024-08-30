"use client";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Profile } from "@/components/Profile";
import { insertUser } from "./serverActions"; // Import the server action

export default function EditProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleUserInsertion = async () => {
      if (session?.user?.email) {
        try {
          // Insert the user based on the authentication method
          await insertUser(session.user.email, session.user.name || "", session.user.password || "");
        } catch (error) {
          console.error("Error inserting user:", error);
        }
      }
    };

    const handleRedirect = async () => {
      if (status === "loading") return; // Wait for session to load

      if (session) {
        await handleUserInsertion();

        if (session.user.isNewUser) {
          // Stay on edit profile if the user is new
          console.log("New user, stay on edit profile.");
        } else {
          // Redirect to /addblog if the user is not new
          router.push("/addblog");
        }
      } else {
        // If no session, force sign-in
        signIn();
      }
    };

    handleRedirect();
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Profile username={session?.user.name || ""} />
    </div>
  );
}
