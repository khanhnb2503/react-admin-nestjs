import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/role.decorator';
import { UsersService } from 'src/modules/users/users.service';
import {UserEntity} from 'src/modules/users/entities/user.entity';

// @Injectable()
// export class RolesGuard implements CanActivate {
// 	constructor(
// 		private reflector: Reflector,
// 		private readonly usersService: UsersService,
// 	) {}

	// async canActivate(context: ExecutionContext): Promise<boolean>{
		// let requireRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
		// 	context.getHandler(),
		// 	context.getClass()
		// ]);
		// if(!requireRoles) return true;

		// let exitsRole: boolean;
		// const { user } = context.switchToHttp().getRequest();
		// if(user) {
		// 	const users = await this.usersService.findOne(user.sub);
		// 	const roles = await this.roleService.findOne(users.roleId);
		// 	exitsRole = requireRoles.some((role) => role === roles.name);
		// };
		// return true;
// 	}
// }