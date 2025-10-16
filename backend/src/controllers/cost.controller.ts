import type { NextFunction, Request, Response } from "express";
import {
  calculateTotalCost,
  calculateTotalTime,
  generateCostExplanation,
  validateRequirements,
} from "../packages/utils/costCalHandler";
import { PRICING_CONFIG } from "../packages/constants/index";
import { RequirementFormData, milestoneType } from "../types";

export const getPricingInfo = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({
      success: true,
      data: {
        baseCostPerPage: PRICING_CONFIG.BASE_PAGE_COST,
        designPremium: `${PRICING_CONFIG.DESIGN_PREMIUM * 100}%`,
        taxRate: `${PRICING_CONFIG.TAX_RATE * 100}%`,
        frontendTechnologies: PRICING_CONFIG.FRONTEND_MULTIPLIERS,
        backendTechnologies: PRICING_CONFIG.BACKEND_MULTIPLIERS,
        databases: PRICING_CONFIG.DATABASE_COSTS,
        integrations: PRICING_CONFIG.INTEGRATION_COSTS,
        deploymentPlatforms: PRICING_CONFIG.DEPLOYMENT_COSTS,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const calculateCostAndTime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requirements: RequirementFormData = req.body;
    validateRequirements(requirements);
    const total_cost = calculateTotalCost(requirements);
    const total_time = calculateTotalTime(requirements);
    const detail_cost = generateCostExplanation(requirements);
    const now = new Date();
    let cumulativeHours = 0;
    const milestones: milestoneType[] = [
      {
        title: "Discovery & Planning",
        description: "Requirements analysis, wireframes, project scope",
        percentage: 10,
        amount: total_cost * 0.1,
        is_paid: false,
        status: "in_progress",
        due_date: new Date(
          now.getTime() + (cumulativeHours += total_time * 0.1) * 60 * 60 * 1000
        ),
      },
      {
        title: "Design & Prototyping",
        description: "UI/UX design, mockups, design system",
        percentage: 10,
        amount: total_cost * 0.1,
        is_paid: false,
        status: "pending",
        due_date: new Date(
          now.getTime() + (cumulativeHours += total_time * 0.1) * 60 * 60 * 1000
        ),
      },
      {
        title: "Development & Integrations",
        description: "Frontend & backend development, integrations",
        percentage: 50,
        amount: total_cost * 0.5,
        is_paid: false,
        status: "pending",
        due_date: new Date(
          now.getTime() + (cumulativeHours += total_time * 0.5) * 60 * 60 * 1000
        ),
      },
      {
        title: "Testing",
        description: "Quality assurance and training",
        percentage: 20,
        amount: total_cost * 0.2,
        is_paid: false,
        status: "pending",
        due_date: new Date(
          now.getTime() + (cumulativeHours += total_time * 0.2) * 60 * 60 * 1000
        ),
      },
      {
        title: "Deployment and delivery",
        description: "Deploy the project for the production",
        percentage: 10,
        amount: total_cost * 0.1,
        is_paid: false,
        status: "pending",
        due_date: new Date(
          now.getTime() + (cumulativeHours += total_time * 0.1) * 60 * 60 * 1000
        ),
      },
    ];

    return res.status(200).json({
      success: true,
      project: {
        title: requirements.title,
        total_cost,
        total_time,
        detail_cost,
        milestones,
      },
      message: "Project Cost Calculate successfully.",
    });
  } catch (error) {
    return next(error);
  }
};
