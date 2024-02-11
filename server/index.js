import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import corsOptions from './config/corsOption.js';

const app = express();
const PORT = 5500;
dotenv.config();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get('/blogs');
app.get('/blogs', (req, res) => {
  res.json('Welcome to our api');
});

app.listen(PORT, () => {
  console.log(`App listens on PORT ${PORT}`);
});
