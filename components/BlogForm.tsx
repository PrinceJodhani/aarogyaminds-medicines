'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import QuillEditor from "@/components/QuillEditor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BlogForm() {
  const [content, setContent] = React.useState('');

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Blog</CardTitle>
        <CardDescription>Add a mindful blog.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            {/* Blog Input & Summary */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">BLOG NAME</Label>
              <Input id="name" placeholder="Enter blog name" required />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="summary">SUMMARY</Label>
              <Textarea id="summary" placeholder="Enter short summary" required />
            </div>

            {/* Image */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">IMAGE UPLOAD</Label>
              <Input id="picture" type="file" />
              <CardDescription>You can upload .jpg, .png, .jpeg, svg</CardDescription>
            </div>

            {/* QuillEditor */}
            <Label htmlFor="content">Write a Blog</Label>
            <QuillEditor value={content} onChange={handleContentChange} />
            <CardDescription>You can use letters, numbers & periods</CardDescription>

            {/* Video */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="video">ENTER EMBEDDED VIDEO</Label>
              <Input id="video" placeholder="Enter Video ID" />
            </div>

            {/* Tags */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tags">Tags</Label>
              <Select>
                <SelectTrigger id="tags">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="depression">Depression</SelectItem>
                  <SelectItem value="anxiety">Anxiety</SelectItem>
                  <SelectItem value="psychology">Psychology</SelectItem>
                  <SelectItem value="psychiatry">Psychiatry</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" type="reset">Clear</Button>
        <Button type="submit">Publish</Button>
      </CardFooter>
    </Card>
  );
}
