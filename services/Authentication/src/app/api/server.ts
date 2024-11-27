 //Server.ts

import app from './app.js';
import dotenv from 'dotenv';
import {ensureUsersTableExists} from '../api/database/createTable.js'
dotenv.config();

import { env } from '../../types/envTypes.js';

const port = env.PORT;


// Start the server only after ensuring the table exists
(async () => {
  await ensureUsersTableExists();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();












 





