export type Categories =
  | "e_commerce"
  | "educational"
  | "healthcare"
  | "business"
  | "portfolio"
  | "blog"
  | "other";

export type FrontendType =
  | "nextjs"
  | "reactjs"
  | "angular"
  | "expo"
  | "reactNative"
  | "flutter";
export type BackendType = "expressjs" | "springboot" | "django";
export type DatabaseType = "postgresql" | "mongodb";
export type DeploymentType =
  | "vercel"
  | "digitalocean"
  | "aws"
  | "netlify"
  | "googlePlayStore"
  | "appleAppStore"
  | "expoAppService";
export type IntegrationType =
  | "emailIntegration"
  | "paymentIntegration"
  | "liveChat"
  | "trackingIntegration";

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

export interface CostBreakdown {
  baseCost: number;
  technologyCost: number;
  integrationCost: number;
  deploymentCost: number;
  designPremium: number;
  total: number;
}
