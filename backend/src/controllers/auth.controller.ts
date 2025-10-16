import type { NextFunction, Request, Response } from "express";

import bcrypt from "bcryptjs";

import {
  verifyOtp,
  sendOtp,
  setCookie,
  traceOtpRequests,
  validateRegistrationData,
  verifyForgotPasswordOtp,
  checkOtpRestrictions,
} from "../packages/utils/auth.hepler";
import jwt from "jsonwebtoken";
import { AuthError, ValidationError } from "../packages/error-handler";
import prisma from "../configs/prisma";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email } = req.body;
    validateRegistrationData({ name, email, userType: "user" });
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return next(new ValidationError("User already exist with this email"));
    }
    await checkOtpRestrictions(email);
    await traceOtpRequests(email);
    await sendOtp(name, email, "user-activation-mail");
    return res.status(200).json({
      message: "OTP sent to email ! please Verify your account",
    });
  } catch (e) {
    return next(e);
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, otp } = req.body;
    if (!name || !email || !password || !otp) {
      return next(new ValidationError("All field are required!"));
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return next(new ValidationError("User already exist with this email"));
    }
    await verifyOtp(email, otp);
    const hashPassword = await bcrypt.hash(password, 10);
    const avatar = {
      url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        name
      )}`,
    };

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        image: {
          create: avatar,
        },
        profile: {
          create: {
            company_name: "",
            address: "",
          },
        },
      },
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (e) {
    return next(e);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ValidationError("email and passward are required"));
    }
    const user = await prisma.user.findUnique({
      where: { email },
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

    if (!user) {
      return next(
        new AuthError("User does'not Exist !Please register first then login")
      );
    }

    const ismatch = await bcrypt.compare(password, user.password!);
    if (!ismatch) {
      return next(new AuthError("Invalid email or password"));
    }

    const accessToken = await jwt.sign(
      { id: user.id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "7d" }
    );

    setCookie("access_token", accessToken, res);

    res.status(200).json({
      success: true,
      user,
      message: "User LogedIn Successfully",
    });
  } catch (e) {
    return next(e);
  }
};

export const getUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(error);
  }
};

export const logoutUser = async (
  _req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("access_token");
    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return next(error);
  }
};

export const forgotPasswordUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    if (!email) {
      throw new ValidationError("Email is required");
    }
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new ValidationError(`user not found`);
    }

    await checkOtpRestrictions(email);
    await traceOtpRequests(email);
    await sendOtp(user.name!, email, "forgot-password-user-mail");
    res.status(200).json({
      message: "OTP sent to email. Please verify your account",
    });
  } catch (error) {
    next(error);
  }
};

export const verifyForgotPasswordUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp } = req.body;
    await verifyForgotPasswordOtp(email, otp, res, next);
  } catch (error) {
    return next(error);
  }
};

export const resetPasswordUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return next(new ValidationError("Email and New Passwor dare required"));
    }
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      return next(new ValidationError("User not Found!"));
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password!);
    if (isSamePassword) {
      return next(
        new ValidationError(
          "new password can not be the same as the old password"
        )
      );
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { email },
      data: { password: hashPassword },
    });
    return res.status(200).json({
      success: true,
      message: "Password reset Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const changePasswordUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const id = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return res.status(200).json({
      success: true,
      message: "Password Change Successfully",
    });
  } catch (error) {
    next(error);
  }
};
