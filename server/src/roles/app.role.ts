import { RolesBuilder } from "nest-access-control";

export enum Role{
	ADMIN = 'admin',
	MEMBER = 'member',
};

export enum AppRoles {
	ADMIN = 'admin',
	MEMBER = 'member',
};

export const roles: RolesBuilder = new RolesBuilder();
roles
  // editor 
	.grant(AppRoles.MEMBER)
	.read('users')
	.create('users')

	// admin
	.grant(AppRoles.ADMIN)
	.extend(AppRoles.MEMBER)
	.delete('users')
