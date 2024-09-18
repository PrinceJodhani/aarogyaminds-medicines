"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { EditProfile } from "@/app/actions/editprofile";
import { FetchProfile } from "@/app/actions/fetchprofile";
import { useSession } from "next-auth/react";

import { CldUploadWidget } from "next-cloudinary"; 
import { toast } from "@/components/ui/use-toast"; 

import { useRouter } from "next/navigation";  


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const profileSchema = z.object({
  fullname: z.string().min(1, "Full Name is required"),
  PhoneNumber: z.string().min(10, "Phone Number is invalid").max(15, "Phone Number is invalid"),
  bio: z.string().optional(),
  insta: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  youtube: z.string().optional(),
  degreeName: z.string().optional(),
  degreeFile: z.string().optional(),
  reg_certy: z.string().optional(),
  website: z.string().optional(),
  profileImage: z.string().optional(),
  
  clinicName: z.string().optional(),
  appointmentNumber: z.string().optional(),
  city: z.string().optional(),
});

interface FormValues {
  fullname: string;
  bio: string;
  PhoneNumber:string;
  insta: string;
  facebook: string;
  twitter: string;
  youtube: string;
  degreeName: string;
  degreeFile: string;
  reg_certy: string;
  website: string;
  profileImage: string;
  clinicName?: string;
  appointmentNumber?: string;
  city?: string;
}

interface ProfileFormProps {
  username: string;
}

function ProfileForm({ username }: ProfileFormProps) {
  const router = useRouter();


  const { data: session } = useSession();
  console.log("session: ", session);
  //console.log("data: ",data );

  const { control, handleSubmit, setValue, register, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      fullname: username,
      bio: "",
      insta: "",
      facebook: "",
      twitter: "",
      youtube:"",
      degreeName: "",
      degreeFile: "",
      reg_certy: "",
      website: "",
      profileImage: "",
    },
  });

  const [isPsychiatrist, setIsPsychiatrist] = useState(false);
  const [isPsychologist, setIsPsychologist] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  const [dob, setDob] = useState<Date | null>(null);

  // Fetch and prefill profile data
  useEffect(() => {
    async function fetchAndSetProfile() {
      if (!session?.user?.email) return;

      const profile = await FetchProfile({ email: session.user.email });
      if (profile) {
        setValue("fullname", profile.name || "");
        setValue("bio", profile.bio || "");
        setValue("insta", profile.insta_url || "");
        setValue("facebook", profile.fb_url || "");
        setValue("twitter", profile.twitter_url || "");
        setValue("degreeName", profile.degree || "");
        setValue("website", profile.web_url || "");
        setProfileImagePreview(profile.profile_picture);
        setIsPsychiatrist(profile.psychiatrist || false);
        setIsPsychologist(profile.psychologist || false);
      }
    }

    fetchAndSetProfile();
  }, [session?.user?.email, setValue]);

  const handleProfileImageUpload = (result: any) => {
    setProfileImagePreview(result.info.secure_url);
    setValue("profileImage", result.info.secure_url);
  };

  const handleDegreeFileUpload = (result: any) => {
    setValue("degreeFile", result.info.secure_url);
  };

  const handleRegistrationUpload = (result: any) => {
    setValue("reg_certy", result.info.secure_url);
  
  };


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

    if (!session?.user?.email) {
      console.error("User ID not found");
      return;
    }
    // Conditional Validation for Psychiatrist fields
    if (isPsychiatrist) {
      if (!data.clinicName || !data.appointmentNumber || !data.city || !data.degreeFile || !data.reg_certy) {
        toast({
          title: "Error",
          description: "Clinic Name, Appointment Number, City, Degree File, and Registration Certificate are required for Psychiatrists.",
          variant: "destructive",
        });
        return;
      }
    }
    try {
      const profileData = {
        id: session.user.id,
        name: data.fullname,
        bio: data.bio,
        PhoneNumber:data.PhoneNumber,

        insta_url: data.insta,
        fb_url: data.facebook,
        twitter_url: data.twitter,
        youtube:data.youtube,

        web_url: data.website,
        psychiatrist: isPsychiatrist,
        psychologist: isPsychologist,
        degree: data.degreeName,
        email: session.user.email,
        profileImage: data.profileImage,
        degreeFile: data.degreeFile,
        registration: data.reg_certy,
      };
     
      console.log(profileData.profileImage);
      console.log(profileData.degreeFile);
      
      // Call the server action directly
      await EditProfile(profileData);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
        variant: "success", 
      });
        
      if (session.user.isNewUser && isPsychiatrist) {
        const response = await fetch('/api/emailrequest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profileData),
        });
        
        if (!response.ok) {
          throw new Error("Failed to send approval email.");
        }
  
        console.log("Approval email sent to admin.");
      }


    setTimeout(() => {
      router.push("/addblog");
    }, 1000);

      console.log("Profile updated successfully!");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an issue updating your profile. Please try again.",
        variant: "destructive", // Assuming your toast supports variants like destructive (for errors)
      });
    
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
              <CldUploadWidget
                uploadPreset="profile"
                onSuccess={({ event, info }) => {
                  if (event === "success") {
                    setProfileImagePreview(info?.url);
                    setValue("profileImage", info?.url);
                    console.log(JSON.stringify(info)); // For debugging, you can remove this later
                  }
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={()=>open()}
                    className="mb-4 bg-black text-white p-2 rounded w-40 hover:bg-gray-800 transition-colors duration-300"
                  >
                    Upload Profile Image
                  </button>
                )}
              </CldUploadWidget>
              {profileImagePreview && (
                <Image
                  src={profileImagePreview}
                  alt="Profile Image Preview"
                  width={120}
                  height={120}
                  className="rounded-full object-cover border-2 border-muted shadow-md"
                />
              )}
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
                  <FormMessage>{errors.fullname?.message}</FormMessage>
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
              name="PhoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone Number" {...field} />
                  </FormControl>
                  <FormMessage>{errors.PhoneNumber?.message}</FormMessage>
                </FormItem>
              )}
            />

<label htmlFor="dob" className="block text-sm font-medium text-gray-700">
        Date of Birth
      </label>
      <DatePicker
        selected={dob}
        onChange={(date) => setDob(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select your birth date"
        maxDate={new Date()}
        minDate={new Date('1980-01-01')}
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100} // Allows scrolling through 100 years
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />


        <div className="grid grid-cols-2 gap-4">
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
</div>
<div className="grid grid-cols-2 gap-4">
<FormField
            control={control}
            name="youtube"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Youtube Channel URL" {...field} />
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
</div>
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
   
   



<div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ClinicName">Clinic/Institute Name</Label>
            <Input id="ClinicName" placeholder="Clinic Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="AppointmentNumber">Appointment Number</Label>
            <Input id="AppointmentNumber" placeholder="+91 1234567890" />
          </div>
        </div>
<div className="space-y-2">
          <Label htmlFor="street">Street Address</Label>
          <Input id="street" placeholder="123 Main St" />
        </div>
        <div className="grid grid-cols-2 gap-4">

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" placeholder="Anytown" />
        </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" placeholder="State" />
          </div>
          </div>
        <div className="grid grid-cols-2 gap-4">

          <div className="space-y-2">
            <Label htmlFor="postal">Postal Code</Label>
            <Input id="postal" placeholder="123456" />
          </div>
        
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input id="country" placeholder="Country" />
        </div>
</div>
             <CldUploadWidget uploadPreset="blogthumb" onSuccess={({ event, info }) => {
                if (event === "success") {
                  setValue("degreeFile", info?.url);
                  console.log(JSON.stringify(info));
                }
              }}>
                {({ open }) => (
                  <FormItem>
                    <FormLabel>Degree File</FormLabel>
                    <FormControl>
                      <Button type="button" onClick={()=>open()}>
                        Upload Degree File
                      </Button>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              </CldUploadWidget>

              <CldUploadWidget uploadPreset="profile" onSuccess={({ event, info }) => {
                if (event === "success") {
                  setValue("reg_certy", info?.url);
                  // console.log(JSON.stringify(info?.url));
                }
              }}>
                {({ open }) => (
                  <FormItem>
                    <FormLabel>Registration Certificate</FormLabel>
                    <FormControl>
                      <Button type="button" onClick={()=>open()}>
                        Upload Registration Certificate
                      </Button>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              </CldUploadWidget>


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
            <Button onClick={handleSubmit(onSubmit)} type="submit">
            Save Changes
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
          PhoneNumber:"",
          insta: "",
          facebook: "",
          twitter: "",
          youtube:"",
          degreeName: "",
          degreeFile: "",
          reg_certy: "",
          website: "",
          profileImage: "",
        },
      })}
    >
      <ProfileForm username={username} />
    </FormProvider>
  );
}

export default Profile;