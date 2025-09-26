"use client";
import React, { Suspense, useState } from "react";

import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import CanvasLoader from "@/components/CanvasLoader";
import DemoComputer from "@/components/DemoComputer";
import { myProjects } from "@/constants";
import BookNow from "@/shared/custom-components/BookNow";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import TestimonialSlider from "@/shared/custom-components/Reviews";

const MyWork = () => {
  const [projectIndex, setProjectIndex] = useState(0);

  const handleNavigation = (direction: string) => {
    setProjectIndex((prevIndex) => {
      if (direction == "previous") {
        return prevIndex == 0 ? myProjects.length - 1 : prevIndex - 1;
      } else {
        return prevIndex === myProjects.length - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  const currentProject = myProjects[projectIndex];
  return (
    <div>
      <section className="w-full pt-[200px] pb-[100px] bg-gradient-to-br from-blue-300 to-blue-400">
        <div className="w-11/12 h-full mx-auto flex-col flex">
          <h1 className="text-3xl sm:text-5xl transition-all duration-200 font-extrabold">
            <span className="mr-5 text-blue-50">My</span>
            Selected Work
          </h1>
          <div className="grid lg:grid-cols-2 grid-cols-1 mt-5 gap-5 w-full">
            {/* left div*/}
            <div className="flex flex-col gap-3 max-lg:order-1 relative sm:p-10 sm:pb-26 py-8 px-5 border border-black-300 rounded-lg max-lg:mb-10">
              <Image
                width={100}
                height={320}
                src={currentProject.spotlight}
                alt="spotlight"
                className="w-full h-80 object-cover rounded-xl absolute top-0 right-0"
              />

              <div
                className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
                style={currentProject.logoStyle}
              >
                <Image
                  width={32}
                  height={32}
                  className="w-8 h-8 shadow-sm"
                  src={currentProject.logo}
                  alt="logo"
                />
              </div>

              <div className="flex flex-col gap-4 text-white-600 my-4">
                <p className="text-white text-2xl font-semibold">
                  {currentProject.title}
                </p>

                <p className="text-sm text-slate-400">{currentProject.desc}</p>
                <p className="text-sm text-slate-400 max-md:hidden">
                  {currentProject.subdesc}
                </p>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-5">
                <div className="flex items-center gap-3 max-md:hidden">
                  {currentProject.tags.map((tag, index) => (
                    <a
                      href={tag.docs}
                      target="_blank"
                      key={index}
                      className="tech-logo"
                    >
                      <Image
                        width={42}
                        height={42}
                        src={tag.path}
                        alt={tag.name}
                      />
                    </a>
                  ))}
                </div>

                <a
                  className="flex items-center gap-2 cursor-pointer text-white-600"
                  href={currentProject.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <p>Check Live Site</p>
                  <Image
                    width={12}
                    height={12}
                    src="/assets/arrow-up.png"
                    alt="arrow"
                    className="w-3 h-3"
                  />
                </a>
              </div>

              <div className="flex justify-between items-center absolute w-11/12 bottom-[5%] mt-7">
                <button
                  className="p-4 text-blue-50 bg-blue-200 transition-all duration-200 hover:bg-blue-50  hover:text-blue-400 rounded-full cursor-pointer"
                  onClick={() => handleNavigation("previous")}
                >
                  <FaArrowLeft size={18} />
                </button>

                <button
                  className="p-4 text-blue-50 bg-blue-200 transition-all duration-200 hover:bg-blue-50  hover:text-blue-400 rounded-full cursor-pointer"
                  onClick={() => handleNavigation("next")}
                >
                  <FaArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* right div */}
            <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
              {/* <Leva/> */}
              <Canvas>
                <ambientLight intensity={Math.PI} />
                <directionalLight position={[10, 10, 5]} />
                <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
                <Center>
                  <Suspense fallback={<CanvasLoader />}>
                    <group
                      scale={2}
                      position={[0, -3, 0]}
                      rotation={[0, -0.2, 0]}
                    >
                      <DemoComputer texture={currentProject.texture} />
                    </group>
                  </Suspense>
                </Center>
              </Canvas>
            </div>
          </div>
        </div>
      </section>
      <TestimonialSlider />
      <BookNow />
    </div>
  );
};

export default MyWork;
