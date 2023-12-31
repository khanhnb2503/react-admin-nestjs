import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { InjectRepository } from 'nestjs-fireorm';
import { BaseFirestoreRepository } from 'fireorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './dto/user.response';
import { RequestUser } from 'src/decorators/user.decorator';
import { GroupsService } from '../groups/groups.service';
import { Errors } from 'src/constants/errors';
@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private repoUser: BaseFirestoreRepository<UserEntity>,
		private groupService: GroupsService
	) { }

	async create(userDto: CreateUserDto, user: RequestUser): Promise<UserResponse> {
		if (userDto) {
			const existUsernameAndEmail = await this.findByUsernameAndEmail(userDto);
			if (existUsernameAndEmail) {
				throw new ConflictException(Errors.USER_LOGIN)
			}
		};
		const password = await this.hashPassword(userDto.password);

		const createUser = await this.repoUser.create({
			...userDto,
			createdAt: Date.now(),
			password: password
		});

		if (!createUser.id) {
			throw new ConflictException(Errors.USER_CONFLICT)
		};
		return createUser;
	}

	async findAll(query: any): Promise<UserResponse[]> {
		const page = JSON.parse(query.range);
		const filterName = JSON.parse(query.filter);

		const result = await this.repoUser.find();

		const usersQuery = await this.repoUser
			.limit(
				(page[1] - page[0]) === 4 ? 5 : (page[1] + 1)
			);

		const users = await usersQuery
			.customQuery(async (fsQuery, firestoreColRef) => {
				let q = fsQuery;
				const snapshot = await firestoreColRef.doc(result[page[0]].id).get();
				q = q.startAfter(snapshot);
				return q;
			})
			.find();
		return users;
	}

	async findOne(id: string): Promise<UserResponse> {
		const user = await this.findByUserId(id);
		return user;
	}

	async update(
		id: string,
		userDto: any,
		user?: RequestUser
	): Promise<UserResponse> {
		const users = await this.findByUserId(id);
		if (users) {
			return this.repoUser.update({
				...users,
				...userDto
			})
		}
	}

	async remove(id: string, user: RequestUser) {
		const users = await this.findByUserId(id);
		if (users) {
			return this.repoUser.delete(id);
		}
	};

	private async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10);
		return await bcrypt.hash(password, salt);
	};

	async comparePassword(password: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(password, hash);
	};

	private async findByUsernameAndEmail(users: UserEntity) {
		return this.repoUser
			.whereEqualTo('username', users.username)
			.whereEqualTo('email', users.email)
			.findOne();
	};

	async findByUsername(username: string): Promise<UserEntity> {
		return this.repoUser.whereEqualTo('username', username).findOne()
	};
	
	async findByUserToGroup(id: string) {
		const user = await this.findByUserId(id);
		if (user) {
			const groups = await this.groupService.findOne(user?.roleId);
			return groups;
		}
	}

	async findByUserId(id: string) {
		const user = await this.repoUser.findById(id);
		if (!user) {
			throw new NotFoundException(Errors.USER_NOT_FOUND)
		};
		return user;
	}

	async profile (id: string) {
		const users = await this.repoUser.findById(id);
		if (!users) {
			throw new NotFoundException(Errors.USER_NOT_FOUND)
		};
		const roles = await this.groupService.findOne(users.roleId);
		let resources = [];
		if(roles) {
			roles.roles.map((role: any) => {
				let resource = role.resourceName;
				if(resources.indexOf(resource) === -1) {
					resources.push(resource);
				}
			});
		}
		return {resources, users};
	}
}
