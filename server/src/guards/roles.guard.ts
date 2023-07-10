import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/role.decorator';
import { UsersService } from 'src/modules/users/users.service';
import { Role } from 'src/roles/app.role';
import { Errors } from 'src/constants/errors';
@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private readonly usersService: UsersService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean>{
		let requireRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		]);
		
		if(!requireRoles) return true;

		const { user } = context.switchToHttp().getRequest();
		const users = await this.usersService.findOne(user.sub);
		const groupName = await this.usersService.findGroupName(users.roleId);
		
		const existPermission = requireRoles.some((role) => role === groupName.name);
		if(!existPermission) {
			throw new ForbiddenException(Errors.ROLE_FORBIDDEN)
		}
		return existPermission;
	}
}