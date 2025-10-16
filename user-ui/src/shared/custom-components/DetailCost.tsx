import React from "react";
import { DetailCostType, StackType } from "@/types/index";

const DetailCost = ({
  detailCost,
  totalCost,
}: {
  detailCost: DetailCostType;
  totalCost: number;
}) => {
  return (
    <div className="w-full mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6  text-left">
        Project Cost Details
      </h1>
      <div className="bg-gradient-to-tl from-blue-100/40 to-blue-300 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-lg space-y-2 sm:space-y-3 font-mono overflow-x-auto">
        {/* Base Cost */}
        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/20 pb-2 gap-1 sm:gap-2">
          <span className="w-full text-xs sm:text-sm md:text-base font-semibold sm:font-normal">
            {detailCost?.baseCost.name}
          </span>
          <span className="w-full text-xs sm:text-sm md:text-base text-blue-200">
            {detailCost?.baseCost?.pages} pages × $
            {detailCost?.baseCost?.costPerPage}
          </span>
          <span className="w-full text-xs sm:text-sm md:text-base font-bold sm:text-end">
            = ${detailCost?.baseCost?.total}
          </span>
        </div>

        {/* Design Premium */}
        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/20 pb-2 gap-1 sm:gap-2">
          <span className="w-full text-xs sm:text-sm md:text-base font-semibold sm:font-normal">
            {detailCost?.designPremium.name}
          </span>
          <span className="w-full text-xs sm:text-sm md:text-base text-blue-200">
            {detailCost?.designPremium.percentage}%
          </span>
          <span className="w-full text-xs sm:text-sm md:text-base font-bold sm:text-end">
            = ${detailCost?.designPremium.amount}
          </span>
        </div>

        {/* Stack */}
        {detailCost?.stack?.map((item: StackType, idx: number) => (
          <div
            key={item.name ?? idx}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-white/20 pb-2 gap-1 sm:gap-2"
          >
            <span className="flex-1 text-xs sm:text-sm md:text-base font-semibold sm:font-normal">
              {item.name} Cost
            </span>
            <span className="flex-1 text-xs sm:text-sm md:text-base text-blue-200">
              {item.technology}{" "}
              {item.multiplier > 0
                ? `(${item.multiplier * 100}% extra cost)`
                : "(No extra cost)"}
            </span>
            <span className="flex-1 text-xs sm:text-sm md:text-base font-bold sm:text-end">
              = ${item.appliedCost}
            </span>
          </div>
        ))}

        {/* Database */}
        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/20 pb-2 gap-1 sm:gap-2">
          <span className="w-full text-xs sm:text-sm md:text-base font-semibold sm:font-normal">
            {detailCost?.database.name}
          </span>
          <span className="w-full text-xs sm:text-sm md:text-base text-blue-200">
            {detailCost?.database.technology}
          </span>
          <span className="w-full text-xs sm:text-sm md:text-base font-bold sm:text-end">
            = ${detailCost?.database.cost}
          </span>
        </div>

        {/* Integrations */}
        {detailCost?.integrations.map(
          (integration: { name: string; cost: number }, idx: number) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:justify-between border-b border-white/20 pb-2 gap-1 sm:gap-2"
            >
              <span className="w-full text-xs sm:text-sm md:text-base font-semibold sm:font-normal">
                Integrations
              </span>
              <span className="w-full text-xs sm:text-sm md:text-base text-blue-200">
                {integration.name}
              </span>
              <span className="w-full text-xs sm:text-sm md:text-base font-bold sm:text-end">
                = ${integration.cost}
              </span>
            </div>
          )
        )}

        {/* Deployment */}
        <div className="flex flex-col sm:flex-row sm:justify-between border-b border-white/20 pb-2 gap-1 sm:gap-2">
          <span className="w-full text-xs sm:text-sm md:text-base font-semibold sm:font-normal">
            {detailCost?.deployment.name}
          </span>
          <span className="w-full text-xs sm:text-sm md:text-base text-blue-200">
            {detailCost?.deployment.platform}
          </span>
          <span className="w-full text-xs sm:text-sm md:text-base font-bold sm:text-end">
            = ${detailCost?.deployment.cost}
          </span>
        </div>

        {/* Total */}
        <div className="flex flex-row justify-between font-bold text-base sm:text-lg md:text-xl pt-2 sm:pt-4 bg-white/10 rounded-lg p-2 sm:p-3 mt-2 sm:mt-4">
          <span className="text-center sm:text-left">Total Cost</span>
          <span className="text-center sm:text-end text-lg sm:text-xl md:text-2xl text-[#05aff2]">
            = ${totalCost}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailCost;
