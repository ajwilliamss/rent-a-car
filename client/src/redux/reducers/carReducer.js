const initialState = {
  car: {},
  cars: [],
};

export const carReducer = (state = initialState, action) => {
  // Destructure action object
  const { type, payload } = action;
  switch (type) {
    case "CREATE_CAR":
      return {
        ...state,
        car: payload,
      };
    case "GET_CARS":
      return {
        ...state,
        cars: payload,
      };
    case "GET_CAR":
      return {
        ...state,
        car: payload,
      };
    case "UPDATE_CAR":
      return { ...state, car: payload };
    case "DELETE_CAR":
      return {
        ...state,
        cars: state.cars.filter((car) => car._id !== payload._id),
      };
    default:
      return state;
  }
};
