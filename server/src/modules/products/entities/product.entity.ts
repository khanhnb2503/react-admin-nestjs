import {ApiProperty} from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { Collection } from "fireorm";

import { BaseEntity } from "src/base/base.entity";

@Collection('products')
export class ProductEntity extends BaseEntity {
	@ApiProperty({
		description: "Tên sản phẩm"
	})
	@Transform(({ value }: { value: string }) => value.trim())
	@IsString()
	name: string;

  @ApiProperty({
		description: "Giá sản phẩm"
	})
	@IsNumber()
	price: number;
}
