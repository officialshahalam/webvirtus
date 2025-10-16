"use client";
import { useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useUserStore } from "@/stores/userStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function LogoutPage() {
  const { clearUser } = useUserStore();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/auth/logout-user");
      return response.data;
    },
    onSuccess: () => {
      clearUser();
      window.location.reload();
    },
    onError: (error: AxiosError) => {
      console.log("error", error);
    },
  });

  useEffect(() => {
    logoutMutation.mutate();
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
