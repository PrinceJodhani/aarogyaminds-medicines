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
import { toast } from "../../components/ui/use-toast"; // Import the toast function
import { authenticateUser } from './actions'; // Import the server action

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(email+ password);

    // Call the server action to authenticate the user
    const isAuthenticated = await authenticateUser(email, password);
    if (isAuthenticated) {
      // Use NextAuth to sign in the user
      const result = await signIn("Aarogya Minds", {
        redirect: false,
        email,
        password,
      });

      if (result?.ok) {
        router.push("/editprofile");
      } else {
        // Handle error
        toast({
          title: "Login Failed",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    } else {
      // Invalid credentials
      toast({
        title: "Invalid Credentials",
        description: "The email or password is incorrect.",
        variant: "destructive",
      });
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
          <CardTitle className="text-2xl font-bold text-gray-800">Login</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your details below to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Password
                  </Label>
                  <Link href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-gray-300 focus:border-gray-500"
                />
              </div>
              <Button
                type="submit"
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Login
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
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
