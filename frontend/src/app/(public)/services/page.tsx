import React from "react";
import { Button } from "@/components/ui/button";
import { features } from "@/constants";
import BookNow from "@/shared/custom-components/BookNow";
import OurTechstack from "@/shared/custom-components/OurTechstack";

const Page = () => {
  return (
    <main className="relative bg-gradient-to-tl from-blue-300 to-blue-400 w-full min-h-screen">
      <section className="pt-[120px] md:pt-[140px] lg:pt-[160px]">
        <div className="w-11/12 mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 md:gap-8 lg:gap-10">
          {/* left */}
          <div className="w-full lg:w-1/2 flex flex-col items-start justify-center gap-3 md:gap-4 lg:gap-5">
            <h1 className="text-xl md:text-3xl lg:text-5xl text-[#017dae] font-bold tracking-[1px] md:tracking-[3px] lg:tracking-[5px] leading-tight">
              Built for Growth, <br />
              Powered by Innovation, <br /> Ready for the Future.
            </h1>
            <p className="text-xs md:text-sm lg:text-base text-[#50585b] leading-relaxed">
              Welcome to our platform, where we transform ideas into powerful
              digital solutions. We specialize in building scalable
              applications, seamless integrations, and modern user experiences
              that drive real business results. From startups to enterprises, we
              deliver the technology backbone that fuels innovation and
              long-term success.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:gap-4 items-stretch md:items-center w-full md:w-auto">
              <Button className="text-xs md:text-sm px-4 md:px-6 lg:px-8 py-2.5 md:py-3 rounded-xl bg-white text-black border border-white/10 shadow-none hover:bg-white/90 transition-none w-full md:w-auto">
                Get Started
              </Button>
              <Button className="text-xs md:text-sm px-4 md:px-6 lg:px-8 py-2.5 md:py-3 rounded-xl bg-transparent text-white border border-white/20 shadow-none hover:bg-white/10 transition-none w-full md:w-auto">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* right */}
          <div className="w-full lg:w-[45%] flex flex-wrap items-center justify-center mt-6 md:mt-8 lg:mt-0">
            <div className="flex w-full h-auto flex-wrap items-center justify-center gap-1.5 md:gap-2 lg:gap-3">
              {features.map(({ title, icon: Icon }, index) => (
                <div
                  key={index}
                  className="
                    w-[calc(50%-0.1875rem)]
                    md:w-[calc(33.333%-0.334rem)]
                    lg:w-[calc(50%-0.375rem)] 
                    border-gray-600 
                    text-gray-400 
                    hover:text-white 
                    hover:shadow-sm 
                    hover:shadow-white 
                    transition-all 
                    duration-200 
                    cursor-default 
                    border 
                    rounded-lg
                    md:rounded-xl 
                    story-card-grd 
                    flex 
                    flex-col 
                    items-center 
                    justify-center 
                    gap-1.5
                    md:gap-2
                    lg:gap-3 
                    p-2
                    md:p-3
                    lg:p-6
                    min-h-[100px]
                    md:min-h-[120px]
                    lg:min-h-[160px]
                  "
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6 lg:w-10 lg:h-10" />
                  <p className="text-[10px] md:text-xs lg:text-base text-center leading-tight">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-11/12 mx-auto mt-8 md:mt-12 lg:mt-20 mb-6 md:mb-8 lg:mb-10">
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold mb-4 md:mb-6 lg:mb-8 text-white">
          Why WebVirtus?
        </h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
          {features.map(({ title, desc, icon: Icon }, index) => (
            <div
              key={index}
              className="
                w-full 
                border 
                border-gray-600 
                hover:shadow-sm 
                hover:shadow-white 
                transition-all 
                duration-200 
                cursor-default  
                p-3
                md:p-4
                lg:p-6
                flex 
                flex-col 
                items-center 
                justify-center 
                gap-2
                md:gap-3
                lg:gap-4 
                rounded-lg
                md:rounded-xl 
                bg-gradient-to-br 
                from-[#000A0E] 
                to-[#002432]
                min-h-[160px]
                md:min-h-[200px]
                lg:min-h-[280px]
              "
            >
              <Icon 
                width={32} 
                height={32} 
                className="md:w-12 md:h-12 lg:w-20 lg:h-20" 
                stroke="#002432" 
              />
              <h2 className="w-full text-center text-white text-sm md:text-lg lg:text-2xl font-semibold">
                {title}
              </h2>
              <p className="text-gray-500 text-xs md:text-sm lg:text-base text-center leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>
      
      <OurTechstack />
      <BookNow />
    </main>
  );
};

export default Page;
