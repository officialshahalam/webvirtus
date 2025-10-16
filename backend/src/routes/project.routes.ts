import express, { Router } from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectDetails,
  getUserProjects,
} from "../controllers/project.controller";
import isAuthenticated from "../packages/middleware/isAuthenticated";
import { isAdmin, isUser } from "../packages/middleware/authorizeRoles";

const router: Router = express.Router();

router.post("/project", isAuthenticated, isUser, createProject);
router.get("/project", isAuthenticated, isAdmin, getAllProjects);
router.get("/project/:id", getProjectDetails);
router.delete("/project/:id", isAuthenticated, isAdmin, deleteProject);
router.get("/project/user/:id", isAuthenticated, isUser, getUserProjects);

export default router;