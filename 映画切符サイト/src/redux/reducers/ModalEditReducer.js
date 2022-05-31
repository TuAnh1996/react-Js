import { EDIT_USER_API } from "../constants/UserConstants";

const modalState = {
  isModalVisible: false,
  editUser: {},

  callSubmitFunction: () => {
    alert("click demo!");
  },
};
const ModalEditReducer = (state = modalState, action) => {
  switch (action.type) {
    case "OPEN_MODAL": {
      return { ...state, isModalVisible: true };
    }
    case "CLOSE_MODAL": {
      return { ...state, isModalVisible: false };
    }

    case "EDIT_USER": {
      return {
        ...state,
        isModalVisible: true,
        editUser: action.editUser,
      };
    }
    case "SET_SUBMIT_EDIT_PROJECT": {
      state.callSubmitFunction = action.submitFunction;

      return { ...state };
    }
    case EDIT_USER_API: {
      return { ...state, isModalVisible: false };
    }
    default:
      return { ...state };
  }
};
export default ModalEditReducer;
