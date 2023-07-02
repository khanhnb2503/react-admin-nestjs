import { Module } from '@nestjs/common';
import { FireormModule } from 'nestjs-fireorm';
import { UserEntity } from './entities/user.entity';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {JwtModule} from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
	imports: [
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: async (configServer: ConfigService) => ({
				secret: configServer.get<string>('jwt.accessSecret')
			})
		}),
		FireormModule.forFeature([UserEntity]),
	],
  controllers: [UsersController],
  providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule {}
