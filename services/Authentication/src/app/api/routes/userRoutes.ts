// src/routes/userRoutes.ts
import express from 'express';
import { addUser } from '../controllers/userController.js';
import { signIn } from '../controllers/authController.js';
import { accounts } from '../controllers/adminController.js';
import { dropUsersTable } from '../controllers/adminController.js';
import { getUserInfo } from '../controllers/authController.js';
import { permission } from '../controllers/permissionController.js';
import { getId } from '../controllers/getUserIdController.js';
import {authenticateToken, authorizeRoles} from '../middleware/tokenVerification.js'
import dotenv from "dotenv";
dotenv.config(); 
import { env } from "../../../types/envTypes.js"
 
const stage = env.STAGE;
const app = express();
app.use(express.json())


//app.get('/accounts', authenticateToken, authorizeRoles('admin', 'manager'), accounts);
app.get('/accounts', authenticateToken, authorizeRoles("Admin"), accounts);

//create users table
//app.get('/create-users-table', createTable)

// Endpoint to drop the users table
if (stage === 'development') 
    {
       app.delete('/drop-users-table', dropUsersTable);
    }

//get user role
//app.get('/userId', getId);

app.get('/userId', authenticateToken,getUserInfo);

//user registration
app.post('/register', addUser);

//Sign in
app.post('/signin', signIn);

app.post('/users-permission',permission)

export default app;
