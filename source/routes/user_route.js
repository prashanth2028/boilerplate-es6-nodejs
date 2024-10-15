import express from 'express';
import AuthController from '../controllers/Auth_controller';


const userRouter = express.Router();

//auth route
userRouter.post('/register', AuthController.register);
userRouter.post('/login',AuthController.login);
userRouter.post('/logout',AuthController.logout);




export default userRouter;