'use client';
import { useEffect, useState } from 'react';
import TextEditor from '@/components/TextEditor';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { addNewBlog, getUser } from './actions';
import { useSession } from "next-auth/react";
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function AddBlogPage() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState(''); // State for the blog content (HTML)
  const [resetEditor, setResetEditor] = useState(false); // State to reset editor
  const [isVerified, setIsVerified] = useState(false); // State to track verification status
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const checkVerification = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getUser(session.user.email);

        // Check if the user is verified
        if (userData?.verified) {
          setIsVerified(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }

      setLoading(false); // Stop loading after check
    };

    checkVerification();
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.name) {
      alert("User is not logged in. Please sign in first.");
      return;
    }

    const userData = await getUser(session.user.email);
    console.log("userData: ", userData);

    // Form data is collected here
    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('tags', tags);
    formData.append('content', content); // Attach content from the state

    // Call the server action to save the blog
    await addNewBlog(formData, userData.name, session.user.email);

    // Clear inputs after successful submission
    setTitle('');
    setSummary('');
    setTags('');
    setContent(''); // Clear content state
    setResetEditor(true); // Trigger content reset in the TextEditor

    // Refresh the page to reset the form
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
              You can access add blog feature once the admin completes the verification process.
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
          placeholder="Blog Title"
          required
          className="mb-4 p-2 text-2xl font-semibold border-0 rounded"
          style={{ fontSize: "2rem" }}
        />

        {/* Summary Input */}
        <Textarea
          name="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Short Synopsis"
          required
          className="mb-4 p-2 border-0 rounded"
        />

        {/* TextEditor for content */}
        <TextEditor onContentChange={setContent} />

        {/* Tags Input */}
        <Input
          name="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter Tags (comma-separated)"
          className="mb-4 p-2 border-0 rounded"
        />

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Publish Blog
        </button>
      </form>
    </div>
  );
}


//////////////////