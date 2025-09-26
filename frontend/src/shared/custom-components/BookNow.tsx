import { ShimmerButton } from "@/components/ui/shimmer-button";
import Image from "next/image";
import React from "react";

const BookNow = () => {
  return (
    <section className="w-full bg-blue-400 py-6 md:py-8 lg:py-10">
      <div className="w-11/12 mx-auto bg-blue-500 flex flex-col items-center border rounded-2xl md:rounded-3xl gap-0 md:gap-[10px] relative overflow-hidden">
        {/* Upper decorative image */}
        <Image
          src={"icons/upper.svg"}
          height={300}
          width={1680}
          className="object-cover w-full h-auto"
          alt="upper decoration"
        />
        
        {/* Middle decorative image */}
        <Image
          src={"icons/middle.svg"}
          height={200}
          width={280}
          className="object-cover w-16 md:w-32 lg:w-[250px] h-auto"
          alt="middle decoration"
        />
        
        {/* Lower decorative image */}
        <Image
          src={"icons/lower.svg"}
          height={300}
          width={1680}
          className="object-cover w-full h-auto"
          alt="lower decoration"
        />
        
        {/* Content overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 md:gap-4 lg:gap-5 items-center text-center px-4">
          <h1 className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-semibold text-blue-100 leading-tight max-sm:hidden">
            Tap into Jamstack
          </h1>
          <div>
            <ShimmerButton className="shadow-xl md:shadow-2xl">
              <span className="text-center text-xs md:text-sm lg:text-base xl:text-lg font-medium leading-none tracking-tight text-white px-2 py-1 md:px-3 md:py-1 lg:px-4 lg:py-2">
                Book Now
              </span>
            </ShimmerButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookNow;