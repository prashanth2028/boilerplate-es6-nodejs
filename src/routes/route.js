import app from '../config/express';
import authRouter from './auth-route';
import adminRoute from './admin-route';
import subAdminRoute from './subadmin-route';

app.use('/api/v1',authRouter);
app.use('/api/v1',adminRoute);
app.use('/api/v1',subAdminRoute);

export default app;