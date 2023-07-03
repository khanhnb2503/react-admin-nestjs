import {ApiProperty} from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString } from "class-validator";
import { Collection } from "fireorm";

import { BaseEntity } from "src/base/base.entity";

@Collection('permissions')
export class PermissionEntity extends BaseEntity {
	@ApiProperty({
		description: "Tên vai trò"
	})
	@Transform(({ value }: { value: string }) => value.trim())
	@IsString()
	name: string;
}
