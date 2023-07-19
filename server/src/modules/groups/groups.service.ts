import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from 'nestjs-fireorm';
import { BaseFirestoreRepository } from 'fireorm';
import { extname } from 'path';
import * as admin from 'firebase-admin';

import { GroupEntity } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { RequestUser } from 'src/decorators/user.decorator';
import { PermissionsService } from '../permissions/permissions.service';
import { ResourcesService } from '../resources/resources.service';
import { Errors } from 'src/constants/errors';
@Injectable()
export class GroupsService {
	constructor(
		@InjectRepository(GroupEntity)
		private repoGroup: BaseFirestoreRepository<GroupEntity>,
		private permissionsService: PermissionsService,
		private resourceService: ResourcesService
	) { }

	async create(groupDto: CreateGroupDto, user: RequestUser): Promise<GroupEntity> {
		const checkExistGroupName = await this.checkExistGroupName(groupDto.name);
		if (checkExistGroupName) {
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
		const groups = await this.repoGroup.find();
		return groups;
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
		if (checkExistGroupName) {
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
		const resources = await this.resourceService.findAll();

		if (!groups) {
			throw new NotFoundException(Errors.GROUP_NOT_FOUND)
		};

		let permissionRequest = [];
		if(permissId) {
			let result = permissId.map((item) => item.split('_'));
			result.map((item) => item.map((item) => {
				
				permissionRequest.push({
					actionId: item, resourceId: item
				})
			}))
		};

		const mapResource = new Map(resources.map((value) => [value.id, value]));
		const mapPermission = new Map(permissions.map((value) => [value.id, value]));

		// console.log(permissionRequest)
		let roles = [];
		if(permissionRequest.length > 0) {
			permissionRequest.map((role) => {
				let existPermission = mapPermission.get(role.actionId);
				let existResource = mapResource.get(role.resourceId);
				if(existPermission && existResource) {
					roles.push({
						id: existPermission.id, 
						action: existPermission.name,
						resource: existResource.name
					})
				}
			})
		};

		console.log(roles);

		if (!groups.roles?.length) {
			groups.roles = roles;
			return this.repoGroup.update(groups);
		}
		
		groups.roles = roles;
		return this.repoGroup.update(groups);
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
	};

	async uploadFile(file: Express.Multer.File) {
		// const fileName = `${Math.random()}${extname(file.originalname)}`;
		// console.log(fileName);
		// await admin.storage().bucket().file(file.originalname).save(file.buffer);
		return;
	};

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
