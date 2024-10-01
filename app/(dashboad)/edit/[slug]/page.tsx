'use client';

import { useEffect, useState, useCallback, ChangeEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getBlogBySlug, updateBlogBySlug } from './actions';
import { useCreateBlockNote } from "@blocknote/react";
import TextEditor from '@/components/TextEditor';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { toast } from "@/components/ui/use-toast";
import { BlockNoteView } from "@blocknote/mantine";

export default function EditBlogPage() {
  const router = useRouter();
  const { slug } = useParams();
  const { data: session } = useSession();
  const [blog, setBlog] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [shortSummary, setShortSummary] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [initialHTML, setInitialHTML] = useState<string>(''); // State to store initial HTML

  // Create BlockNote editor instance
  const editor = useCreateBlockNote();

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const blogData = await getBlogBySlug(slug);
        if (blogData) {
          setBlog(blogData);
          setTitle(blogData.title);
          setShortSummary(blogData.short_summary);
          setInitialHTML(blogData.full_html_blog); // Set initial HTML from the database
          setImageUrl(blogData.img_url);

          // Convert HTML to BlockNote content on mount
          const blocks = await editor.tryParseHTMLToBlocks(blogData.full_html_blog);
          editor.replaceBlocks(editor.document, blocks);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast({
          title: "Error",
          description: "Failed to load blog data.",
          variant: "destructive",
        });
      }
    };

    fetchBlog();
  }, [slug, editor]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedBlog = {
        title,
        short_summary: shortSummary,
        full_html_blog: await editor.blocksToFullHTML(editor.document), // Convert BlockNote content back to HTML
        img_url: imageUrl,
      };

      await updateBlogBySlug(slug, updatedBlog);

      toast({
        title: "Success",
        description: "Blog updated successfully.",
        variant: "success",
      });

      router.push('/viewblogs');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update the blog. Please try again.",
        variant: "destructive",
      });
      console.error('Error updating blog:', error);
    }
  };

  const htmlInputChanged = useCallback(
    async (e: ChangeEvent<HTMLTextAreaElement>) => {
      const blocks = await editor.tryParseHTMLToBlocks(e.target.value);
      editor.replaceBlocks(editor.document, blocks);
    },
    [editor]
  );

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <Input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="mb-4 p-2 text-2xl font-semibold border-0 rounded"
          style={{ fontSize: "2rem" }}
        />

        <Textarea
          name="shortSummary"
          value={shortSummary}
          onChange={(e) => setShortSummary(e.target.value)}
          placeholder="Synopsis"
          required
          className="mb-4 p-2 border-0 rounded"
        />

        <CldUploadWidget
          uploadPreset="blogthumb"
          onSuccess={({ event, info }) => {
            if (event === "success") {
              setImageUrl(info?.url);
            }
          }}
        >
          {({ open }) => (
            <button type="button" onClick={() => open()} className="mb-4 bg-black text-white p-2 rounded w-40 hover:bg-gray-800 transition-colors duration-300">
              Upload an Image
            </button>
          )}
        </CldUploadWidget>
        {imageUrl ? <Image src={imageUrl} width={400} height={400} alt="Blog image" /> : ""}

        {/* Textarea for manual HTML input (optional) */}
        {/* <div className="mb-4">
          <div>Input (HTML):</div>
          <textarea
            defaultValue={initialHTML}
            onChange={htmlInputChanged}
            className="w-full h-32 p-2 border rounded"
          />
        </div> */}

        {/* BlockNote Editor */}
        <BlockNoteView editor={editor} editable={true} />

        <button type="submit" className="mb-4 bg-black text-white p-2 rounded hover:bg-gray-800 transition-colors duration-300">
          Update Blog
        </button>
      </form>
    </div>
  );
}
