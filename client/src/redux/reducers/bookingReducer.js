const initialState = {
  bookings: [],
};

export const bookingReducer = (state = initialState, action) => {
  // Destructure action object
  const { type, payload } = action;
  switch (type) {
    case "ADD_BOOKING":
      return {
        ...state,
        bookings: [...state.bookings, payload],
      };
    case "GET_BOOKINGS": {
      return {
        ...state,
        bookings: payload,
      };
    }
    case "DELETE_BOOKING": {
      return {
        ...state,
        bookings: state.bookings.filter(
          (booking) => booking._id !== payload._id
        ),
      };
    }
    default:
      return state;
  }
};
