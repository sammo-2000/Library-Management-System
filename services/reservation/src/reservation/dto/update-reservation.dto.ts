import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateReservationDto {
  @IsOptional()
  @IsBoolean()
  notificationSent: boolean | null;

  @IsOptional()
  @IsBoolean()
  collected: boolean | null;
}
