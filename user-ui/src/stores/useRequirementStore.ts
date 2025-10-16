import { create } from "zustand";
import { persist } from "zustand/middleware";

// ---------- Types ----------
export type FrontendType =
  | "nextjs"
  | "reactjs"
  | "angular"
  | "expo"
  | "reactNative"
  | "flutter";

export type BackendType = "expressjs" | "springboot" | "django";

export type DatabaseType = "postgresql" | "mongodb";

export type IntegrationType =
  | "emailIntegration"
  | "paymentIntegration"
  | "liveChat"
  | "trackingIntegration";

export type DeploymentType =
  | "vercel"
  | "digitalocean"
  | "aws"
  | "netlify"
  | "googlePlayStore"
  | "appleAppStore"
  | "expoAppService";

export type Categories =
  | "e_comerce"
  | "educational"
  | "business"
  | "portfolio"
  | "blog"
  | "other";

export interface RequirementFormData {
  title?: string;
  numberOfPages: number;
  designConsideration: "yes" | "no";
  category: Categories;
  frontendTechnology: FrontendType;
  backendTechnology: BackendType;
  database: DatabaseType;
  thirdPartyIntegrations?: IntegrationType[];
  deploymentPlatform: DeploymentType;
}

// ---------- Store ----------
interface RequirementStore {
  requirement: RequirementFormData | null;
  setRequirement: (data: RequirementFormData) => void;
  clearRequirement: () => void;
}

export const useRequirementStore = create<RequirementStore>()(
  persist(
    (set, _get) => ({
      requirement: null,
      setRequirement: (data) => set({ requirement: data }),
      clearRequirement: () => localStorage.removeItem("requirement-storage"),
    }),
    {
      name: "requirement-storage", // localStorage key
      // storage: createJSONStorage(() => sessionStorage), // uncomment for session-based persistence
    }
  )
);
