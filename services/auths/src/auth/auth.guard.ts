import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { DatabaseService } from 'src/database/database.service';
import { jwtConstants } from './auth.const';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get token from request
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    // If no token, throw UnauthorizedException
    if (!token) throw new UnauthorizedException(['No token provided']);

    try {
      // Get token payload and check if it has jti
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.sercet,
      });
      if (!payload || !payload.jti)
        throw new UnauthorizedException(['Invalid token']);

      // Find session by jti from DB and get user information
      const session = await this.databaseService.session.findUnique({
        where: { jti: payload.jti },
        include: { user: true },
      });
      if (!session) throw new UnauthorizedException(['Session not found']);

      // Check if session is verified
      if (!session.isVerified)
        throw new BadRequestException(['Session not verified']);

      // Check if token sent matches the JTI key in the DB
      if (session.token !== token)
        throw new UnauthorizedException(['Invalid token']);

      // Remove password and loginAttempt from user object
      delete session.user.password;
      delete session.user.loginAttempt;

      // Attach user information to request object
      request['user'] = session.user;
    } catch (error) {
      throw new UnauthorizedException(
        error.response.message || ['Invalid token'],
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
