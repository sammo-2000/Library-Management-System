import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PermissionDto } from './dto';
import { PermissionService } from './permission.service';

@Controller()
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post('users-permission')
  @UseGuards(AuthGuard)
  getPermission(@Request() request, @Body() permissionDto: PermissionDto) {
    const role = request.user.user_role;
    const permission = this.permissionService.getPermissions(
      role,
      permissionDto.service,
    );
    return {
      userId: request.user.id,
      permission,
    };
  }
}
