// src/routes/userRoutes.ts
import express from 'express';
import { addUser, signIn, accounts, createTable, dropUsersTable } from '../controllers/userController.js';
import {authenticateToken, authorizeRoles} from '../middleware/tokenVerification.js'
import dotenv from "dotenv";
dotenv.config(); 
import { env } from "../../../types/envTypes.js"
 
const stage = env.STAGE;
const app = express();
app.use(express.json())


//app.get('/accounts', authenticateToken, authorizeRoles('admin', 'manager'), accounts);
app.get('/accounts', authenticateToken, authorizeRoles, accounts);

//create users table
app.get('/create-users-table', createTable)
// Endpoint to drop the users table
if (stage === 'development') 
    {
       app.delete('/drop-users-table', dropUsersTable);
    }


//user registration
app.post('/register', addUser);
//Sign in
app.post('/signin', signIn);

export default app;
