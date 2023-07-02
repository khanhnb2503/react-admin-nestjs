import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UsersModule } from '../users/users.module'; 
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
	imports: [
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: async (configServer: ConfigService) => ({
				secret: configServer.get<string>('jwt.accessSecret')
			})
		}),
		UsersModule,
	],
  controllers: [AuthController],
  providers: [
		AuthService,
		LocalStrategy,
		AccessTokenStrategy
	]
})
export class AuthModule {}
