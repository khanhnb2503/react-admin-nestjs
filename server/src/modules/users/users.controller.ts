import {Controller, Get, Post, Body, Param, Delete, Response, Query, Put, UseGuards} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {Response as Res} from 'express';

import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import { RolesGuard } from 'src/guards/roles.guard'; 
import {User, RequestUser} from 'src/decorators/user.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/roles/app.role';


@ApiTags('User')
@Controller('api/users')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard, RolesGuard)
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Post()
	@Roles(Role.ADMIN)
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
			'Content-Range': '0-5/40'
		}).json(users);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(id);
	}
	@Put(':id')
	@Roles(Role.ADMIN)
	update(
		@Param('id',) id: string,
		@Body() updateUserDto: any,
		@User() user: RequestUser
	) {
		return this.usersService.update(id, updateUserDto, user);
	}

	@Delete(':id')
	@Roles(Role.ADMIN)
	remove(
		@Param('id') id: string,
		@User() user: RequestUser
	) {
		return this.usersService.remove(id, user);
	}
}
