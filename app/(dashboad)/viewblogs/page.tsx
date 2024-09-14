// app/(dashboard)/viewblogs/page.tsx

import { getServerSession } from "next-auth";
import { getBlogsByEmail } from "./actions";
import { BlogsTableWithSearch } from "./BlogsTableWithSearch"; // Importing the client component that handles search

export const dynamic = "force-dynamic"; // Ensures dynamic content

const ViewBlogsPage = async () => {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return <p>You need to log in to view your blogs.</p>;
  }

  const blogs = await getBlogsByEmail(session.user.email);

  if (blogs.length === 0) {
    return <p>No blogs found for this user.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Blogs</h1>
      {/* Passing blogs data to the client component that handles search */}
      <BlogsTableWithSearch blogs={blogs} />
    </div>
  );
};

export default ViewBlogsPage;
