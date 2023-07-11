import { Module, forwardRef } from '@nestjs/common';
import { FireormModule } from 'nestjs-fireorm';

import { PermissionEntity } from './entities/permission.entity';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { UsersModule } from '../users/users.module';

@Module({
	imports: [
    FireormModule.forFeature([PermissionEntity]),
    forwardRef(() => UsersModule),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
	exports: [PermissionsService]
})
export class PermissionsModule {}
