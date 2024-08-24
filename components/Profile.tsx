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
<<<<<<< HEAD
  
      fullname: username,
=======
      fullname: username, // Set default value for firstname
>>>>>>> 44504e02b57c9bf3fe649178f273c4fe4814e3af
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
<<<<<<< HEAD
  const [isPsychologist, setIsPsychologist] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
=======
  const [isPsychologist, setIspsychologist] = useState(false);
>>>>>>> 44504e02b57c9bf3fe649178f273c4fe4814e3af

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
<<<<<<< HEAD
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
=======
    <Card className="w-full max-w-xl mx-auto shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-blue-500 text-white">
        <CardTitle className="text-center text-3xl font-semibold">
          Profile Information
        </CardTitle>
        <CardDescription className="text-center text-base mt-1  text-white">
          Update your profile details
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-gray-700">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500"
                    placeholder="Full Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
>>>>>>> 44504e02b57c9bf3fe649178f273c4fe4814e3af
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-gray-700">
                  Bio
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief bio"
                    {...field}
                  />
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
                <FormLabel className="text-lg font-medium text-gray-700">
                  Instagram
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500"
                    placeholder="Instagram URL"
                    {...field}
                  />
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
                <FormLabel className="text-lg font-medium text-gray-700">
                  Facebook
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500"
                    placeholder="Facebook URL"
                    {...field}
                  />
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
                <FormLabel className="text-lg font-medium text-gray-700">
                  Twitter
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500"
                    placeholder="Twitter URL"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between space-x-4 p-4 rounded-md border bg-gray-50">
            <div className="flex-1 space-y-1">
              <p className="text-lg font-semibold leading-none text-gray-700">
                Are you a Psychiatrist?
              </p>
              <p className="text-sm text-gray-500">Sign Up as a Psychiatrist</p>
            </div>
            <Switch
              checked={isPsychiatrist}
<<<<<<< HEAD
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
=======
              onCheckedChange={setIsPsychiatrist}
              className="focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between space-x-4 p-4 rounded-md border bg-gray-50">
            <div className="flex-1 space-y-1">
              <p className="text-lg font-semibold leading-none text-gray-700">
                Are you a Psychologist?
              </p>
              <p className="text-sm text-gray-500">Sign Up as a Psychologist</p>
            </div>
            <Switch
              checked={isPsychologist}
              onCheckedChange={setIspsychologist}
              className="focus:ring-2 focus:ring-blue-500"
>>>>>>> 44504e02b57c9bf3fe649178f273c4fe4814e3af
            />
          </div>

          {isPsychiatrist && (
            <>
              <FormField
                control={control}
                name="degreeName"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-gray-700">
                      Qualification
                    </FormLabel>
                    <FormControl>
<<<<<<< HEAD
                      <Select>
                        <SelectTrigger className="w-full">
=======
                      <Select {...field}>
                        <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500">
>>>>>>> 44504e02b57c9bf3fe649178f273c4fe4814e3af
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
                    <FormLabel className="text-lg font-medium text-gray-700">
                      Degree File
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="degreeFile"
                        type="file"
                        {...register("degreeFile")}
<<<<<<< HEAD
=======
                        className="focus:ring-2 focus:ring-blue-500"
>>>>>>> 44504e02b57c9bf3fe649178f273c4fe4814e3af
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
                    <FormLabel className="text-lg font-medium text-gray-700">
                      Registration Certificate
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="registration"
                        type="file"
                        {...register("registration")}
<<<<<<< HEAD
=======
                        className="focus:ring-2 focus:ring-blue-500"
>>>>>>> 44504e02b57c9bf3fe649178f273c4fe4814e3af
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
                    <FormLabel className="text-lg font-medium text-gray-700">
                      Website URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border-gray-300 focus:ring-2 focus:ring-blue-500"
                        placeholder="Website URL"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

<<<<<<< HEAD
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
=======
{isPsychologist && (
            <>
              <FormField
                control={control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-gray-700">
                      Website URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border-gray-300 focus:ring-2 focus:ring-blue-500"
                        placeholder="Website URL"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <CardFooter className="flex justify-between pt-6">
            <Button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-all"
            >
              Update Profile
            </Button>
>>>>>>> 44504e02b57c9bf3fe649178f273c4fe4814e3af
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
<<<<<<< HEAD
          profileImage: null,
=======
>>>>>>> 44504e02b57c9bf3fe649178f273c4fe4814e3af
        },
      })}
    >
      <ProfileForm username={username} />
    </FormProvider>
  );
}
