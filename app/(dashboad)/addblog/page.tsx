// app/(dashboard)/addblog/page.tsx

'use client';

import { useEffect, useState } from 'react';
import TextEditor from '@/components/TextEditor';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { addNewBlog, getUser } from './actions';
import { useSession } from "next-auth/react";
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { toast } from "@/components/ui/use-toast";

interface TagOption {
  value: string;
  label: string;
}


const tagSuggestions: TagOption[] = [
  { value: 'Mental health', label: 'Mental health' },
  { value: 'Child mental health', label: 'Child mental health' },
  { value: 'Latest development', label: 'Latest development' },
  { value: 'Mental health news', label: 'Mental health news' },
  { value: 'Adult mental health', label: 'Adult mental health' },
  { value: 'Geriatric psychiatry', label: 'Geriatric psychiatry' },
  { value: 'Sexual health', label: 'Sexual health' },
  { value: 'Emotional health', label: 'Emotional health' },
  { value: 'Adolescent mental health', label: 'Adolescent mental health' },
  { value: 'Couple counseling', label: 'Couple counseling' },
  { value: 'Substance abuse', label: 'Substance abuse' },
  { value: 'Addiction', label: 'Addiction' },
  { value: 'Preventive mental health', label: 'Preventive mental health' },
  { value: 'Psychology', label: 'Psychology' },
  { value: 'Neuropsychiatry', label: 'Neuropsychiatry' },
  { value: 'School mental health', label: 'School mental health' },
  { value: 'Corporate mental health', label: 'Corporate mental health' },
  { value: 'Success story', label: 'Success story' },
  { value: 'IPS news', label: 'IPS news' },
  { value: 'Patient story', label: 'Patient story' },
  { value: 'Stories of hope', label: 'Stories of hope' },
  { value: 'Workplace mental health', label: 'Workplace mental health' },
  { value: 'Research', label: 'Research' },
  { value: 'Academics', label: 'Academics' },
  { value: 'Positivity', label: 'Positivity' },
  { value: 'Neuropsychiatry', label: 'Neuropsychiatry' },
];

export default function AddBlogPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [suggestions, setSuggestions] = useState<TagOption[]>([]);
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [resetEditor, setResetEditor] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const wordLimit = 30;
  const maxTags = 4;
  const minTags = 3; // Minimum number of tags required

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const name = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setSlug(name);
  }, [title]);

  useEffect(() => {
    const checkVerification = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }
      try {
        const userData = await getUser(session.user.email);
        if (userData?.verified) {
          setIsVerified(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      setLoading(false);
    };
    checkVerification();
  }, [session]);

  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const words = countWords(text);
    if (words <= wordLimit) {
      setSummary(text);
      setWordCount(words);
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.startsWith('#') && value.length <= 30) {
      setTagInput(value);

      // Filter suggestions based on input
      const inputText = value.slice(1).toLowerCase(); // Remove '#' for matching
      const filteredSuggestions = tagSuggestions.filter((tag) =>
        tag.value.toLowerCase().includes(inputText)
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Clear suggestions if input doesn't match
    }
  };

  const handleTagAdd = (tag: string) => {
    const normalizedTag = tag.startsWith('#') ? tag : `#${tag}`;
    const lowercasedTag = normalizedTag.toLowerCase();

    if (
      lowercasedTag &&
      !selectedTags.includes(lowercasedTag) &&
      selectedTags.length < maxTags
    ) {
      setSelectedTags((prevTags) => [...prevTags, lowercasedTag]);
    }
    setTagInput('');
    setSuggestions([]); // Clear suggestions after adding
  };

  const handleTagDelete = (tagToDelete: string) => {
    setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (tagInput) {
        handleTagAdd(tagInput.startsWith('#') ? tagInput : `#${tagInput}`);
      }
    }
  };

  const handleSuggestionClick = (tag: TagOption) => {
    handleTagAdd(`#${tag.value}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.name) {
      toast({
        title: "Error",
        description: "User is not logged in. Please sign in first.",
        variant: "destructive",
      });
      return;
    }

    if (selectedTags.length < minTags) {
      toast({
        title: "Error",
        description: `Please add at least ${minTags} hashtags.`,
        variant: "destructive",
      });
      return;
    }

    if (!imageUrl) {
      toast({
        title: "Error",
        description: "Please upload an image.",
        variant: "destructive",
      });
      return;
    }

    const userData = await getUser(session.user.email);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('slug', slug); // Append slug
    formData.append('summary', summary);
    formData.append('tags', selectedTags.join(',')); // Attach selected tags as a comma-separated string
    formData.append('content', content);
    formData.append('imageUrl', imageUrl);

    try {
      await addNewBlog(formData, userData.name, session.user.email);
      toast({
        title: "Success",
        description: "Blog published successfully.",
        variant: "success",
      });

      // Reset form
      setTitle('');
      setSummary('');
      setSelectedTags([]);
      setContent('');
      setImageUrl('');
      setResetEditor(true);
      setWordCount(0);

      router.push(`/preview/${slug}`)

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish the blog. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!isVerified) {
    return (
      <div className="flex justify-center mt-20">
        <Card className="max-w-lg text-center shadow-2xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800">Access Pending</CardTitle>
            <CardDescription className="text-gray-500">Your account verification is in progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 text-lg">
              You can access the add blog feature once the admin completes the verification process.
            </p>
            <p className="text-gray-700 text-lg">
              In the meantime, feel free to explore other features of the platform. We appreciate your patience!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full pl-0 mx-auto py-8">
      {/* Removed onKeyDown from the form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title Input */}
        <Input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="mb-4 p-2 text-2xl font-semibold border-0 rounded"
          style={{ fontSize: "2rem" }}
        />

        {/* Summary Input with word limit and counter */}
        <Textarea
          name="summary"
          value={summary}
          onChange={handleSummaryChange}
          placeholder="Synopsis"
          required
          className="mb-4 p-2 border-0 rounded"
        />
        <p className="text-right text-sm text-gray-500">
          {wordCount} / {wordLimit} words
        </p>

        {/* Image Upload */}
<div className="mb-4">
 
  <CldUploadWidget
    uploadPreset="blogthumb"
    onSuccess={({ event, info }) => {
      if (event === "success") {
        setImageUrl((info as { url: string }).url);
      }
    }}
  >
    {({ open }) => (
      <button
        type="button"
        onClick={() => open()}
        className="bg-black text-white p-2 rounded w-40 hover:bg-gray-800 transition-colors duration-300"
      >
        Upload Image
      </button>
    )}
  </CldUploadWidget>
  {imageUrl && (
    <div className="mt-2">
      <Image src={imageUrl} width={400} height={400} alt="Blog image" />
    </div>
  )}
</div>

        {/* TextEditor for content */}
        <TextEditor onContentChange={setContent} />

        {/* Custom Tag Input with Hashtag Suggestions */}
        <div className="mb-4 relative">
          <Input
            value={tagInput}
            onChange={handleTagInputChange}
            placeholder="Type # to add hashtags (max 4)"
            className="mb-2"
            onKeyDown={handleKeyDown} // Keep onKeyDown here
          />
          {/* Suggestions List */}
          {suggestions.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 shadow-md rounded-md w-full mt-1 z-10 max-h-40 overflow-y-auto">
              {suggestions.map((tag) => (
                <li
                  key={tag.value}
                  onClick={() => handleSuggestionClick(tag)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  #{tag.label}
                </li>
              ))}
            </ul>
          )}
          {/* Selected Tags */}
          <div className="flex gap-2 flex-wrap mt-2">
            {selectedTags.map((tag) => (
              <div key={tag} className="bg-blue-500 text-white p-1 rounded-md flex items-center gap-1">
                {tag}
                <button type="button" onClick={() => handleTagDelete(tag)} className="text-white hover:bg-blue-700 px-1 rounded-md">
                  &times;
                </button>
              </div>
            ))}
          </div>
          {selectedTags.length >= maxTags && (
            <p className="text-red-500 text-sm">Maximum {maxTags} tags allowed.</p>
          )}
          {selectedTags.length < minTags && (
            <p className="text-red-500 text-sm">Minimum {minTags} tags required.</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="mb-4 bg-black text-white p-2 rounded hover:bg-gray-800 transition-colors duration-300">
          Publish Blog
        </button>
      </form>
    </div>
  );
}
