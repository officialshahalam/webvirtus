"use client";
import BookNow from "@/shared/custom-components/BookNow";
import MobileCostCal from "@/shared/custom-components/MobileCostCal";
import WebCostCal from "@/shared/custom-components/WebCostCal";
import React, { useState } from "react";

const Page = () => {
  const [activeTab, setActiveTab] = useState<"web" | "mobile">("web");
  return (
    <main>
      <section className="relative w-full bg-gradient-to-br from-blue-300 to-blue-400">
        <div className="w-11/12 mx-auto pt-40 pb-12 md:pb-16 lg:pb-20">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center text-blue-100 flex flex-col gap-1 md:gap-2 mb-6 md:mb-8 lg:mb-10">
            <span>Get a Quote for Your</span>
            <span>Jamstack Development Project</span>
          </h1>
          
          {/* Tab Switcher */}
          <div className="w-full flex justify-center items-center">
            <div className="w-fit border border-white/20 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/10">
              <button
                className={`${
                  activeTab === "web" 
                    ? "bg-white text-black shadow-md" 
                    : "text-white hover:bg-white/10"
                } px-6 md:px-8 lg:px-10 py-2 md:py-2.5 text-sm md:text-base lg:text-lg font-medium transition-all duration-200 border-r border-white/20`}
                onClick={() => setActiveTab("web")}
              >
                Web
              </button>
              <button
                className={`${
                  activeTab === "mobile" 
                    ? "bg-white text-black shadow-md" 
                    : "text-white hover:bg-white/10"
                } px-6 md:px-8 lg:px-10 py-2 md:py-2.5 text-sm md:text-base lg:text-lg font-medium transition-all duration-200`}
                onClick={() => setActiveTab("mobile")}
              >
                Mobile
              </button>
            </div>
          </div>
          
          {/* Calculator Component */}
          <div className="mt-6 md:mt-8 lg:mt-10">
            {activeTab === "web" ? <WebCostCal /> : <MobileCostCal />}
          </div>
        </div>
      </section>
      <BookNow />
    </main>
  );
};

export default Page;