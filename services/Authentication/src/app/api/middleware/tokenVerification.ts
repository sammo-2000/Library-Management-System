import  { Request, Response,NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config(); 

import { env } from "../../../types/envTypes.js"

// import crypto from 'crypto';
// console.log(crypto.randomBytes(64).toString('hex'));


const secret_token = env.JWT_SECRET

// Middleware to create a protected route
 export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
         res.status(401).json({ error: 'Unauthorized' });
         return;
    }
 
    jwt.verify(token, secret_token, (err: any, user: any) => {
        if (err) {
             res.status(403).json({ error: 'Token expired or invalid' });
             return;
        }
        req.body.user = user; // Storing user info in request
        next();
    });
}

// Updated authorizeRoles middleware to allow only 'admin' access
export function authorizeRoles(req: Request, res: Response, next: NextFunction) {
    const user = req.body.user;

    if (!user || user.userole !== 'Admin') {
        res.status(403).json({ error: 'Forbidden: Admin access only' });
        return;
    }
    next();
}


// export function authorizeRoles(...allowedRoles: string[]) {
//     return (req: Request, res: Response, next: NextFunction) => {
//         const user = req.body.user;

//         if (!user || !allowedRoles.includes(user.user_role)) {
//              res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
//              return
//         }
//         next();
//     };
// }
 



