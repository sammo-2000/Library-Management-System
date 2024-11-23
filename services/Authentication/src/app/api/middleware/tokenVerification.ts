import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
import { env } from "../../../types/envTypes.js";

const secret_token = env.JWT_SECRET;

// Extend the Request type to include the 'user' property
interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}
// Middleware to create a protected route
 export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1] || req.cookies?.authToken;;
    
    if (!token) {
        res.status(401).json({ role: null })
        return;
     }

     try {
        const user = jwt.verify(token, secret_token);
        req.body.user = user; // Attach user info to request
        next();
      } catch (err) {
        console.error('Token verification error:', err);
         res.status(403).json({ error: 'Token is invalid or expired' });
         return;
      }
}


export function authorizeRoles(...allowedRoles: string[]) {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const user = req.user;
  
      if (!user || !allowedRoles.includes((user as JwtPayload).role)) {
         res.status(403).json({ error: `Access forbidden: Requires one of the roles: ${allowedRoles.join(', ')}` });
         return;
      }
  
      next();
    };
  }
  

  
  
  export function verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, secret_token); 
      return decoded;
    } catch (err) {
      throw new Error('Invalid or expired token');
    }
  };
  
