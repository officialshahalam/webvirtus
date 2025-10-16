import express, { Router } from "express";
import {
  changePasswordUser,
  forgotPasswordUser,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPasswordUser,
  verifyForgotPasswordUser,
  verifyUser,
} from "../controllers/auth.controller";
import isAuthenticated from "../packages/middleware/isAuthenticated";
import { isUser } from "../packages/middleware/authorizeRoles";

const router: Router = express.Router();

router.post("/auth/registration-user", registerUser);
router.post("/auth/verify-user", verifyUser);
router.post("/auth/login-user", loginUser);
router.get("/auth/logged-in-user", isAuthenticated, isUser, getUser);
router.post("/auth/logout-user", logoutUser);
router.post("/auth/forgot-password-user", forgotPasswordUser);
router.post("/auth/verify-forgot-password-user", verifyForgotPasswordUser);
router.post("/auth/reset-password-user", resetPasswordUser);
router.post("/auth/change-password-user", isAuthenticated, changePasswordUser);

export default router;
