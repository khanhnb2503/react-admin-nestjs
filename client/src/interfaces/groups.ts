export interface IRole {
  name: string;
  permissionId: string;
}

export interface IGroups {
  name: string;
  roles: IRole[];
}