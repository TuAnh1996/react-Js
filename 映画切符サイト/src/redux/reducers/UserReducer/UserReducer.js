import {
  EDIT_USER_API,
  GET_LIST_USER_API,
  USER_SEARCH,
} from "../../constants/UserConstants";

const stateListUser = {
  listUser: [],
  listUserUpdate: [],
  UserLogin: {},
};
const UserReducer = (state = stateListUser, action) => {
  switch (action.type) {
    case GET_LIST_USER_API: {
      return {
        ...state,
        listUser: action.listUser,
        listUserUpdate: action.listUser,
        UserLogin: action.UserLogin,
      };
    }
    case USER_SEARCH: {
      return {
        ...state,
        listUserUpdate: action.listUserUpdate,
      };
    }

    default:
      return { ...state };
  }
};
export default UserReducer;
