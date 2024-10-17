import express from 'express';
import subAdminController from '../controllers/subadmin-controller';
import auth from '../middelware/auth';
import adminMiddelware from '../middelware/admin-middelware';
import { subAdminValidation } from '../validators/subadmin-validator';



const subAdminRoute = express.Router();

subAdminRoute.post('/sub-admin/create',subAdminValidation, auth.check ,adminMiddelware.AdminMiddleware , subAdminController.createSubAdmin);
subAdminRoute.get('/subadmins-list', auth.check ,adminMiddelware.AdminMiddleware , subAdminController.subAdminList);
subAdminRoute.put('/subadmins-update/:id',subAdminValidation , auth.check ,adminMiddelware.AdminMiddleware , subAdminController.subAdminUpdate);
subAdminRoute.delete('/subadmins-delete/:id', auth.check ,adminMiddelware.AdminMiddleware , subAdminController.subAdminDelete);


export default subAdminRoute;