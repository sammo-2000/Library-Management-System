import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { DatabaseService } from 'src/database/database.service';
import { QueryType } from 'src/types/query.type';
import { Permissions } from '../types/permissions';

@Injectable()
export class BorrowService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createBorrowDto: CreateBorrowDto) {
    return this.databaseService.borrow.create({
      data: {
        ...createBorrowDto,
        expectedReturn: new Date(
          new Date().getTime() + 14 * 24 * 60 * 60 * 1000,
        ), // Adds 14 days from now
      },
    });
  }

  async findAll(query: QueryType, userId: string, permissions: Permissions) {
    const now = new Date();

    const borrows = await this.databaseService.borrow.findMany({
      where: {
        mediaId: query.mediaId,
        // If the user role is 'USER', return only items belonging to them
        accountId: permissions.forOthers.read ? query.accountId : userId,
        branchId: query.branchId,
        expectedReturn:
          query.overdue === undefined
            ? undefined // If not defined, return all
            : query.overdue
              ? { lt: now } // If true, return items overdue (ExpectedReturnAt is before now)
              : { gte: now }, // If false, return items not overdue (ExpectedReturnAt is on or after now)
        actualReturn:
          query.returned === undefined
            ? undefined // If not defined, return all
            : query.returned
              ? { not: null } // If true, return only items that have been returned
              : null, // If false, return only items that have not been returned
      },
    });

    if (borrows.length === 0) {
      throw new NotFoundException('Borrow(s) not found');
    }

    return borrows;
  }

  async findOne(id: string, userId: string, permissions: Permissions) {
    const borrow = await this.databaseService.borrow.findUnique({
      where: {
        id,
        // If it is user, only return one belong to them
        accountId: permissions.forOthers.read ? undefined : userId,
      },
    });

    if (!borrow) throw new NotFoundException('Borrow not found');

    if (!permissions.forOthers.read && borrow.accountId !== userId)
      throw new UnauthorizedException('Borrow not found');

    return borrow;
  }

  async update(id: string, userId: string, permissions: Permissions) {
    // Make sure borrow exist before updating
    const borrow = await this.findOne(id, userId, permissions); // Error handled by findOne

    if (borrow.actualReturn)
      throw new BadRequestException('Item has already been returned');

    return this.databaseService.borrow.update({
      where: {
        id,
      },
      data: {
        actualReturn: new Date().toISOString(),
      },
    });
  }
}
