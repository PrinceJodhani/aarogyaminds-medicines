// app/(dashboard)/viewblogs/BlogsTableWithSearch.tsx
"use client"; // Marking this as a client component

import { useState } from "react";
import { BlogsTable } from "./BlogsTable"; // Reuse the table component for rendering

interface Blog {
  id: number;
  title: string;
  slug: string;
  created_at: string;
}

export const BlogsTableWithSearch = ({ blogs }: { blogs: Blog[] }) => {
  const [searchQuery, setSearchQuery] = useState(""); // Client-side state for search

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search blogs by title..."
        className="p-2 border rounded mb-4 w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
      />
      {/* Render the filtered blogs */}
      <BlogsTable blogs={filteredBlogs} />
    </div>
  );
};
