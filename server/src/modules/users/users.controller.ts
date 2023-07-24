import {Controller, Get, Post, Body, Param, Delete, Response, Query, Put, UseGuards} from '@nestjs/common';
import {ApiTags, ApiBearerAuth, ApiOkResponse} from '@nestjs/swagger';
import {Response as Res} from 'express';

import { UserEntity } from './entities/user.entity';
import { RequirePermission, Permissions } from 'src/decorators/role.decorator';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {User, RequestUser} from 'src/decorators/user.decorator';
import { RolesGuard } from 'src/guards/role.guard';
@ApiTags('User')
@Controller('api/users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Post()
	@RequirePermission(Permissions.CREATE)
	@UseGuards(AccessTokenGuard, RolesGuard)
	@ApiBearerAuth()
	async create(
		@Body() createUserDto: CreateUserDto,
		@User() user: RequestUser,
	) {
		return this.usersService.create(createUserDto, user);
	}

	@Get()
	@RequirePermission(Permissions.READ)
	@UseGuards(AccessTokenGuard, RolesGuard)
	@ApiBearerAuth()
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

	// @Get(':id')
	// @RequirePermission(Permissions.READ)
	// @UseGuards(AccessTokenGuard, RolesGuard)
	// @ApiBearerAuth()
	// findOne(@Param('id') id: string) {
	// 	return this.usersService.findOne(id);
	// }

	@Put(':id')
	@RequirePermission(Permissions.UPDATE)
	@UseGuards(AccessTokenGuard, RolesGuard)
	@ApiBearerAuth()
	update(
		@Param('id',) id: string,
		@Body() updateUserDto: any,
		@User() user: RequestUser
	) {
		return this.usersService.update(id, updateUserDto, user);
	}

	@Delete(':id')
	@RequirePermission(Permissions.DELETE)
	@UseGuards(AccessTokenGuard, RolesGuard)
	@ApiBearerAuth()
	remove(
		@Param('id') id: string,
		@User() user: RequestUser
	) {
		return this.usersService.remove(id, user);
	}

	@Get('/profile')
	@UseGuards(AccessTokenGuard)
	@ApiBearerAuth()
	async profile(@User() user: RequestUser) {
		const { resources, users } = await this.usersService.profile(user.sub);
		return {
			email: users.email,
			username: users.username,
			roles: resources
		}
	}
}
