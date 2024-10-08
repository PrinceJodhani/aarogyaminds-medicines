"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { checkEmailExists } from "./actions";
import { toast } from "@/components/ui/use-toast";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(""); // Store OTP temporarily
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();


  // Check if email already exists using server action
  const emailExists = await checkEmailExists(email);

  if (emailExists) {
    console.log("email exist")
    alert("Email is already exist")
    toast({
      title: "Error",
      description: "Email is already exist",
      variant: "destructive",
    });
    return;
  }

    if (!otpSent) {
      const response = await fetch("/api/generate-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok && result.otp) {
        setGeneratedOtp(result.otp);
        setOtpSent(true);
        alert("OTP sent to your email.");
      } else {
        alert("Signup failed, please try again.");
      }
    } else {
      if (generatedOtp === otp) {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
          signup: "true",
        });

        if (result?.ok) {
          router.push("/editprofile");
        } else {
          alert("Signup failed, please try again.");
        }
      } else {
        alert("Invalid OTP, please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="mx-auto max-w-sm py-0 px-6 shadow-xl">
        <CardHeader className="text-center">
          <Image
            src="/apple-touch-icon.png"
            width={50}
            height={50}
            alt="logo"
            className="mx-auto mb-2"
          />
          <CardTitle className="text-2xl font-bold text-gray-800">Sign Up</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your details below to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-300 focus:border-gray-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-gray-300 focus:border-gray-500"
                />
              </div>
              {otpSent && (
                <div className="grid gap-2">
                  <Label htmlFor="otp" className="text-gray-700 font-medium">
                    OTP
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="border-gray-300 focus:border-gray-500"
                  />
                </div>
              )}
              <Button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white">
                {otpSent ? "Verify OTP" : "Sign Up"}
              </Button>

              <div className="flex items-center my-2">
                <div className="w-full h-px bg-gray-300"></div>
                <span className="px-2 text-sm text-gray-500">or</span>
                <div className="w-full h-px bg-gray-300"></div>
              </div>

              <button
                className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md text-gray-600 transition hover:bg-gray-100"
                type="button"
                onClick={() => signIn("google")}
              >
                <Image
                  src="https://docs.material-tailwind.com/icons/google.svg"
                  alt="Google Icon"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Continue with Google
              </button>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
