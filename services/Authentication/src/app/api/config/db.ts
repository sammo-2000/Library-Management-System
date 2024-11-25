// src/config/db.ts

import dotenv from "dotenv";
dotenv.config(); 
//import { env } from "../../../types/envTypes.js"
import pkg from 'pg';
const { Pool } = pkg;


const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'user123',
    password: process.env.DB_PASSWORD || 'password123',
    database: process.env.DB_NAME || 'db123',
  });

export default pool;

