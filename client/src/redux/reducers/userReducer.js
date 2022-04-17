// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isAuthenticated: false,
  user: user ? user : null,
};

export const userReducer = (state = initialState, action) => {
  // Destructure action object
  const { type, payload } = action;
  switch (type) {
    case "REGISTER_USER":
    case "LOGIN_USER":
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case "ERROR":
    case "DELETE_USER":
    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};
