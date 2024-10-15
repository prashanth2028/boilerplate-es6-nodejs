import dotenv from 'dotenv';
import app from './config/express';

// load .env variables into process.env
dotenv.config();


app.listen(process.env.PORT, () => {
    console.log(`prot is running on ${process.env.PORT}`);
});
