import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { jwtConstants } from 'src/auth/auth.const';
import { AuthGuard } from 'src/auth/auth.guard';
import { VerificationDto } from './dto';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  getAllSessions(@Request() request: { user: User }) {
    return this.sessionsService.getAllSessions(request.user.id);
  }

  @Post('verify')
  async verifySession(@Body() verificationDto: VerificationDto) {
    const { jti } = await this.jwtService.verifyAsync(
      verificationDto.sessionId,
      {
        secret: jwtConstants.sercet,
      },
    );
    if (!jti) throw new NotFoundException(['Invalid token']);

    // Get session
    const session = await this.sessionsService.getSessionById(jti);

    // Check if session exists
    if (!session) throw new NotFoundException(['session not found']);

    // Check if session is verified already
    if (session.isVerified || !session.verificationCode)
      throw new NotFoundException(['session already verified']);

    // Check if session is expired
    const now = new Date();
    if (session.created_at < new Date(now.getTime() - 10 * 60 * 1000)) {
      await this.sessionsService.deleteSession(jti);
      throw new NotFoundException(['session not found']);
    }

    // Update session
    await this.sessionsService.verifySession(jti);

    return { message: ['Session verified successfully'] };
  }

  @Delete(':sessionId')
  @UseGuards(AuthGuard)
  async deleteSession(
    @Param('sessionId') sessionId: string,
    @Request() request: { user: User },
  ) {
    // Get session by ID
    const session = await this.sessionsService.getSessionById(sessionId);
    // Check if session exists
    if (!session) throw new NotFoundException(['session not found']);
    // Check if session belongs to user
    if (session.userId !== request.user.id)
      throw new NotFoundException(['session not found']);
    // Delete session
    await this.sessionsService.deleteSession(sessionId);
    return {
      message: ['Session deleted successfully'],
    };
  }
}
