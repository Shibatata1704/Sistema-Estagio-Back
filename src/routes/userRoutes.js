import { Router } from "express";
import UserController from "../controllers/userController.js";

const UserRoutes = Router();


UserRoutes.get("/", UserController.getUserByToken);
UserRoutes.put("/", UserController.updateUser);
UserRoutes.delete("/", UserController.deleteUserById);
//UserRoutes.get("/email/:email", UserController.getUserByEmail);

//authRoutes.post("/User", AuthController.loginUser);

export default UserRoutes;

