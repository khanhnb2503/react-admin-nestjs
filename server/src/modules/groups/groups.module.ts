import { Module } from '@nestjs/common';
import { FireormModule } from 'nestjs-fireorm';

import { UsersModule } from '../users/users.module';
import { GroupEntity } from './entities/group.entity';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
	imports: [
		FireormModule.forFeature([GroupEntity]),
		UsersModule,
		PermissionsModule
	],
  controllers: [GroupsController],
  providers: [GroupsService]
})
export class GroupsModule {}
