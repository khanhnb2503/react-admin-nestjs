import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginResponse {
  @IsString()
  @ApiProperty({
    description: 'Access token',
  })
  accessToken: string;

  @IsString()
  @ApiProperty({
    description: 'Refresh token',
  })
  refreshToken: string;
}
