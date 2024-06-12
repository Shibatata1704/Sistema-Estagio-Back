import { Router } from "express";
import UserController from "../controllers/userController.js";

const registerRoutes = Router();

registerRoutes.post("/candidato", UserController.createUser);
registerRoutes.post("/empresa", UserController.createCompany);
// userRoutes.get("/", UserController.getUsers);


export default registerRoutes;