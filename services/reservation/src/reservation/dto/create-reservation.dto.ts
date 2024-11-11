import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  mediaId: string;

  @IsNotEmpty()
  accountId: string;

  @IsNotEmpty()
  branchId: string;

  @IsOptional()
  @IsDateString()
  notificationSent: Date | null;

  @IsNotEmpty()
  @IsDateString()
  reservedAt: Date;

  @IsOptional()
  @IsDateString()
  collectedAt: Date | null;
}
