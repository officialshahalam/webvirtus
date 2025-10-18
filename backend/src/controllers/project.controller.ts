import { NextFunction, Request, Response } from "express";
import { MilestoneType, RequirementFormData } from "../types";
import {
  calculateTotalCost,
  calculateTotalTime,
  generateCostExplanation,
  validateRequirements,
} from "../packages/utils/costCalHandler";
import prisma from "../configs/prisma";

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requirements: RequirementFormData = req.body;
    const userId = (req as any).user?.id || null;
    validateRequirements(requirements);
    const total_cost = calculateTotalCost(requirements);
    const total_time = calculateTotalTime(requirements);
    const detail_cost = generateCostExplanation(requirements);

    const milestoneData = [
      {
        title: "Discovery & Planning",
        description: "Requirements analysis, wireframes, project scope",
        percentage: 0.1,
      },
      {
        title: "Design & Prototyping",
        description: "UI/UX design, mockups, design system",
        percentage: 0.2,
      },
      {
        title: "Development & Integrations",
        description: "Frontend & backend development, integrations",
        percentage: 0.4,
      },
      {
        title: "Testing",
        description: "Quality assurance and training",
        percentage: 0.2,
      },
      {
        title: "Deployment and delivery",
        description: "Deploy the project for the production",
        percentage: 0.1,
      },
    ];

    const adjustedTime = (total_time * 24) / 8;
    const now = new Date();

    let cumulativeHours = 0;

    const milestoneTemplates: MilestoneType[] = milestoneData.map(
      (milestone) => {
        const dueDate = new Date(
          now.getTime() + cumulativeHours * 60 * 60 * 1000
        );
        cumulativeHours += adjustedTime * milestone.percentage;

        return {
          title: milestone.title,
          description: milestone.description,
          percentage: milestone.percentage * 100,
          amount: total_cost * milestone.percentage,
          is_paid: false,
          status:
            milestone.title === "Discovery & Planning"
              ? "in_progress"
              : "pending",
          due_date: dueDate,
        };
      }
    );

    const nextDeadline = milestoneTemplates[0].due_date;

    const estimated_completion =
      milestoneTemplates[milestoneTemplates.length - 1].due_date;

    const project = await prisma.project.create({
      data: {
        title: requirements.title,
        no_of_page: Number(requirements.numberOfPages),
        design_consideration: !!requirements.designConsideration,
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
        total_cost: total_cost,
        detail_cost: {
          create: {
            ...detail_cost,
          },
        },
        total_time: total_time,
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
      },
    });
    return res.status(200).json({
      success: true,
      project,
      message: "Project is successfully created",
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllProjects = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        progress: { not: 100 },
        ownerId: { not: null },
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            profile: true,
          },
        },
        technologies: true,
        detail_cost: true,
        milestones: true,
        feedback: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: projects.length,
      projects,
      message: "All active (incomplete) projects fetched successfully",
    });
  } catch (error) {
    console.error("Get All Projects Error:", error);
    return next(error);
  }
};

export const getProjectDetails = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectId = req.params.id;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        message: "projectId ID not found in request context",
      });
    }

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
      },
      include: {
        technologies: true,
        detail_cost: true,
        milestones: true,
        feedback: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      project,
      message: "Project Details fetched successfully",
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteProject = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        technologies: true,
        detail_cost: true,
        milestones: true,
        feedback: true,
      },
    });

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    await prisma.$transaction(async (tx) => {
      if (project.technologies) {
        await tx.technologies.deleteMany({ where: { projectId: id } });
      }
      if (project.detail_cost) {
        await tx.detailCost.deleteMany({ where: { projectId: id } });
      }
      if (project.milestones?.length) {
        await tx.milestones.deleteMany({ where: { projectId: id } });
      }
      if (project.feedback) {
        await tx.feedback.deleteMany({ where: { projectId: id } });
      }

      await tx.project.delete({ where: { id } });
    });

    return res.status(200).json({
      success: true,
      message: "Project and all related data deleted successfully",
    });
  } catch (error) {
    console.error("Delete Project Error:", error);
    return next(error);
  }
};

export const getUserProjects = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID not found in request context",
      });
    }

    const projects = await prisma.project.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        technologies: true,
        detail_cost: true,
        milestones: true,
        feedback: true,
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: projects.length,
      projects,
      message: "Projects for this user fetched successfully",
    });
  } catch (error) {
    return next(error);
  }
};
