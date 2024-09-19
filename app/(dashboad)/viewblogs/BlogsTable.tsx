"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBlogById } from "./actions";
import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  slug: string;
  created_at: string;
}

export const BlogsTable = ({ blogs }: { blogs: Blog[] }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleDelete = async (slug: string) => {
    const confirmed = confirm("Are you sure you want to delete this blog?");
    if (confirmed) {
      setDeletingId(slug);
      try {
        const response = await deleteBlogById(slug);
        if (response != null) {
          alert("Blog deleted successfully!");
          router.refresh();
        } else {
          alert("Failed to delete the blog.");
        }
      } catch (error) {
        console.error("An error occurred while deleting the blog:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Function to sort blogs by date
  const sortedBlogs = blogs.sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    } else {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  return (
    <>
      {/* Sorting controls */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sort by Date ({sortOrder === "asc" ? "Oldest First" : "Newest First"})
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Created At</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedBlogs.length > 0 ? (
            sortedBlogs.map((blog) => (
              <tr key={blog.slug}>
                <td className="border p-2">
                  <a className="hover:text-blue-500" href={blog.slug}>
                    {blog.title}
                  </a>
                </td>
                <td className="border p-2">
                  {new Date(blog.created_at).toLocaleDateString()}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => router.push(`/edit/${blog.slug}`)} // Navigate to the edit page with the blog's slug
                    className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(blog.slug)}
                    disabled={deletingId === blog.slug}
                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    {deletingId === blog.slug ? "Deleting..." : "Delete"}
                  </button>

                  <Link
                    href={`https://aarogyaminds.com/blogs/${blog.slug}`}
                    target="_blank"
                    className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                  >
                    Share
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="border p-2 text-center">
                No blogs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
