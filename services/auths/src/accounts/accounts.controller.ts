import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller()
export class AccountsController {
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
}
