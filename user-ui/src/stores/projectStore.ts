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

interface Technologies {
  id: string;
  frontend: string;
  backend: string;
  database: string;
  third_party_integration: string[];
  deployment: string;
  projectId: string;
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
 
export interface Project {
  id?: string;
  title: string;
  no_of_page?: number;
  design_consideration?: boolean;
  category?: string;
  total_cost: number;
  total_time: number;
  progress?: number; 
  current_phase?: string;
  live_url?: string | null;
  next_deadline?: string | null;
  estimated_completion?: string;
  ownerId?: string | null;
  technologies?: Technologies;
  detail_cost: DetailCost;
  milestones: Milestone[];
}

// ---------- Store ----------
interface ProjectStore {
  project: Project | null;
  setProject: (project: Project | null) => void;
  clearProject: () => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      project: null,
      setProject: (project) => set({ project }),
      clearProject: () => localStorage.removeItem("project-storage"),
    }),
    {
      name: "project-storage",
    }
  )
);
