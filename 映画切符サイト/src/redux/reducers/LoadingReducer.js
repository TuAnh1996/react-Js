import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";

const loadingState = {
  isLoading: false,
};

const LoadingReducer = (state = loadingState, action) => {
  switch (action.type) {
    case DISPLAY_LOADING: {
      return { ...state, isLoading: true };
    }
    case HIDE_LOADING: {
      return { ...state, isLoading: false };
    }
    default:
      return state;
  }
};
export default LoadingReducer;
