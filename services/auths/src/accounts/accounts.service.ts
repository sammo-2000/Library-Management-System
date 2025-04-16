import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AccountsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async setDefault() {
    return await this.databaseService.user.createMany({
      data: [
        {
          username: 'manager',
          email: 'manager@gmail.com',
          password:
            '$2b$10$cBcPoWrDxUsQ7HpFbN2eeuhEXTIY9fAqAW3oXRP70awDYHtYDc12q',
          first_name: 'john',
          last_name: 'doe',
          user_role: 'manager',
        },
        {
          username: 'member',
          email: 'member@gmail.com',
          password:
            '$2b$10$cBcPoWrDxUsQ7HpFbN2eeuhEXTIY9fAqAW3oXRP70awDYHtYDc12q',
          first_name: 'emily',
          last_name: 'jones',
          user_role: 'freeMember',
        },
      ],
    });
  }
}
