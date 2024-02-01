import { Router } from "express";
import userController from "../controllers/user.controller.js";


const userRouter = Router();

userRouter.get('/',userController.findAllUsers);
userRouter.get('/:idUser', userController.findUserById);
userRouter.post('/',userController.createUser);
userRouter.delete('/:idUser',userController.deleteUser);

export default userRouter;