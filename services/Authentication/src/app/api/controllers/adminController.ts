import { Request, Response } from 'express';
import pool from '../config/db.js';


export const accounts = async (req: Request, res: Response) => {
    const { accountId, firstName, lastName, email } = req.query;
  
    let baseQuery = 'SELECT * FROM users WHERE 1=1';
    const queryParams: any[] = [];
  
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
  };

  export const dropUsersTable = async (req: Request, res: Response) => {
    try {
      await pool.query('DROP TABLE IF EXISTS users');
      res.status(200).send({ message: 'Users table dropped successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to drop users table' });
    }
  };