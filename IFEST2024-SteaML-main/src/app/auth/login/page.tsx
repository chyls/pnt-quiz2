"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLogin from "@/composable/Auth/mutation/useLogin";
import { toast } from "@/hooks/use-toast";
import { LoginRequestDTO } from "@/service/client/Auth/login.post";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const { data, error, mutate } = useLogin();
  const [loginRequest, setLoginRequest] = useState<LoginRequestDTO>({
    password: "",
    username: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (error && error.response) {
      console.log(error.response.data);
      toast({
        title: "Error",
        description: error.response.data.data.message.join(". "),
      });
    }
    if (data) {
      localStorage.setItem("jwt", data.data.accessToken);
      toast({
        title: "Success",
        description: "Successfully logged in to your account",
      });
      router.push("/");
    }
  }, [data, error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-gray-800 text-gray-100">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <CardTitle className="text-2xl font-bold">
            Sign in to SteaML
          </CardTitle>
          <CardDescription className="text-gray-400">
            Enter your account details below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Steam account name</Label>
            <Input
              id="username"
              placeholder="Enter your Steam account name"
              required
              className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
              onChange={(e) =>
                setLoginRequest((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
              onChange={(e) =>
                setLoginRequest((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={() => {
              mutate(loginRequest);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}