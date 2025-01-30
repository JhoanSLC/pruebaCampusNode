import { Router } from 'express';
import { getAllUsers,updateUser,deleteUser,createUser,updateUserStatus } from '../controllers/user.controller.js';

const userRouter = new Router();

userRouter.get("/",getAllUsers);
userRouter.post("/",createUser);
userRouter.put("/:id",updateUser);
userRouter.delete("/:id",deleteUser);
userRouter.put("/status/:id",updateUserStatus);

export default userRouter;