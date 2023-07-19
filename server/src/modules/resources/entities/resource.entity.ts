import {ApiProperty} from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString } from "class-validator";
import { Collection } from "fireorm";

import { BaseEntity } from "src/base/base.entity";

@Collection('resources')
export class ResourceEntity extends BaseEntity {
	@ApiProperty({
		description: "Tên tài nguyên quản lí"
	})
	@Transform(({ value }: { value: string }) => value.trim())
	@IsString()
	name: string;
}
