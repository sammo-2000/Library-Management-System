import { Request, Response } from 'express';
import pool from '../config/db.js';
import { UserSchema } from '../models/user.js';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

// Add a new user
export const addUser = async (req: Request, res: Response) => {
  try {
    const userData = UserSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    await pool.query(
      `
      INSERT INTO users (username, password, user_role, first_name, last_name, email, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
    `,
      [
        userData.username,
        hashedPassword,
        userData.user_role,
        userData.first_name,
        userData.last_name,
        userData.email,
      ]
    );

    res.status(200).send({ message: 'User registration successful' });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ errors: err.errors });
      return;
    }
    console.error(err);
    res.sendStatus(500);
  }
};