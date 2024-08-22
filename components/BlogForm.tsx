"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import QuillEditor from "@/components/QuillEditor";
import TagsInput from "@/components/TagsInput";
import { addNewBlog } from "@/app/(dashboad)/addblog/page";
import { useToast } from "@/components/ui/use-toast";

interface BlogFormProps {
  author: string;
}

export default function BlogForm({ author }: BlogFormProps) {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    formData.append("content", content);
    formData.append("tags", tags.join(","));
    formData.append("author", author);

    try {
      await addNewBlog(formData);
      formRef.current.reset();
      toast({
        title: "Success",
        description: "Blog published successfully!",
        variant: "success" // Use the success variant
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish blog.",
        variant: "destructive" // Use the destructive variant for errors
      });
      console.error("Error publishing blog:", error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Blog</CardTitle>
        <CardDescription>Add a mindful blog.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">BLOG NAME</Label>
              <Input id="title" name="title" placeholder="Enter blog name" required />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="summary">SUMMARY</Label>
              <Textarea id="summary" name="summary" placeholder="Enter short summary" required />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">IMAGE UPLOAD</Label>
              <Input id="picture" name="picture" type="file" />
              <CardDescription>You can upload .jpg, .png, .jpeg, svg</CardDescription>
            </div>
            <Label htmlFor="content">Write a Blog</Label>
            <QuillEditor value={content} onChange={setContent} />
            <CardDescription>You can use letters, numbers & periods</CardDescription>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="videoUrl">ENTER EMBEDDED VIDEO</Label>
              <Input id="videoUrl" name="videoUrl" placeholder="Enter Video ID" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tags">Tags</Label>
              <TagsInput tags={tags} setTags={setTags} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" type="reset">Clear</Button>
        <Button type="submit" onClick={handleSubmit}>Publish</Button>
      </CardFooter>
    </Card>
  );
}
