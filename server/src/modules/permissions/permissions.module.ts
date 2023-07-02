import { Module } from '@nestjs/common';
import { FireormModule } from 'nestjs-fireorm';

import { PermissionEntity } from './entities/permission.entity';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';

@Module({
	imports: [FireormModule.forFeature([PermissionEntity])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
	exports: [PermissionsService]
})
export class PermissionsModule {}
