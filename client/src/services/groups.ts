import instance from "../common/http-common";
import { IPermission } from "../interfaces/permission";

export const groupsApi = {
  addPermissionToGroup: ( id: string | undefined, data: string[]) => {
    return instance.post(`/groups/add-permission/${id}`, data);
  },

  unPermissionToGroup: (id: string | undefined, data: string[]) => {
    return instance.post(`/groups/un-permission/${id}`, data);
  }
}