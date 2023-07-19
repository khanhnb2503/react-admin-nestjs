import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from 'nestjs-fireorm';
import {BaseFirestoreRepository} from 'fireorm';


import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Errors } from 'src/constants/errors';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private repoProduct: BaseFirestoreRepository<ProductEntity>
  ) {}

  async create(createProductDto: CreateProductDto) {
    const products = await this.repoProduct.create(createProductDto);
    return products;
  }

  async findAll() {
    return this.repoProduct.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} product`;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
