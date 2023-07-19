import { Module } from '@nestjs/common';
import { FireormModule } from 'nestjs-fireorm';

import { ResourceEntity } from './entities/resource.entity';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';

@Module({
  imports: [
    FireormModule.forFeature([ResourceEntity])
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService],
  exports: [ResourcesService]
})
export class ResourcesModule {}
