import axios from "axios";
import { toast } from "react-toastify";

// Create car
export const createCar = (carData, token, navigate) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post("/api/cars/create", carData, config);
    dispatch({ type: "CREATE_CAR", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
    toast.success("Car Created Successfully!");
    // When car created, navigate to car
    navigate(`/booking/${response.data._id}`);
  } catch (error) {
    console.error(error);
    dispatch({ type: "LOADING", payload: false });
    toast.error(error.message);
  }
};

// Get cars
export const getCars = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get("/api/cars");
    dispatch({ type: "GET_CARS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.error(error);
    dispatch({ type: "LOADING", payload: false });
    toast.error(error.message);
  }
};

// Get car
export const getCar = (carId) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get(`/api/cars/${carId}`);
    dispatch({ type: "GET_CAR", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.error(error);
    dispatch({ type: "LOADING", payload: false });
    toast.error(error.message);
  }
};

// Edit car
export const editCar =
  (carData, token, carId, navigate) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    dispatch({ type: "LOADING", payload: true });
    try {
      const response = await axios.put(`/api/cars/${carId}`, carData, config);
      dispatch({ type: "UPDATE_CAR", payload: response.data });
      dispatch({ type: "LOADING", payload: false });
      toast.success("Car Edited Successfully!");
      // When car created, navigate to car
      navigate(`/booking/${response.data._id}`);
    } catch (error) {
      console.error(error);
      dispatch({ type: "LOADING", payload: false });
      toast.error(error.message);
    }
  };

// Delete car
export const deleteCar = (token, carId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.delete(`/api/cars/${carId}`, config);
    dispatch({ type: "DELETE_CAR", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
    toast.success("Car Deleted Successfully!");
  } catch (error) {
    console.error(error);
    dispatch({ type: "LOADING", payload: false });
    toast.error(error.message);
  }
};
