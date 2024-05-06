import { Router } from "express";
import UserController from "../controllers/userController.js";

const registerRoutes = Router();


registerRoutes.get("/", UserController.getUserByToken);
registerRoutes.get("/email/:email", UserController.getUserByEmail);
registerRoutes.put("/:id", UserController.updateUser);
registerRoutes.delete("/:id", UserController.deleteUserById);
//authRoutes.post("/register", AuthController.loginUser);

export default registerRoutes;

