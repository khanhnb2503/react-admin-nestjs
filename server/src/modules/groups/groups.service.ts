import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from 'nestjs-fireorm';
import {BaseFirestoreRepository, createBatch} from 'fireorm';

import {GroupEntity} from './entities/group.entity';
import {CreateGroupDto} from './dto/create-group.dto';
import {UpdateGroupDto} from './dto/update-group.dto';
import {RequestUser} from 'src/decorators/user.decorator';
import {UsersService} from '../users/users.service';
import { PermissionsService } from '../permissions/permissions.service'; 
import {PermissionType} from './entities/group.entity';

@Injectable()
export class GroupsService {
	constructor(
		@InjectRepository(GroupEntity)
		private repoGroup: BaseFirestoreRepository<GroupEntity>,
		private userService: UsersService,
		private permissionsService: PermissionsService
	) { }

	async create(groupDto: CreateGroupDto, user: RequestUser): Promise<GroupEntity> {
		const checkExistGroupName = await this.checkExistGroupName(groupDto.name);
		if(checkExistGroupName) {
			throw new ConflictException({
				message: "Group name đã tồn tại"
			})
		}

		const createGroup = await this.repoGroup.create({
			...groupDto,
			createdAt: Date.now(),
		});

		if (!createGroup.id) {
			throw new ConflictException({
				message: 'Lỗi khi tạo groups'
			})
		};

		return createGroup;
	};

	findAll() {
		return `This action returns all groups`;
	}

	findOne(id: string) {
		return `This action returns a #${id} group`;
	}

	update(id: string, updateGroupDto: UpdateGroupDto) {
		return `This action updates a #${id} group`;
	}

	remove(id: string) {
		return `This action removes a #${id} group`;
	};

	async addPermission(
		id: string,
		permissionId: PermissionType
	): Promise<GroupEntity> {
		const groups = await this.findByIdGroup(id);
		if (!groups) {
			throw new NotFoundException({
				message: 'Group id không tồn tại'
			})
		};

		const permissions = await this.permissionsService.findOne(permissionId.permissionId);
		const permissionData = [{
			permissionId: permissionId.permissionId,
			name: permissions.name
		}]
		if (!groups.roles?.length) {
			groups.roles = permissionData;
			return this.repoGroup.update(groups);
		};

		const groupMap = new Map(groups.roles.map((group) => [group.permissionId, group]));
		if (groupMap.has(permissionId.permissionId)) {
			throw new ConflictException({
				message: "Quyền đã tồn tại"
			})
		};

		groups.roles.push(...permissionData);
		return this.repoGroup.update(groups)
	};

	async unPermission(
		id: string,
		permissionId: PermissionType
	): Promise<GroupEntity> {
		const groups = await this.findByIdGroup(id);
		if (!groups) {
			throw new NotFoundException({
				message: 'Group id không tồn tại'
			})
		};

		if (groups.roles.length > 0) {
			const filterRoles = groups.roles.filter(
				(role) => role.permissionId !== permissionId.permissionId
			);
			groups.roles = filterRoles;
			return this.repoGroup.update(groups);
		}
	}

	private async checkExistGroupName(name: string) {
		const permissions = await this.repoGroup.whereEqualTo('name', name);
		return permissions;
	};

	private async findByIdGroup(id: string) {
		const groupId = await this.repoGroup.findById(id);
		return groupId;
	}
}
