import express from 'express';
import userController from '../controllers/user-controller';
import auth from '../middelware/auth';
import adminMiddelware from '../middelware/admin-middelware';

const adminRoute = express.Router();

adminRoute.get('/users-list', auth.check ,adminMiddelware.AdminMiddleware , userController.userLisr);



export default adminRoute;