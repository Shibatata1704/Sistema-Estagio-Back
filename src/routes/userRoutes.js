import { Router } from "express";
import UserController from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.post("/candidato", UserController.createUser);
userRoutes.post("/empresa", UserController.createCompany);
// userRoutes.get("/", UserController.getUsers);


export default userRoutes;
