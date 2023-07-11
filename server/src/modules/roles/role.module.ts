import { Module } from '@nestjs/common';
import { AccessControlModule, RolesBuilder } from 'nest-access-control';

import { GroupsService } from '../groups/groups.service';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [
    AccessControlModule.forRootAsync({
      imports: [GroupsModule],
      inject: [GroupsService],
      useFactory: async (groupsService: GroupsService): Promise<RolesBuilder> => {
        const groups = await groupsService.findAll();
        return new RolesBuilder([
          { role: 'admin', resource: 'users', action: 'read' }
        ]);
      }
    })
  ],
  providers: [],
  exports: []
})

export class RolesModule { }