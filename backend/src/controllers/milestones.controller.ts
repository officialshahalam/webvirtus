import { Request, Response, NextFunction } from "express";
import prisma from "../configs/prisma";

export const getMilestonesByProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectId = req.params.id;

    const milestones = await prisma.milestones.findMany({
      where: { projectId },
      orderBy: { createdAt: "asc" },
    });

    return res.status(200).json({
      success: true,
      milestones,
      message: "Milestones fetched successfully",
    });
  } catch (error) {
    console.error("Get Milestones Error:", error);
    return next(error);
  }
};

export const updateMilestoneStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "Status is required" });
    }

    const milestone = await prisma.milestones.update({
      where: { id },
      data: { status },
      include: { project: true },
    });

    if (!milestone.projectId) {
      return res.status(400).json({
        success: false,
        message: "Milestone is not associated with a project",
      });
    }

    const milestones = await prisma.milestones.findMany({
      where: { projectId: milestone.projectId },
    });

    const totalProgress = milestones
      .filter((m) => m.status === "completed")
      .reduce((sum, m) => sum + m.percentage, 0);

    const clampedProgress = Math.min(totalProgress, 100);

    const remainingMilestones = milestones.filter(
      (m) => m.status !== "completed"
    );

    const nextMilestone = remainingMilestones[0];

    let nextDeadline;
    if (nextMilestone) {
      nextDeadline = nextMilestone.due_date;
      await prisma.milestones.update({
        where: {
          id: nextMilestone.id,
        },
        data: {
          status: "in_progress",
        },
      });
    } else {
      nextDeadline = new Date();
    }

    let current_phase: any = "requirement_analysis";

    if (clampedProgress >= 10 && clampedProgress < 30)
      current_phase = "design_phase";
    else if (clampedProgress >= 30 && clampedProgress < 70)
      current_phase = "development_phase";
    else if (clampedProgress >= 70 && clampedProgress < 90)
      current_phase = "testing_phase";
    else if (clampedProgress >= 90 && clampedProgress < 100)
      current_phase = "deployment_phase";

    const updatedProject = await prisma.project.update({
      where: { id: milestone.projectId },
      data: {
        progress: clampedProgress,
        current_phase,
        next_deadline: nextDeadline,
      },
      include: {
        milestones: true,
      },
    });

    return res.status(200).json({
      success: true,
      updatedProject,
      message: `Milestone status updated to ${status}, project progress recalculated.`,
    });
  } catch (error) {
    console.error("Update Milestone Status Error:", error);
    return next(error);
  }
};

export const markMilestonePaid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const milestone = await prisma.milestones.update({
      where: { id },
      data: { is_paid: true },
    });

    return res.status(200).json({
      success: true,
      milestone,
      message: "Milestone marked as paid successfully",
    });
  } catch (error) {
    console.error("Mark Milestone Paid Error:", error);
    return next(error);
  }
};
