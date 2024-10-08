"use client"
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
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
} from "lucide-react"; // Import social media icons
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { deleteBlogById, getBlogs, getBlogsByHashtag } from "./actions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from 'next/navigation';

import "@blocknote/core/style.css";
import "@blocknote/mantine/style.css";
import Image  from "next/image";

import DOMPurify from "dompurify";

export default function BlogDetail({ params }: any) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(""); // Store the current URL
  const pathname = usePathname(); // Get the current path
  const [liked, setLiked] = useState<boolean | null>(null); // Track thumbs up/down state

  const [deletingId, setDeletingId] = useState<string | null>(null);


  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);


  const carouselRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const scrollLeftButton = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300, // Scroll left by 300px
        behavior: "smooth",
      });
    }
  };

  // Scroll Right Button
  const scrollRightButton = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300, // Scroll right by 300px
        behavior: "smooth",
      });
    }
  };

  interface Blog {
    id: string;
    title: string;
    short_summary: string;
    full_html_blog: string;
    tags: string;
    img_url?: string;
    author: string;
    created_at: string;
    slug: string;
    name: string;
    profile_picture?: string;
    bio?: string;
    insta_url?: string;
    fb_url?: string;
    twitter_url?: string;
    degree?: string;
    speciality?: string;
    web_url?: string;
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data: Blog[] = await getBlogs(params.blogid);
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, [params.blogid]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(`${window.location.origin}${pathname}`);
    }
  }, [pathname]); // Update when the path changes

  // Function to copy link to clipboard
  const handleCopyLink = () => {
    if (currentUrl) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Show "Copied" for 2 seconds
    }
  };

  const handleThumbClick = (type: "up" | "down") => {
    setLiked(type === "up" ? true : false);
  };

  // Handle hashtag click
  const handleHashtagClick = async (tag: string) => {
    try {
      const related = await getBlogsByHashtag(tag);
      setRelatedBlogs(related);
    } catch (error) {
      console.error("Error fetching related blogs:", error);
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
          router.push('/viewblogs');
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

  if (blogs.length === 0) {
    return <p>No blog found.</p>;
  }

  const blog = blogs[0];

  const sanitizedContent = DOMPurify.sanitize(blog.full_html_blog);

  return (
    <div className="bg-gradient-to-br from-white to-gray-200 text-black min-h-screen">
      <header className="py-10 px-4 md:px-8 lg:px-12 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          {blog.title}
        </h1>
        <div className="mt-4 text-gray-600">
          <span>By {blog.author} </span>
          <span className="mx-2">•</span>
          <span>{new Date(blog.created_at).toDateString()}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 px-4 md:px-8 lg:px-12 py-12">
        <article className="prose max-w-none">
          <h2 className="text-xl md:text-xl font-bold tracking-tight pb-5">
            {blog.short_summary}
          </h2>
          {blog.img_url && (
            <Image
              src={blog.img_url}
              alt="Blog Image"
              width={1200}
              height={600}
              className="rounded-lg overflow-hidden"
              style={{ aspectRatio: "1200/600", objectFit: "cover" }}
            />
          )}
          <div className="flex items-center gap-4 text-sm text-gray-600 mt-8">
            {blog.profile_picture && (
              <Avatar className="w-6 h-6">
                <AvatarImage src={blog.profile_picture} alt={blog.name} />
                <AvatarFallback>{blog.name[0]}</AvatarFallback>
              </Avatar>
            )}
            <div className="bg-sky-200 rounded-full p-3 flex justify-between items-center">
              <h2 className="text-lg font-semibold ml-2">By {blog.name}</h2>
              <Button className="bg-blue-700 text-white py-2 px-4 rounded-full ml-4">
                Consult
              </Button>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 hover:bg-gray-100 p-2 rounded-lg"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 mt-2 p-4 bg-white shadow-lg rounded-md">
                  <div className="space-y-2">
                    {/* Social Media Share Links */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600"
                    >
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-500"
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?text=${currentUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-green-500"
                    >
                      <Whatsapp className="w-4 h-4 mr-2" />
                      WhatsApp
                    </a>
                  </div>

                  {/* Copy Link */}
                  <div className="mt-4 flex items-center">
                    <span className="text-sm truncate">{currentUrl}</span>
                    <button
                      onClick={handleCopyLink}
                      className="ml-4 flex items-center gap-1 bg-gray-100 p-2 rounded-md hover:bg-gray-200"
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <p
            className="mt-5 blocknote-content"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          {/* Follow Us Section */}
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center w-full mt-8">
            <span className="font-medium text-lg">
              Follow us for regular updates
            </span>
            <div className="flex gap-4">
              <Button className="bg-blue-500 text-white">
                <Image
                width={16}
                height={16}
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
                  className="w-7" alt={""}                />{" "}
                Channel
              </Button>
              <Button className="bg-red-500 text-white">
                <Image
                width={16}
                height={16}
                  src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_News_icon.svg"
                  className="w-7"  alt={""}
                />{" "}
                Google News
              </Button>
            </div>
          </div>

          {/* Found this useful */}
          <div className="mt-4 flex items-center">
            <span className="font-medium">Found this useful?</span>
            <div className="flex items-center">
              <button
                className={`p-2 rounded-full ${
                  liked === true ? "text-blue-600" : "text-gray-400"
                }`}
                onClick={() => handleThumbClick("up")}
              >
                <ThumbsUp className="w-5 h-5" />
              </button>
              <button
                className={`p-2 rounded-full ${
                  liked === false ? "text-blue-600" : "text-gray-400"
                }`}
                onClick={() => handleThumbClick("down")}
              >
                <ThumbsDown className="w-5 h-5" />
              </button>
            </div>
            <span className="ml-5">Share with others:</span>
            <div className="flex gap-2">
              <a
                href={`https://api.whatsapp.com/send?text=${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 ml-5"
              >
                <Whatsapp className="w-5 h-5" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Not Related to Mental Health */}
          <div className="mt-4 flex items-center gap-2">
            <span>Not related to Mental Health?</span>
            <button className="p-2 text-red-600">
              <Flag className="w-5 h-5" />
            </button>
            <span>Flag this article inappropriate</span>
          </div>

          {/* Hashtags */}
          <div className="flex flex-wrap gap-2 mt-5">
            {blog.tags.split(",").map((tag, index) => (
              <button
                key={index}
                className="bg-slate-300 text-slate-600 px-2 py-1 rounded-md text-xs cursor-pointer"
                onClick={() => handleHashtagClick(tag.trim())}
              >
                {tag.trim()}
              </button>
            ))}
          </div>

          <div>{/* here netflix style carousel with tailwind */}</div>
          {/* Related Blogs Section */}
          {relatedBlogs.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold mb-4">Related Blogs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedBlogs.map((relatedBlog) => (
                  <Card
                    key={relatedBlog.id}
                    className="rounded-lg overflow-hidden border-transparent h-full flex flex-col"
                  >
                    {/* Image Section */}
                    <div className="h-40 w-full relative bg-transparent">
                      <Link href={`/blogs/${relatedBlog.slug}`}>
                        {relatedBlog.img_url ? (
                          <Image
                          
                            src={relatedBlog.img_url}
                            alt={relatedBlog.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-lg transition-transform transform hover:scale-105"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-gray-300 text-gray-500">
                            <span>No Image Available</span>
                          </div>
                        )}
                      </Link>
                    </div>

                    {/* Blog Content */}
                    <CardContent className="p-4 flex flex-col flex-grow">
                      <Link href={`/blogs/${relatedBlog.slug}`}>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          {relatedBlog.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 flex-grow">
                        {relatedBlog.short_summary.length > 100
                          ? relatedBlog.short_summary.substring(0, 100) + "..."
                          : relatedBlog.short_summary}
                      </p>
                    </CardContent>
                    {/* Footer */}
                    <CardFooter className="p-4 flex justify-between items-center">
                      <p className="text-sm text-gray-500 italic">
                        By {relatedBlog.author}
                      </p>
                      <p className="text-sm text-gray-500 italic">
                        {new Date(relatedBlog.created_at).toDateString()}
                      </p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10">
            <Card className="w-full max-w-md">
              <CardHeader className="flex items-center gap-4 p-4">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                  <AvatarFallback>PJ</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="font-medium">{blog.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {blog.degree}
                  </div>
                </div>
                {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
              <MoveHorizontalIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <BookmarkIcon className="w-4 h-4 mr-2" />
              Save Post
            </DropdownMenuItem>
            <DropdownMenuItem>
              <StarIcon className="w-4 h-4 mr-2" />
              Add to Favorites
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <FileWarningIcon className="w-4 h-4 mr-2" />
              Report Post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
              </CardHeader>
              <CardContent className="p-4">
                <p>{blog.bio}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-2">
                <div className="flex items-center gap-2">
                  {blog.insta_url ? (
                    <Button variant="ghost" size="icon">
                      {/* <HeartIcon className="w-4 h-4" /> */}
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/640px-Instagram_logo_2022.svg.png"
                        className="w-4 h-4"  alt={""}
                      />
                      <span className="sr-only">Like</span>
                    </Button>
                  ) : (
                    ""
                  )}

                  {blog.fb_url ? (
                    <Button variant="ghost" size="icon">
                      {/* <MessageCircleIcon className="w-4 h-4" /> */}
                      <Image
                      width={16}
                      height={16}
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
                        className="w-4 h-4"  alt={""}
                      />

                      <span className="sr-only">Comment</span>
                    </Button>
                  ) : (
                    ""
                  )}
                  {blog.twitter_url ? (
                    <Button variant="ghost" size="icon">
                      {/* <ShareIcon className="w-4 h-4" /> */}
                      <Image
                      width={16}
                      height={16}
                        src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Logo_Twitter.png"
                        className="w-7 h-7"  alt={""}
                      />

                      <span className="sr-only">Share</span>
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <Button className="bg-blue-700 text-white py-2 px-4 rounded-full ml-4">
                    Consult
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </article>
        <div className="space-y-8">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="font-medium text-lg">Read About</h3>
            <div className="space-y-4 mt-4">
              <Button className="mx-1 bg-teal-600">Mental Health 101</Button>
              <Button className="mx-1 bg-teal-600">Depression</Button>
              <Button className="mx-1 bg-teal-600">Anxiety</Button>
              <Button className="mx-1 bg-teal-600">Bipolar</Button>
              <Button className="mx-1 bg-teal-600">Psychosis</Button>
              <Button className="mx-1 bg-teal-600">Addiction</Button>
              <Button className="mx-1 bg-teal-600">Youth</Button>
              <Button className="mx-1 bg-teal-600">Friends & Family</Button>
              <Button className="mx-1 bg-teal-600">Suicide</Button>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="font-medium text-lg">Take Test</h3>
            <div className="space-y-2 mt-4">
              <Button className="mx-1 bg-rose-400">General</Button>
              <Button className="mx-1 bg-rose-400">Depression</Button>
              <Button className="mx-1 bg-rose-400">Anxiety</Button>
              <Button className="mx-1 bg-rose-400">Bipolar</Button>
              <Button className="mx-1 bg-rose-400">Post-Partum</Button>
              <Button className="mx-1 bg-rose-400">Addiction</Button>
              <Button className="mx-1 bg-rose-400">Youth</Button>
              <Button className="mx-1 bg-rose-400">Parents</Button>
            </div>
          </div>
        </div>
      </div>
     

      <div className="fixed bottom-5 left-0 right-0 mx-auto w-[75%] flex justify-between items-center bg-white shadow-lg rounded-full border border-gray-300 p-2 max-w-4xl">
        <button className="w-1/3 px-4 py-2 rounded-l-full bg-white text-gray-700 border-r border-gray-200 hover:bg-purple-200 hover:text-purple-600 hover:shadow-lg transition duration-300 ease-in-out">
          Share
        </button>
        <button 
        onClick={() => router.push(`/edit/${blog.slug}`)}
        className="w-1/3 px-4 py-2 bg-white text-gray-700 border-r border-gray-200 hover:bg-green-100 hover:text-green-600 hover:shadow-lg transition duration-300 ease-in-out">
          Edit
        </button>
        <button 
        onClick={() => handleDelete(blog.slug)}
        disabled={deletingId === blog.slug}
        className="w-1/3 px-4 py-2 rounded-r-full bg-white text-gray-700 hover:bg-red-100 hover:text-red-600 hover:shadow-lg transition duration-300 ease-in-out">
          Delete
        </button>
      </div>
    </div>
  );
}
