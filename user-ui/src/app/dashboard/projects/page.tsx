import DashboardHeader from "@/shared/custom-components/DashboardHeader";
import React from "react";

const Page = () => {
  return (
    <div className="flex-1 bg-gradient-to-br from-blue-400 to-blue-500 overflow-auto">
      {/* Header */}
      <DashboardHeader
        title="Active Project"
        description="View and manage your active projects."
      />
    </div>
  );
};

export default Page;
