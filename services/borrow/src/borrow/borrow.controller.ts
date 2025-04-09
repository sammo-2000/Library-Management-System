import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { OptionalParseBoolPipe } from 'src/optional-parse-bool-pipe/optional-parse-bool-pipe';
import { QueryType } from 'src/types/query.type';
import { AuthGuard } from '../auth/auth.guard';
import { Permissions } from '../types/permissions';
import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';

@Controller()
@UseGuards(AuthGuard)
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post()
  create(@Body() createBorrowDto: CreateBorrowDto, @Request() request: any) {
    const permissions: Permissions = request.permissions;

    if (permissions.forOthers.create)
      return this.borrowService.create(createBorrowDto);
    else
      throw new UnauthorizedException(
        'Does not have permissions to create borrow.',
      );
  }

  @Get()
  findAll(
    @Request() request: any,
    @Query('mediaId') mediaId?: string,
    @Query('accountId') accountId?: string,
    @Query('branchId') branchId?: string,
    @Query('returned', OptionalParseBoolPipe) returned?: boolean,
    @Query('overdue', OptionalParseBoolPipe) overdue?: boolean,
  ) {
    const query: QueryType = {
      mediaId,
      accountId,
      branchId,
      returned,
      overdue,
    };

    const userId: string = request.userId;
    const permissions: Permissions = request.permissions;

    return this.borrowService.findAll(query, userId, permissions);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() request: any) {
    const userId: string = request.userId;
    const permissions: Permissions = request.permissions;

    return this.borrowService.findOne(id, userId, permissions);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBorrowDto: UpdateBorrowDto,
    @Request() request: any,
  ) {
    const userId: string = request.userId;
    const permissions: Permissions = request.permissions;

    return this.borrowService.update(id, userId, permissions);
  }
}
