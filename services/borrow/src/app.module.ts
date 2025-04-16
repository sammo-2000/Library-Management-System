import { Module } from '@nestjs/common';
import { BorrowModule } from './borrow/borrow.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, BorrowModule],
  controllers: [],
})
export class AppModule {}
