import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Permissions } from 'src/decorators/role.decorator';
import { UsersService } from 'src/modules/users/users.service';
import { Errors } from 'src/constants/errors';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersService: UsersService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const requiredRoles = this.reflector.getAllAndOverride<Permissions[]>('ROLES_KEY', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    if(request.user) {
      const groups = await this.usersService.findByUserToGroup(request.user.sub);

      if(!groups?.roles || groups?.roles?.length < 0) 
      throw new ForbiddenException(Errors.ROLE_FORBIDDEN);
      
      let mapGroups = new Map(groups.roles.map((item) => [item.action, item]));

      requiredRoles.map((role) => {
        const checkExistRole = mapGroups.has(role);
        if(!checkExistRole) {
          throw new ForbiddenException(Errors.ROLE_FORBIDDEN)
        }
      });

      return true;
    };
  }
}