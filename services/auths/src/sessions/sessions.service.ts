import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SessionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllSessions(userId: number) {
    return await this.databaseService.session.findMany({ where: { userId } });
  }

  async getSessionById(sessionId: string) {
    return await this.databaseService.session.findUnique({
      where: { jti: sessionId },
    });
  }

  async deleteSession(sessionId: string) {
    return await this.databaseService.session.delete({
      where: { jti: sessionId },
    });
  }
}
