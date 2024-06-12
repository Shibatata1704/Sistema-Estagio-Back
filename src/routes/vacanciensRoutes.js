import { Router } from "express";
import vacanciesController from "../controllers/vacanciesController.js";

const vacanciesRoutes = Router();

vacanciesRoutes.get("/", vacanciesController.createVacancies);

export default vacanciesRoutes;
