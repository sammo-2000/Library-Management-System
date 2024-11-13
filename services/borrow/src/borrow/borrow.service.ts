import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { DatabaseService } from 'src/database/database.service';
import { QueryType } from 'src/types/query.type';
import { Role } from '../types/role.type';

@Injectable()
export class BorrowService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createBorrowDto: CreateBorrowDto, userId: string, role: Role) {
    // User only allowed to make borrow for them self
    // Admin allowed to make borrow for anyone
    if (role === 'USER' && createBorrowDto.accountId !== userId)
      throw new UnauthorizedException(
        'You are not allowed to make borrow on behalf of others',
      );

    return this.databaseService.borrow.create({
      data: {
        ...createBorrowDto,
        expectedReturn: new Date(
          new Date().getTime() + 14 * 24 * 60 * 60 * 1000,
        ), // Adds 14 days from now
      },
    });
  }

  async findAll(query: QueryType, userId: string, role: Role) {
    const now = new Date();

    const borrows = await this.databaseService.borrow.findMany({
      where: {
        mediaId: query.mediaId,
        // If the user role is 'USER', return only items belonging to them
        accountId: role === 'USER' ? userId : query.accountId,
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

  async findOne(id: string, userId: string, role: Role) {
    const borrow = await this.databaseService.borrow.findUnique({
      where: {
        id,
        // If it is user, only return one belong to them
        accountId: role === 'USER' ? userId : undefined,
      },
    });

    if (!borrow) throw new NotFoundException('Borrow not found');

    if (role === 'USER' && borrow.accountId !== userId)
      throw new UnauthorizedException('Borrow not found');

    return borrow;
  }

  async update(
    id: string,
    updateBorrowDto: UpdateBorrowDto,
    userId: string,
    role: Role,
  ) {
    if (role === 'USER')
      throw new UnauthorizedException('Unauthorized to update borrow');

    // Make sure borrow exist before updating
    const borrow = await this.findOne(id, userId, role); // Error handled by findOne

    if (borrow.actualReturn)
      throw new BadRequestException('Item has already been returned');

    const { returnedAt } = updateBorrowDto;

    // Updating notification sent
    if (returnedAt) {
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

  async remove(id: string, userId: string, role: Role) {
    const borrow = await this.findOne(id, userId, role); // Error handled by findOne

    // User only delete their borrow
    // Admin can delete all borrow
    if (borrow.accountId !== userId && role === 'USER')
      throw new UnauthorizedException(
        'This borrow does not belong to you, cannot delete',
      );

    return this.databaseService.borrow.delete({
      where: {
        id,
        accountId: role === 'USER' ? userId : undefined,
      },
    });
  }
}
