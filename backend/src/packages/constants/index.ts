import type {
  BackendType,
  DatabaseType,
  DeploymentType,
  FrontendType,
  IntegrationType,
} from "../../types/index";

export const PRICING_CONFIG = {
  BASE_PAGE_COST: 120,
  DESIGN_PREMIUM: 0.25,
  TAX_RATE: 0.08,
  FRONTEND_MULTIPLIERS: {
    nextjs: 0,
    reactjs: 0.15,
    angular: 0.2,
    expo: 0,
    reactNative: 0.15,
    flutter: 0.2,
  } as Record<FrontendType, number>,

  BACKEND_MULTIPLIERS: {
    expressjs: 0,
    springboot: 0.3,
    django: 0.2,
  } as Record<BackendType, number>,

  DATABASE_COSTS: {
    postgresql: 100,
    mongodb: 80,
  } as Record<DatabaseType, number>,

  INTEGRATION_COSTS: {
    emailIntegration: 150,
    paymentIntegration: 300,
    liveChat: 250,
    trackingIntegration: 150,
  } as Record<IntegrationType, number>,

  DEPLOYMENT_COSTS: {
    vercel: 60,
    netlify: 60,
    digitalocean: 100,
    aws: 100,
    googlePlayStore: 100,
    appleAppStore: 100,
    expoAppService: 50,
  } as Record<DeploymentType, number>,
};

export const TIME_CONFIG = {
  BASE_PAGE_TIME: 16,

  DESIGN_TIME: 0.35,

  FRONTEND_TIME_DAYS: {
    nextjs: 0,
    reactjs: 0.15, // Pure React needs extra setup time
    angular: 0.15, // Angular has steeper learning curve
    expo: 0, // Expo is streamlined for mobile
    reactNative: 0.15, // React Native needs native setup
    flutter: 0.15, // Flutter requires Dart expertise
  } as Record<FrontendType, number>,

  BACKEND_TIME_DAYS: {
    expressjs: 0, // Express.js is straightforward
    springboot: 0.25, // Spring Boot has more setup/config
    django: 0.2, // Django has good structure but learning curve
  } as Record<BackendType, number>,

  DATABASE_TIME_DAYS: {
    mongodb: 2, // NoSQL is often quicker to set up
    postgresql: 3, // SQL setup and schema design
  } as Record<DatabaseType, number>,

  INTEGRATION_TIME_DAYS: {
    emailIntegration: 8, // Email integration is straightforward
    paymentIntegration: 20, // Payment integration needs testing/security
    liveChat: 24, // Live chat needs real-time setup
    trackingIntegration: 16, // Analytics tracking is usually quick
  } as Record<IntegrationType, number>,

  DEPLOYMENT_TIME_DAYS: {
    vercel: 8, // Vercel is very quick to deploy
    netlify: 8, // Netlify is also quick
    digitalocean: 16, // Requires server setup
    aws: 24, // AWS has complex configuration
    googlePlayStore: 16, // App store approval process
    appleAppStore: 16, // iOS has longer approval process
    expoAppService: 16, // Expo service is streamlined
  } as Record<DeploymentType, number>,
};
