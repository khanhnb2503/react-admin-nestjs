import { SetMetadata } from '@nestjs/common';

export enum Permissions {
  READ ='read',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export const RequirePermission = (...roles: Permissions[]) => SetMetadata('ROLES_KEY', roles);