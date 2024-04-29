import { Router } from "express";
import UserController from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.post("/candidato", UserController.createUser);
// userRoutes.get("/", UserController.getUsers);
userRoutes.get("/", UserController.getUserByToken);
userRoutes.get("/email/:email", UserController.getUserByEmail);
userRoutes.put("/:id", UserController.updateUser);
userRoutes.delete("/:id", UserController.deleteUserById);

export default userRoutes;
