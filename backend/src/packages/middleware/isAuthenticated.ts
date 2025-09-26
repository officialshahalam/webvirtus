import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../configs/prisma/index";

const isAuthenticated = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token =
      req.cookies["access_token"] || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized! Token missing" });
    }

    let decoded: { id: string; role: "user" | "admin" };

    try {
      decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!
      ) as typeof decoded;
    } catch (err) {
      return res.status(401).json({ message: "Invalid access token" });
    }

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
    req.role = decoded.role;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export default isAuthenticated;
