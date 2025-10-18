import { useDummyProjectStore } from "@/stores/dummyProjectStore";

const MilestonePayStructure = ({ totalCost }: { totalCost: number }) => {
  const { dummyProject } = useDummyProjectStore();
  const milestones = dummyProject?.milestones ?? [];

  const calculateTime = (milestones: any) => {
    const startDate = new Date(milestones[0].due_date);
    const endDate = new Date(milestones[milestones.length - 1].due_date);

    const diffMs = endDate.getTime() - startDate.getTime();

    const diffHours = diffMs / (1000 * 60 * 60);

    const days = diffHours / 24;

    const weeks = days / 6;

    const roundedWeeks = Math.round(weeks);

    return `Estimated timeline: ${roundedWeeks}-${roundedWeeks + 1}  weeks`;
  };

  return (
    <div className="w-full">
      <div className="text-center sm:text-start mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-left">
          Detailed Project Breakdown
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-left text-blue-200">
          Business Website - Complete Cost Analysis
        </p>
      </div>

      <div className="bg-blue-400 rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
          Milestone Payment Structure
        </h3>

        <div className="space-y-3 sm:space-y-4">
          {milestones.map((phase: any, index: number) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-blue-300 rounded-lg gap-2 sm:gap-4"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-blue-50 text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                  Phase{index + 1}: {phase.title}
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
                  {phase.percentage}% of total
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
            {calculateTime(milestones)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MilestonePayStructure;
