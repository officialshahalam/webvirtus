"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { useUserStore } from "@/stores/userStore";
import { useProjectStore } from "@/stores/projectStore";
import { useRequirementStore } from "@/stores/useRequirementStore";
import { usedummyProjectStore } from "@/stores/dummyProjectStore";

export default function LogoutPage() {
  const router = useRouter();
  const { clearUser } = useUserStore();
  const { clearProject } = useProjectStore();
  const { clearRequirement } = useRequirementStore();
  const { clearDummyProject } = usedummyProjectStore();

  useEffect(() => {
    const logoutHandler = async () => {
      await axiosInstance.post("/auth/logout-user");
      clearUser();
      clearProject();
      clearDummyProject();
      clearRequirement();
    };

    logoutHandler();
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-1 min-h-screen items-center justify-center bg-blue-500">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Logging you out...
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          You will be redirected shortly.
        </p>
      </div>
    </div>
  );
}
