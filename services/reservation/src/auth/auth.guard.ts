import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { env } from '../types/env.type';
import { Permissions } from '../types/permissions';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) throw new UnauthorizedException('No token provided');

    const response = await fetch(`${env.AUTH_SERVICE_BASE_URL}verifyToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service: 'reservation',
        token,
      }),
    });

    const data: {
      userId: string;
      permission: Permissions;
    } = await response.json();

    request.userId = data.userId;
    request.permissions = data.permission;
    return true;
  }
}
