import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class PermissionService {
  readonly roles = [
    'guest',
    'freeMember',
    'paidMember',
    'receptionist',
    'manager',
    'callOperator',
  ];
  readonly services = ['borrow', 'reservation', 'inventory'];

  getPermissions(role: string, service: string) {
    if (!this.roles.includes(role)) {
      throw new BadRequestException([`Role ${role} is not valid 1`]);
    }
    if (!this.services.includes(service)) {
      throw new BadRequestException([`Service ${service} is not valid 2`]);
    }

    const permissions = require(`./permissions/${role}`);
    if (!permissions)
      throw new BadRequestException([`Role ${role} is not valid 3`]);

    const servicePermissions = permissions.default[service];
    if (!servicePermissions)
      throw new BadRequestException([`Service ${service} is not valid 4`]);

    return servicePermissions;
  }
}
