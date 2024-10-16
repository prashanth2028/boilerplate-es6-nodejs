import app from "../config/express";
import authRouter from "./auth_route";
import adminRoute from "./admin_route";

app.use('/api/v1',authRouter);
app.use('/api/v1',adminRoute);

export default app;