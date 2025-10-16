import express, { Router } from "express";
import {
  getMilestonesByProject,
  updateMilestoneStatus,
} from "../controllers/milestones.controller";
import isAuthenticated from "../packages/middleware/isAuthenticated";
import { isAdmin } from "../packages/middleware/authorizeRoles";

const router: Router = express.Router();

router.get("/milestones/project/:id", getMilestonesByProject);
router.patch("/milestones/:id/status", isAuthenticated, isAdmin, updateMilestoneStatus);

export default router;
