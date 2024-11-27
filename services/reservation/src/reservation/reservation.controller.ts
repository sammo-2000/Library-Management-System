import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { QueryType } from 'src/types/query.type';
import { OptionalParseBoolPipe } from 'src/optional-parse-bool-pipe/optional-parse-bool-pipe';
import { AuthGuard } from '../auth/auth.guard';
import { Permissions } from '../types/permissions';

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
    const permissions: Permissions = request.permissions;

    if (
      userId !== createReservationDto.accountId &&
      permissions.forOthers.create
    ) {
      // Making reservation behalf of someone & has permission to do so
      return this.reservationService.create(
        createReservationDto,
        createReservationDto.accountId,
      );
    } else {
      // Otherwise make reservation for self
      return this.reservationService.create(createReservationDto, userId);
    }
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
    const permissions: Permissions = request.permissions;

    return this.reservationService.findAll(query, userId, permissions);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() request: any) {
    const userId: string = request.userId;
    const permissions: Permissions = request.permissions;

    return this.reservationService.findOne(id, userId, permissions);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
    @Request() request: any,
  ) {
    const userId: string = request.userId;
    const permissions: Permissions = request.permissions;

    return this.reservationService.update(
      id,
      updateReservationDto,
      userId,
      permissions,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() request: any) {
    const userId: string = request.userId;
    const permissions: Permissions = request.permissions;

    return this.reservationService.remove(id, userId, permissions);
  }
}
