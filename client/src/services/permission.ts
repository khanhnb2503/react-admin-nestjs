import instance from "../common/http-common";

export const permissionApi = {
  getPermissions: () => instance.get('/permissions')
};

export const resourceApi = {
  getResource: () => instance.get('/resources')
}