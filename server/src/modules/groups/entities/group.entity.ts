import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {Transform} from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";
import { Collection } from "fireorm";

import { BaseEntity } from "src/base/base.entity";

export class PermissionName {
	@ApiProperty({
    description: 'Id permission',
  })
  id: string;

	@ApiProperty({
    description: 'Tên permission',
  })
  name: string;
}

export class PermissionId {
	@ApiProperty({
    description: 'Id permission',
  })
  id: string;
}

@Collection('groups')
export class GroupEntity extends BaseEntity {
	@ApiProperty({
		description: 'Group name'
	})
	@IsString()
	@Transform(({ value }: { value: string }) => value.trim())
	name: string;

	@ApiProperty({
		description: "Groups chứa nhiều permission",
		type: [PermissionName],
		isArray: true
	})
	@IsArray()
	@IsOptional()
	roles?: PermissionName[]

}
