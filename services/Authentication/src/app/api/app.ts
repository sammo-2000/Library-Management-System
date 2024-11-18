// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Allow your frontend's origin
    credentials: true, // Allow cookies to be sent
  }));

app.use(express.json());
// Use routes
app.use('/api', userRoutes);

export default app;
