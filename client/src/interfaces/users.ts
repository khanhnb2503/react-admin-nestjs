export interface IUser {
  username: string;
  password: string;
  email: string;
  address: string;
};

export interface IUserResponse {
  email: string;
  username: string;
  roleName: string;
  roles: string[];
}