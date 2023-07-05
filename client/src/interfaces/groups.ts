export interface IRole {
  name: string;
  permissionId: string;
}

export interface IGroups {
  id: string | any;
  name: string;
  roles?: IRole[] | any;
}