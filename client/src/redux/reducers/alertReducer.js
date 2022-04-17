const initialState = {
  isLoading: false,
};

export const alertReducer = (state = initialState, action) => {
  // Destructure action object
  const { type, payload } = action;
  switch (type) {
    case "LOADING":
      return {
        ...state,
        isLoading: payload,
      };
    default:
      return state;
  }
};
