import mongoose from 'mongoose';

//error 
mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});


//database connection
export const connectDB = () => {
    mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log('MongoDB connected...'))
      .catch((error) => console.error(`Error connecting to MongoDB: ${error}`));
  
    return mongoose.connection;
  };