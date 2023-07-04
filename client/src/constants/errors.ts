import { minLength, maxLength, required } from "react-admin";

export const FormValidators = {
  username: [
    minLength(5, 'Username tối thiểu từ 5-> 30 kí tự'),
    maxLength(30, 'Username tối thiểu từ 5-> 30 kí tự'),
    required('Username không được để trống')
  ],
  password: [
    minLength(7, 'Password tối thiểu từ 7-> 50 kí tự'),
    maxLength(50, 'Password tối thiểu từ 7-> 50 kí tự'),
    required('Username không được để trống')
  ],
  email: [
    required('Email không được để trống')
  ],
  address: [
    required('Address không được để trống')
  ],
}