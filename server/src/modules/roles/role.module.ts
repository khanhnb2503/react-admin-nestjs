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
        let permissions = groups.map((group) => {
          return group?.roles?.map((grant) => {
            return { 
              role: group.name, 
              resource: grant.resource,
              action: grant.action
            }
          })
        });
        if (permissions) {
          let grants = [];
          permissions.forEach((grant) => {
            if(grant) return grants = grants.concat(grant);
          });
          return new RolesBuilder(grants)
        }
        return new RolesBuilder([])
      }
    })
  ],
  providers: [],
  exports: [],
})

export class RolesModule { }