"use client";
import { ReactNode } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Ripple } from "@/shared/custom-components/Ripple";
import { TechOrbitDisplay } from "@/shared/custom-components/TechOrbitDisplay";
import GoogleButton from "@/shared/custom-components/GoogleButton";

type FormData = {
  name: string;
  email: string;
  password: string;
};

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

const Page = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [timer, setTimer] = useState(60);
  const [serverError, setServerError] = useState<string | null>(null);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [userData, setUserData] = useState<FormData | null>(null);
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const startResendTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOTPChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < inputRef.current.length - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleOTPKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const signupMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axiosInstance.post(
        "/auth/api/registration-user",
        data
      );
      return response.data;
    },
    onSuccess: (_, formData) => {
      setUserData(formData);
      setShowOtp(true);
      setServerError(null);
      setCanResend(false);
      setTimer(60);
      startResendTimer();
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "Invalid Data";
      setServerError(errorMessage);
    },
  });

  const onSubmit = async (data: FormData) => {
    signupMutation.mutate(data);
  };

  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      if (!userData) {
        return;
      }
      const response = await axiosInstance.post("/auth/api/verify-user", {
        ...userData,
        otp: otp.join(""),
      });
      return response.data;
    },
    onSuccess: () => {
      setServerError(null);
      router.push("/login");
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "Invalid Data";
      setServerError(errorMessage);
    },
  });

  const resendOTP = () => {
    if (userData) {
      signupMutation.mutate(userData);
    }
  };

  return (
    <section className="flex max-lg:justify-center">
      {/* Left Side */}
      <span className="flex flex-col justify-center w-1/2 max-md:hidden">
        <Ripple mainCircleSize={100} />
        <TechOrbitDisplay iconsArray={iconsArray} />
      </span>

      {/* Right Side */}
      <span className="w-full md:w-1/2 h-[100dvh] flex flex-col justify-center items-center">
        <div className="w-full h-full pt-40  bg-blue-300">
          <div className="w-full flex justify-center mt-3">
            <div className="w-10/12 md:w-[480px] p-8 bg-white/5 backdrop-blur-3xl shadow rounded-lg">
              <h3 className="text-xl sm:text-2xl md:text-3xl text-blue-50 font-semibold text-center">
                Signup to Growlance
              </h3>
              <p className="text-center text-blue-200 mb-2 md:mb-4">
                Already have an account?{" "}
                <Link href={"/login"} className="text-blue-600">
                  Login
                </Link>
              </p>
              <GoogleButton />
              <div className="flex items-center my-2 md:my-5 text-blue-200 text-sm">
                <div className="flex-1 border-t border-blue-200" />
                <span className="px-3">or Sign In with email</span>
                <div className="flex-1 border-t border-blue-200" />
              </div>
              {!showOtp ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label className="block text-blue-50 mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Mohd shahalam"
                    className="w-full p-2 border focus:border-blue-200 outline-0  !rounded-md mb-1 placeholder:italic"
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {String(errors.email.message)}
                    </p>
                  )}
                  <label className="block text-blue-50 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="help658523@gmail.com"
                    className="w-full p-2 border focus:border-blue-200 outline-0  !rounded-md mb-1 placeholder:italic"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
                  <button
                    type="submit"
                    className="w-full text-lg mt-4 cursor-pointer bg-blue-100 text-white py-2 rounded-lg"
                    disabled={signupMutation.isPending}
                  >
                    {signupMutation.isPending ? "Signing up ..." : "Signup"}
                  </button>
                  {serverError && (
                    <p className="text-red-500 text-sm mt-2">{serverError}</p>
                  )}
                </form>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold text-center mb-4">
                    Enter OTP
                  </h3>
                  <div className="flex justify-center gap-6">
                    {otp?.map((digit, index) => (
                      <input
                        type="text"
                        key={index}
                        ref={(el) => {
                          if (el) inputRef.current[index] = el;
                        }}
                        maxLength={1}
                        className="w-12 h-12 text-center border focus:border-blue-200 outline-none !rounded-md"
                        value={digit}
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        onKeyDown={(e) => handleOTPKeyDown(index, e)}
                      />
                    ))}
                  </div>
                  <button
                    className="w-full mt-4 text-lg cursor-pointer  bg-blue-100 text-white py-2 rounded-lg"
                    disabled={verifyOtpMutation.isPending}
                    onClick={() => verifyOtpMutation.mutate()}
                  >
                    {verifyOtpMutation.isPending
                      ? "Verifying..."
                      : "Verify OTP"}
                  </button>
                  <p className="text-center text-sm mt-4">
                    {canResend ? (
                      <button
                        onClick={resendOTP}
                        className="text-blue-600 cursor-pointer"
                      >
                        Resend OTP
                      </button>
                    ) : (
                      `Resent OTP in ${timer}s`
                    )}
                  </p>
                  {serverError && (
                    <p className="text-red-500 text-sm mt-2">{serverError}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </span>
    </section>
  );
};

export default Page;
