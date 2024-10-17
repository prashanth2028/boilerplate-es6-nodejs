import dotenv from 'dotenv';
import app from './routes/route';
import { connectDB } from './config/db-config';
import { converter , notFound , handler} from './utlis/errorHandler';
import Io from 'socket.io';
import { commonSocket } from './socket/common-config-socket';

// load .env variables into process.env
dotenv.config();

connectDB();

// if error is not an instanceOf APIError, convert it.
app.use(converter);

// catch 404 and forward to error handler
app.use(notFound);

// error handler, send stacktrace only during development
app.use(handler);

const server = app.listen(process.env.PORT, () => {
    console.log(`prot is running on ${process.env.PORT}`);
});

const io = Io(server);

commonSocket(io);

// io.on('connection',(socket)=>{

//     socket.on('connect_error',()=>{
//         console.log("somethink went wrong in connection"); 
//     })
//     socket.on('disconnect',()=>{
//         console.log("connection is disconnected");
//     })
//     console.log("hello from client side");
//     io.emit("prashanth","hello prashanth");
//     // setInterval(()=>{
//     //     io.emit("prashanth","hello prashanth");
//     // },1000)
    
// })
