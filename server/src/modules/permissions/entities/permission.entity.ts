import {ApiProperty} from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Collection } from "fireorm";

import { BaseEntity } from "src/base/base.entity";

@Collection('permissions')
export class PermissionEntity extends BaseEntity {
	@ApiProperty({
		description: "Tên vai trò"
	})
	@IsString()
	name: string;
}
