import { Module } from '@nestjs/common';
import { FireormModule } from 'nestjs-fireorm';

import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [
    FireormModule.forFeature([ProductEntity])
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
