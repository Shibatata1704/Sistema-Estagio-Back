import { Router } from "express";
import BranchesController from "../controllers/branchesController.js";

const branchesRoutes = Router();

branchesRoutes.get("/", BranchesController.getBranches);

export default branchesRoutes;