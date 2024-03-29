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
import blogsRoutes from './routes/blogs.route.js';
import authRoutes from './routes/auth.route.js';
// middlewares
const app = express();
const PORT = 5500;
dotenv.config();
connectDb();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/auth', authRoutes);
app.use('/blogs', blogsRoutes);

// listener
mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`App listens on PORT ${PORT}`);
  });
});
