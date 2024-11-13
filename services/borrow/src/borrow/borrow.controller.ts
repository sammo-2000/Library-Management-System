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
import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { QueryType } from 'src/types/query.type';
import { OptionalParseBoolPipe } from 'src/optional-parse-bool-pipe/optional-parse-bool-pipe';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../types/role.type';

@Controller('borrowing')
@UseGuards(AuthGuard)
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post()
  create(@Body() createBorrowDto: CreateBorrowDto, @Request() request: any) {
    const userId: string = request.userId;
    const role: Role = request.role;

    return this.borrowService.create(createBorrowDto, userId, role);
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
    const role: Role = request.role;

    return this.borrowService.findAll(query, userId, role);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() request: any) {
    const userId: string = request.userId;
    const role: Role = request.role;

    return this.borrowService.findOne(id, userId, role);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBorrowDto: UpdateBorrowDto,
    @Request() request: any,
  ) {
    const userId: string = request.userId;
    const role: Role = request.role;

    return this.borrowService.update(id, updateBorrowDto, userId, role);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() request: any) {
    const userId: string = request.userId;
    const role: Role = request.role;

    return this.borrowService.remove(id, userId, role);
  }
}
