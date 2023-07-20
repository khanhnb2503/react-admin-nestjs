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

    const requiredResource = this.reflector.getAllAndOverride<Permissions[]>('RESOURCE_KEY', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || !requiredResource) return true;

    if(request.user) {
      const groups = await this.usersService.findByUserToGroup(request.user.sub);

      if(!groups?.roles || groups?.roles?.length < 0) 
      throw new ForbiddenException(Errors.ROLE_FORBIDDEN);

      let existRole = groups.roles.some((role) => {
        let existPermission = requiredRoles.every((item) => item === role.actionName);
        let existResource = requiredResource.every((item) => item === role.resourceName);
        if(existPermission && existResource) return true;
        return false;
      });
      
      if(!existRole) {
        throw new ForbiddenException(Errors.ROLE_FORBIDDEN)
      }
      return true;
    };
  }
}