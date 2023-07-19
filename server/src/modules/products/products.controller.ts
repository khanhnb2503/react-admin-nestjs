import { Controller, Get, Post, Body, Patch, Param, Delete, Response } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {Response as Res} from 'express';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { RolesGuard } from 'src/guards/role.guard';
import { RequirePermission, Permissions } from 'src/decorators/role.decorator';
import {AccessTokenGuard} from 'src/guards/access-token.guard';

@ApiTags('Products')
@Controller('api/products')
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
		description: 'Thêm sản phẩm',
	})
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(@Response() res: Res) {
    const products = await this.productsService.findAll();
    return res.set({
			'Access-Control-Expose-Headers': 'Content-Range',
			'Content-Range': '0-5/20'
		}).json(products);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
