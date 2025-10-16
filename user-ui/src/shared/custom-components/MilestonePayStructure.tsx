import { usedummyProjectStore } from "@/stores/dummyProjectStore";
import { Project, useProjectStore } from "@/stores/projectStore";
import { useRequirementStore } from "@/stores/useRequirementStore";
import { useUserStore } from "@/stores/userStore";
import { RequirementFormData } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArrowRight, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

const MilestonePayStructure = ({ totalCost }: { totalCost: number }) => {
  const projectPhases = [
    {
      title: "Phase 1: Discovery & Planning",
      description: "Requirements analysis, wireframes, project scope",
      percent: 20,
    },
    {
      title: "Phase 2: Design & Prototyping",
      description: "UI/UX design, mockups, design system",
      percent: 30,
    },
    {
      title: "Phase 3: Development",
      description: "Frontend & backend development, integrations",
      percent: 40,
    },
    {
      title: "Phase 4: Testing & Launch",
      description: "Quality assurance, deployment, training",
      percent: 10,
    },
  ].map((phase) => ({
    ...phase,
    amount: ((phase.percent / 100) * totalCost).toFixed(0),
  }));
  const router = useRouter();
  const { clearRequirement } = useRequirementStore();
  const { clearDummyProject } = usedummyProjectStore();
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

  return (
    <section className="w-full bg-gradient-to-tr from-blue-300 to-blue-500">
      <div className="w-11/12 mx-auto py-8 sm:py-12 md:py-16 px-2 sm:px-4">
        <div className="text-center sm:text-start mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6  text-left">
            Detailed Project Breakdown
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-left text-blue-200">
            Business Website - Complete Cost Analysis
          </p>
        </div>

        <div className="bg-blue-400 rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
            Milestone Payment Structure
          </h3>

          <div className="space-y-3 sm:space-y-4">
            {projectPhases.map((phase, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-blue-300 rounded-lg gap-2 sm:gap-4"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-50 text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                    {phase.title}
                  </h4>
                  <p className="text-blue-200 text-xs sm:text-sm md:text-base leading-relaxed">
                    {phase.description}
                  </p>
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                  <p className="font-bold text-blue-100 text-lg sm:text-xl md:text-2xl">
                    ${phase.amount}
                  </p>
                  <p className="text-xs sm:text-sm text-blue-200">
                    {phase.percent}% of total
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 sm:pt-6 mt-4 sm:mt-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-lg sm:text-xl md:text-2xl font-bold gap-2">
              <span>Total Project Cost:</span>
              <span className="text-blue-100">${totalCost}</span>
            </div>
            <p className="text-gray-600 mt-2 text-sm sm:text-base text-center sm:text-left">
              Estimated timeline: 6-8 weeks
            </p>
          </div>
        </div>

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
  );
};

export default MilestonePayStructure;
