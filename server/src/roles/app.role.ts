import { RolesBuilder } from 'nest-access-control';

export enum Roles {
	ADMIN = 'ADMIN',
	MEMBER = 'MEMBER',
};

// export const roles: RolesBuilder = new RolesBuilder();
// 	roles
// 		.grant(AppRoles.ADMIN_UPDATE_USER)
// 		.createOwn('users')
// 		.deleteOwn('users')
// 		.readAny('users')
// 		.grant(AppRoles.USER_READ_USER)
// 		.readAny('users')
