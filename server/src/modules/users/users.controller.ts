import {Controller, Get, Post, Body, Param, Delete, Response, Query, Put, UseGuards} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {Response as Res} from 'express';

import { RequirePermission, Permissions } from 'src/decorators/role.decorator';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {User, RequestUser} from 'src/decorators/user.decorator';
import { RolesGuard } from 'src/guards/role.guard';
@ApiTags('User')
@Controller('api/users')
@ApiBearerAuth()
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@RequirePermission(Permissions.CREATE)
	@UseGuards(AccessTokenGuard, RolesGuard)
	@Post()
	async create(
		@Body() createUserDto: CreateUserDto,
		@User() user: RequestUser,
	) {
		return this.usersService.create(createUserDto, user);
	}

	@RequirePermission(Permissions.READ)
	@UseGuards(AccessTokenGuard, RolesGuard)
	@Get()
	async findAll(
		@Response() res: Res,
		@Query() query: any,
	) {
		const users = await this.usersService.findAll(query);
		return res.set({
			'Access-Control-Expose-Headers': 'Content-Range',
			'Content-Range': '0-5/40'
		}).json(users);
	}

	@RequirePermission(Permissions.READ)
	@UseGuards(AccessTokenGuard, RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(id);
	}
	@RequirePermission(Permissions.UPDATE)
	@UseGuards(AccessTokenGuard, RolesGuard)
	@Put(':id')
	update(
		@Param('id',) id: string,
		@Body() updateUserDto: any,
		@User() user: RequestUser
	) {
		return this.usersService.update(id, updateUserDto, user);
	}

	@RequirePermission(Permissions.DELETE)
	@UseGuards(AccessTokenGuard, RolesGuard)
	@Delete(':id')
	remove(
		@Param('id') id: string,
		@User() user: RequestUser
	) {
		return this.usersService.remove(id, user);
	}
}
