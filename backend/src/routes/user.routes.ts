import { Router } from "express";
import { UserController } from "../controller/userController";

const userRoutes = Router();
const controller = new UserController();

userRoutes.post("/", controller.create);

export default userRoutes;
