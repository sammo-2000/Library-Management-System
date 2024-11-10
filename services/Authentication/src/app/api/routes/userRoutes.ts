// src/routes/userRoutes.ts
import express from 'express';
import { addUser, signIn, accounts, createTable, dropUsersTable } from '../controllers/userController.js';

const app = express();
app.use(express.json())


app.get('/accounts',accounts);
//create users table
app.get('/create-users-table', createTable)
// Endpoint to drop the users table
app.delete('/drop-users-table', dropUsersTable);


//user registration
app.post('/register', addUser);
//Sign in
app.post('/signin', signIn);

export default app;
