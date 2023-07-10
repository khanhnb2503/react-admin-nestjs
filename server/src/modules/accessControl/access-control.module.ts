import { Module } from '@nestjs/common';
import { AccessControlModule, RolesBuilder } from 'nest-access-control';

import { GroupsService } from '../groups/groups.service';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [
    GroupsModule,
    AccessControlModule.forRootAsync({
      inject: [GroupsService],
      useFactory: async (groupsService: GroupsService) => {
        const groups = await groupsService.findAll();
        return new RolesBuilder([...groups])
      }
    })
  ],
  providers: [],
  exports: []
})

export class AccesscontrolModule  {}