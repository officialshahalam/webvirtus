import { Project, useProjectStore } from "@/stores/projectStore";
import { useUserStore } from "@/stores/userStore";
import { RequirementFormData } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const MobileRequirementForm = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<"requirement" | "cost">>;
}) => {
  const { user } = useUserStore();
  const { setProject } = useProjectStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequirementFormData>();

  const costMutation = useMutation({
    mutationFn: async (data: RequirementFormData) => {
      const response = await axiosInstance.post("/cost/calculate", data);
      return response.data;
    },
    onSuccess: (data) => {
      const project: Project = data.project;
      setProject(project);
      setStep("cost");
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    },
    onError: (error: AxiosError) => {
      console.log("error", error);
    }, 
  });

  const projectCreateMutation = useMutation({
    mutationFn: async (data: RequirementFormData) => {
      const response = await axiosInstance.post("/project", data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("data", data);
      const project: Project = data.project;
      setProject(project);
      setStep("cost");
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    },
    onError: (error: AxiosError) => {
      console.log("error", error);
    },
  });

  const onSubmit = async (data: RequirementFormData) => {
    if (user) {
      await projectCreateMutation.mutate(data!);
    } else {
      await costMutation.mutate(data!);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:w-2/3 mx-auto gap-4 md:gap-5 mt-3 md:mt-4"
    >
      {/* Project Title */}
      <div className="w-full">
        <label className="w-full">
          <h1 className="text-sm md:text-base font-bold text-blue-100 mb-1">
            Title Of Project
          </h1>
          <input
            className="w-full text-blue-500 placeholder:text-blue-200 placeholder:italic py-2 md:py-2.5 px-3 md:px-4 bg-blue-50 rounded-md focus:border-none focus:outline-none text-sm md:text-base"
            type="text"
            placeholder="shopify..."
            {...register("title")}
          />
        </label>
      </div>

      {/* Number of Screen and UI/UX Row */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-2 w-full">
        <label className="w-full">
          <h1 className="text-sm md:text-base font-bold text-blue-100 mb-1">
            Number of Screen
          </h1>
          <input
            className="w-full text-blue-500 placeholder:text-blue-200 placeholder:italic py-2 md:py-2.5 px-3 md:px-4 bg-blue-50 rounded-md focus:border-none focus:outline-none text-sm md:text-base"
            type="number"
            placeholder="15 screen"
            {...register("numberOfPages", {
              required: { value: true, message: "Number of pages is required" },
              min: { value: 1, message: "Must be at least 1 Screen" },
              max: { value: 30, message: "Cannot exceed 30 Screen" },
            })}
          />
          {errors.numberOfPages && (
            <p className="text-xs md:text-sm text-red-500 italic mt-1">
              * {errors.numberOfPages.message as string}
            </p>
          )}
        </label>

        <label className="w-full">
          <h1 className="text-sm md:text-base font-bold text-blue-100 mb-1">
            UI/UX Consideration
          </h1>
          <select
            className="w-full text-blue-500 placeholder:text-blue-500 placeholder:italic py-2 md:py-[9px] px-3 md:px-4 bg-blue-50 rounded-md focus:border-none focus:outline-none text-sm md:text-base"
            {...register("designConsideration", {
              required: { value: true, message: "Choose Yes or No" },
            })}
            defaultValue=""
          >
            <option value="" disabled>
              -- Select Option --
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.designConsideration && (
            <p className="text-xs md:text-sm text-red-500 italic mt-1">
              * {errors.designConsideration.message as string}
            </p>
          )}
        </label>
      </div>

      {/* Category */}
      <div className="w-full">
        <label className="w-full">
          <h1 className="text-sm md:text-base font-bold text-blue-100 mb-1">
            Category
          </h1>
          <select
            className="w-full text-blue-500 placeholder:text-blue-500 placeholder:italic py-2 md:py-[9px] px-3 md:px-4 bg-blue-50 rounded-md focus:border-none focus:outline-none text-sm md:text-base"
            {...register("category", {
              required: { value: true, message: "Choose a category" },
            })}
            defaultValue=""
          >
            <option value="" disabled>
              -- Select Category --
            </option>
            {[
              { value: "e_commerce", label: "E-Commerce" },
              { value: "educational", label: "Educational" },
              { value: "healthcare", label: "Healthcare" },
              { value: "business", label: "Business" },
              { value: "portfolio", label: "Portfolio" },
              { value: "blog", label: "Blog" },
              { value: "other", label: "Other" },
            ].map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-xs md:text-sm text-red-500 italic mt-1">
              * {errors.category.message as string}
            </p>
          )}
        </label>
      </div>

      {/* Frontend Technology */}
      <div className="flex flex-col gap-2">
        <h1 className="text-sm md:text-base font-bold text-blue-100">
          Frontend Technology
        </h1>
        <div className="flex flex-row gap-3 md:gap-4">
          {[
            { value: "reactNative", label: "React Native" },
            { value: "expo", label: "Expo" },
            { value: "flutter", label: "Flutter" },
          ].map((ftech) => (
            <label
              key={ftech.value}
              className="cursor-pointer text-sm md:text-base"
            >
              <input
                type="radio"
                value={ftech.value}
                {...register("frontendTechnology", {
                  required: {
                    value: true,
                    message: "Choose at least one frontend technology",
                  },
                })}
                defaultChecked={ftech.value === "expo"}
                className="hidden peer"
              />
              <span className="border border-gray-800 peer-checked:border-blue-100 peer-checked:shadow-sm peer-checked:shadow-blue-100 rounded-full px-3 md:px-4 py-1.5 md:py-2 block text-center sm:inline-block transition-all duration-200 hover:border-blue-200">
                {ftech.label}
              </span>
            </label>
          ))}
        </div>
        {errors.frontendTechnology && (
          <p className="text-xs md:text-sm text-red-400 italic">
            * {errors.frontendTechnology.message as string}
          </p>
        )}
      </div>

      {/* Backend Technology */}
      <div className="flex flex-col gap-2">
        <h1 className="text-sm md:text-base font-bold text-blue-100">
          Backend Technology
        </h1>
        <div className="flex flex-row gap-3 md:gap-4">
          {[
            { value: "expressjs", label: "Express.js" },
            { value: "springboot", label: "Springboot" },
            { value: "django", label: "Django" },
          ].map((btech) => (
            <label
              key={btech.value}
              className="cursor-pointer text-sm md:text-base"
            >
              <input
                type="radio"
                value={btech.value}
                {...register("backendTechnology", {
                  required: {
                    value: true,
                    message: "Choose at least one backend technology",
                  },
                })}
                defaultChecked={btech.value === "expressjs"}
                className="hidden peer"
              />
              <span className="border border-gray-800 peer-checked:border-blue-100 peer-checked:shadow-sm peer-checked:shadow-blue-100 rounded-full px-3 md:px-4 py-1.5 md:py-2 block text-center sm:inline-block transition-all duration-200 hover:border-blue-200">
                {btech.label}
              </span>
            </label>
          ))}
        </div>
        {errors.backendTechnology && (
          <p className="text-xs md:text-sm text-red-500 italic">
            * {errors.backendTechnology.message as string}
          </p>
        )}
      </div>

      {/* Database */}
      <div className="flex flex-col gap-2">
        <h1 className="text-sm md:text-base font-bold text-blue-100">
          Database
        </h1>
        <div className="flex flex-row gap-3 md:gap-4">
          {[
            { value: "mongodb", label: "Mongo Db" },
            { value: "postgresql", label: "Postgre SQL" },
          ].map((db) => (
            <label
              key={db.value}
              className="cursor-pointer text-sm md:text-base"
            >
              <input
                type="radio"
                value={db.value}
                {...register("database", {
                  required: {
                    value: true,
                    message: "Choose at least one database",
                  },
                })}
                defaultChecked={db.value === "mongodb"}
                className="hidden peer"
              />
              <span className="border border-gray-800 peer-checked:border-blue-100 peer-checked:shadow-sm peer-checked:shadow-blue-100 rounded-full px-3 md:px-4 py-1.5 md:py-2 block text-center sm:inline-block transition-all duration-200 hover:border-blue-200">
                {db.label}
              </span>
            </label>
          ))}
        </div>
        {errors.database && (
          <p className="text-xs md:text-sm text-red-500 italic">
            * {errors.database.message as string}
          </p>
        )}
      </div>

      {/* Third-party Integration */}
      <div className="flex flex-col gap-2">
        <h1 className="text-sm md:text-base font-bold text-blue-100">
          Third-party Integration
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {[
            { value: "emailIntegration", label: "Email Integration" },
            { value: "paymentIntegration", label: "Payment Integration" },
            { value: "liveChat", label: "Live Chat" },
            { value: "trackingIntegration", label: "Tracking Integration" },
          ].map((intg) => (
            <label
              key={intg.value}
              className="cursor-pointer text-sm md:text-base"
            >
              <input
                type="checkbox"
                value={intg.value}
                {...register("thirdPartyIntegrations", {
                  required: {
                    value: true,
                    message: "Please select at least one integration",
                  },
                })}
                className="hidden peer"
              />
              <span className="border border-gray-800 peer-checked:border-blue-100 peer-checked:shadow-sm peer-checked:shadow-blue-100 rounded-full px-3 md:px-4 py-1.5 md:py-2 block text-center transition-all duration-200 hover:border-blue-200">
                {intg.label}
              </span>
            </label>
          ))}
        </div>
        {errors.thirdPartyIntegrations && (
          <p className="text-xs md:text-sm text-red-500 italic">
            * {errors.thirdPartyIntegrations.message as string}
          </p>
        )}
      </div>

      {/* Deployment Platform */}
      <div className="flex flex-col gap-2">
        <h1 className="text-sm md:text-base font-bold text-blue-100">
          Deployment Platform
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {[
            { value: "googlePlayStore", label: "Google play Store" },
            { value: "appleAppStore", label: "Apple App Service" },
            { value: "expoAppService", label: "EAS" },
          ].map((db) => (
            <label
              key={db.value}
              className="cursor-pointer text-sm md:text-base"
            >
              <input
                type="radio"
                value={db.value}
                {...register("deploymentPlatform", {
                  required: {
                    value: true,
                    message: "Choose Atleat one deployment Plateform",
                  },
                })}
                defaultChecked={db.value === "googlePlayStore"}
                className="hidden peer"
              />
              <span className="border border-gray-800 peer-checked:border-blue-100 peer-checked:shadow-sm peer-checked:shadow-blue-100 rounded-full px-3 md:px-4 py-1.5 md:py-2 block text-center sm:inline-block transition-all duration-200 hover:border-blue-200">
                {db.label}
              </span>
            </label>
          ))}
        </div>
        {errors.deploymentPlatform && (
          <p className="text-xs md:text-sm text-red-500 italic">
            * {errors.deploymentPlatform.message as string}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="w-full flex justify-center mt-4 md:mt-5">
        <button
          className={`w-full sm:w-[200px] bg-blue-50 py-2 md:py-2.5 rounded-full text-blue-500 text-sm md:text-base font-medium transition-all duration-200 hover:bg-blue-100 ${
            costMutation.isPending && "cursor-not-allowed opacity-70"
          }`}
          type="submit"
          disabled={costMutation.isPending}
        >
          {costMutation.isPending ? "Calculating..." : "Calculate"}
        </button>
      </div>
    </form>
  );
};

export default MobileRequirementForm;
