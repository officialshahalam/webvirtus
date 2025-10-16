"use client";
import { useUserStore } from "@/stores/userStore";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const Page = () => {
  const router = useRouter();
  const { setUser } = useUserStore();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [serverError, setServerError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axiosInstance.post("/auth/login-user", data);
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
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
    <div className="w-full h-screen bg-gradient-to-br from-blue-300 to-blue-400 flex items-center justify-center">
      <div className="w-10/12 md:w-[480px] p-8 bg-white/5 backdrop-blur-3xl shadow rounded-lg">
        <h3 className="text-xl sm:text-2xl md:text-3xl text-blue-50 font-semibold text-center">
          Login to Growlance
        </h3>

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
  );
};

export default Page;
