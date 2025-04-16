import { IsNotEmpty, IsString, Length } from 'class-validator';

export class VerificationDto {
  @IsNotEmpty()
  @IsString()
  sessionId: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 6, { message: 'verificationCode must be 6 characters long' })
  verificationCode: string;
}
