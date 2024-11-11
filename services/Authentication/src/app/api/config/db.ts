// src/config/db.ts

import dotenv from "dotenv";
dotenv.config(); 
//import { env } from "../../../types/envTypes.js"
import pkg from 'pg';
const { Pool } = pkg;


// const db_host = env.HOST
// const db_port = env.DB_PORT
// const db_user = env.USER
// const db_password = env.PASSWORD
// const db = env.DATABASE

// const pool = new Pool({
//   host: db_host,
//   port: db_port,
//   user: db_user,
//   password: db_password,
//   database: db,
// });

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'user123',
    password: process.env.DB_PASSWORD || 'password123',
    database: process.env.DB_NAME || 'db123',
  });

export default pool;

