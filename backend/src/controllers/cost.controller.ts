import type { NextFunction, Request, Response } from "express";
import {
  calculateTotalCost,
  calculateTotalTime,
  generateCostExplanation,
  validateRequirements,
} from "../packages/utils/costCalHandler";
import { PRICING_CONFIG } from "../packages/constants/index";
import { RequirementFormData } from "../types";
import prisma from "../configs/prisma";
import { ValidationError } from "../packages/error-handler";

type milestoneType = {
  title: string;
  description: string;
  percentage: number;
  amount: number;
  is_paid: boolean;
  status: "completed" | "in_progress" | "pending";
  due_date: Date;
};

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
    const userId = (req as any).user?.id || null;
    validateRequirements(requirements);
    const totalCost = calculateTotalCost(requirements);
    const totalTime = calculateTotalTime(requirements);
    const detailCost = generateCostExplanation(requirements);

    const now = new Date();
    let cumulativeHours = 0;

    const milestoneTemplates: milestoneType[] = [
      {
        title: "Discovery & Planning",
        description: "Requirements analysis, wireframes, project scope",
        percentage: 10,
        amount: totalCost * 0.1,
        is_paid: false,
        status: "in_progress",
        due_date: new Date(
          now.getTime() + (cumulativeHours += totalTime * 0.1) * 60 * 60 * 1000
        ),
      },
      {
        title: "Design & Prototyping",
        description: "UI/UX design, mockups, design system",
        percentage: 10,
        amount: totalCost * 0.1,
        is_paid: false,
        status: "pending",
        due_date: new Date(
          now.getTime() + (cumulativeHours += totalTime * 0.1) * 60 * 60 * 1000
        ),
      },
      {
        title: "Development & Integrations",
        description: "Frontend & backend development, integrations",
        percentage: 50,
        amount: totalCost * 0.5,
        is_paid: false,
        status: "pending",
        due_date: new Date(
          now.getTime() + (cumulativeHours += totalTime * 0.5) * 60 * 60 * 1000
        ),
      },
      {
        title: "Testing",
        description: "Quality assurance and training",
        percentage: 20,
        amount: totalCost * 0.2,
        is_paid: false,
        status: "pending",
        due_date: new Date(
          now.getTime() + (cumulativeHours += totalTime * 0.2) * 60 * 60 * 1000
        ),
      },
      {
        title: "Deployment and delivery",
        description: "Deploy the project for the production",
        percentage: 10,
        amount: totalCost * 0.1,
        is_paid: false,
        status: "pending",
        due_date: new Date(
          now.getTime() + (cumulativeHours += totalTime * 0.1) * 60 * 60 * 1000
        ),
      },
    ];

    const nextDeadline = milestoneTemplates[0].due_date;

    const estimated_completion =
      milestoneTemplates[milestoneTemplates.length - 1].due_date;

    const project = await prisma.project.create({
      data: {
        title: requirements.title,
        no_of_page: Number(requirements.numberOfPages),
        ui_consideration: !!requirements.designConsideration,
        category: requirements.category,
        technologies: {
          create: {
            frontend: requirements.frontendTechnology,
            backend: requirements.backendTechnology,
            database: requirements.database,
            third_party_integration: requirements.thirdPartyIntegrations,
            deployment: requirements.deploymentPlatform,
          },
        },
        next_deadline: nextDeadline,
        total_cost: totalCost,
        detail_cost: {
          create: {
            ...detailCost,
          },
        },
        total_time: totalTime,
        milestones: {
          create: milestoneTemplates,
        },
        ...(userId && {
          owner: {
            connect: { id: userId },
          },
        }),
        estimated_completion: estimated_completion,
      },
      include: {
        technologies: true,
        detail_cost: true,
        milestones: true,
        owner: true,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Project is successfully created",
      project,
    });
  } catch (error) {
    return next(error);
  }
};

export const getUserCurrentProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let userId = req.params.userId;

    if (!userId) {
      return next(new ValidationError("User id is required"));
    }

    if (Array.isArray(userId)) {
      userId = userId[0];
    } else if (typeof userId !== "string") {
      return next(new ValidationError("Invalid user id"));
    }

    const project = await prisma.project.findFirst({
      where: {
        ownerId: userId,
      },
    });

    return res.json({ project });
  } catch (error) {
    return next(error);
  }
};

