import { Router } from "express";
import skillsController from "../controllers/skillsController.js";

const skillsRoutes = Router();

skillsRoutes.get("/", skillsController.getSkills);

export default skillsRoutes;
