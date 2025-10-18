import express, { Router } from "express";
import { isAdmin } from "../packages/middleware/authorizeRoles";
import {
  contactUsController,
  deleteUser,
  getAllUsers,
  getUserDetails,
  updateUserAndProfile,
} from "../controllers/user.controller";
import isAuthenticated from "../packages/middleware/isAuthenticated";

const router: Router = express.Router();

router.get("/user", isAuthenticated, isAdmin, getAllUsers);
router.get("/user/:id", getUserDetails);
router.patch("/user/:id", updateUserAndProfile);
router.delete("/user/:id", deleteUser);
router.post("/user/contact", contactUsController);

export default router;
