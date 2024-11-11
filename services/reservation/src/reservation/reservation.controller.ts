import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Prisma } from '@prisma/client';
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { QueryType } from 'src/types/query.type';

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

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() createReservationDto: Prisma.ReservationCreateInput) {
    return this.reservationService.create(createReservationDto);
  }

  @Get()
  findAll(
    @Query('mediaId') mediaId?: string,
    @Query('accountId') accountId?: string,
    @Query('branchId') branchId?: string,
    @Query('notified', OptionalParseBoolPipe) notified?: boolean,
    @Query('collected', OptionalParseBoolPipe) collected?: boolean,
  ) {
    const query: QueryType = {
      mediaId,
      accountId,
      branchId,
      notified,
      collected,
    };

    return this.reservationService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: Prisma.ReservationUpdateInput,
  ) {
    return this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }
}
