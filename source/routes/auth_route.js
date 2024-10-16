import express from 'express';
import AuthController from '../controllers/Auth_controller';
import Auth from '../middelware/Auth';
import authMiddleware from '../middelware/authMiddleware';


const authRouter = express.Router();

//auth route
authRouter.post('/register', AuthController.register);
authRouter.post('/login',authMiddleware.checkCredentials,AuthController.login);
authRouter.post('/logout',Auth.check,authMiddleware.checkSessionToken ,AuthController.logout);




export default authRouter;