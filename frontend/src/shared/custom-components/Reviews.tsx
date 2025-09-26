"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/constants";
import Image from "next/image";

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="bg-gradient-to-br from-blue-300 to-blue-400 text-white">
      <div className="relative w-11/12 mx-auto pt-16 pb-15">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl md:text-5xl transition-all duration-200 font-extrabold">
            Hear from Clients
          </h1>
          {/* Navigation arrows */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors disabled:opacity-50"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors disabled:opacity-50"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Testimonial Slider Container */}
        <div className="relative">
          {testimonials.map((testimonial, index) => {
            if (index !== currentIndex) return null;
            return (
              <div
                key={index}
                className="w-full h-96 flex flex-col justify-between rounded-xl pt-16 p-8 border relative bg-gradient-to-bl from-blue-300 to-blue-400"
              >
                <div className="absolute top-5 right-5 underline cursor-pointer">
                  <a href="#">View Project</a>
                </div>
                <div className="mb-8">
                  <p className="text-lg leading-relaxed text-gray-200 line-clamp-6">
                    {testimonial.text}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-auto">
                  <Image
                    width={64}
                    height={64}
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                  />
                  <div>
                    <h3 className="font-semibold text-white text-xl">
                      {testimonial.author}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
