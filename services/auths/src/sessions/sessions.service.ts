import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SessionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllSessions(userId: number) {
    const sessions = await this.databaseService.session.findMany({
      where: { userId },
    });

    sessions.forEach((session) => {
      delete session.isVerified;
      delete session.verificationCode;
    });

    return sessions;
  }

  async verifySession(jti: string) {
    return await this.databaseService.session.update({
      where: { jti },
      data: {
        isVerified: true,
        verificationCode: null,
      },
    });
  }

  async getSessionById(jti: string) {
    return await this.databaseService.session.findUnique({
      where: { jti },
    });
  }

  async deleteSession(jti: string) {
    return await this.databaseService.session.delete({
      where: { jti },
    });
  }
}
