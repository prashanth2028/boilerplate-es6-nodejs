import app from "../config/express";
import authRouter from "./auth_route";
import adminRoute from "./admin_route";
import subAdminRoute from "./subadmin_route";

app.use('/api/v1',authRouter);
app.use('/api/v1',adminRoute);
app.use('/api/v1',subAdminRoute);

export default app;