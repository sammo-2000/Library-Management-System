import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { DatabaseService } from 'src/database/database.service';
import { QueryType } from 'src/types/query.type';
import { Role } from '../types/role.type';

@Injectable()
export class ReservationService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(
    createReservationDto: CreateReservationDto,
    userId: string,
    role: Role,
  ) {
    // User only allowed to make reservation for them self
    // Admin allowed to make reservation for anyone
    if (role === 'USER' && createReservationDto.accountId !== userId)
      throw new UnauthorizedException(
        'You are not allowed to make reservation on behalf of others',
      );

    return this.databaseService.reservation.create({
      data: createReservationDto,
    });
  }

  async findAll(query: QueryType, userId: string, role: Role) {
    const reservation = await this.databaseService.reservation.findMany({
      where: {
        mediaId: query.mediaId,
        // If is user only return item belong to them
        accountId: role === 'USER' ? userId : query.accountId,
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

    if (reservation.length === 0) {
      throw new NotFoundException('Reservation(s) not found');
    }

    return reservation;
  }

  async findOne(id: string, userId: string, role: Role) {
    const reservation = await this.databaseService.reservation.findUnique({
      where: {
        id,
        // If it is user, only return one belong to them
        accountId: role === 'USER' ? userId : undefined,
      },
    });

    if (!reservation) throw new NotFoundException('Reservation not found');

    if (role === 'USER' && reservation.accountId !== userId)
      throw new UnauthorizedException('Reservation not found');

    return reservation;
  }

  async update(
    id: string,
    updateReservationDto: UpdateReservationDto,
    userId: string,
    role: Role,
  ) {
    if (role === 'USER')
      throw new UnauthorizedException('Unauthorized to update reservation');

    // Make sure reservation exist before updating
    await this.findOne(id, userId, role); // Error handled by findOne

    const { notificationSent, collected } = updateReservationDto;

    // Updating notification sent
    if (notificationSent) {
      return this.databaseService.reservation.update({
        where: {
          id,
        },
        data: {
          notificationSent: new Date().toISOString(),
        },
      });
    }

    // Updating notification sent
    if (collected) {
      return this.databaseService.reservation.update({
        where: {
          id,
        },
        data: {
          collectedAt: new Date().toISOString(),
        },
      });
    }
  }

  async remove(id: string, userId: string, role: Role) {
    const reservation = await this.findOne(id, userId, role); // Error handled by findOne

    // User only delete their reservation
    // Admin can delete all reservation
    if (reservation.accountId !== userId && role === 'USER')
      throw new UnauthorizedException(
        'This reservation does not belong to you, cannot delete',
      );

    return this.databaseService.reservation.delete({
      where: {
        id,
        accountId: role === 'USER' ? userId : undefined,
      },
    });
  }
}
