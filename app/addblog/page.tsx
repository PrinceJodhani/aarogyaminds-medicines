"use client"

import * as React from "react"
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import QuillEditor from "@/components/QuillEditor";


export default function AddBlog(){
    const [content, setContent] = useState<string>('');

  const handleContentChange = (value: string) => {
    setContent(value);
  };

    return(
        <div>
            <Card className="w-full">
            <CardHeader>
                <CardTitle>Blog</CardTitle>
                <CardDescription>Add mindfull blog.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                <div className="grid w-full items-center gap-4">

                    {/* Blog Input & Summary */}
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">BLOG NAME</Label>
                        <Input id="name" placeholder="Enter blog name" />
                    </div>
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="message">SUMMARY</Label>
                        <Textarea placeholder="Enter Short Summary" id="message" />
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
                        <Label htmlFor="name">ENTER EMBEDDED</Label>
                        <Input id="name" placeholder="Enter Video Id" />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Tags</Label>
                    <Select>
                        <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                        <SelectItem value="next">Depression</SelectItem>
                        <SelectItem value="sveltekit">Anxiety</SelectItem>
                        <SelectItem value="astro">Psychology</SelectItem>
                        <SelectItem value="nuxt">Psychiatry</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>

                </div>
                </form>
            </CardContent>

            {/* Buttons */}
            <CardFooter className="flex justify-between">
                <Button variant="outline">Clear</Button>
                <Button>Publish</Button>
            </CardFooter>
            </Card>
        </div>
    )
}
