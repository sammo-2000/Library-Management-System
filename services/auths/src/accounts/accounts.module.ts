import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
