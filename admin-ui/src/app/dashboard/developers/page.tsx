import DashboardHeader from "@/components/custom/DashboardHeader";
import React from "react";

const Page = () => {
  return (
    <div className="flex-1 bg-gradient-to-br from-blue-400 to-blue-500 overflow-auto">
      {/* Header */}
      <DashboardHeader
        title="Developers & Teams"
        description="Manage developers, teams, and collaborations."
      />
    </div>
  );
};

export default Page;
