export interface IRole {
  actionId: string;
  actionName: string;
  resourceId: string;
  resourceName: string;
}

export interface IGroups {
  id: string | any;
  name: string;
  roles?: IRole[] | any;
}