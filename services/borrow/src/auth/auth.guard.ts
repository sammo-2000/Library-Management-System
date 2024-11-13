import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // const token = request.headers['authorization']?.split(' ')[1];
    // if (!token) throw new UnauthorizedException('No token provided');

    // Check if user active using AUTH service
    // Fetch()
    // Attach to request
    request.userId = '1';
    request.role = 'ADMIN';
    return true;
  }
}
