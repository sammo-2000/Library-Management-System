import { Request, Response } from 'express';
import { verifyToken } from '../middleware/tokenVerification.js';

export const getId = async (req: Request, res: Response) => {
//   const { token } = req.body;

//   if (!token) {
//     res.status(400).json({ error: ' token is required' });
//     return 
//   }
const authHeader = req.headers.authorization;

if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
  return 
}

const token = authHeader.split(" ")[1]; // Extract the token

  try {
    const decoded = verifyToken(token) as { userId: string; role: string };
    const { userId, role } = decoded;

      res.status(200).json({
        userId,
        role
      });
    return
  } catch (error: any) {
    console.error(error);
    res.status(401).json({ error: error.message });
    return 
  }
};
