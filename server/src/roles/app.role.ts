import { RolesBuilder } from "nest-access-control";

export enum Role{
	ADMIN = 'admin',
	MEMBER = 'member',
};


export const roles: RolesBuilder = new RolesBuilder();
roles
	.grant('admin')
	.read(['users'])
  // // editor 
	// .grant(AppRoles.MEMBER)
	// .readAny(['users', 'permissions'])
	// // .createAny(['users', 'permissions'])

	// admin