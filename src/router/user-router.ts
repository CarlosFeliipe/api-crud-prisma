import { Router } from "express";
import UserController from "../app/modules/user/controllers/user-controller";
import UserRepository from "../app/modules/user/repository/user-repository";
import UserService from "../app/modules/user/services/user-service";

const userRouter = Router();

const instanceController = new UserController(
  new UserService(new UserRepository())
);

userRouter.post("/user", instanceController.handle);

export default userRouter;
