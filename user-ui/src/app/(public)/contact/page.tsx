"use client";
import React, { useState } from "react";
import ContactExperience from "@/components/contact/ContactExperience";
import { ArrowDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactMe = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await axiosInstance.post("/user/contact", data);
      return response.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      setServerError(null);
      reset();
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        (error.response?.data as { message?: string })?.message ||
        "Invalid Credentioals";
      toast.error(errorMessage);
      setServerError(errorMessage);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };
  
  return (
    <div className="flex w-full flex-1 bg-gradient-to-br from-blue-300 to-blue-400 overflow-auto pt-[200px]">
      <div className="w-10/12 h-full mx-auto flex-col flex">
        <h1 className="text-3xl sm:text-5xl transition-all duration-200 font-extrabold">
          <span>Get in </span>
          <span className="text-blue-50">Touch</span>
          <span>– Let’s Connect</span>
        </h1>
        <div className="mt-4 bg-black-50 w-fit px-4 py-2 rounded-2xl">
          <p>Have questions or ideas? Let’s talk! 🚀</p>
        </div>
        <div className="flex flex-col-reverse lg:flex-row gap-5 my-8">
          {/* left */}
          <div className="w-full xl:col-span-5 bg-black-100 border border-black-50 rounded-xl p-4 lg:p-10 max-lg:mb-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-7"
            >
              <div>
                <label htmlFor="name" className="block text-white mb-2">
                  Your name
                </label>
                <input
                  className="w-full px-4 py-2 md:text-base text-sm placeholder:text-white-50 font-extralight placeholder:italic border rounded-md focus:border-gray-500 focus:outline-none"
                  type="text"
                  id="name"
                  {...register("name", {
                    required: { value: true, message: "name is required" },
                  })}
                  placeholder="What’s your good name?"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">
                    {String(errors.name.message)}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2">
                  Your Email
                </label>
                <input
                  className="w-full px-4 py-2 md:text-base text-sm placeholder:text-white-50 font-extralight placeholder:italic border rounded-md focus:border-gray-500 focus:outline-none"
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="What’s your email address?"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {String(errors.email.message)}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  Your Message
                </label>
                <textarea
                  className="w-full px-4 py-2 md:text-base text-sm placeholder:text-white-50 font-extralight placeholder:italic border rounded-md focus:border-gray-500 focus:outline-none"
                  id="message"
                  {...register("message", {
                    required: "message is required",
                  })}
                  placeholder="How can I help you?"
                  rows={5}
                  required
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">
                    {String(errors.message.message)}
                  </p>
                )}
              </div>

              <button disabled={contactMutation.isPending} type="submit">
                <div className="px-4 py-4 rounded-lg border flex justify-center items-center relative cursor-pointer overflow-hidden group">
                  <div className="absolute -right-10 origin-center top-1/2 -translate-y-1/2 w-[120%] h-[120%] group-hover:size-10 group-hover:right-10 rounded-full bg-gray-300 transition-all duration-500" />
                  <p className="group-hover:text-white text-lg text-black z-20">
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </p>
                  <div className="group-hover:bg-gray-300 size-10 rounded-full absolute right-10 top-1/2 -translate-y-1/2 flex justify-center items-center overflow-hidden">
                    <ArrowDown className="size-6 text-blue-500 xl:-translate-y-32 translate-y-0 animate-bounce group-hover:translate-y-0 transition-all duration-500" />
                  </div>
                </div>
              </button>
            </form>
            {serverError && (
              <p className="text-red-500 text-sm mt-2">{serverError}</p>
            )}
          </div>
          {/* right */}
          <div className="w-full xl:col-span-7">
            <div className="bg-[#118ca2] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
