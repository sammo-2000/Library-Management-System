import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { QueryType } from 'src/types/query.type';
import { OptionalParseBoolPipe } from 'src/optional-parse-bool-pipe/optional-parse-bool-pipe';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../types/role.type';

@Controller('reservation')
@UseGuards(AuthGuard)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(
    @Body() createReservationDto: CreateReservationDto,
    @Request() request: any,
  ) {
    const userId: string = request.userId;
    const role: Role = request.role;

    return this.reservationService.create(createReservationDto, userId, role);
  }

  @Get()
  findAll(
    @Request() request: any,
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

    const userId: string = request.userId;
    const role: Role = request.role;

    return this.reservationService.findAll(query, userId, role);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() request: any) {
    const userId: string = request.userId;
    const role: Role = request.role;

    return this.reservationService.findOne(id, userId, role);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
    @Request() request: any,
  ) {
    const userId: string = request.userId;
    const role: Role = request.role;

    return this.reservationService.update(
      id,
      updateReservationDto,
      userId,
      role,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() request: any) {
    const userId: string = request.userId;
    const role: Role = request.role;

    return this.reservationService.remove(id, userId, role);
  }
}
