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
    <>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">My Blogs</h1>
        {/* Passing blogs data to the client component that handles search */}
        <BlogsTableWithSearch blogs={blogs} />
      </div>

      {/* Sticky floater with Share, Edit, and Delete buttons */}
      {/* <div className="fixed bottom-5 left-0 right-0 mx-auto w-[75%] flex justify-between items-center bg-white shadow-lg rounded-full border border-gray-300 p-2 max-w-4xl">
        <button className="w-1/3 px-4 py-2 rounded-l-full bg-white text-gray-700 border-r border-gray-200 hover:bg-purple-200 hover:text-purple-600 hover:shadow-lg transition duration-300 ease-in-out">
          Share
        </button>
        <button className="w-1/3 px-4 py-2 bg-white text-gray-700 border-r border-gray-200 hover:bg-green-100 hover:text-green-600 hover:shadow-lg transition duration-300 ease-in-out">
          Edit
        </button>
        <button className="w-1/3 px-4 py-2 rounded-r-full bg-white text-gray-700 hover:bg-red-100 hover:text-red-600 hover:shadow-lg transition duration-300 ease-in-out">
          Delete
        </button>
      </div> */}
    </>
  );
};

export default ViewBlogsPage;
