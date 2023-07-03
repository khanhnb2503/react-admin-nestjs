import {ConflictException, Inject, Injectable, NotFoundException, forwardRef} from '@nestjs/common';
import {InjectRepository} from 'nestjs-fireorm';
import {BaseFirestoreRepository, createBatch} from 'fireorm';

import {GroupEntity} from './entities/group.entity';
import {CreateGroupDto} from './dto/create-group.dto';
import {UpdateGroupDto} from './dto/update-group.dto';
import {RequestUser} from 'src/decorators/user.decorator';
import { PermissionsService } from '../permissions/permissions.service'; 
import {PermissionId} from './entities/group.entity';

@Injectable()
export class GroupsService {
	constructor(
		@InjectRepository(GroupEntity)
		private repoGroup: BaseFirestoreRepository<GroupEntity>,
		private permissionsService: PermissionsService
	) { }

	async create(groupDto: CreateGroupDto, user: RequestUser): Promise<GroupEntity> {
		const checkExistGroupName = await this.checkExistGroupName(groupDto.name);
		if(checkExistGroupName) {
			throw new ConflictException({
				message: "Group name đã tồn tại"
			})
		};

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

	async findAll(): Promise<GroupEntity[]> {
		return this.repoGroup.find();
	}

	async findOne(id: string): Promise<GroupEntity> {
		const group = await this.findByIdGroup(id);
		if (!group) {
			throw new NotFoundException({
				message: 'Group id không tồn tại'
			})
		};

		return group;
	}

	async update(id: string, groupDto: UpdateGroupDto) {
		const group = await this.findByIdGroup(id);
		if (!group) {
			throw new NotFoundException({
				message: 'Group id không tồn tại'
			})
		};

		group.name = groupDto.name;
		group.updatedAt = Date.now();

		return this.repoGroup.update(group);
	}

	async remove(id: string) {
		const group = await this.findByIdGroup(id);
		if (!group) {
			throw new NotFoundException({
				message: 'Group id không tồn tại'
			})
		};

		return this.repoGroup.delete(id);
	};

	async addPermission(
		id: string,
		permissId: PermissionId
	): Promise<GroupEntity> {
		const groups = await this.findByIdGroup(id);
		if (!groups) {
			throw new NotFoundException({
				message: 'Group id không tồn tại'
			})
		};

		const { permissionId } = permissId;

		const permissions = await this.permissionsService.findOne(permissionId);
		const permissionData = [{
			permissionId,
			name: permissions.name
		}];

		if (!groups.roles?.length) {
			groups.roles = permissionData;
			return this.repoGroup.update(groups);
		};

		const groupMap = new Map(groups.roles.map((group) => [group.permissionId, group]));
		if (groupMap.has(permissionId)) {
			throw new ConflictException({
				message: "Quyền đã tồn tại"
			})
		};

		groups.roles.push(...permissionData);
		return this.repoGroup.update(groups)
	};

	async unPermission(
		id: string,
		permissId: PermissionId
	): Promise<GroupEntity> {
		const groups = await this.findByIdGroup(id);
		if (!groups) {
			throw new NotFoundException({
				message: 'Group id không tồn tại'
			})
		};
		const { permissionId } = permissId;

		if (groups.roles.length > 0) {
			const filterRoles = groups.roles.filter(
				(role) => role.permissionId !== permissionId
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
