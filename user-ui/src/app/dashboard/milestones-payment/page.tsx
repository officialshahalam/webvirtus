"use client";
import DashboardHeader from "@/shared/custom-components/DashboardHeader";
import { useProjectStore } from "@/stores/projectStore";
import { Calendar, CheckCircle, Clock, DollarSign } from "lucide-react";
import React from "react";

const Page = () => {
  const projectData = useProjectStore((state) => state.project);
  const paidAmount =
    projectData?.milestones?.reduce((sum, milestone) => {
      return milestone.is_paid ? sum + milestone.amount : sum;
    }, 0) ?? 0;
  const paidCount =
    projectData?.milestones?.filter((m) => m.is_paid).length ?? 0;

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-400 to-blue-500 overflow-auto">
      <DashboardHeader
        title="Milestones"
        description="Pay as your project get the progress"
      />
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        <div className="bg-blue-300 p-4 sm:p-6 rounded-xl">
          {/* Header Section - Responsive */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-100">
              Milestone Progress & Payments
            </h2>
            <div className="text-left sm:text-right">
              <p className="text-sm text-blue-200">Total Project Value</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-100">
                ${projectData?.total_cost}
              </p>
            </div>
          </div>

          {/* Milestones List */}
          <div className="space-y-3 sm:space-y-4">
            {projectData?.milestones.map((milestone, index) => {
              return (
                <div
                  key={index}
                  className="border rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow"
                >
                  {/* Milestone Header - Responsive */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-3 sm:space-y-0">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      {milestone.status === "completed" ? (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        </div>
                      ) : milestone.status === "in_progress" ? (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-100" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-bold text-blue-50">
                          {milestone?.title}
                        </h3>
                        <p className="text-blue-200 text-sm capitalize">
                          {milestone?.status.replace("-", " ")}
                        </p>
                        <p className="text-xs text-blue-200">
                          Due: {milestone?.due_date}
                        </p>
                      </div>
                    </div>

                    {/* Amount and Payment Status */}
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start sm:text-right space-x-2 sm:space-x-0 sm:space-y-2">
                      <p className="text-xl sm:text-2xl font-bold text-blue-50">
                        ${milestone.amount}
                      </p>
                      <span
                        className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                          milestone.is_paid
                            ? "bg-green-100 text-green-800"
                            : milestone.status === "in_progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {milestone.is_paid
                          ? "✓ Paid"
                          : milestone.status === "in_progress"
                          ? "Payment Due"
                          : "Pending"}
                      </span>
                    </div>
                  </div>

                  {/* Payment Required Section - Responsive */}
                  {milestone.status === "in_progress" && !milestone.is_paid && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mt-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                        <div className="flex-1">
                          <p className="font-semibold text-yellow-800 text-sm sm:text-base">
                            Payment Required to Continue
                          </p>
                          <p className="text-yellow-700 text-xs sm:text-sm">
                            Complete this milestone payment to proceed to the
                            next phase.
                          </p>
                        </div>
                        <button className="bg-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-indigo-700 font-semibold flex items-center justify-center text-sm sm:text-base">
                          <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          Pay Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Payment Summary - Responsive */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-200 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
              <div>
                <p className="font-semibold text-blue-50 text-sm sm:text-base">
                  Payment Summary
                </p>
                <p className="text-blue-400 text-xs sm:text-sm">
                  {paidCount} of {projectData?.milestones.length} milestones
                  completed
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs sm:text-sm text-green-500">
                  Paid: ${paidAmount} | ${projectData?.total_cost}
                </p>
                <div className="w-full sm:w-48 bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: projectData?.progress }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
