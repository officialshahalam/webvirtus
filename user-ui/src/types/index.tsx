export interface BoxProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

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

export interface DetailCostType {
  baseCost: { name: string; pages: number; costPerPage: number; total: number };
  designPremium: { name: string; percentage: number; amount: number };
  database: { name: string; technology: string; cost: number };
  deployment: { name: string; platform: string; cost: number };
  integrations: { name: string; cost: number }[];
  stack: StackType[];
}

export interface StackType {
  name: string;
  technology: string;
  multiplier: number;
  appliedCost: number;
}
