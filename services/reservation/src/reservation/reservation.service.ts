import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { QueryType } from 'src/types/query.type';

@Injectable()
export class ReservationService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createReservationDto: Prisma.ReservationCreateInput) {
    return 'This action adds a new reservation';
  }

  async findAll(query: QueryType) {
    // TODO: Implement this
    // Check if is admin or user
    // Check user only return the one belong to them
    // If admin return all

    // TODO: Add conditional check
    // If request data about another account & is not admin
    if (false) {
      throw new UnauthorizedException('This account does not belong to you');
    }

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
      throw new NotFoundException('Media not found');
    }

    return media;
  }

  async findOne(id: string) {
    return `This action returns a #${id} reservation`;
  }

  async update(
    id: string,
    updateReservationDto: Prisma.ReservationUpdateInput,
  ) {
    return `This action updates a #${id} reservation`;
  }

  async remove(id: string) {
    return `This action removes a #${id} reservation`;
  }
}
