import { Request, Response } from 'express';
import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import dotenv from 'dotenv';
import { env } from '../../../types/envTypes.js';

dotenv.config();
const secret_token = env.JWT_SECRET;
const stage = env.STAGE;

// Sign in a user
export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const user = rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { userId: user.id, role: user.user_role },
        secret_token,
        { expiresIn: '1h' }
      );

      res.setHeader(
        'Set-Cookie',
        serialize('authToken', token, {
          httpOnly: true,
          secure: stage === 'production',
          sameSite: 'strict',
          path: '/',
          maxAge: 60 * 60,
        })
      );

      res.status(200).json({ message: 'Sign-in successful', token });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get user role
export const getUserRole = (req: Request, res: Response) => {
  const userRole = req.body.user.role;
  res.status(200).json({ role: userRole });
};
