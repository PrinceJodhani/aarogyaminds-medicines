'use client';

import { useEffect, useState } from 'react';
import TextEditor from '@/components/TextEditor';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { addNewBlog, getUser } from './actions';
import { useSession } from "next-auth/react";
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Select from 'react-select';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

interface TagOption {
  value: string;
  label: string;
}

const tagOptions: TagOption[] = [
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
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [resetEditor, setResetEditor] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const wordLimit = 30;

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


  const countWords = (text:any) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

 // Handle summary input and word limit enforcement
 const handleSummaryChange = (e:any) => {
  const text = e.target.value;
  const words = countWords(text);

  if (words <= wordLimit) {
    setSummary(text);
    setWordCount(words);
  }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.name) {
      alert("User is not logged in. Please sign in first.");
      return;
    }

    const userData = await getUser(session.user.email);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('slug', slug); // Append slug
    formData.append('summary', summary);
    formData.append('tags', selectedTags.map(tag => tag.value).join(',')); // Attach selected tags as a comma-separated string
    formData.append('content', content);
    formData.append('imageUrl', imageUrl);

    await addNewBlog(formData, userData.name, session.user.email);

    setTitle('');
    setSummary('');
    setSelectedTags([]);
    setContent('');
    setImageUrl('');
    setResetEditor(true);

    window.location.reload();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
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
    <div className="container mx-auto py-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" onKeyDown={handleKeyDown}>
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
        <CldUploadWidget
          uploadPreset="blogthumb"
          onSuccess={({ event, info }) => {
            if (event === "success") {
              setImageUrl(info?.url);
              console.log(JSON.stringify(info));
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

        {/* TextEditor for content */}
        <TextEditor onContentChange={setContent} />

        {/* Tags Multi-Select */}
        <Select
          isMulti
          options={tagOptions}
          value={selectedTags}
          onChange={setSelectedTags}
          placeholder="Select tags"
          className="mb-4"
        />

        {/* Submit Button */}
        <button type="submit" className="mb-4 bg-black text-white p-2 rounded hover:bg-gray-800 transition-colors duration-300">
          Publish Blog
        </button>
      </form>
    </div>
  );
}
