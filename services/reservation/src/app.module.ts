import { Module } from '@nestjs/common';
import { ReservationModule } from './reservation/reservation.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ReservationModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
