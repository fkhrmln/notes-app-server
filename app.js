import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './config/db.js';
import authRouter from './routes/AuthRoute.js';
import cookieParser from 'cookie-parser';
import notesRouter from './routes/NotesRoute.js';

const app = express();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;

dotenv.config();

connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/auth', authRouter);

app.use('/notes', notesRouter);

app.use('*', (req, res) => {
  return res.sendStatus(404);
});

mongoose.connection.once('open', () => {
  console.log('DB Connected');

  app.listen(PORT, HOST, () => console.log(`Server is running on http://${HOST}:${PORT}/`));
});
