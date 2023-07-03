import { Module, forwardRef } from '@nestjs/common';
import { FireormModule } from 'nestjs-fireorm';
import { UserEntity } from './entities/user.entity';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { GroupsModule } from '../groups/groups.module';

@Module({
	imports: [
		FireormModule.forFeature([UserEntity]),
		GroupsModule
	],
  controllers: [UsersController],
  providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule {}
