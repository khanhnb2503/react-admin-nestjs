import { SetMetadata } from '@nestjs/common';

export enum Permissions {
  READ = 'read',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete'
};

export enum Resources {
  USERS = 'Tài khoản',
  PRODUCTS = 'Sản phẩm'
}

export const RequirePermission =
  (...roles: Permissions[]) => SetMetadata('ROLES_KEY', roles);
export const RequireResource =
  (...resource: Resources[]) => SetMetadata('RESOURCE_KEY', resource);