import axios from "axios";
import { toast } from "react-toastify";

// Add booking
export const addBooking =
  (bookingData, token, navigate) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    dispatch({ type: "LOADING", payload: true });
    try {
      const response = await axios.post(
        "/api/bookings/add",
        bookingData,
        config
      );
      dispatch({ type: "ADD_BOOKING", payload: response.data });
      dispatch({ type: "LOADING", payload: false });
      toast.success("Car Booked Successfully!");
      navigate("/bookings");
    } catch (error) {
      console.error(error);
      dispatch({ type: "LOADING", payload: false });
      toast.error(error.message);
    }
  };

// Get bookings
export const getBookings = (token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get("/api/bookings", config);
    dispatch({ type: "GET_BOOKINGS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.error(error);
    dispatch({ type: "LOADING", payload: false });
    toast.error(error.message);
  }
};

// Cancel booking
export const cancelBooking = (token, bookingId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.delete(`/api/bookings/${bookingId}`, config);
    dispatch({ type: "DELETE_BOOKING", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
    toast.success("Booking Cancelled!");
  } catch (error) {
    console.error(error);
    dispatch({ type: "LOADING", payload: false });
    toast.error(error.message);
  }
};
