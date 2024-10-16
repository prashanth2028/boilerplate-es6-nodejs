import express from 'express';
import AuthController from '../controllers/Auth_controller';
import Auth from '../middelware/Auth';
import authMiddleware from '../middelware/authMiddleware';
import { registerValidation , loginValidation } from '../validators/Auth_validator';


const authRouter = express.Router();

//auth route
authRouter.post('/register',registerValidation, AuthController.register);
authRouter.post('/login' ,loginValidation ,authMiddleware.checkCredentials,AuthController.login);
authRouter.post('/logout',Auth.check,authMiddleware.checkSessionToken ,AuthController.logout);




export default authRouter;