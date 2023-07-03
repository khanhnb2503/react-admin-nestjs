import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from 'nestjs-fireorm';
import {BaseFirestoreRepository} from 'fireorm';

import {PermissionEntity} from './entities/permission.entity';
import {CreatePermissionDto} from './dto/create-permission.dto';
import {RequestUser} from 'src/decorators/user.decorator';

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
			throw new ConflictException({
				message: 'Permission name đã tồn tại'
			})
		};

		const createPermission = await this.repoPermission.create({
			...permissionDto,
			createdAt: Date.now()
		});

		if(!createPermission.id) {
			throw new ConflictException({
				message: 'Không thể tạo permission'
			});
		};
		return createPermission;
	}

	async findAll() {
		return this.repoPermission.find();
	}

	async findOne(id: string): Promise<PermissionEntity> {
		const permission = await this.findPermissionById(id);
		if(!permission) {
			throw new NotFoundException({
				message: "Permission id không tồn tại"
			})
		};
		return permission;
	}

	async update(id: string, permissionDto: CreatePermissionDto) {
		const permission = await this.findPermissionById(id);
		if(!permission) {
			throw new NotFoundException({
				message: "Permission id không tồn tại"
			})
		};
		
		const updatePermission = await this.repoPermission.update({
			...permissionDto,
			updatedAt: Date.now()
		});
		return updatePermission;
	}

	async remove(id: string): Promise<PermissionEntity> {
		const permission = await this.findPermissionById(id);
		if(!permission) {
			throw new NotFoundException({
				message: "Permission id không tồn tại"
			})
		};

		return permission;
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
