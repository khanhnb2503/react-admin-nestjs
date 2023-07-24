import { SetMetadata } from '@nestjs/common';

export enum Permissions {
  READ = 'Xem',
  CREATE = 'Thêm',
  UPDATE = 'Sửa',
  DELETE = 'Xóa'
};

export enum Resources {
  USERS = 'Tài khoản',
  PRODUCTS = 'Sản phẩm',
  POWER = 'Quyền hạn'
}

export const RequirePermission =
  (...roles: Permissions[]) => SetMetadata('ROLES_KEY', roles);
export const RequireResource =
  (...resource: Resources[]) => SetMetadata('RESOURCE_KEY', resource);