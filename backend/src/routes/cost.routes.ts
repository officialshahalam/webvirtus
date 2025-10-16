import express, { Router } from "express";
import {
  calculateCostAndTime,
  getPricingInfo,
} from "../controllers/cost.controller";

const router: Router = express.Router();

router.get("/cost/pricing", getPricingInfo);
router.post("/cost/calculate", calculateCostAndTime);


export default router;