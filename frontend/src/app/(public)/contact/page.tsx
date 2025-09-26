"use client";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import ContactExperience from "@/components/contact/ContactExperience";
import { ArrowDown } from "lucide-react";

const ContactMe = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_BASE_URL
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact-me`
        : "/api/contact-me";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const result = await response.json();
      console.log("Message sent successfully:", result);

      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.log("Error while contact us:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-1 bg-gradient-to-br from-blue-300 to-blue-400 overflow-auto pt-[200px]">
      <div className="w-11/12 h-full mx-auto flex-col flex">
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
              ref={formRef}
              onSubmit={handleSubmit}
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
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What’s your good name?"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2">
                  Your Email
                </label>
                <input
                  className="w-full px-4 py-2 md:text-base text-sm placeholder:text-white-50 font-extralight placeholder:italic border rounded-md focus:border-gray-500 focus:outline-none"
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What’s your email address?"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2">
                  Your Message
                </label>
                <textarea
                  className="w-full px-4 py-2 md:text-base text-sm placeholder:text-white-50 font-extralight placeholder:italic border rounded-md focus:border-gray-500 focus:outline-none"
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can I help you?"
                  rows={5}
                  required
                />
              </div>

              <button type="submit">
                <div className="px-4 py-4 rounded-lg border flex justify-center items-center relative cursor-pointer overflow-hidden group">
                  <div className="absolute -right-10 origin-center top-1/2 -translate-y-1/2 w-[120%] h-[120%] group-hover:size-10 group-hover:right-10 rounded-full bg-gray-300 transition-all duration-500" />
                  <p className="group-hover:text-white text-lg text-black z-20">
                    {loading ? "Sending..." : "Send Message"}
                  </p>
                  <div className="group-hover:bg-gray-300 size-10 rounded-full absolute right-10 top-1/2 -translate-y-1/2 flex justify-center items-center overflow-hidden">
                    <ArrowDown className="size-6 text-blue-500 xl:-translate-y-32 translate-y-0 animate-bounce group-hover:translate-y-0 transition-all duration-500" />
                  </div>
                </div>
              </button>
            </form>
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
