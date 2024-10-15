import express from 'express';
import AuthController from '../controllers/Auth_controller';


const userRouter = express.Router();

userRouter.post('/register', AuthController.register)




export default userRouter;