// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());

// Use routes
app.use('/api', userRoutes);

export default app;
