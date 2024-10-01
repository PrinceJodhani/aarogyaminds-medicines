"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBlogById } from "./actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Share2,
  Copy,
  Facebook,
  Twitter,
  SendHorizontal as Whatsapp,
  ThumbsUp,
  ThumbsDown,
  Flag,
  HeartIcon,
  MessageCircleIcon,
  ShareIcon,
} from "lucide-react";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

    // State to track which blog's share dropdown is open
    const [activeShareBlogSlug, setActiveShareBlogSlug] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState(""); // Store the current URL
  const [copied, setCopied] = useState(false);




  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setCurrentUrl(`aarogyaminds.com/blogs/${blogs.slug}`);
  //   }
  // }, [blogs.slug]); // here I cant get the slug

   // Function to copy link to clipboard
   const handleCopyLink = () => {
    if (currentUrl) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Show "Copied" for 2 seconds
    }
  };


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
  const socialMediaLinks = [
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
      label: 'Facebook',
      Icon: Facebook,
      colorClass: 'text-blue-600',
    },
    {
      href: `https://twitter.com/intent/tweet?url=${currentUrl}`,
      label: 'Twitter',
      Icon: Twitter,
      colorClass: 'text-blue-500',
    },
    {
      href: `https://api.whatsapp.com/send?text=${currentUrl}`,
      label: 'WhatsApp',
      Icon: Whatsapp,
      colorClass: 'text-green-500',
    },
  ];
  

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
            <th className="border p-2">Posted On</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedBlogs.length > 0 ? (
            sortedBlogs.map((blog) => (
              <tr key={blog.slug}>
                <td className="border p-2">
                  <a className="hover:text-blue-500" href={`/preview/${blog.slug}`}>
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
                  <div className="relative inline-block">
  <Button
    onClick={() => {
      if (activeShareBlogSlug === blog.slug) {
        // Close the dropdown if it's already open for this blog
        setActiveShareBlogSlug(null);
      } else {
        setActiveShareBlogSlug(blog.slug);
        setCurrentUrl(`https://aarogyaminds.com/blogs/${blog.slug}`);
      }
    }}
    className="bg-white text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
  >
    Share
  </Button>

  {activeShareBlogSlug === blog.slug && (
    <div className="absolute left-1/2 transform -translate-x-1/2 sm:left-0 sm:transform-none sm:ml-0 sm:-translate-x-0 z-10 mt-2 w-72 max-w-xs sm:w-64 sm:max-w-sm origin-top-right bg-white shadow-lg rounded-md">
      <div className="p-4">
        {/* Social Media Share Links */}
        <div className="space-y-2">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600"
          >
            <Facebook className="w-5 h-5 mr-2" />
            Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-500"
          >
            <Twitter className="w-5 h-5 mr-2" />
            Twitter
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-green-500"
          >
            <Whatsapp className="w-5 h-5 mr-2" />
            WhatsApp
          </a>
        </div>

        {/* Copy Link */}
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center">
          <span className="text-sm truncate">{currentUrl}</span>
          <button
            onClick={handleCopyLink}
            className="mt-2 sm:mt-0 sm:ml-4 flex items-center gap-1 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200"
          >
            <Copy className="w-5 h-5" />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  )}
</div>
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
