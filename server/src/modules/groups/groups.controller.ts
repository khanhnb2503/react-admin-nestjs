import {Controller, Get, Post, Body, Param, Delete, Put, Response, UploadedFile, UseGuards} from '@nestjs/common';
import {ApiTags, ApiBearerAuth, ApiOperation, ApiBody} from '@nestjs/swagger';
import {Response as Res} from 'express';

import {GroupsService} from './groups.service';
import {CreateGroupDto} from './dto/create-group.dto';
import {UpdateGroupDto} from './dto/update-group.dto';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {User, RequestUser} from 'src/decorators/user.decorator';
import {PermissionId} from './entities/group.entity';
import {GroupEntity} from './entities/group.entity';
import { GrantPermission } from './entities/group.entity'; 
import { UseUploadFile } from 'src/decorators/file.decorator';
import { RolesGuard } from 'src/guards/role.guard';
import { 
	RequirePermission, 
	Permissions,
	RequireResource,
	Resources
} from 'src/decorators/role.decorator';


@ApiTags('Groups')
@Controller('api/groups')
@ApiBearerAuth()
export class GroupsController {
	constructor(private readonly groupsService: GroupsService) { }

	@Post()
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

	@UseGuards(AccessTokenGuard, RolesGuard)
	@RequirePermission(Permissions.READ)
	@RequireResource(Resources.POWER)
	@Get(':id')
	@ApiOperation({
		description: 'Chi tiết 1 groups',
	})
	findOne(@Param('id') id: string) {
		return this.groupsService.findOne(id);
	}

	@Put(':id')
	@ApiOperation({
		description: 'Cập nhật groups',
	})
	update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
		return this.groupsService.update(id, updateGroupDto);
	}

	@Delete(':id')
	@ApiOperation({
		description: 'Xóa 1 groups',
	})
	remove(@Param('id') id: string) {
		return this.groupsService.remove(id);
	}

	@UseGuards(AccessTokenGuard, RolesGuard)
	@RequirePermission(Permissions.UPDATE)
	@RequireResource(Resources.POWER)
	@Post('add-permission/:id')
	@ApiOperation({
		description: 'Thêm quyền vào groups',
	})
	@ApiBody({ type: GrantPermission })
	addPermissionToGroup(
		@Param('id') id: string,
		@Body() permissionId: any, 
	): Promise<GroupEntity> {
		return this.groupsService.addPermission(id, permissionId);
	};

	// @RequirePermission(Permissions.UPDATE)
	// @UseGuards(AccessTokenGuard, RolesGuard)
	@Post('un-permission/:id')
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

	@ApiOperation({
		description: 'Tải ảnh đại diện'
	})
	@Post('upload')
	@UseUploadFile('avatar')
	upload(
		@UploadedFile() file: Express.Multer.File
	) {
		console.log(file);
		return this.groupsService.uploadFile(file);
	}
}
