
export const Errors = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
  // Groups
  GROUP_EXIST: {
    message: 'Tên group đã tồn tại!'
  },
  GROUP_CONFLICT: {
    message: 'Lỗi khi tạo groups!'
  },
  GROUP_NOT_FOUND: {
    message: 'Group không tồn tại!'
  },
  GROUP_EMPTY: {
    message: 'Vui lòng chọn permission'
  },
  // Users
  USER_EXIST: {
    message: 'Tên người dùng đã tồn tại!'
  },
  USER_LOGIN: {
    message: 'Username hoặc email đã tồn tại'
  },
  USER_CONFLICT: {
    message: 'Lỗi khi tạo users!'
  },
  USER_NOT_FOUND: {
    message: 'User không tồn tại'
  },

  // Permissions
  PERMISSION_EXIST: {
    message: 'Quyền đã tồn tại!'
  },
  PERMISSION_CONFLICT: {
    message: 'Lỗi khi tạo groups!'
  },
  PERMISSION_NOT_FOUND: {
    message: 'Quyền không tồn tại!'
  },
  ROLE_FORBIDDEN: {
    message: 'Bạn không có quyền truy cập'
  }
}