import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { PinoLogger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-auth.dto';
import { LoginResponse } from './response/login.response';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
		private readonly authService: AuthService,
	) {}

  @Post('login')
  async login(@Body() userLogin: LoginDto): Promise<LoginResponse> {
    return this.authService.login(userLogin);
  };

}
