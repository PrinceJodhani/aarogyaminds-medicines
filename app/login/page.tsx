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
import { toast } from "../../components/ui/use-toast";
import { Vortex } from "@/components/ui/vortex";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Use NextAuth to sign in the user
    const result = await signIn("credentials", {
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
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full mx-auto h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={100}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full bg-cover bg-center]"
      >
        <div className="flex items-center justify-center h-screen">
          <Card className="mx-auto max-w-sm py-0 px-6 shadow-xl backdrop-blur-md bg-white/15">
            <CardHeader className="text-center">
              <Image
                src="/apple-touch-icon.png"
                width={50}
                height={50}
                alt="logo"
                className="mx-auto mb-2"
              />
              <CardTitle className="text-2xl font-bold text-white">
                Login
              </CardTitle>
              <CardDescription className="text-gray-200">
                Enter your details below to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="email"
                      className="text-white font-medium"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-gray-300 focus:border-gray-500 text-gray-900"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="password"
                        className="text-white font-medium"
                      >
                        Password
                      </Label>
                      <Link
                        href="#"
                        className="text-sm text-blue-300 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-gray-300 focus:border-gray-500 text-gray-900"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Login
                  </Button>

                  <div className="flex items-center my-2">
                    <div className="w-full h-px bg-gray-400"></div>
                    <span className="px-2 text-sm text-gray-200">or</span>
                    <div className="w-full h-px bg-gray-400"></div>
                  </div>

                  <button
                    className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md text-white transition hover:bg-gray-100 hover:text-gray-900"
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
                <div className="mt-4 text-center text-sm text-gray-200">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-blue-300 hover:underline">
                    Sign up
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Vortex>
    </div>
  );
}
