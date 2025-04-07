import { IsEnum } from 'class-validator';

export class PermissionDto {
  @IsEnum(['borrow', 'reservation', 'inventory'], {
    message:
      'service must be one of the following: borrow, reservation, inventory',
  })
  service: string;
}
