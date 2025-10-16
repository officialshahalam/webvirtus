"use client";
import { ReactNode, useState } from "react";
import React from "react";
import Image from "next/image";
import { Ripple } from "@/shared/custom-components/Ripple";
import { TechOrbitDisplay } from "@/shared/custom-components/TechOrbitDisplay";
import GoogleButton from "@/shared/custom-components/GoogleButton";
import { useUserStore } from "@/stores/userStore";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useProjectStore } from "@/stores/projectStore";
import { useRequirementStore } from "@/stores/useRequirementStore";
import { usedummyProjectStore } from "@/stores/dummyProjectStore";

interface OrbitIcon {
  component: () => ReactNode;
  className: string;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  reverse?: boolean;
}

const iconsArray: OrbitIcon[] = [
  {
    component: () => (
      <Image
        width={100}
        height={100}
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"
        alt="HTML5"
      />
    ),
    className: "size-[30px] border-none bg-transparent",
    duration: 20,
    delay: 20,
    radius: 100,
    path: false,
    reverse: false,
  },
  {
    component: () => (
      <Image
        width={100}
        height={100}
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"
        alt="CSS3"
      />
    ),
    className: "size-[30px] border-none bg-transparent",
    duration: 20,
    delay: 10,
    radius: 100,
    path: false,
    reverse: false,
  },
  {
    component: () => (
      <Image
        width={100}
        height={100}
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
        alt="TypeScript"
      />
    ),
    className: "size-[50px] border-none bg-transparent",
    radius: 210,
    duration: 20,
    path: false,
    reverse: false,
  },
  {
    component: () => (
      <Image
        width={100}
        height={100}
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
        alt="JavaScript"
      />
    ),
    className: "size-[50px] border-none bg-transparent",
    radius: 210,
    duration: 20,
    delay: 20,
    path: false,
    reverse: false,
  },
  {
    component: () => (
      <Image
        width={100}
        height={100}
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
        alt="TailwindCSS"
      />
    ),
    className: "size-[30px] border-none bg-transparent",
    duration: 20,
    delay: 20,
    radius: 150,
    path: false,
    reverse: true,
  },
  {
    component: () => (
      <Image
        width={100}
        height={100}
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
        alt="Nextjs"
      />
    ),
    className: "size-[30px] border-none bg-transparent",
    duration: 20,
    delay: 10,
    radius: 150,
    path: false,
    reverse: true,
  },
  {
    component: () => (
      <Image
        width={100}
        height={100}
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
        alt="React"
      />
    ),
    className: "size-[50px] border-none bg-transparent",
    radius: 270,
    duration: 20,
    path: false,
    reverse: true,
  },
  {
    component: () => (
      <Image
        width={100}
        height={100}
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"
        alt="Figma"
      />
    ),
    className: "size-[50px] border-none bg-transparent",
    radius: 270,
    duration: 20,
    delay: 60,
    path: false,
    reverse: true,
  },
  {
    component: () => (
      <Image
        width={100}
        height={100}
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
        alt="Git"
      />
    ),
    className: "size-[50px] border-none bg-transparent",
    radius: 320,
    duration: 20,
    delay: 20,
    path: false,
    reverse: false,
  },
];

type FormData = {
  email: string;
  password: string;
};

const Page = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [rememberMe, setRemeberMe] = useState(false);
  const router = useRouter();
  const { setUser } = useUserStore();
  const { setProject } = useProjectStore();
  const { clearRequirement } = useRequirementStore();
  const { clearDummyProject } = usedummyProjectStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const loginMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axiosInstance.post("/auth/login-user", data);
      return response.data;
    },
    onSuccess: async (data) => {
      setUser(data.user);
      setProject(data.user.projects[0]);
      clearRequirement();
      clearDummyProject(); 
      setServerError(null);
      router.push("/dashboard");
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "Invalid Credentioals";
      setServerError(errorMessage);
    },
  });

  const onSubmit = (data: FormData) => {
    loginMutation.mutate(data);
  };
  return (
    <section className="flex max-lg:justify-center">
      {/* Left Side */}
      <div className="flex flex-col justify-center w-1/2 max-md:hidden">
        <Ripple mainCircleSize={100} />
        <TechOrbitDisplay iconsArray={iconsArray} />
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 h-[100dvh] flex flex-col justify-center items-center">
        <div className="w-full h-full pt-40  bg-blue-300">
          <div className="w-full flex justify-center mt-3">
            <div className="w-10/12 md:w-[480px] p-8 bg-white/5 backdrop-blur-3xl shadow rounded-lg">
              <h3 className="text-xl sm:text-2xl md:text-3xl text-blue-50 font-semibold text-center">
                Login to Growlance
              </h3>
              <p className="text-center text-blue-200 mb-2 md:mb-4">
                Don&apos;t have an account?{" "}
                <Link href={"/signup"} className="text-blue-600">
                  Signup
                </Link>
              </p>
              <GoogleButton />
              <div className="flex items-center my-2 md:my-5 text-blue-200 text-sm">
                <div className="flex-1 border-t border-blue-200" />
                <span className="px-3">or Sign In with email</span>
                <div className="flex-1 border-t border-blue-200" />
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className="block text-blue-50 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="help658523@gmail.com"
                  className="w-full p-2 border focus:border-blue-200 outline-0  !rounded-md mb-1 placeholder:italic"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {String(errors.email.message)}
                  </p>
                )}
                <label className="block text-blue-50 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Min . 6 characters"
                    className="w-full p-2 border focus:border-blue-200 outline-0  !rounded-md mb-1 placeholder:italic"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 Characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                  >
                    {passwordVisible ? <Eye /> : <EyeOff />}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {String(errors.password.message)}
                    </p>
                  )}
                </div>
                <div className="flex justify-between items-center my-4">
                  <label className="block text-gray-700 mb-1">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={rememberMe}
                      onChange={() => setRemeberMe(!rememberMe)}
                    />
                    Remember Me
                  </label>
                  <Link
                    href={"/forgot-password"}
                    className="text-blue-600 text-sm"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-lg mt-4 cursor-pointer bg-blue-100 text-white py-2 rounded-lg"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Signing up ..." : "Signup"}
                </button>
                {serverError && (
                  <p className="text-red-500 text-sm mt-2">{serverError}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
