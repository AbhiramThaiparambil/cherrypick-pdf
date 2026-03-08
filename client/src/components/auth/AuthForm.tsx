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
import type { IAuthForm } from "@/types/IAuth";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface AuthFormProps {
  mode: "login" | "signup";
  changeMode: () => void;
  authHandle: (data: IAuthForm) => void;
}

export function AuthForm({ mode, changeMode, authHandle }: AuthFormProps) {
  const isLogin = mode === "login";
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<IAuthForm>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card className="w-100 border-border bg-card text-card-foreground">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">
          {isLogin ? "Login to your account" : "Create an account"}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {isLogin
            ? "Enter your email below to login to your account"
            : "Enter your email below to create your account"}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* <div className="grid">
          <Button
            variant="outline"
            className="border-input bg-background hover:bg-accent hover:text-accent-foreground"
          >
            <Chrome className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div> */}

        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div> */}

        <div className="grid gap-2">
          <Label htmlFor="email" className="text-foreground">
            Email
          </Label>
          <Input
            onChange={handleChange}
            name="email"
            id="email"
            type="email"
            placeholder="your@gmail.com"
            className="border-input bg-background text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-foreground">
            Password
          </Label>
          <div className="relative">
          <Input
            onChange={handleChange}
            name="password"
            id="password"
              type={showPassword ? "text" : "password"}
              className="border-input bg-background text-foreground pr-10"
          />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => authHandle(formData)}
        >
          {isLogin ? "Login" : "Create Account"}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            className="underline underline-offset-4 text-foreground hover:text-primary cursor-pointer transition-colors"
            onClick={changeMode}
          >
            {isLogin ? "Sign up" : "Log in"}
          </span>
        </p>
      </CardFooter>
    </Card>
  );
}
