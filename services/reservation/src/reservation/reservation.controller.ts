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
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { QueryType } from 'src/types/query.type';
import { OptionalParseBoolPipe } from 'src/optional-parse-bool-pipe/optional-parse-bool-pipe';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
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
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }
}
