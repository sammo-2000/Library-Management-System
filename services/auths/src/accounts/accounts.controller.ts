import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AccountsService } from './accounts.service';

@Controller()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('accounts')
  @UseGuards(AuthGuard)
  getAccount(@Request() request) {
    return request.user;
  }

  @Get('userId')
  @UseGuards(AuthGuard)
  getUser(@Request() request) {
    return { id: request.user.id, role: request.user.user_role };
  }
}
