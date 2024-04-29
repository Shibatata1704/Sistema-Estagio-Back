import { Router } from "express";
import AuthController from "../controllers/authController.js";

const authRoutes = Router();


authRoutes.post("/login", AuthController.loginUser);
authRoutes.post("/logout", AuthController.logout);
authRoutes.get("/login", AuthController.checkWhitelist);

//authRoutes.post("/register", AuthController.loginUser);

export default authRoutes;

