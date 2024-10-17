import express from 'express';
import authController from '../controllers/auth-controller';
import auth from '../middelware/auth';
import authMiddleware from '../middelware/auth-middleware';
import { registerValidation , loginValidation } from '../validators/auth-validator';


const authRouter = express.Router();

//auth route
authRouter.post('/register',registerValidation, authController.register);
authRouter.post('/login' ,loginValidation ,authMiddleware.checkCredentials,authController.login);
authRouter.post('/logout',auth.check,authMiddleware.checkSessionToken ,authController.logout);




export default authRouter;