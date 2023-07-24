import instance from "../common/http-common";

export const usersApi = {
  profile: () => {
    return instance.get('/users/profile', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
