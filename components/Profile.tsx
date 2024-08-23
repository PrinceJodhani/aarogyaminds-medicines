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
}

interface ProfileFormProps {
  username: string;
}

function ProfileForm({ username }: ProfileFormProps) {
  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      fullname: username, // Set default value for firstname
      bio: "",
      insta: "",
      facebook: "",
      twitter: "",
      degreeName: "",
      degreeFile: null,
      registration: null,
      website: "",
    },
  });

  const [isPsychiatrist, setIsPsychiatrist] = useState(false);
  const [isPsychologist, setIspsychologist] = useState(false);

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Handle form submission here
  };

  return (
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
            />
          </div>

          {isPsychiatrist && (
            <>
              <FormField
                control={control}
                name="degreeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-gray-700">
                      Qualification
                    </FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500">
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
                        className="focus:ring-2 focus:ring-blue-500"
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
                        className="focus:ring-2 focus:ring-blue-500"
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
        },
      })}
    >
      <ProfileForm username={username} />
    </FormProvider>
  );
}
