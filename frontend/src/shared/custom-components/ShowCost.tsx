"use client";

import { useProjectStore } from "@/stores/projectStore";
import { useRouter } from "next/navigation";
import React from "react";

const ShowCost = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<"requirement" | "cost">>;
}) => {
  const router = useRouter();
  const total_cost = useProjectStore((state) => state.project?.total_cost ?? 0);
  const total_time = useProjectStore((state) => state.project?.total_time ?? 0);

  return (
    <div className="w-full flex flex-col gap-6 md:gap-8 lg:gap-10 mt-4 md:mt-5 lg:mt-6 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-center gap-3 md:gap-4">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-center leading-tight">
          Your estimate quotation for project requirement is:
        </h1>
        <p className="text-blue-100 font-black text-4xl md:text-5xl lg:text-6xl">
          ${total_cost}
        </p>
        <p className="text-sm md:text-base lg:text-lg text-blue-200 font-semibold text-center">
          Approximate Duration: {total_time} hours
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-3 md:gap-4">
        <p className="text-blue-100 font-bold text-sm md:text-base lg:text-lg text-center">
          Start with the project?
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 w-full max-w-sm md:max-w-md lg:max-w-none">
          <button
            onClick={() => router.push("/detail-cost")}
            className="border w-full sm:w-[180px] md:w-[190px] lg:w-[200px] py-2.5 md:py-3 rounded-full bg-blue-50 hover:bg-blue-50/90 text-blue-500 font-semibold text-sm md:text-base transition-all duration-200"
          >
            Detail Cost
          </button>
          <button
            onClick={() => setStep("requirement")}
            className="border w-full sm:w-[180px] md:w-[190px] lg:w-[200px] py-2.5 md:py-3 rounded-full bg-blue-500 hover:bg-blue-200 transition-all duration-200 text-blue-50 font-semibold text-sm md:text-base"
          >
            Change Requirement
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowCost;
