"use client"
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Profile } from "@/components/Profile";
import type { Session } from "next-auth"; // Import Session type

export default function EditProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load

    if (session) {
      if (!session.user.isNewUser) {
        // Redirect to /addblog if the user is not new
        router.push("/addblog");
      }
    } else {
      // If no session, force sign-in
      signIn();
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Ensure session?.user.name is properly typed */}
      <Profile username={session?.user.name || ""} />
    </div>
  );
}
