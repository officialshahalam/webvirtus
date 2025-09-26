import {  Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../configs/prisma";

// 👇 define JWT payload type
interface JwtPayload {
  id: string;
  role: "user" | "admin";
}

export const optionalAuth = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.cookies["access_token"] || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayload;

    const account = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        image: true,
        profile: true,
        projects: true,
      },
    });

    if (!account) {
      return res.status(401).json({ message: "Account not found" });
    }

    req.user = account;
    req.role = decoded?.role;
  } catch (err) {
    console.log("Invalid token, continuing as guest");
  }
  next();
};
