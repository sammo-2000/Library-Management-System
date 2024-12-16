import { Request, Response } from 'express';
import permissionsList from '../permissions/index.js';
import { verifyToken } from '../middleware/tokenVerification.js';
import {Role, Service}  from '../../../types/permissionTypes.js'


export const permission = async (req: Request, res: Response) => {
  const { service, token } = req.body;

  if (!service) {
    res.status(400).json({ error: 'Service is required' });
    return 
  }

  try {
    //If token is not provided, set userId to null and role to guest
    let decoded: { userId: string | null; role: string } = {userId: null, role: 'guest'};
    if (token){
      decoded = verifyToken(token) as { userId: string; role: string };
    }
    const { userId, role } = decoded;

    // Check if role is a valid key in permissionsList
    if (!Object.keys(permissionsList).includes(role)) {
        res.status(403).json({ error: 'Invalid role or role permissions not found' });
      return 
    }

    // TypeScript safely infers rolePermissions now
    const rolePermissions = permissionsList[role as Role];
    if (!rolePermissions) {
        res.status(403).json({ error: 'Role permissions not found' });
      return 
    }

     // Ensure the service is valid
     if (!(service in rolePermissions)) {
        res.status(404).json({ error: `Permissions for service "${service}" not found` });
        return 
      }
  
      // Safely access servicePermissions
      const servicePermissions = rolePermissions[service as Service];
      res.status(200).json({
        userId,
        permission: servicePermissions,
      });
    return
  } catch (error: any) {
    console.error(error);
    res.status(401).json({ error: error.message });
    return 
  }
};
