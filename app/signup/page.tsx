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

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(""); // Store OTP temporarily
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!otpSent) {
      // Trigger OTP generation and sending
      const response = await fetch("/api/generate-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      const result = await response.json();
  
      if (response.ok && result.otp) {
        setGeneratedOtp(result.otp); // Store generated OTP
        setOtpSent(true);
        alert("OTP sent to your email.");
      } else {
        alert("Signup failed, please try again.");
      }
    } else {
      // Validate OTP and complete signup
      if (generatedOtp === otp) {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
          isNewUser:true,
        });
  
        console.log("Sign-in result:", result); // Add this line for debugging
  
        if (result?.ok) {
          if (result?.isNewUser) {
            router.push("/editprofile");
          } else {
            router.push("/"); // Redirect to home or other page if not a new user
          }
        } else {
          alert("Signup failed, please try again.");
        }
      } else {
        alert("Invalid OTP, please try again.");
      }
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your details below to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {otpSent && (
              <div className="grid gap-2">
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}
            <Button type="submit" className="w-full">
              {otpSent ? "Verify OTP" : "Sign Up"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
