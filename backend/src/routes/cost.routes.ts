import express, { Router } from "express";
import {
  calculateCostAndTime,
  getPricingInfo,
  getUserCurrentProject,
} from "../controllers/cost.controller";
import { optionalAuth } from "../packages/middleware/optionalAuth";
import isAuthenticated from "../packages/middleware/isAuthenticated";

const router: Router = express.Router();

router.get("/pricing", getPricingInfo);
router.post("/project-cost-calculation", optionalAuth, calculateCostAndTime);
router.get("/user-project/:userId", isAuthenticated,getUserCurrentProject);

export default router;
