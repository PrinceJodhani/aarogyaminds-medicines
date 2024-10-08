import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
// import BlogForm from "@/components/BlogForm";

export default async function BlogPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div>
      {/* <BlogForm author={session.user.name}/> */}
    </div>
  );
}
