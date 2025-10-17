"use client";
import DashboardHeader from "@/shared/custom-components/DashboardHeader";
import { usedummyProjectStore } from "@/stores/dummyProjectStore";
import { useProjectStore } from "@/stores/projectStore";
import { useRequirementStore } from "@/stores/useRequirementStore";
import { useUserStore } from "@/stores/userStore";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  Bell,
  Building,
  Edit3,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Settings,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const clientProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    company: "Tech Innovations Inc",
    address: "123 Business Ave, Suite 100, New York, NY 10001",
    joinedDate: "November 1, 2024",
    projectsCompleted: 0,
    totalSpent: "$1,700",
  };

  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { clearUser } = useUserStore();
  const { clearProject } = useProjectStore();
  const { clearRequirement } = useRequirementStore();
  const { clearDummyProject } = usedummyProjectStore();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/auth/logout-user");
      return response.data;
    },
    onSuccess: () => {
      clearUser();
      clearProject();
      clearDummyProject();
      clearRequirement();
      router.push("/login");
    },
    onError: (error: AxiosError) => {
      console.error("Logout error:", error);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-blue-400">
      <DashboardHeader
        title="Profile"
        description="Manage your account settings and information"
      />

      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        {/* Profile Settings Card */}
        <div className="bg-blue-300 rounded-xl shadow-sm p-4 sm:p-6">
          {/* Header - Responsive */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-50">
              Profile Settings
            </h2>
            <button className="bg-blue-100 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-200 flex items-center justify-center text-sm sm:text-base">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          </div>

          {/* Profile Content - Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Profile Picture & Basic Info */}
            <div className="text-center lg:text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-blue-100" />
              </div>
              <h3 className="font-bold text-lg sm:text-xl text-blue-50">
                {clientProfile.name}
              </h3>
              <p className="text-blue-200 text-sm sm:text-base">
                {clientProfile.company}
              </p>
            </div>

            {/* Details Section - Responsive */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-blue-50 mb-2">
                    Full Name
                  </label>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-100 flex-shrink-0" />
                    <span className="text-blue-50 text-sm sm:text-base truncate">
                      {clientProfile.name}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-blue-50 mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-100 flex-shrink-0" />
                    <span className="text-blue-50 text-sm sm:text-base truncate">
                      {clientProfile.email}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-blue-50 mb-2">
                    Phone Number
                  </label>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-100 flex-shrink-0" />
                    <span className="text-blue-50 text-sm sm:text-base">
                      {clientProfile.phone}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-blue-50 mb-2">
                    Company
                  </label>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Building className="w-4 h-4 sm:w-5 sm:h-5 text-blue-100 flex-shrink-0" />
                    <span className="text-blue-50 text-sm sm:text-base truncate">
                      {clientProfile.company}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-blue-50 mb-2">
                  Address
                </label>
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-100 mt-1 flex-shrink-0" />
                  <span className="text-blue-50 text-sm sm:text-base leading-relaxed">
                    {clientProfile.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Account Overview */}
          <div className="bg-blue-300 rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="font-bold text-base sm:text-lg mb-3 text-blue-50">
              Account Overview
            </h3>
            <div className="space-y-2 sm:space-y-3 text-blue-50">
              <div className="flex justify-between items-center">
                <span className="text-blue-200 text-sm sm:text-base">
                  Member Since
                </span>
                <span className="font-semibold text-sm sm:text-base">
                  {clientProfile.joinedDate}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-200 text-sm sm:text-base">
                  Projects Completed
                </span>
                <span className="font-semibold text-sm sm:text-base">
                  {clientProfile.projectsCompleted}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-200 text-sm sm:text-base">
                  Total Spent
                </span>
                <span className="font-semibold text-blue-100 text-sm sm:text-base">
                  {clientProfile.totalSpent}
                </span>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-blue-300 rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="font-bold text-base sm:text-lg mb-3 text-blue-50">
              Notification Settings
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center text-blue-50 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mr-2 sm:mr-3 w-4 h-4 accent-blue-600"
                />
                <span className="text-sm sm:text-base">
                  Email notifications
                </span>
              </label>
              <label className="flex items-center text-blue-50 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mr-2 sm:mr-3 w-4 h-4 accent-blue-600"
                />
                <span className="text-sm sm:text-base">Project updates</span>
              </label>
              <label className="flex items-center text-blue-50 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mr-2 sm:mr-3 w-4 h-4 accent-blue-600"
                />
                <span className="text-sm sm:text-base">Payment reminders</span>
              </label>
            </div>
          </div>

          {/* Security */}
          <div className="bg-blue-300 rounded-xl shadow-sm p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-base sm:text-lg mb-3 text-blue-50">
              Security
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <button className="w-full text-left p-2 hover:bg-blue-400 rounded-lg flex items-center text-blue-50 transition-colors">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-blue-100 mr-2 sm:mr-3 flex-shrink-0" />
                <span className="text-sm sm:text-base">Change Password</span>
              </button>
              <button className="w-full text-left p-2 hover:bg-blue-400 rounded-lg flex items-center text-blue-50 transition-colors">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-blue-100 mr-2 sm:mr-3 flex-shrink-0" />
                <span className="text-sm sm:text-base">Privacy Settings</span>
              </button>
            </div>
          </div>
        </div>
        <button
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-red-500 hover:bg-red-400 transition-colors"
          onClick={() => setOpen(true)}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>

        {open && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setOpen(false)}
          >
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-[90%] max-w-md">
              <h2 className="text-2xl font-semibold mb-2">Confirm Logout</h2>
              <p className="text-gray-400 mb-6">
                Are you sure you want to log out from your account?
              </p>

              <div className="flex justify-between gap-4">
                <button
                  onClick={handleCancel}
                  className="px-5 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition-colors"
                  disabled={logoutMutation.isPending}
                >
                  {logoutMutation.isPending ? "Logging out..." : "Yes, Logout"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
