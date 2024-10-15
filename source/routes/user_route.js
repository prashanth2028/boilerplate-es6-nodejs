import express from 'express';
import AuthController from '../controllers/Auth_controller';
import Auth from '../middelware/Auth';


const userRouter = express.Router();

//auth route
userRouter.post('/register', AuthController.register);
userRouter.post('/login',AuthController.login);
userRouter.post('/logout',Auth.check,AuthController.logout);




export default userRouter;