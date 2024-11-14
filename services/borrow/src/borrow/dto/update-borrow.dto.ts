import { IsBoolean } from 'class-validator';

export class UpdateBorrowDto {
  @IsBoolean()
  returnedAt: boolean | null;
}
