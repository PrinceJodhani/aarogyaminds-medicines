"use client"
import { Profile } from "@/components/Profile";
import { useSession } from "next-auth/react";

export default function YourProfile(){
  const { data: session } = useSession();

    return(
        <>
        <Profile username={session?.user.name|| ""}/>
        </>
    )
}