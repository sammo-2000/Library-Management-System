import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class OptionalParseBoolPipe implements PipeTransform {
  transform(value: any) {
    if (value === undefined) return undefined;
    if (value === 'true' || value === 'false') return value === 'true';
    throw new BadRequestException(
      'Validation failed (boolean string is expected)',
    );
  }
}
