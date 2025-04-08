import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionsService } from './sessions.service';

@Controller('sessions')
@UseGuards(AuthGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  getAllSessions(@Request() request: { user: User }) {
    return this.sessionsService.getAllSessions(request.user.id);
  }

  @Delete(':sessionId')
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
