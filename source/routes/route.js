import app from "../config/express";
import authRouter from "./auth_route";

app.use('/api/v1',authRouter);

export default app;