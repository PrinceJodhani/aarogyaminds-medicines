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
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface FormValues {
  prefix: string;
  firstname: string;
  lastname: string;
  bio: string;
  insta: string;
  facebook: string;
  twitter: string;
  degreeName: string;
  degreeFile: FileList | null;
  registration: FileList | null;
  website: string;
}

function ProfileForm() {
  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      prefix: "",
      firstname: "",
      lastname: "",
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

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your profile details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex space-x-4">
            <FormField
              control={control}
              name="prefix"
              render={({ field }) => (
                <FormItem className="w-1/3">
                  <FormLabel>Prefix</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a prefix" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>For Doctors</SelectLabel>
                          <SelectItem value="Dr.">Dr.</SelectItem>
                          <SelectItem value="Psychiatrist">Psychiatrist</SelectItem>
                          <SelectItem value="Psychologist">Psychologist</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>General</SelectLabel>
                          <SelectItem value="Mr.">Mr.</SelectItem>
                          <SelectItem value="Mrs.">Mrs.</SelectItem>
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
              name="firstname"
              render={({ field }) => (
                <FormItem className="w-2/3">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
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
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Brief bio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Are you a Psychiatrist?
              </p>
              <p className="text-sm text-muted-foreground">
                Sign Up as a Psychiatrist?
              </p>
            </div>
            <Switch checked={isPsychiatrist} onCheckedChange={setIsPsychiatrist} />
          </div>

          {isPsychiatrist && (
            <>
              <FormField
                control={control}
                name="degreeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qualification</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Qualification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select Your Highest Qualification</SelectLabel>
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
                      <Input id="degreeFile" type="file" {...register("degreeFile")} />
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
                      <Input id="registration" type="file" {...register("registration")} />
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

          <Button type="submit">Update</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function Profile() {
  const methods = useForm<FormValues>({
    defaultValues: {
      prefix: "",
      firstname: "",
      lastname: "",
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

  return (
    <FormProvider {...methods}>
      <ProfileForm />
    </FormProvider>
  );
}
