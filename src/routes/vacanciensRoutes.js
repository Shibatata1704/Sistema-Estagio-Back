import { Router } from "express";
import vacanciesController from "../controllers/vacanciesController.js";

const vacanciesRoutes = Router();

vacanciesRoutes.post("/", vacanciesController.createVacancies);
vacanciesRoutes.get("/", vacanciesController.getVacanciesByToken);
vacanciesRoutes.get("/:id", vacanciesController.getVacancieByID);
vacanciesRoutes.put("/:id", vacanciesController.updateVacancies);
vacanciesRoutes.delete("/:id", vacanciesController.deleteVacanciesById);

export default vacanciesRoutes;
