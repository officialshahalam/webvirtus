"use client";
import BookNow from "@/shared/custom-components/BookNow";
import DetailCost from "@/shared/custom-components/DetailCost";
import MilestonePayStructure from "@/shared/custom-components/MilestonePayStructure";
import { useDummyProjectStore } from "@/stores/dummyProjectStore";
import { Project, useProjectStore } from "@/stores/projectStore";
import { useRequirementStore } from "@/stores/useRequirementStore";
import { useUserStore } from "@/stores/userStore";
import { RequirementFormData } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const detailCost = useDummyProjectStore(
    (state) => state.dummyProject?.detail_cost
  );
  const totalCost = useDummyProjectStore(
    (state) => state.dummyProject?.total_cost
  );

  const router = useRouter();
  const { clearRequirement } = useRequirementStore();
  const { clearDummyProject } = useDummyProjectStore();
  const { user } = useUserStore();
  const { setProject } = useProjectStore();
  const { requirement } = useRequirementStore();

  const projectCreateMutation = useMutation({
    mutationFn: async (data: RequirementFormData) => {
      const response = await axiosInstance.post("/project", data);
      return response.data;
    },
    onSuccess: (data) => {
      const project: Project = data.project;
      clearRequirement();
      clearDummyProject();
      setProject(project);
      router.push("/dashboard");
    },
    onError: (error: AxiosError) => {
      console.log("error", error);
    },
  });

  const handleProjectCreate = () => {
    if (!user) {
      router.push("/login");
    } else {
      projectCreateMutation.mutate(requirement!);
    }
  };

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
        <div className="w-11/12 mx-auto mt-6">
          <MilestonePayStructure totalCost={totalCost!} />
        </div>
        <div className="w-11/12 mx-auto mt-6">
          <div className="text-center sm:text-start">
            <p className="text-blue-100 mb-2 sm:mb-3 text-sm sm:text-base text-left">
              Start your project with secure milestone payments
            </p>
            <button
              onClick={() => handleProjectCreate()}
              className="bg-gradient-to-r from-blue-100 to-white text-blue-500 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold inline-flex items-center shadow-lg hover:scale-105 transition-all duration-200 w-full sm:w-auto justify-center sm:justify-start"
            >
              <Lock className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">
                {projectCreateMutation.isPending
                  ? "Creating project..."
                  : "Build Your Idea Into Reality"}
              </span>
              <span className="sm:hidden">Start Your Project</span>
              <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </section>
      <BookNow />
    </main>
  );
};

export default Page;
