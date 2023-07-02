import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {Transform} from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";
import { Collection } from "fireorm";

import { BaseEntity } from "src/base/base.entity";

export class PermissionName {
	@ApiProperty({
    description: 'Id permission',
  })
  permissionId: string;

	@ApiProperty({
    description: 'Tên permission',
  })
  name: string;
}

export class PermissionType {
	@ApiProperty({
    description: 'Id permission',
  })
  permissionId: string;
}

@Collection('groups')
export class GroupEntity extends BaseEntity {
	@ApiPropertyOptional({
		description: 'Group name'
	})
	@IsString()
	@IsOptional()
	@Transform(({ value }: { value: string }) => value.trim())
	name?: string;

	@ApiProperty({
		description: "1 group chứa tất cả các vai trò",
		type: [PermissionName],
		isArray: true
	})
	@IsArray()
	@IsOptional()
	roles?: PermissionName[]

}
