"use client";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
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

interface FormValues {
  prefix: string;
  firstname: string;
  lastname: string;
  bio: string;
  insta: string;
  facebook: string;
  twitter: string;
  degreeName: string;
  degreeFile: FileList | null; // Adjust type if needed
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
      website: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Handle form submission here
  };

  return (
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
              <FormDescription>Choose a prefix for your name.</FormDescription>
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
              <FormDescription>Enter your first name.</FormDescription>
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
            <FormDescription>Enter your last name.</FormDescription>
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
            <FormDescription>Write a brief description about yourself.</FormDescription>
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
      <FormField
        control={control}
        name="degreeName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree Name</FormLabel>
            <FormControl>
              <Input placeholder="Degree Name" {...field} />
            </FormControl>
            <FormDescription>Enter the name of your degree.</FormDescription>
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
              <Input id="degreeFile" type="file" {...register('degreeFile')} />
            </FormControl>
            <FormDescription>Upload a copy of your degree.</FormDescription>
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
            <FormDescription>Enter your personal or professional website URL.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Update</Button>
    </form>
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
      website: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <ProfileForm />
    </FormProvider>
  );
}
