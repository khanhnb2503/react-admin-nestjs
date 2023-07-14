import {Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Response} from '@nestjs/common';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {Response as Res} from 'express';

import {PermissionsService} from './permissions.service';
import {CreatePermissionDto} from './dto/create-permission.dto';
import {User, RequestUser} from 'src/decorators/user.decorator';
@ApiTags('Permissions')
@Controller('api/permissions')
@ApiBearerAuth()
export class PermissionsController {
	constructor(private readonly permissionsService: PermissionsService) { }

	@Post()
	create(
		@Body() createPermissionDto: CreatePermissionDto,
		@User() user: RequestUser
	) {
		return this.permissionsService.create(createPermissionDto, user);
	}

	@Get()
	async findAll(@Response() res: Res) {
		const permissions = await this.permissionsService.findAll();
		return res.set({
			'Access-Control-Expose-Headers': 'Content-Range',
			'Content-Range': '0-5/20'
		}).json(permissions);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.permissionsService.findOne(id);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() updatePermissionDto: CreatePermissionDto) {
		return this.permissionsService.update(id, updatePermissionDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.permissionsService.remove(id);
	}
}
