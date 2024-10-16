import express from "express";
import subAdmin_controller from "../controllers/subAdmin_controller";
import Auth from "../middelware/Auth";
import adminMiddelware from "../middelware/adminMiddelware";
import { subAdminValidation } from "../validators/subAdmin_validator";



const subAdminRoute = express.Router();

subAdminRoute.post('/sub-admin/create',subAdminValidation, Auth.check ,adminMiddelware.AdminMiddleware , subAdmin_controller.createSubAdmin);
subAdminRoute.get('/subadmins-list', Auth.check ,adminMiddelware.AdminMiddleware , subAdmin_controller.subAdminList);
subAdminRoute.put('/subadmins-update/:id',subAdminValidation , Auth.check ,adminMiddelware.AdminMiddleware , subAdmin_controller.subAdminUpdate);
subAdminRoute.delete('/subadmins-delete/:id', Auth.check ,adminMiddelware.AdminMiddleware , subAdmin_controller.subAdminDelete);


export default subAdminRoute;