"use client";
import BookNow from "@/shared/custom-components/BookNow";
import DetailCost from "@/shared/custom-components/DetailCost";
import MilestonePayStructure from "@/shared/custom-components/MilestonePayStructure";
import { useProjectStore } from "@/stores/projectStore";

import Link from "next/link";
import React from "react";

const Page = () => {
  const detailCost = useProjectStore((state) => state.project?.detail_cost);
  const totalCost = useProjectStore((state) => state.project?.total_cost);

  if (!detailCost) {
    return (
      <div className="text-white w-full pt-[200px] pb-10 bg-gradient-to-br from-blue-300 to-blue-400 flex flex-col gap-4">
        <p className="text-center text-blue-200">No Cost...</p>
        <Link href={"/cost-analysis"}>
          <div className="w-full flex justify-center items-center">
            <button className="bg-blue-50 w-[200px] py-2 text-blue-400 rounded-full">
              Calculate Cost
            </button>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <main className="w-full">
      <section className="pt-[170px] pb-10 bg-gradient-to-br from-blue-300 to-blue-400">
        <div className="text-white w-11/12 mx-auto">
          <DetailCost detailCost={detailCost} totalCost={totalCost!} />
        </div>
      </section>
      <MilestonePayStructure totalCost={totalCost!} />
      <BookNow />
    </main>
  );
};

export default Page;
