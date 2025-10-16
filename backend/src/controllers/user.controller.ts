import { NextFunction, Request, Response } from "express";
import prisma from "../configs/prisma";

export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany({
      where: {},
      include: {
        image: true,
        profile: true,
        projects: {
          orderBy: { createdAt: "desc" },
          include: {
            technologies: true,
            detail_cost: true,
            milestones: true,
            feedback: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      users,
      message: "All users are fetched successfully",
    });
  } catch (error) {
    return next(error);
  }
};

export const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const users = await prisma.user.findUnique({
      where: { id },
      include: {
        image: true,
        profile: true,
        projects: {
          orderBy: { createdAt: "desc" },
          include: {
            technologies: true,
            detail_cost: true,
            milestones: true,
            feedback: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      users,
      message: "All users are fetched successfully",
    });
  } catch (error) {
    return next(error);
  }
};

export const updateUserAndProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      image,
      company_name,
      gender,
      position,
      phone_number,
      address,
    } = req.body;

    const user = await prisma.user.findUnique({
      where: { id },
      include: { image: true, profile: true },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const updatedUser = await prisma.$transaction(async (tx) => {
      const updated = await tx.user.update({
        where: { id },
        data: {
          name: name ?? user.name,
          email: email ?? user.email,
          ...(image && {
            image: {
              update: {
                url: image.url ?? user?.image?.url,
              },
            },
          }),
          profile: {
            upsert: {
              update: {
                company_name: company_name ?? user.profile?.company_name,
                gender: gender ?? user.profile?.gender,
                position: position ?? user.profile?.position,
                phone_number: phone_number ?? user.profile?.phone_number,
                address: address ?? user.profile?.address,
                updatedAt: new Date(),
              },
              create: {
                company_name: company_name || "",
                gender: gender || "male",
                position: position || "",
                phone_number: phone_number || "",
                address: address || "",
              },
            },
          },
        },
        include: { profile: true, image: true },
      });

      return updated;
    });

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "User and profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        image: true,
        projects: true,
        feedback: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await prisma.$transaction(async (tx) => {
      // Delete user’s feedbacks
      await tx.feedback.deleteMany({
        where: { userId: id },
      });

      // Delete user’s image if exists
      if (user.image) {
        await tx.image.deleteMany({
          where: { userId: id },
        });
      }

      // Delete user’s profile if exists
      if (user.profile) {
        await tx.profile.deleteMany({
          where: { userId: id },
        });
      }

      // Delete all user’s projects and their subdocuments
      for (const project of user.projects) {
        // Delete project detail cost
        await tx.detailCost.deleteMany({
          where: { projectId: project.id },
        });

        // Delete technologies
        await tx.technologies.deleteMany({
          where: { projectId: project.id },
        });

        // Delete milestones
        await tx.milestones.deleteMany({
          where: { projectId: project.id },
        });

        // Delete feedback related to project
        await tx.feedback.deleteMany({
          where: { projectId: project.id },
        });
      }

      // Finally delete projects
      await tx.project.deleteMany({
        where: { ownerId: id },
      });

      // Finally delete the user itself
      await tx.user.delete({
        where: { id },
      });
    });

    return res.status(200).json({
      success: true,
      message: "User and all related records deleted successfully",
    });
  } catch (error) {
    console.error("Delete User Error:", error);
    return next(error);
  }
};
