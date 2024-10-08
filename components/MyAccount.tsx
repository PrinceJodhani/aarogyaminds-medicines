'use client'
import { useSession } from "next-auth/react";

export default function MyAccount(){
    const { data: session } = useSession();
    return(
        <>
        {session?.user.name}
        </>
    )
}