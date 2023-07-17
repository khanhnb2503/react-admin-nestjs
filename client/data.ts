export interface IData {
  group_name: string;
  permission: IPermissions[];
}

export interface IPermissions {
  id: number;
  name: string;
}

export const data: IData[] = [
  {
    group_name: 'Quản lí tài khoản',
    permission: [
      {
        id: 1,
        name: 'Xem tài khoản'
      },
      {
        id: 2,
        name: 'Sửa tài khoản'
      },
      {
        id: 3,
        name: 'Thêm tài khoản'
      },
      {
        id: 4,
        name: 'Xóa tài khoản'
      },
    ]
  },
  {
    group_name: 'Quản lí nhân viên',
    permission: [
      {
        id: 1,
        name: 'Xem nhân viên'
      },
      {
        id: 2,
        name: 'Sửa nhân viên'
      },
      {
        id: 3,
        name: 'Thêm nhân viên'
      },
      {
        id: 4,
        name: 'Xóa nhân viên'
      },
    ]
  }
]