import type {
  BackendType,
  DatabaseType,
  DeploymentType,
  FrontendType,
  IntegrationType,
  RequirementFormData,
} from "../../types/index";
import { PRICING_CONFIG, TIME_CONFIG } from "../constants/index";
import { ValidationError } from "../error-handler/index"; 

export const validateRequirements = (requirements: RequirementFormData) => {
  if (!requirements.numberOfPages || requirements.numberOfPages < 1) {
    throw new ValidationError("numberOfPages must be a positive number");
  }

  if (!requirements.category) {
    throw new ValidationError("Category is required");
  }

  const validFrontendTech: FrontendType[] = [
    "nextjs",
    "reactjs",
    "angular",
    "expo",
    "reactNative",
    "flutter",
  ];
  if (!validFrontendTech.includes(requirements.frontendTechnology)) {
    throw new ValidationError("Invalid frontend technology");
  }

  const validBackendTech: BackendType[] = ["expressjs", "springboot", "django"];
  if (!validBackendTech.includes(requirements.backendTechnology)) {
    throw new ValidationError("Invalid backend technology");
  }

  const validDatabases: DatabaseType[] = ["postgresql", "mongodb"];
  if (!validDatabases.includes(requirements.database)) {
    throw new ValidationError("Invalid database");
  }

  const validIntegrations: IntegrationType[] = [
    "emailIntegration",
    "paymentIntegration",
    "liveChat",
    "trackingIntegration",
  ];

  if (
    requirements.thirdPartyIntegrations &&
    requirements.thirdPartyIntegrations.length > 0
  ) {
    const invalidOnes = requirements.thirdPartyIntegrations.filter(
      (integration) => !validIntegrations.includes(integration)
    );

    if (invalidOnes.length > 0) {
      throw new ValidationError(
        `Invalid third party integration(s): ${invalidOnes.join(", ")}`
      );
    }
  }

  const validDeployment: DeploymentType[] = [
    "vercel",
    "digitalocean",
    "aws",
    "netlify",
    "googlePlayStore",
    "appleAppStore",
    "expoAppService",
  ];
  if (!validDeployment.includes(requirements.deploymentPlatform)) {
    throw new ValidationError("Invalid deployment platform");
  }
};

export const calculateBaseCost = (numberOfPages: number): number => {
  return Math.round(numberOfPages * PRICING_CONFIG.BASE_PAGE_COST);
};

export const calculateBaseTime = (numberOfPages: number): number => {
  return Math.round(numberOfPages * TIME_CONFIG.BASE_PAGE_TIME);
};

export const calculateDesignPremium = (baseCost: number): number => {
  return Math.round(baseCost * PRICING_CONFIG.DESIGN_PREMIUM);
};
export const calculateDesignTime = (baseTime: number): number => {
  return Math.round(baseTime * TIME_CONFIG.DESIGN_TIME);
};

export const calculateTechnologyCost = (
  baseCost: number,
  requirements: RequirementFormData
): number => {
  const frontendMultiplier =
    PRICING_CONFIG.FRONTEND_MULTIPLIERS[requirements.frontendTechnology] || 0;
  const backendMultiplier =
    PRICING_CONFIG.BACKEND_MULTIPLIERS[requirements.backendTechnology] || 0;
  const databaseCost =
    PRICING_CONFIG.DATABASE_COSTS[requirements.database] || 0;

  const frontendCost = Math.round(baseCost * frontendMultiplier);
  const backendCost = Math.round(baseCost * backendMultiplier);

  return frontendCost + backendCost + databaseCost;
};

export const calculateTechnologyTime = (
  baseTime: number,
  requirements: RequirementFormData
): number => {
  const frontendMultiplier =
    TIME_CONFIG.FRONTEND_TIME_DAYS[requirements.frontendTechnology] || 0;
  const backendMultiplier =
    TIME_CONFIG.BACKEND_TIME_DAYS[requirements.backendTechnology] || 0;
  const databaseTime =
    TIME_CONFIG.DATABASE_TIME_DAYS[requirements.database] || 0;

  const frontendTime = Math.round(baseTime * frontendMultiplier);
  const backendTime = Math.round(baseTime * backendMultiplier);

  return frontendTime + backendTime + databaseTime;
};

export const calculateIntegrationCost = (
  thirdPartyIntegrations?: IntegrationType[]
): number => {
  if (!thirdPartyIntegrations || thirdPartyIntegrations.length === 0) {
    return 0;
  }

  return thirdPartyIntegrations.reduce((total, integration) => {
    return (
      total + PRICING_CONFIG.INTEGRATION_COSTS[integration as IntegrationType]
    );
  }, 0);
};

export const calculateIntegrationTime = (
  thirdPartyIntegrations?: IntegrationType[]
): number => {
  if (!thirdPartyIntegrations || thirdPartyIntegrations.length === 0) {
    return 0;
  }

  return thirdPartyIntegrations.reduce((total, integration) => {
    return (
      total + TIME_CONFIG.INTEGRATION_TIME_DAYS[integration as IntegrationType]
    );
  }, 0);
};

export const calculateDeploymentCost = (
  deploymentPlatform: DeploymentType
): number => {
  return PRICING_CONFIG.DEPLOYMENT_COSTS[deploymentPlatform] || 0;
};

export const calculateDeploymentTime = (
  deploymentPlatform: DeploymentType
): number => {
  return TIME_CONFIG.DEPLOYMENT_TIME_DAYS[deploymentPlatform] || 0;
};

export const calculateTotalCost = (requirements: RequirementFormData) => {
  const baseCost = calculateBaseCost(requirements.numberOfPages);
  let designPremium = 0;
  if (requirements.designConsideration === "yes") {
    designPremium = calculateDesignPremium(baseCost);
  }

  const technologyCost = calculateTechnologyCost(baseCost, requirements);
  const integrationCost = calculateIntegrationCost(
    requirements.thirdPartyIntegrations
  );
  const deploymentCost = calculateDeploymentCost(
    requirements.deploymentPlatform
  );
  const totalCost =
    baseCost +
    designPremium +
    technologyCost +
    integrationCost +
    deploymentCost;

  return totalCost;
};

export const calculateTotalTime = (
  requirements: RequirementFormData
): number => {
  const baseTime = calculateBaseTime(requirements.numberOfPages);

  let designTime = 0;
  if (requirements.designConsideration === "yes") {
    designTime = calculateDesignTime(baseTime);
  }

  const technologyTime = calculateTechnologyTime(baseTime, requirements);
  const integrationTime = calculateIntegrationTime(
    requirements.thirdPartyIntegrations
  );
  const deploymentTime = calculateDeploymentTime(
    requirements.deploymentPlatform
  );
  const totalTime =
    baseTime + designTime + technologyTime + integrationTime + deploymentTime;

  return Math.round(totalTime);
};

export const generateCostExplanation = (requirements: RequirementFormData) => {
  const baseCost = calculateBaseCost(requirements.numberOfPages);

  const data: any = {
    baseCost: {
      name: "Base Cost",
      pages: Number(requirements.numberOfPages),
      costPerPage: PRICING_CONFIG.BASE_PAGE_COST,
      total: baseCost,
    },
  };

  // Design premium
  let designCost = 0;
  let percentage = 0;
  if (requirements.designConsideration === "yes") {
    designCost = calculateDesignPremium(baseCost);
    percentage = PRICING_CONFIG.DESIGN_PREMIUM * 100;
  }

  data.designPremium = {
    name: "Design Cost",
    percentage: percentage,
    amount: designCost,
  };

  //Stack
  const frontendMultiplier =
    PRICING_CONFIG.FRONTEND_MULTIPLIERS[requirements.frontendTechnology] || 0;
  const backendMultiplier =
    PRICING_CONFIG.BACKEND_MULTIPLIERS[requirements.backendTechnology] || 0;

  data.stack = [
    {
      name: "Frontend",
      technology: requirements.frontendTechnology,
      multiplier: frontendMultiplier,
      appliedCost: Math.round(baseCost * frontendMultiplier),
    },
    {
      name: "Backend",
      technology: requirements.backendTechnology,
      multiplier: backendMultiplier,
      appliedCost: Math.round(baseCost * backendMultiplier),
    },
  ];

  // Database
  data.database = {
    name: "Database",
    technology: requirements.database,
    cost: PRICING_CONFIG.DATABASE_COSTS[requirements.database] || 0,
  };

  // Integrations
  const integrations = requirements.thirdPartyIntegrations ?? [];
  if (integrations.length > 0) {
    data.integrations = integrations.map((integration) => ({
      name: integration,
      cost: PRICING_CONFIG.INTEGRATION_COSTS[integration] || 0,
    }));
  } else {
    data.integrations = [{ name: "No Integration", cost: 0 }];
  }

  // Deployment 
  data.deployment = {
    name: "Deployment",
    platform: requirements.deploymentPlatform || "none",
    cost: PRICING_CONFIG.DEPLOYMENT_COSTS[requirements.deploymentPlatform] || 0,
  };

  return data;
};
