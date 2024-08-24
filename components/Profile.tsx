"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { EditProfile } from "@/app/actions/editprofile";
import { useSession } from "next-auth/react";




interface FormValues {
  fullname: string;
  bio: string;
  insta: string;
  facebook: string;
  twitter: string;
  degreeName: string;
  degreeFile: FileList | null;
  registration: FileList | null;
  website: string;
  profileImage: FileList | null;
}

interface ProfileFormProps {
  username: string;
}

function ProfileForm({ username }: ProfileFormProps) {
  const { data: session } = useSession(); 

  const { control, handleSubmit, register } = useForm<FormValues>({

    defaultValues: {
  
      fullname: username,
      bio: "",
      insta: "",
      facebook: "",
      twitter: "",
      degreeName: "",
      degreeFile: null,
      registration: null,
      website: "",
      profileImage: null,
    },
  });

  const [isPsychiatrist, setIsPsychiatrist] = useState(false);
  const [isPsychologist, setIsPsychologist] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  const onProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const onSubmit = async (data: FormValues) => {
    if (!session?.user?.id) {
      console.error("User ID not found");
      return;
    }
    
    try {
      const profileData = {
        id: session.user.id, 
        name: data.fullname,
        bio: data.bio,
        insta_url: data.insta,
        fb_url: data.facebook,
        twitter_url: data.twitter,
        web_url: data.website,
        psychiatrist: isPsychiatrist,
        psychologist: isPsychologist,
        degree: data.degreeName,
      };

      // Call the server action directly
      await EditProfile(profileData);

      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("An error occurred while updating the profile:", error);
    }
  };

  const handlePsychiatristChange = (checked: boolean) => {
    setIsPsychiatrist(checked);
    if (checked) {
      setIsPsychologist(false);
    }
  };

  const handlePsychologistChange = (checked: boolean) => {
    setIsPsychologist(checked);
    if (checked) {
      setIsPsychiatrist(false);
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Profile Information
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Quickly fill in your details, and good to go!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="gap-4">
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {profileImagePreview ? (
                <Image
                  src={profileImagePreview}
                  alt="Profile Image Preview"
                  width={120}
                  height={120}
                  className="rounded-full object-cover border-2 border-muted shadow-md"
                />
              ) : (
                <div className="h-28 w-28 rounded-full border-2 border-dashed border-muted flex items-center justify-center text-muted-foreground">
                  <span>Upload</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                onChange={onProfileImageChange}
              />
            </div>
          </div>

            <FormField
              control={control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Brief bio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="insta"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Instagram URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="facebook"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Facebook URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="twitter"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Twitter URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between space-x-4 rounded-md border p-4 bg-muted">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Are you a Psychiatrist?
              </p>
              <p className="text-sm text-muted-foreground">
                Sign Up as a Psychiatrist
              </p>
            </div>
            <Switch
              checked={isPsychiatrist}
              onCheckedChange={handlePsychiatristChange}
            />
          </div>
          <div className="flex items-center justify-between space-x-4 rounded-md border p-4 bg-muted">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Are you a Psychologist?
              </p>
              <p className="text-sm text-muted-foreground">
                Sign Up as a Psychologist
              </p>
            </div>
            <Switch
              checked={isPsychologist}
              onCheckedChange={handlePsychologistChange}
            />
          </div>

          {isPsychiatrist && (
            <>
              <FormField
                control={control}
                name="degreeName"
                render={() => (
                  <FormItem>
                    <FormLabel>Qualification</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Qualification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>
                              Select Your Highest Qualification
                            </SelectLabel>
                            <SelectItem value="D.M.">D.M.</SelectItem>
                            <SelectItem value="D.P.M.">D.P.M.</SelectItem>
                            <SelectItem value="M.D.">M.D.</SelectItem>
                            <SelectItem value="D.N.B.">D.N.B.</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="degreeFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree File</FormLabel>
                    <FormControl>
                      <Input
                        id="degreeFile"
                        type="file"
                        {...register("degreeFile")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="registration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Certificate</FormLabel>
                    <FormControl>
                      <Input
                        id="registration"
                        type="file"
                        {...register("registration")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Website URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {isPsychologist && (
            <FormField
              control={control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Website URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <CardFooter className="flex justify-between pt-4">
            <Button onClick={handleSubmit(onSubmit)} type="submit">Update</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

export function Profile({ username }: { username: string }) {
  return (
    <FormProvider
      {...useForm<FormValues>({
        defaultValues: {
          fullname: username,
          bio: "",
          insta: "",
          facebook: "",
          twitter: "",
          degreeName: "",
          degreeFile: null,
          registration: null,
          website: "",
          profileImage: null,
        },
      })}
    >
      <ProfileForm username={username} />
    </FormProvider>
  );
}
