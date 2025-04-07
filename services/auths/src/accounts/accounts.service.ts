import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AccountsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAccount(email: string) {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });

    delete user.password;

    return user;
  }
}
