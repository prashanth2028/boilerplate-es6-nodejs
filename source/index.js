import dotenv from 'dotenv';
import app from './routes/route';
import { connectDB } from './config/DB_connection';

// load .env variables into process.env
dotenv.config();

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`prot is running on ${process.env.PORT}`);
});
