// app/(dashboard)/viewblogs/BlogsTable.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Blog {
  id: number;
  title: string;
  short_summary: string;
  created_at: string;
}

export const BlogsTable = ({ blogs }: { blogs: Blog[] }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null); // Track deleting state

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this blog?");
    if (confirmed) {
      setDeletingId(id); // Set deleting state
      try {
        const response = await fetch(`/dashboard/viewblogs/delete?id=${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert("Blog deleted successfully!");
          router.refresh(); // Refresh the page after deletion
        } else {
          alert("Failed to delete the blog.");
        }
      } catch (error) {
        console.error("An error occurred while deleting the blog:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setDeletingId(null); // Reset deleting state
      }
    }
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border p-2">Title</th>
          <th className="border p-2">Summary</th>
          <th className="border p-2">Created At</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <tr key={blog.id}>
              <td className="border p-2">{blog.title}</td>
              <td className="border p-2">{blog.short_summary}</td>
              <td className="border p-2">
                {new Date(blog.created_at).toLocaleDateString()}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(blog.id)}
                  disabled={deletingId === blog.id} // Disable button while deleting
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  {deletingId === blog.id ? "Deleting..." : "Delete"}
                </button>
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
  );
};
