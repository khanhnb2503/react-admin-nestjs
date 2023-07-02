import {PickType} from '@nestjs/swagger';

import { GroupEntity } from "../entities/group.entity";

export class CreateGroupDto extends PickType(GroupEntity, ['name']) {}
