"use client";
import DashboardHeader from "@/shared/custom-components/DashboardHeader";
import DetailCost from "@/shared/custom-components/DetailCost";
import { useProjectStore } from "@/stores/projectStore";
import { Calendar, CheckCircle, Clock, Eye, MessageCircle } from "lucide-react";

import React from "react";

const Page = () => {
  const projectData = useProjectStore((state) => state.project);
  return (
    <div className="flex-1 bg-gradient-to-br from-blue-400 to-blue-500 overflow-auto">
      {/* Header */}
      <DashboardHeader
        title="Dashboard"
        description="Welcome back to your dashboard"
      />
      <div className="space-y-6 p-6">
        {/* Project Overview Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gradient-to-tl from-blue-100/40 to-blue-300 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-blue-100 mb-2 capitalize">
                  {projectData?.title}
                </h2>
                <p className="text-blue-200">
                  Current Phase:{" "}
                  <span className="font-semibold text-blue-100 capitalize">
                    {projectData?.current_phase?.replace("_", " ")}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-blue-100 mb-1">
                  {projectData?.progress}%
                </div>
                <p className="text-blue-200">Complete</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-sm text-blue-100 mb-3">
                <span>Overall Progress</span>
                <span>{projectData?.progress}% Complete</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-blue-100 via-blue-100 to-blue-50 h-4 rounded-full transition-all duration-1000 relative overflow-hidden"
                  style={{ width: `${projectData?.progress}%` }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-300 p-4 rounded-xl border">
                <Calendar className="w-6 h-6 text-blue-100 mb-3" />
                <p className="text-sm text-blue-200 mb-1">
                  Next Milestone Deadline
                </p>
                <p className="font-bold text-blue-100">
                  {projectData?.next_deadline &&
                    new Date(projectData?.next_deadline).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                </p>
              </div>
              <div className="bg-blue-300 p-4 rounded-xl border">
                <Clock className="w-6 h-6 text-blue-100 mb-3" />
                <p className="text-sm text-blue-200 mb-1">
                  Estimated Completion
                </p>
                <p className="font-bold text-blue-100">
                  {projectData?.estimated_completion &&
                    new Date(
                      projectData.estimated_completion
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-tl from-blue-100/40 to-blue-300 rounded-xl p-6">
            <h3 className="text-xl text-blue-100 font-bold mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              {[
                { Icon: Eye, title: "Preview Current Work" },
                { Icon: MessageCircle, title: "Message Team" },
                { Icon: Calendar, title: "Schedule Meeting" },
              ].map(({ Icon, title }, index) => (
                <button
                  key={index}
                  className="w-full bg-blue-300 p-3 rounded-lg transition-all flex items-center group"
                >
                  <Icon className="w-5 h-5 mr-3 text-blue-50/70 group-hover:text-blue-50" />
                  <span className="text-blue-200/80 group-hover:text-blue-200">
                    {title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <h3 className="text-3xl font-bold mb-6">Recent Project Activity</h3>

        <div className="bg-gradient-to-tl from-blue-100/40 to-blue-300 rounded-xl shadow-sm p-6">
          <div className="space-y-4">
            {projectData?.milestones.map((item, index) => {
              if (item.status === "pending") return null;
              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg bg-blue-300`}
                >
                  {item.status === "completed" ? (
                    <div
                      className={`w-8 h-8 bg-green-100 rounded-full flex items-center  justify-center flex-shrink-0`}
                    >
                      <CheckCircle className={`w-5 h-5 text-green-600`} />
                    </div>
                  ) : item.status === "in_progress" ? (
                    <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gray-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-gray-100" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-semibold">
                      {item.title} {item.status}
                    </p>
                    <p className="text-sm opacity-80">{item.description}</p>
                    <p className="text-xs opacity-80 mt-1">
                      {projectData?.next_deadline &&
                        new Date(item.due_date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail cost */}
        <DetailCost
          totalCost={projectData?.total_cost!}
          detailCost={projectData?.detail_cost!}
        />
      </div>
    </div>
  );
};

export default Page;
