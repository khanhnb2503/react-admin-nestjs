import {Controller, Get, Post, Body, Param, Delete, Response, Query, Put, UseGuards} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {Response as Res} from 'express';
import { UseRoles, UserRoles, ACGuard } from 'nest-access-control';

import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import { RolesGuard } from 'src/guards/roles.guard'; 
import {User, RequestUser} from 'src/decorators/user.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/roles/app.role';
import { AuthGuard } from 'src/guards/auth.guard';


@ApiTags('User')
@Controller('api/users')
@ApiBearerAuth()
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Roles(Role.ADMIN)
	@UseGuards(AccessTokenGuard, RolesGuard)
	@Post()
	async create(
		@Body() createUserDto: CreateUserDto,
		@User() user: RequestUser,
	) {
		return this.usersService.create(createUserDto, user);
	}

	@Get()
	@UseGuards(AccessTokenGuard, AuthGuard, ACGuard)
	@UseRoles({
		resource: 'users',
		action: 'read',
	})
	async findAll(
		@Response() res: Res,
		@Query() query: any,
		@User() user: RequestUser,
		@UserRoles() userRoles: any
	) {
		const users = await this.usersService.findAll(query, userRoles);
		return res.set({
			'Access-Control-Expose-Headers': 'Content-Range',
			'Content-Range': '0-5/40'
		}).json(users);
	}

	@Get(':id')
	@UseGuards(AccessTokenGuard, RolesGuard)
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(id);
	}

	@Roles(Role.ADMIN)
	@UseGuards(AccessTokenGuard, RolesGuard)
	@Put(':id')
	update(
		@Param('id',) id: string,
		@Body() updateUserDto: any,
		@User() user: RequestUser
	) {
		return this.usersService.update(id, updateUserDto, user);
	}

	@Roles(Role.ADMIN)
	@UseGuards(AccessTokenGuard, RolesGuard)
	@Delete(':id')
	remove(
		@Param('id') id: string,
		@User() user: RequestUser
	) {
		return this.usersService.remove(id, user);
	}
}
