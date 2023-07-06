import {ConflictException, Inject, Injectable, NotFoundException, forwardRef} from '@nestjs/common';
import {InjectRepository} from 'nestjs-fireorm';
import {BaseFirestoreRepository} from 'fireorm';

import {GroupEntity} from './entities/group.entity';
import {CreateGroupDto} from './dto/create-group.dto';
import {UpdateGroupDto} from './dto/update-group.dto';
import {RequestUser} from 'src/decorators/user.decorator';
import { PermissionsService } from '../permissions/permissions.service'; 
import { Errors } from 'src/constants/errors';

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
			throw new ConflictException(Errors.GROUP_EXIST)
		};

		const createGroup = await this.repoGroup.create({
			...groupDto,
			createdAt: Date.now(),
		});

		if (!createGroup.id) {
			throw new ConflictException(Errors.GROUP_CONFLICT)
		};

		return createGroup;
	};

	async findAll(): Promise<GroupEntity[]> {
		return this.repoGroup.find();
	}

	async findOne(id: string): Promise<GroupEntity> {
		const group = await this.findByIdGroup(id);
		if (!group) {
			throw new NotFoundException(Errors.GROUP_NOT_FOUND)
		};
		return group;
	}

	async update(id: string, groupDto: UpdateGroupDto) {
		const group = await this.findByIdGroup(id);
		if (!group) {
			throw new NotFoundException(Errors.GROUP_NOT_FOUND)
		};
		const checkExistGroupName = await this.checkExistGroupName(groupDto.name);
		if(checkExistGroupName) {
			throw new ConflictException()
		};

		group.name = groupDto.name;
		group.updatedAt = Date.now();

		return this.repoGroup.update(group);
	}

	async remove(id: string) {
		const group = await this.findByIdGroup(id);
		if (!group) {
			throw new NotFoundException(Errors.GROUP_NOT_FOUND)
		};

		return this.repoGroup.delete(id);
	};

	async addPermission(
		id: string,
		permissId: any
	): Promise<GroupEntity> {
		const groups = await this.findByIdGroup(id);
		const permissions = await this.permissionsService.findAll();
		if (!groups) {
			throw new NotFoundException(Errors.GROUP_NOT_FOUND)
		};

		if (permissId.length < 0) {
      throw new NotFoundException(Errors.GROUP_EMPTY)
    };

		const mapPermissIdRequest = new Map(permissId.map((id) => [id, id]));
		const filterPermission = permissions.filter((item) => 
			item.id === mapPermissIdRequest.get(item.id));
		let roles = [];
		filterPermission.forEach((item) => roles.push({id: item.id,name: item.name}));

		if (!groups.roles?.length) {
			groups.roles = roles;
			return this.repoGroup.update(groups);
		}

		groups.roles.push(...roles);
		return this.repoGroup.update(groups)
	};

	async unPermission(
		id: string,
		permissId: any
	): Promise<GroupEntity> {
		const groups = await this.findByIdGroup(id);
		if (!groups) {
			throw new NotFoundException(Errors.GROUP_NOT_FOUND)
		};

		if (groups.roles.length > 0) {
			const filterRole = groups.roles.filter((role) => !permissId.includes(role.id));
			groups.roles = filterRole;
			return this.repoGroup.update(groups);
		}
		return;
	}

	private async checkExistGroupName(name: string) {
		const permissions = await this.repoGroup
			.whereEqualTo('name', name)
			.findOne();
		return permissions;
	};

	private async findByIdGroup(id: string) {
		const groupId = await this.repoGroup.findById(id);
		return groupId;
	}
}
