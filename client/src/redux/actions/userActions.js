import axios from "axios";
import { toast } from "react-toastify";

// Register user
export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post("/api/users/register", userData);
    dispatch({ type: "REGISTER_USER", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
    toast.success("Successfully Registered!");
  } catch (error) {
    console.error(error);
    dispatch({ type: "ERROR" });
    dispatch({ type: "LOADING", payload: false });
    toast.error(error.message);
  }
};

// Login user
export const loginUser = (userData) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post("/api/users/login", userData);
    dispatch({ type: "LOGIN_USER", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
    toast.success("Login Successful!");
  } catch (error) {
    console.error(error);
    dispatch({ type: "ERROR" });
    dispatch({ type: "LOADING", payload: false });
    toast.error(error.message);
  }
};

// Update user
export const updateUser = (token, userData, userId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.put(`/api/users/${userId}`, userData, config);
    dispatch({ type: "UPDATE_USER", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
    toast.success("Profile Updated Successfully!");
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  } catch (error) {
    console.error(error);
    dispatch({ type: "ERROR" });
    dispatch({ type: "LOADING", payload: false });
    toast.error(error.message);
  }
};

// Delete user
export const deleteUser = (token, userId, navigate) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.delete(`/api/users/${userId}`, config);
    dispatch({ type: "DELETE_USER" });
    dispatch({ type: "LOADING", payload: false });
    toast.success("Account Deleted Successfully!");
    navigate("/");
  } catch (error) {
    console.error(error);
    dispatch({ type: "LOADING", payload: false });
    toast.error(error.message);
  }
};

// Logout
export const logout = () => async (dispatch) => {
  dispatch({ type: "LOGOUT" });
};
