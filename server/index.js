// dependencies
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// configs
import corsOptions from './config/corsOption.js';
import connectDb from './config/connectDb.js';

// route
import blogsroutes from './routes/blogs.route.js';

// middlewares
const app = express();
const PORT = 5500;
dotenv.config();
connectDb();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/blogs', blogsroutes);

// listener
mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`App listens on PORT ${PORT}`);
  });
});
