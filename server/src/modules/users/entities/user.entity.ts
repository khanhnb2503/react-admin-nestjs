import { Collection } from 'fireorm';
import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
	IsNotEmpty,
	IsOptional
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from 'src/base/base.entity';

export enum SortType {
	ASC = 'ASC',
	DESC = 'DESC',
}

@Collection('users')
export class UserEntity extends BaseEntity {
  @IsString()
  @MinLength(5, {message: 'Tên phải có độ dài từ 5->20 kí tự'})
  @MaxLength(20, {message: 'Tên phải có độ dài từ 5->20 kí tự'})
	@IsNotEmpty({message: "Tên không được để trống"})
  @ApiProperty({
    description: 'Tên'
  })
  username: string;

  @IsEmail()
  @IsString()
	@IsNotEmpty({message: "Email không được để trống"})
  @ApiProperty({
    description: 'Email'
  })
  email: string;

	@IsNotEmpty({message: "Mật khẩu không được để trống"})
  @ApiProperty({
    description: 'Mật khẩu'
  })
  password: string;
  
  @IsString()
	@IsNotEmpty({message: "Address không được để trống"})
  @ApiProperty({
    description: 'Địa chỉ'
  })
  address: string;

	refreshToken?: string;

	roleId?: string;
}

