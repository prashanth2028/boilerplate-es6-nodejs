import app from "../config/express";
import userRouter from "./user_route";

app.use('/api/v1',userRouter);

export default app;