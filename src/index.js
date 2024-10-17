import dotenv from 'dotenv';
import app from './routes/route';
import { connectDB } from './config/db-config';
import { converter , notFound , handler} from './utlis/errorHandler';

// load .env variables into process.env
dotenv.config();

connectDB();

// if error is not an instanceOf APIError, convert it.
app.use(converter);

// catch 404 and forward to error handler
app.use(notFound);

// error handler, send stacktrace only during development
app.use(handler);

app.listen(process.env.PORT, () => {
    console.log(`prot is running on ${process.env.PORT}`);
});
