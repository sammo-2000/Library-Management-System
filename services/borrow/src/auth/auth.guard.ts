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

    const response = await fetch(
      `${env.AUTH_SERVICE_BASE_URL}users-permission`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: 'borrow',
          token,
        }),
      },
    );

    const data: {
      userId: string;
      permission: Permissions;
      error;
    } = await response.json();

    if (data.error) throw new UnauthorizedException(data.error);

    request.userId = data.userId;
    request.permissions = data.permission;
    return true;
  }
}
