import  { Request, Response,NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config(); 

import { env } from "../../../types/envTypes"

// import crypto from 'crypto';
// console.log(crypto.randomBytes(64).toString('hex'));


const secret_token = env.JWT_SECRET;

// Middleware to create a protected route
 function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
 
    jwt.verify(token, secret_token, (err: any, user: any) => {
        if (err) return res.status(403).json({ error: 'Token expired or invalid' });
        req.body.user = user; // Storing user info in request
        next();
    });
}
 
export default authenticateToken


