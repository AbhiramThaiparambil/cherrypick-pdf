import { ArrowRight } from "lucide-react";
import PdfIcon from "/PdfIcon.svg";
import { AuthForm } from "@/components/auth/AuthForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { AuthMode, IAuthForm } from "@/types/IAuth";
import { toast } from "sonner";
import { loginUser, signupUser } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { APPROUTES } from "@/constant/routes";
import { useNavigate } from "react-router";

export default function LandingPage() {
  const [isAuth, setIsAuth] = useState<AuthMode | false>(false);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setEmail = useAuthStore((state) => state.setEmail);
  const navigate = useNavigate();
  const authHandle = async (data: IAuthForm) => {
    const { email, password } = data;

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Invalid email format");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      let res;

      if (isAuth === "login") {
        res = await loginUser(email, password);
      } else {
        res = await signupUser(email, password);
      }
      if (res.status === 200 || res.status === 201) {
        setAccessToken(res.data.accessToken);
        setEmail(res.data.email);
        navigate(APPROUTES.Home, { replace: true });
      }
      toast.success(res.data.message || "Success");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="text-foreground  relative overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] h-[30%] w-[30%] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      <main className="relative z-10">
        <section className="container mx-auto px-6 py-12 lg:pt-32 lg:pb-20">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-3">
            <div className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
                Extract PDF <br className="hidden lg:block" /> Pages with{" "}
                <span className="text-primary">Precision</span>
              </h1>
              <p className="max-w-md mx-auto lg:mx-0 text-muted-foreground text-lg leading-relaxed">
                Select, Stitch, and Download Your Perfect Document in Seconds.
              </p>
            </div>

            <div className="flex justify-center items-center h-48 lg:h-72 order-3 lg:order-2">
              <img
                src={PdfIcon}
                alt="PDF Illustration"
                className="h-full w-auto object-contain opacity-80 lg:opacity-100"
              />
            </div>

            <div className="flex flex-col gap-4 w-full max-w-sm mx-auto order-1 lg:order-3">
              {!isAuth ? (
                <Button
                  onClick={() => setIsAuth("login")}
                  size="lg"
                  className="group w-full bg-primary py-7 text-lg transition-all hover:scale-[1.02]"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              ) : (
                <div className=" p-1 rounded-xl ">
                  <AuthForm
                    mode={isAuth}
                    changeMode={() =>
                      setIsAuth((prv) => (prv === "login" ? "signup" : "login"))
                    }
                    authHandle={authHandle}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
