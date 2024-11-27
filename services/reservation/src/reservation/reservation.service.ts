import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { DatabaseService } from 'src/database/database.service';
import { QueryType } from 'src/types/query.type';
import { Permissions } from '../types/permissions';

@Injectable()
export class ReservationService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createReservationDto: CreateReservationDto, accountId: string) {
    return this.databaseService.reservation.create({
      data: {
        accountId,
        ...createReservationDto,
      },
    });
  }

  async findAll(query: QueryType, userId: string, permissions: Permissions) {
    const reservation = await this.databaseService.reservation.findMany({
      where: {
        mediaId: query.mediaId,
        // If is user only return item belong to them
        accountId: permissions.forOthers.read ? query.accountId : userId,
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

  async findOne(id: string, userId: string, permissions: Permissions) {
    const reservation = await this.databaseService.reservation.findUnique({
      where: {
        id,
        // If it is user, only return one belong to them
        accountId: permissions.forOthers.read ? undefined : userId,
      },
    });

    if (!reservation) throw new NotFoundException('Reservation not found');

    if (!permissions.forOthers.read && reservation.accountId !== userId)
      throw new UnauthorizedException('Reservation not found');

    return reservation;
  }

  async update(
    id: string,
    updateReservationDto: UpdateReservationDto,
    userId: string,
    permissions: Permissions,
  ) {
    if (!permissions.forOthers.update)
      throw new UnauthorizedException('Unauthorized to update reservation');

    // Make sure reservation exist before updating
    const reservation = await this.findOne(id, userId, permissions); // Error handled by findOne

    const { notificationSent, collected } = updateReservationDto;

    // Updating notification sent
    if (notificationSent) {
      if (reservation.notificationSent)
        throw new BadRequestException('Notification already sent');

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
      if (reservation.collectedAt)
        throw new BadRequestException('Item already collected');

      return this.databaseService.reservation.update({
        where: {
          id,
        },
        data: {
          collectedAt: new Date().toISOString(),
        },
      });
    }

    return reservation;
  }

  async remove(id: string, userId: string, permissions: Permissions) {
    await this.findOne(id, userId, permissions); // Check if belong to current user

    return this.databaseService.reservation.delete({
      where: {
        id,
        accountId: permissions.forOthers.delete ? undefined : userId,
      },
    });
  }
}
