import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PinoLogger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

import { LoginDto } from './dto/create-auth.dto';
import { LoginResponse } from './response/login.response';
import { UsersService } from '../users/users.service';
import { RequestUser} from 'src/decorators/user.decorator';

@Injectable()
export class AuthService {
	constructor (
		private readonly usersService: UsersService,
		private readonly logger: PinoLogger,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
	) {}

  async login(userLogin: LoginDto): Promise<LoginResponse> {
		const { username, password } = userLogin;

		if(username && password) {
			const user = await this.usersService
				.findByUsername(userLogin.username);
			if(!user) {
				throw new NotFoundException({
					message: "Username không tồn tại"
				})
			};

			const comparePass = await this.usersService
				.comparePassword(userLogin.password, user.password)

			if(!comparePass) {
				throw new NotFoundException({
					message: "Sai mật khẩu"
				})
			};

			const tokens = await this.generateToken({
				sub: user.id
			});

			await this.usersService.update(user.id, {refreshToken: tokens.refreshToken})
			return tokens;
		}
  }

	async generateToken(user: any) {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(user, {
        secret: this.configService.get<string>('jwt.accessSecret'),
        expiresIn: this.configService.get<string>('jwt.accessExpiresIn'),
      }),
      this.jwtService.signAsync(user, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
        expiresIn: this.configService.get<string>('jwt.refreshExpiresIn'),
      }),
		]);
		return { accessToken, refreshToken };
	}

	async validate(payload) {
    return payload;
  };

  async validateUser(username: string, password: string) {
    this.logger.info(username, password);
    return {};
  };
}
