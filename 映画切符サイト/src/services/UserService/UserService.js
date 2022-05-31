import Axios from "axios";
import { DOMAIN, TOKEN } from "../../util/constants/settingSystem";

export class UserService {
  constructor() {}

  signUpUser = (user) => {
    return Axios({
      url: `${DOMAIN}/Users/signup`,
      method: "POST",
      data: user,
    });
  };
  signInUser = (user) => {
    return Axios({
      url: `${DOMAIN}/Users/signin`,
      method: "POST",
      data: user,
    });
  };
  getUser = (idUser) => {
    return Axios({
      url: `${DOMAIN}/Users/getUser?idUser=${idUser}`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  deleteUser = (id) => {
    return Axios({
      url: `${DOMAIN}/Users/deleteUser?id=${id}`,
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  editUser = (userData) => {
    return Axios({
      url: `${DOMAIN}/Users/editUser`,
      method: "PUT",
      data: userData,
    });
  };
}
export const userService = new UserService();
