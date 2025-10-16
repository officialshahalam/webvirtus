"use client";

import React from "react";
import Link from "next/link";
import { Check, Star as LucideStar, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Interfaces
interface PricingPlan {
  name: string;
  features: string[];
  buttonText: string;
  type: string;
  href: string;
  isPopular?: boolean;
}

interface PricingSectionProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

// Main PricingSection Component
const PricingSection = ({ plans, title, description }: PricingSectionProps) => {
  return (
    <div className="relative w-full bg-linear-to-br from-blue-300 to-blue-400 bg-background dark:bg-neutral-950 pb-12 md:pb-16 lg:py-20 xl:pb-24">
      <div className="relative z-10 w-11/12 mx-auto">
        <div className="w-full text-center space-y-3 md:space-y-4 mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white">
            {title}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base lg:text-lg whitespace-pre-line px-4 md:px-8 lg:px-16">
            {description}
          </p>
        </div>
        
        {/* Mobile: Single column, Tablet: 2 columns, Desktop: All in row */}
        <div className="mt-8 md:mt-12 lg:mt-16 xl:mt-20 grid grid-cols-1 lg:flex lg:items-center lg:justify-center gap-4 md:gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
  return (
    <div
      className={cn(
        "rounded-xl lg:rounded-2xl p-4 md:p-6 lg:p-8 flex flex-col relative bg-linear-to-br from-blue-300 to-blue-400 backdrop-blur-sm w-full lg:w-80 xl:w-96",
        plan.isPopular
          ? "border-2 border-primary shadow-xl scale-105 lg:scale-110"
          : "border border-border"
      )}
    >
      {plan.isPopular && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <div className="bg-primary py-1 md:py-1.5 px-3 md:px-4 rounded-full flex items-center gap-1 md:gap-1.5">
            <LucideStar className="text-primary-foreground h-3 w-3 md:h-4 md:w-4 fill-current" />
            <span className="text-primary-foreground text-xs md:text-sm font-semibold">
              Best For You
            </span>
          </div>
        </div>
      )}
      
      <div className="flex-1 flex flex-col text-center">
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6 lg:mb-8">
          {plan.name}
        </h3>
        
        <ul
          role="list"
          className="space-y-2 md:space-y-3 text-xs md:text-sm leading-relaxed text-left text-muted-foreground flex-1"
        >
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-x-2 md:gap-x-3 items-start">
              {plan?.type === "pros" ? (
                <Check
                  className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-5 flex-none text-primary mt-0.5"
                  aria-hidden="true"
                />
              ) : (
                <X 
                  className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-5 flex-none mt-0.5" 
                  color="red" 
                />
              )}
              <span className="flex-1">{feature}</span>
            </li>
          ))}
        </ul>

        {plan?.type === "pros" && (
          <Link
            href={plan.href}
            className="mt-4 md:mt-5 py-2 md:py-3 px-4 rounded-md bg-blue-50 hover:bg-blue-50/10 text-blue-400 hover:text-blue-50 transition-all duration-300 text-sm md:text-base font-medium"
          >
            <span>{plan.buttonText}</span>
          </Link>
        )}
      </div>
    </div>
  );
};