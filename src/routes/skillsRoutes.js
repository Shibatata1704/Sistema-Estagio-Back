import { Router } from "express";
import skillsController from "../controllers/skillsController.js";

const skillsRoutes = Router();

skillsRoutes.get("/", skillsController.createskills);

export default skillsRoutes;
