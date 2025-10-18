"use client";
import { mobileTechStack, webTechStack } from "@/constants";
import Link from "next/link";
import React, { useState } from "react";

const OurTechstack = () => {
  const [activeTab, setActiveTab] = useState<"web" | "mobile">("web");

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
      {/* Header */}
      <h1 className="w-full text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-8 lg:mb-10">
        How We Develop For/Our Tech Stack
      </h1>

      {/* Tab Navigation */}
      <div className="w-full flex justify-center items-center mb-6 md:mb-8 lg:mb-10">
        <div className="w-fit shadow-lg rounded-2xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-600/30">
          <button
            className={`
              ${
                activeTab === "web"
                  ? "bg-white text-black shadow-md"
                  : "bg-transparent text-white hover:bg-white/10"
              } 
              px-4 sm:px-6 md:px-8 
              py-2 sm:py-2.5 md:py-3 
              text-sm sm:text-base 
              font-medium
              rounded-l-2xl 
              transition-all 
              duration-300 
              ease-in-out
              border-r 
              border-gray-600/30
              min-w-[80px] sm:min-w-[100px]
            `}
            onClick={() => setActiveTab("web")}
          >
            Web
          </button>
          <button
            className={`
              ${
                activeTab === "mobile"
                  ? "bg-white text-black shadow-md"
                  : "bg-transparent text-white hover:bg-white/10"
              } 
              px-4 sm:px-6 md:px-8 
              py-2 sm:py-2.5 md:py-3 
              text-sm sm:text-base 
              font-medium
              rounded-r-2xl 
              transition-all 
              duration-300 
              ease-in-out
              min-w-[80px] sm:min-w-[100px]
            `}
            onClick={() => setActiveTab("mobile")}
          >
            Mobile
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {activeTab === "web" ? (
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
            {webTechStack.map((item, index) => (
              <div
                key={index}
                className="
                  bg-gradient-to-b 
                  from-[#001923] 
                  to-[#002432] 
                  p-4 sm:p-6 md:p-8 
                  rounded-xl md:rounded-2xl 
                  border 
                  border-gray-600/30
                  backdrop-blur-sm
                  shadow-lg
                  hover:shadow-xl
                  transition-all
                  duration-300
                  flex 
                  flex-col 
                  gap-6 md:gap-8 lg:gap-10
                "
              >
                <h2
                  className="
                    text-lg sm:text-xl md:text-2xl 
                    font-extrabold 
                    text-white
                    text-center sm:text-left
                  "
                  style={{ textShadow: "0 0 20px hsla(0, 0%, 100%, 0.423)" }}
                >
                  {item.title}
                </h2>

                <div
                  className="
                  grid 
                  grid-cols-2 
                  sm:grid-cols-3 
                  md:grid-cols-4 
                  lg:grid-cols-5 
                  xl:grid-cols-6
                  gap-4 sm:gap-6 md:gap-8 lg:gap-10
                  place-items-center
                "
                >
                  {item?.stacks.map((s, i) => (
                    <div
                      key={i}
                      className="
                        flex 
                        flex-col 
                        items-center 
                        justify-center 
                        gap-2 sm:gap-3
                        p-2 sm:p-3 md:p-4
                        rounded-lg
                        hover:bg-white/5
                        transition-all
                        duration-200
                        group
                        min-w-[80px] sm:min-w-[100px]
                      "
                    >
                      <s.Icon
                        className="
                        h-12 w-12 
                        sm:h-16 sm:w-16 
                        md:h-20 md:w-20 
                        text-blue-100 
                        group-hover:text-white
                        transition-colors
                        duration-200
                      "
                      />
                      <h3
                        className="
                        text-white 
                        text-xs sm:text-sm md:text-base lg:text-lg
                        font-medium
                        tracking-wide
                        text-center
                        group-hover:text-blue-100
                        transition-colors
                        duration-200
                      "
                      >
                        {s.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
            {mobileTechStack.map((item, index) => (
              <div
                key={index}
                className="
                  bg-gradient-to-b 
                  from-[#001923] 
                  to-[#002432] 
                  p-4 sm:p-6 md:p-8 
                  rounded-xl md:rounded-2xl 
                  border 
                  border-gray-600/30
                  backdrop-blur-sm
                  shadow-lg
                  hover:shadow-xl
                  transition-all
                  duration-300
                  flex 
                  flex-col 
                  gap-6 md:gap-8 lg:gap-10
                "
              >
                <h2
                  className="
                    text-lg sm:text-xl md:text-2xl 
                    font-extrabold 
                    text-white
                    text-center sm:text-left
                  "
                  style={{ textShadow: "0 0 20px hsla(0, 0%, 100%, 0.423)" }}
                >
                  {item.title}
                </h2>

                <div
                  className="
                  grid 
                  grid-cols-2 
                  sm:grid-cols-3 
                  md:grid-cols-4 
                  lg:grid-cols-5 
                  xl:grid-cols-6
                  gap-4 sm:gap-6 md:gap-8 lg:gap-10
                  place-items-center
                "
                >
                  {item?.stacks.map((s, i) => (
                    <div
                      key={i}
                      className="
                        flex 
                        flex-col 
                        items-center 
                        justify-center 
                        gap-2 sm:gap-3
                        p-2 sm:p-3 md:p-4
                        rounded-lg
                        hover:bg-white/5
                        transition-all
                        duration-200
                        group
                        min-w-[80px] sm:min-w-[100px]
                      "
                    >
                      <s.Icon
                        className="
                        h-12 w-12 
                        sm:h-16 sm:w-16 
                        md:h-20 md:w-20 
                        text-blue-100 
                        group-hover:text-white
                        transition-colors
                        duration-200
                      "
                      />
                      <h3
                        className="
                        text-white 
                        text-xs sm:text-sm md:text-base lg:text-lg
                        font-medium
                        tracking-wide
                        text-center
                        group-hover:text-blue-100
                        transition-colors
                        duration-200
                      "
                      >
                        {s.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full mt-10 text-center md:text-start">
        <Link
          href={"/cost-analysis"}
          className="bg-white text-blue-500 px-20 py-2 rounded-lg hover:bg-white/90 w-[400px]"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default OurTechstack;
