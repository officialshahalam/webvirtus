
import Sidebar from "@/components/custom/Sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`flex min-h-screen w-full`}>
      <div className="flex w-full bg-blue-400 max-sm:pt-10">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
