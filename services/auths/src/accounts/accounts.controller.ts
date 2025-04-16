import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { AccountsService } from './accounts.service';

@Controller()
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @Get('accounts')
  @UseGuards(AuthGuard)
  getAccount(@Request() request: { user: User }) {
    return request.user;
  }

  @Get('userId')
  @UseGuards(AuthGuard)
  getUser(@Request() request: { user: User }) {
    return { id: request.user.id, role: request.user.user_role };
  }

  @Get('accounts/set-default')
  setDefault() {
    return this.accountService.setDefault();
  }
}
