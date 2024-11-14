import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { BorrowModule } from './borrow/borrow.module';

@Module({
  imports: [
    DatabaseModule,
    ThrottlerModule.forRoot([
      {
        name: '3.per.second',
        ttl: 1000,
        limit: 3,
      },
      {
        name: '100.per.minute',
        ttl: 60000,
        limit: 100,
      },
    ]),
    BorrowModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
