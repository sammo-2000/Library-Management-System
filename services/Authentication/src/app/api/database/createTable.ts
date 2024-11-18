import pool from '../config/db.js';

// Function to check if the `users` table exists and create it if not
export const ensureUsersTableExists = async () => {
    try {
      const result = await pool.query(
        `SELECT EXISTS (
           SELECT FROM information_schema.tables 
           WHERE table_schema = 'public' 
           AND table_name = 'users'
         )`
      );
  
      const tableExists = result.rows[0].exists;
  
      if (!tableExists) {
        console.log('Users table does not exist. Creating...');
        await pool.query(`
          CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            user_role VARCHAR(20) NOT NULL,
            first_name VARCHAR(50),
            last_name VARCHAR(50),
            email VARCHAR(100) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
          )
        `);
        console.log('Users table created successfully.');
      } else {
        console.log('Users table already exists.');
      }
    } catch (error) {
      console.error('Error ensuring users table exists:', error);
      process.exit(1); // Exit the process if the database setup fails
    }
  };