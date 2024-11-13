import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBorrowDto {
  @IsNotEmpty()
  @IsString()
  mediaId: string;

  @IsNotEmpty()
  @IsString()
  accountId: string;

  @IsNotEmpty()
  @IsString()
  branchId: string;

  @IsOptional()
  @IsDateString()
  notificationSent: Date | null;

  @IsOptional()
  @IsDateString()
  collectedAt: Date | null;
}
