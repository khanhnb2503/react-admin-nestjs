import {Controller, Get, Post, Body, Param, Delete, Response, Query, Put, UseGuards} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {Response as Res} from 'express';

import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {User, RequestUser} from 'src/decorators/user.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/decorators/role.decorator';
import { Roles } from 'src/roles/app.role';

@ApiTags('User')
@Controller('users')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@UseGuards(RolesGuard)

export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Post()
	async create(
		@Body() createUserDto: CreateUserDto,
		@User() user: RequestUser,
	) {
		return this.usersService.create(createUserDto, user);
	}

	@Get()
	async findAll(
		@Response() res: Res,
		@Query() query: any,
		@User() user: RequestUser,
	) {

		const users = await this.usersService.findAll(query);
		return res.set({
			'Access-Control-Expose-Headers': 'Content-Range',
			'Content-Range': '0-5/30'
		}).json(users);
	}

	@Get(':id')
	@Role(Roles.ADMIN)
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(id);
	}

	@Put(':id')
	update(
		@Param('id',) id: string,
		@Body() updateUserDto: UpdateUserDto,
		@User() user: RequestUser
	) {
		return this.usersService.update(id, updateUserDto, user);
	}

	@Delete(':id')
	remove(
		@Param('id') id: string,
		@User() user: RequestUser
	) {
		return this.usersService.remove(id, user);
	}
}
