// stores/useProjectStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BaseCost {
  name: string;
  pages: number;
  costPerPage: number;
  total: number;
}

interface DesignPremium {
  name: string;
  percentage: number;
  amount: number;
}

interface StackItem {
  name: string;
  technology: string;
  multiplier: number;
  appliedCost: number;
}

interface Database {
  name: string;
  technology: string;
  cost: number;
}

interface Integration {
  name: string;
  cost: number;
}

interface Deployment {
  name: string;
  platform: string;
  cost: number;
}

interface DetailCost {
  baseCost: BaseCost;
  designPremium: DesignPremium;
  stack: StackItem[];
  database: Database;
  integrations: Integration[];
  deployment: Deployment;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  percentage: number;
  amount: number;
  is_paid: boolean;
  due_date: string;
  status: string;
  projectId: string;
}

export interface DummyProject {
  title: string;
  total_cost: number;
  total_time: number;
  detail_cost: DetailCost;
  milestones: Milestone[];
}

// ---------- Store ----------
interface dummyProjectStore {
  dummyProject: DummyProject | null;
  setDummyProject: (dummyProject: DummyProject | null) => void;
  clearDummyProject: () => void;
}

export const useDummyProjectStore = create<dummyProjectStore>()(
  persist(
    (set) => ({
      dummyProject: null,
      setDummyProject: (dummyProject) => set({ dummyProject }),
      clearDummyProject: () => localStorage.removeItem("dummy-project-storage"),
    }),
    {
      name: "dummy-project-storage",
    }
  )
);
