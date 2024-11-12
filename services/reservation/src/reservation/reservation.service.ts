import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { DatabaseService } from 'src/database/database.service';
import { QueryType } from 'src/types/query.type';

@Injectable()
export class ReservationService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createReservationDto: CreateReservationDto) {
    // TODO: Implement this
    // Check if is admin or user
    // Check user only allow to make reservation for themselves
    // If admin allow to make reservation for others
    if (false)
      throw new UnauthorizedException(
        'You are not allowed to make reservation on behalf of others',
      );

    return await this.databaseService.reservation.create({
      data: createReservationDto,
    });
  }

  async findAll(query: QueryType) {
    // TODO: Implement this
    // Check if is admin or user
    // Check user only return the one belong to them
    // If admin return all

    const media = await this.databaseService.reservation.findMany({
      where: {
        mediaId: query.mediaId,
        accountId: query.accountId,
        branchId: query.branchId,
        notificationSent:
          query.notified === undefined
            ? undefined // If not defined, return all
            : query.notified
              ? { not: null } // If true, return only notified
              : null, // If false, return only not notified
        collectedAt:
          query.collected === undefined
            ? undefined // If not defined, return all
            : query.collected
              ? { not: null } // If true, return only collected
              : null, // If false, return only not collected
      },
    });

    if (media.length === 0) {
      throw new NotFoundException('Reservation(s) not found');
    }

    return media;
  }

  async findOne(id: string) {
    // TODO: Implement this
    // Check if is admin or user
    // Check user only return the one belong to them
    // If admin return any
    if (false)
      throw new UnauthorizedException(
        'This reservation does not belong to you',
      );

    const reservation = await this.databaseService.reservation.findUnique({
      where: {
        id,
      },
    });

    if (!reservation) throw new NotFoundException('Reservation not found');

    return reservation;
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    // TODO: Implement this
    // Check if is admin or user
    // Check user, do not allow (Must go to reception to collect)
    // If admin allow
    if (false)
      throw new UnauthorizedException('Unauthorized to update reservation');

    await this.findOne(id); // Error handled by findOne

    const updatedReservation = await this.databaseService.reservation.update({
      where: {
        id,
      },
      data: updateReservationDto,
    });

    return updatedReservation;
  }

  async remove(id: string) {
    // TODO: Implement this
    // Check if is admin or user
    // Check user only allow to delete their own
    // If admin allow to delete any
    if (false)
      throw new UnauthorizedException(
        'This reservation does not belong to you',
      );

    await this.findOne(id); // Error handled by findOne

    return await this.databaseService.reservation.delete({
      where: {
        id,
      },
    });
  }
}
