import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly usersService: UsersService,
	) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();
		const groupName = await this.usersService.findByUserToGroup(req.user.sub);
		req.user = {
			roles: [groupName.name],
		};
		return true;
	}
}