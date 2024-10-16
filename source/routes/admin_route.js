import express from "express";
import User_controller from "../controllers/User_controller";
import Auth from "../middelware/Auth";
import adminMiddelware from "../middelware/adminMiddelware";

const adminRoute = express.Router();

adminRoute.get('/users-list', Auth.check ,adminMiddelware.AdminMiddleware , User_controller.userLisr);



export default adminRoute;