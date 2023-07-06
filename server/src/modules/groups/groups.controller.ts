import {Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Response} from '@nestjs/common';
import {ApiTags, ApiBearerAuth, ApiOperation, ApiBody} from '@nestjs/swagger';
import {Response as Res} from 'express';

import {GroupsService} from './groups.service';
import {CreateGroupDto} from './dto/create-group.dto';
import {UpdateGroupDto} from './dto/update-group.dto';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {User, RequestUser} from 'src/decorators/user.decorator';
import {PermissionId} from './entities/group.entity';
import {GroupEntity} from './entities/group.entity';
import { RolesGuard } from 'src/guards/roles.guard'; 
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/roles/app.role';


@ApiTags('Groups')
@Controller('api/groups')
@UseGuards(AccessTokenGuard, RolesGuard)
@ApiBearerAuth()
export class GroupsController {
	constructor(private readonly groupsService: GroupsService) { }

	@Post()
	@Roles(Role.ADMIN)
	@ApiOperation({
		description: 'Tạo groups',
	})
	create(
		@Body() createGroupDto: CreateGroupDto,
		@User() user: RequestUser
	) {
		return this.groupsService.create(createGroupDto, user);
	}

	@Get()
	@ApiOperation({
		description: 'Danh sách groups',
	})
	async findAll(@Response() res: Res,) {
		const groups = await this.groupsService.findAll();
		return res.set({
			'Access-Control-Expose-Headers': 'Content-Range',
			'Content-Range': '0-5/10'
		}).json(groups);
	} 

	@Get(':id')
	@ApiOperation({
		description: 'Chi tiết 1 groups',
	})
	findOne(@Param('id') id: string) {
		return this.groupsService.findOne(id);
	}

	@Put(':id')
	@Roles(Role.ADMIN)
	@ApiOperation({
		description: 'Cập nhật groups',
	})
	update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
		return this.groupsService.update(id, updateGroupDto);
	}

	@Delete(':id')
	@Roles(Role.ADMIN)
	@ApiOperation({
		description: 'Xóa 1 groups',
	})
	remove(@Param('id') id: string) {
		return this.groupsService.remove(id);
	}

	@Post('add-permission/:id')
	@Roles(Role.ADMIN)
	@ApiOperation({
		description: 'Thêm quyền vào groups',
	})
	@ApiBody({ type: PermissionId })
	addPermissionToGroup(
		@Param('id') id: string,
		@Body() permissionId: any, 
	): Promise<GroupEntity> {
		return this.groupsService.addPermission(id, permissionId);
	};

	@Post('un-permission/:id')
	@Roles(Role.ADMIN)
	@ApiOperation({
		description: 'Xóa quyền khỏi groups',
	})
	@ApiBody({ type: PermissionId })
	unPermissionToGroup(
		@Param('id') id: string,
		@Body() permissionId: any, 
	): Promise<GroupEntity> {
		return this.groupsService.unPermission(id, permissionId);
	}
}
