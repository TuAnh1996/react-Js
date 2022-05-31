const naviState = {
  navigate: {},
};
const NavigateReducer = (state = naviState, action) => {
  switch (action.type) {
    case "ADD_NAVIGATE": {
      return { ...state, navigate: action.navigate };
    }
    default:
      return { ...state };
  }
};
export default NavigateReducer;
