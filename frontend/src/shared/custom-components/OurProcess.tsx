"use client";
import React from "react";
import { processSteps } from "../../constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type ProcessStep = {
  title: string;
  description: string[];
};

const OurProcess = () => {
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".left-card").forEach((card) => {
      gsap.from(card, {
        xPercent: -100,
        opacity: 0,
        transformOrigin: "left left",
        duration: 0.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });
    });
    gsap.utils.toArray<HTMLElement>(".right-card").forEach((card) => {
      gsap.from(card, {
        xPercent: 100,
        opacity: 0,
        transformOrigin: "right right",
        duration: 0.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });
    });

    gsap.to(".timeline", {
      scaleY: 0,
      transformOrigin: "bottom bottom",
      ease: "none",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top 80%",
        end: "bottom 40%",
        scrub: 1,
      },
    });
  }, []);

  return (
    <section className="bg-blue-400 py-10">
      <h1 className="text-5xl font-bold text-center text-white">Our Process</h1>
      <div className="w-11/12 z-40 mx-auto gap-5 relative flex flex-col mt-15">
        <div className="timeline-wrapper absolute top-0 left-1/2 hidden h-full md:flex justify-center">
          <div className="timeline absolute z-30 h-full w-14 md:w-28 bg-blue-400" />
          <div className="gradient-line w-1 h-full" />
        </div>
        {processSteps.map((step: ProcessStep, index: number) => (
          <div
            key={index}
            className={`flex translate-y-0 opacity-100 transition-all duration-500 justify-between items-center w-full md:right-timeline ${
              index % 2 == 0
                ? "md:flex left-card"
                : "md:flex-row-reverse right-card"
            }`}
          >
            <div className="order-1 rounded-lg shadow-xl flex flex-col gap-2 md:w-5/12 w-full px-6 py-8 border bg-linear-to-br from-blue-300 to-blue-400 text-white">
              <h1 className="text-lg text-blue-100 block md:hidden">
                Step:{index + 1}
              </h1>
              <h1 className="text-xl text-gray-300 font-semibold">
                {step.title}
              </h1>
              <p className="text-gray-400 text-base">- {step.description[0]}</p>
              <p className="text-gray-400 text-base">- {step.description[1]}</p>
            </div>
            <div className="z-20 md:flex justify-center hidden items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
              <h1 className="mx-auto font-semibold text-lg text-white">
                {index + 1}
              </h1>
            </div>
            <div className="order-1 md:block hidden w-5/12"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurProcess;
