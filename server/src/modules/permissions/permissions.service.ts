import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from 'nestjs-fireorm';
import {BaseFirestoreRepository} from 'fireorm';

import {PermissionEntity} from './entities/permission.entity';
import {CreatePermissionDto} from './dto/create-permission.dto';
import {RequestUser} from 'src/decorators/user.decorator';
import { Errors } from 'src/constants/errors';

@Injectable()
export class PermissionsService {
	constructor(
		@InjectRepository(PermissionEntity)
		private repoPermission: BaseFirestoreRepository<PermissionEntity>
	) { }

	async create(
		permissionDto: CreatePermissionDto,
		user: RequestUser
	): Promise<PermissionEntity> {
		const existPermission = await this.checkExistPermissionName(permissionDto.name);
		if(existPermission) {
			throw new ConflictException(Errors.PERMISSION_EXIST)
		};

		const createPermission = await this.repoPermission.create({
			...permissionDto,
			createdAt: Date.now()
		});

		if(!createPermission.id) {
			throw new ConflictException(Errors.PERMISSION_CONFLICT);
		};
		return createPermission;
	}

	async findAll(): Promise<PermissionEntity[]> {
		return this.repoPermission.find();
	}

	async findOne(id: string): Promise<PermissionEntity> {
		const permission = await this.findPermissionById(id);
		if(!permission) {
			throw new NotFoundException(Errors.PERMISSION_NOT_FOUND)
		};
		return permission;
	}

	async update(id: string, permissionDto: CreatePermissionDto) {
		const permission = await this.findPermissionById(id);
		if(!permission) {
			throw new NotFoundException(Errors.PERMISSION_NOT_FOUND)
		};
		const existPermission = await this.checkExistPermissionName(permissionDto.name);
		if(existPermission) {
			throw new ConflictException(Errors.PERMISSION_EXIST)
		};
		
		permission.name = permissionDto.name
		const updatePermission = await this.repoPermission.update({
			...permission,
			updatedAt: Date.now()
		});
		return updatePermission;
	}

	async remove(id: string) {
		const permission = await this.findPermissionById(id);
		if(!permission) {
			throw new NotFoundException(Errors.PERMISSION_NOT_FOUND)
		};
		return this.repoPermission.delete(id);
	};

	private async findPermissionById(id: string) {
		const permissions = await this.repoPermission.findById(id);
		return permissions;
	}

	private async checkExistPermissionName(name: string) {
		const permissions = await this.repoPermission
		.whereEqualTo('name', name)
		.findOne();
		return permissions;
	}
}
