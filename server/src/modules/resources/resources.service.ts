import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from 'nestjs-fireorm';
import {BaseFirestoreRepository} from 'fireorm';

import { ResourceEntity } from './entities/resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(ResourceEntity)
    private repoResource: BaseFirestoreRepository<ResourceEntity>
  ) {}

  async create(createResourceDto: CreateResourceDto) {
    const resource = await this.repoResource.create(createResourceDto);
    return resource;
  }

  findAll() {
    return this.repoResource.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} resource`;
  }

  update(id: number, updateResourceDto: UpdateResourceDto) {
    return `This action updates a #${id} resource`;
  }

  remove(id: number) {
    return `This action removes a #${id} resource`;
  }
}
