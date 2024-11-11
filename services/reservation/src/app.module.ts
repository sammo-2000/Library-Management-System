import { Module } from '@nestjs/common';
import { ReservationModule } from './reservation/reservation.module';
import { DatabaseModule } from './database/database.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ReservationModule,
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
