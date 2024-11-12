// // src/controllers/userController.ts

import { Request, Response, NextFunction } from 'express';
import pool from '../config/db.js';
import { UserSchema } from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import dotenv from "dotenv";
dotenv.config();  


import { env } from "../../../types/envTypes.js"
const secret_token = env.JWT_SECRET;

export const addUser = async(req: Request, res: Response) => {
 
  try {
    const userData = UserSchema.parse(req.body);

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      await pool.query(`
  INSERT INTO users (username, password, user_role, first_name, last_name, email, created_at)
  VALUES ($1, $2, $3, $4, $5, $6, NOW())
`, [ userData.username,
    hashedPassword,
    userData.user_role,
    userData.first_name,
    userData.last_name,
    userData.email,])
  res.status(200).send({message : "user registration successful"})
   }
   catch (err) {
    if (err instanceof z.ZodError) {
        // Return a 400 response with the validation errors
         res.status(400).json({ errors: err.errors });
         return;
      }
       console.log(err)
       res.sendStatus(500)
   }
}

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
      // Fetch user from the database by email
      const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
      const user = rows[0];

      // Check if user exists and password is correct
      if (user && await bcrypt.compare(password, user.password)) {
          // Create a JWT token (replace 'your_jwt_secret' with your actual secret key)
          const token = jwt.sign(
              { userId: user.id, role: user.user_role },
              secret_token,
              { expiresIn: '1h' }
          );
         // console.log(user.user_role)
          res.status(200).json({ message: 'Sign-in successful', token });
      } else {
          res.status(401).json({ error: 'Invalid email or password' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const getUserRole = async (req: Request, res: Response) => {
   
    // If authenticated, return user role
    const userRole = req.body.user.role;
    res.status(200).json({ role: userRole });
};

export const createTable = async (req: Request, res: Response) => {
  try {
     await pool.query('CREATE TABLE users (id SERIAL PRIMARY KEY,username VARCHAR(50) UNIQUE NOT NULL,password VARCHAR(100) NOT NULL,user_role VARCHAR(20) NOT NULL,first_name VARCHAR(50),last_name VARCHAR(50), email VARCHAR(100) UNIQUE NOT NULL,created_at TIMESTAMP DEFAULT NOW())')
     res.status(200).send({message: "successfull created table"})
  }catch (err) {
      console.log(err)
      res.sendStatus(500)
  }
}

export const dropUsersTable =  async (req: Request, res: Response) => {
  try {
      await pool.query('DROP TABLE IF EXISTS users');
      res.status(200).send({ message: "Users table dropped successfully" });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to drop users table' });
  }
}

export const accounts = async (req: Request, res: Response) => {
  const { accountId, firstName, lastName, email } = req.query;
 // const { user_role, user_id } = req.body.user;

  // Start building the query
  let baseQuery = 'SELECT * FROM users WHERE 1=1';
  const queryParams: any[] = [];

  // Check each parameter and add to query if it’s provided
  if (accountId) {
      baseQuery += ' AND id = $1';
      queryParams.push(accountId);
  }
  if (firstName) {
      baseQuery += ' AND first_name ILIKE $' + (queryParams.length + 1);
      queryParams.push(`%${firstName}%`);
  }
  if (lastName) { 
      baseQuery += ' AND last_name ILIKE $' + (queryParams.length + 1);
      queryParams.push(`%${lastName}%`);
  }
  if (email) {
      baseQuery += ' AND email ILIKE $' + (queryParams.length + 1);
      queryParams.push(`%${email}%`);
  }

  try {
      const data = await pool.query(baseQuery, queryParams);
      res.status(200).json(data.rows);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

