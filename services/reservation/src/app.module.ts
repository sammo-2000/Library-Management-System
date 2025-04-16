import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [DatabaseModule, ReservationModule],
  controllers: [],
})
export class AppModule {}
