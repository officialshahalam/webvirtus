import { Bell, User } from "lucide-react";
import React from "react";

const DashboardHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="md:flex bg-blue-300 py-2 px-6 items-center justify-between hidden">
      <div>
        <h1 className="text-3xl font-bold text-blue-100">{title}</h1>
        <p className="text-blue-200 mt-1">{description}</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg bg-blue-300 border border-gray-800  text-blue-50  hover:text-blue-100 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
        </button>

        <button className="p-2 rounded-lg bg-blue-300 border border-gray-800  text-blue-50  hover:text-blue-100 transition-colors">
          <User className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
