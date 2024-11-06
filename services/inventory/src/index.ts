import dotenv from 'dotenv';
dotenv.config();

import App from './app';
import { database } from './database';
import { env } from './types/envTypes';


// Parse the env variable as int to fix type error
const PORT = parseInt(env.PORT);

// Start the server
const app = new App(PORT);

database.connect().then(() => {
  app.start();
}).catch(error => {
  console.error('Failed to start application:', error);
});



