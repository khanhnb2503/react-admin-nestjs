import {Controller, Get, Post, Body, Param, Delete, Response, Query, Put, UseGuards} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {Response as Res} from 'express';
import { UseRoles, ACGuard } from 'nest-access-control';

import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {User, RequestUser} from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';


@ApiTags('User')
@Controller('api/users')
@ApiBearerAuth()
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@UseGuards(AccessTokenGuard, AuthGuard, ACGuard)
	@UseRoles({
		resource: 'users',
		action: 'create',
	})
	@Post()
	async create(
		@Body() createUserDto: CreateUserDto,
		@User() user: RequestUser,
	) {
		return this.usersService.create(createUserDto, user);
	}

	@UseGuards(AccessTokenGuard, AuthGuard, ACGuard)
	@UseRoles({
		resource: 'users',
		action: 'read',
	})
	@Get()
	async findAll(
		@Response() res: Res,
		@Query() query: any,
		@User() user: RequestUser
	) {
		const users = await this.usersService.findAll(query);
		return res.set({
			'Access-Control-Expose-Headers': 'Content-Range',
			'Content-Range': '0-5/40'
		}).json(users);
	}

	@UseGuards(AccessTokenGuard, AuthGuard, ACGuard)
	@UseRoles({
		resource: 'users',
		action: 'read',
	})
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(id);
	}

	@UseGuards(AccessTokenGuard)
	@UseRoles({
		resource: 'users',
		action: 'update',
	})
	@Put(':id')
	update(
		@Param('id',) id: string,
		@Body() updateUserDto: any,
		@User() user: RequestUser
	) {
		return this.usersService.update(id, updateUserDto, user);
	}

	@UseGuards(AccessTokenGuard, AuthGuard, ACGuard)
	// @UseRoles({
	// 	resource: 'users',
	// 	action: 'delete',
	// })
	@Delete(':id')
	remove(
		@Param('id') id: string,
		@User() user: RequestUser
	) {
		return this.usersService.remove(id, user);
	}
}
